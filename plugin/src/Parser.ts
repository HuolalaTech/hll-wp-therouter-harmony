import {
  ClassDeclaration,
  Decorator,
  Expression,
  MethodDeclaration,
  PropertyAccessExpression,
  PropertyAssignment,
  SourceFile,
  SyntaxKind
} from 'ts-morph';
import {AnalyzerResultLike, ServiceResult} from './common/AnalyzerResultLike';
import {PluginConfig} from './PluginConfig';
import {Logger, PluginError} from './common/Logger';
import {TsAstUtil} from './utils/TsAstUtil';
import TheRouterFileUtil from './utils/FileUtil';
import PluginConstant from './constants/PluginConstant';
import PluginStore from './store/PluginStore';

export class Parser {
  private config: PluginConfig;
  private analyzerResultSet: Set<AnalyzerResultLike> = new Set();
  private importMap: Map<string, string[]> = new Map();

  constructor(config: PluginConfig) {
    this.config = config;
  }

  public getAnalyzeResultSet() {
    return this.analyzerResultSet;
  }

  public clearAnalyzeResultSet() {
    this.analyzerResultSet.clear();
  }

  public analyzeFile(sourceFilePath: string) {
    const sourceFile = TsAstUtil.getSourceFile(sourceFilePath);
    this.analyzeImport(sourceFile);
    this.analyzeRouter(sourceFile);
    this.analyzeComponent(sourceFile);
    this.parseFileByLineOrder(sourceFile);
    this.parseConstants();
  }

  private analyzeImport(sourceFile: SourceFile) {
    sourceFile.getImportDeclarations().forEach(importDeclaration => {
      const moduleSpecifier = importDeclaration.getModuleSpecifierValue();
      const namedImports = importDeclaration.getNamedImports().map(namedImport => namedImport.getName());
      const defaultImport = importDeclaration.getDefaultImport()?.getText();
      const namespaceImport = importDeclaration.getNamespaceImport()?.getText();
      const importNames: string[] = [];
      if (namedImports.length > 0) {
        importNames.push(...namedImports);
      }
      if (defaultImport) {
        importNames.push(defaultImport);
      }
      if (namespaceImport) {
        importNames.push(namespaceImport);
      }
      if (importNames.length > 0) {
        if (this.importMap.has(moduleSpecifier)) {
          // 合并导入名称而不是覆盖
          const existingImports = this.importMap.get(moduleSpecifier)!;
          this.importMap.set(moduleSpecifier, [...new Set([...existingImports, ...importNames])]);
        } else {
          this.importMap.set(moduleSpecifier, importNames);
        }
      }
    });
  }

  private analyzeRouter(sourceFile: SourceFile) {
    let viewNameArr = sourceFile.getChildrenOfKind(SyntaxKind.ExpressionStatement).map((node) => {
      return node.getText();
    }).filter((text) => {
      return text != 'struct' && !text.startsWith('import');
    });

    sourceFile.getChildrenOfKind(SyntaxKind.MissingDeclaration).forEach((node, index) => {
      node.getChildrenOfKind(SyntaxKind.Decorator).forEach((decorator) => {
        this.addToResultSet(decorator, viewNameArr[index], sourceFile);
      });
    });

    sourceFile.getExportAssignments().forEach((exportAssignment, index) => {
      exportAssignment.getDescendantsOfKind(SyntaxKind.Decorator).forEach((decorator) => {
        let result = this.addToResultSet(decorator, viewNameArr[index], sourceFile);
        result.isDefaultExport = true
      });
    });
  }

  private analyzeComponent(sourceFile: SourceFile) {
    sourceFile.getClasses().forEach((cls: ClassDeclaration) => {
      cls.getDecorators().forEach((decorator: Decorator) => {
        if (this.config.annotation.includes(decorator.getName())) {
          this.addToResultSet(decorator, cls.getName()!, sourceFile);
        }
      });
      cls.getMethods().forEach((method: MethodDeclaration) => {
        method.getDecorators().forEach((decorator: Decorator) => {
          let serviceResult = this.addToResultSet(decorator, cls.getName()!, sourceFile) as ServiceResult;
          serviceResult.functionName = method.getName();
        });
      });
    });
  }

  private parseFileByLineOrder(sourceFile: SourceFile) {
    const statements = sourceFile.getStatements();
    const sortedStatements = statements.sort((a, b) => a.getStart() - b.getStart());
    let exists: boolean = false;
    sortedStatements.forEach(statement => {
      if (statement.getKind() === SyntaxKind.MissingDeclaration && statement.getText().includes('Route')) {
        exists = true;
      }
      if (statement.getKind() === SyntaxKind.Block && exists) {
        exists = false;
        let reg = new RegExp(/NavDestination\s*\(\s*\)/);
        let text = statement.getText();
        const cleanedCodeBlock = text
          .replace(/(["'`]).*?\1/g, '')
          .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
        if (reg.test(cleanedCodeBlock)) {
          Logger.error(PluginError.ERR_WRONG_DECORATION);
          throw new Error('NavDestination is not allowed in TheRouter, filePath:' + sourceFile.getFilePath());
        }
      }
    });
  }

  private parseConstants() {
    this.analyzerResultSet.forEach((item) => {
      Object.getOwnPropertyNames(item).forEach((key: any) => {
        let propertyValue = Reflect.get(item, key);
        propertyValue = this.parsePropertyValueOnly(propertyValue);
        if (propertyValue === '') {
          Logger.error(PluginError.ERR_NOT_EMPTY_STRING);
          throw new Error('constants value cannot be an empty string, filePath:' + item.pageSourceFile);
        }
        Reflect.set(item, key, propertyValue);
      });
    });
  }

  private parsePropertyValueOnly(propertyValue: any): any {
    if (propertyValue.type === 'constant') {
      return TsAstUtil.parseConstantValue(TsAstUtil.getSourceFile(propertyValue.variableFilePath),
        propertyValue.variableName);
    } else if (propertyValue.type === 'object') {
      return TsAstUtil.parseConstantValue(TsAstUtil.getSourceFile(propertyValue.variableFilePath),
        propertyValue.variableName, propertyValue.propertyName);
    } else if (propertyValue.type === 'array') {
      return propertyValue.value.map((item: any) => {
        return this.parsePropertyValueOnly(item);
      });
    } else {
      // Ordinary type value
      return propertyValue;
    }
  }

  private addToResultSet(decorator: Decorator, componentName: string, sourceFile: SourceFile) {
    let decoratorResult = this.parseDecorator(decorator, sourceFile);
    decoratorResult.name = componentName;
    if (decoratorResult.annotation) {
      decoratorResult.pageSourceFile = sourceFile.getFilePath();
      this.analyzerResultSet.add(decoratorResult);
    }
    return decoratorResult;
  }

  private parseDecorator(decorator: Decorator, sourceFile: SourceFile): AnalyzerResultLike {
    let decoratorResult: AnalyzerResultLike = {};
    let decoratorName = decorator.getName();
    if (this.config.annotation.includes(decoratorName)) {
      decoratorResult.annotation = decoratorName;
      decoratorResult.routePageClassPath = this.config.getRelativeSourcePath(sourceFile.getFilePath());
      let args: AnalyzerResultLike = this.parseDecoratorArguments(decorator, sourceFile);
      Object.assign(decoratorResult, args);
    }
    return decoratorResult;
  }

  private parseDecoratorArguments(decorator: Decorator, sourceFile: SourceFile): AnalyzerResultLike {
    let argResult: AnalyzerResultLike = {};
    decorator.getArguments().map(arg => {
      const objLiteral = arg.asKind(SyntaxKind.ObjectLiteralExpression);
      if (objLiteral) {
        objLiteral.getProperties().forEach((prop) => {
          let propertyName = (prop as PropertyAssignment).getName();
          let propertyValue = this.parseIdentifierPropertyValue((prop as PropertyAssignment).getInitializer()!, sourceFile);
          Reflect.set(argResult, propertyName, propertyValue);
        });
      }
    });
    return argResult;
  }

  private parseIdentifierPropertyValue(value: Expression, sourceFile: SourceFile): any {
    switch (value.getKind()) {
      case SyntaxKind.Identifier:
        if (value.getText() === 'undefined') {
          throw new Error(`Invalid property value, in ${sourceFile.getFilePath()}`)
        }
        return {
          type: 'constant',
          variableName: value.getText(),
          variableFilePath: this.getVariableFilePath(value.getText(), sourceFile)
        };
      case SyntaxKind.PropertyAccessExpression:
        return {
          type: 'object',
          variableName: (value as PropertyAccessExpression).getExpression().getText(),
          propertyName: (value as PropertyAccessExpression)?.getName(),
          variableFilePath: this.getVariableFilePath((value as PropertyAccessExpression)?.getExpression().getText(), sourceFile)
        };
      case SyntaxKind.ArrayLiteralExpression:
        // Array value
        return {
          type: 'array',
          value: value.asKind(SyntaxKind.ArrayLiteralExpression)?.getElements()
            .map(item => this.parseIdentifierPropertyValue(item, sourceFile))
        };
      default:
        return this.parsePropertyValue(value);
    }
  }

  private parsePropertyValue(value: Expression): any {
    let propertyValue;
    switch (value.getKind()) {
      case SyntaxKind.StringLiteral:
        propertyValue = value.asKind(SyntaxKind.StringLiteral)?.getLiteralValue();
        break;
      case SyntaxKind.NumericLiteral:
        propertyValue = value.asKind(SyntaxKind.NumericLiteral)?.getLiteralValue();
        break;
      case SyntaxKind.TrueKeyword:
        propertyValue = true;
        break;
      case SyntaxKind.FalseKeyword:
        propertyValue = false;
        break;
      case SyntaxKind.ArrayLiteralExpression:
        propertyValue = value.asKind(SyntaxKind.ArrayLiteralExpression)?.getElements()
          .map(item => item.asKind(SyntaxKind.StringLiteral)?.getLiteralValue());
        break;
    }
    return propertyValue;
  }

  private getVariableFilePath(variableName: string, sourceFile: SourceFile): string {
    let filePath: string = '';
    let classesNames = sourceFile.getClasses().map((classes) => {
      return classes.getName()!;
    });
    let variableNames = sourceFile.getVariableDeclarations().map((variableDeclaration) => {
      return variableDeclaration.getName();
    });
    if (classesNames.includes(variableName) || variableNames.includes(variableName)) {
      return sourceFile.getFilePath();
    }
    this.importMap.forEach((importNames, importPath) => {
      if (importNames.includes(variableName)) {
        let currentDir = TheRouterFileUtil.pathResolve(sourceFile.getFilePath(), PluginConstant.PARENT_DELIMITER);
        let tempFilePath = TheRouterFileUtil.pathResolve(currentDir, importPath + PluginConstant.ETS_SUFFIX);
        if (TheRouterFileUtil.exist(tempFilePath)) {
          filePath = tempFilePath;
        } else {
          const otherModuleVariableFilePath = this.getOtherModuleVariableFilePath(importPath, variableName);
          if (otherModuleVariableFilePath) {
            filePath = otherModuleVariableFilePath;
          }
        }
      }
    });
    return filePath;
  }

  private getOtherModuleVariableFilePath(moduleName: string, variableName: string): string | undefined {
    let moduleFilePath = TheRouterFileUtil.pathResolve(this.config.modulePath,
      PluginConstant.OH_MODULE_PATH, moduleName, PluginConstant.DEFAULT_SCAN_DIR);
    if (!TheRouterFileUtil.exist(moduleFilePath)) {
      moduleFilePath = TheRouterFileUtil.pathResolve(PluginStore.getInstance().projectFilePath,
        PluginConstant.OH_MODULE_PATH, moduleName, PluginConstant.DEFAULT_SCAN_DIR);
    }
    let variableMap;
    if (PluginStore.getInstance().variableCache.has(moduleName)) {
      variableMap = PluginStore.getInstance().variableCache.get(moduleName)!;
    } else {
      variableMap = TsAstUtil.parseCrossModuleVariable(moduleFilePath);
      PluginStore.getInstance().variableCache.set(moduleName, variableMap);
    }
    for (let [key, value] of variableMap) {
      if (value.includes(variableName)) {
        return key;
      }
    }
    // throw new Error(`Unknown variable ${variableName} in ${moduleName}`);
    return undefined
  }
}
