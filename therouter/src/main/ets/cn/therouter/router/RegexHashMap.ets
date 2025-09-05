import { RouteItem } from './RouteItem';
/**
 * 专门为路由服务，因为路由的path存在正则的情况
 */
export class RegexHashMap extends Map<string, RouteItem> {
  get(key: string): RouteItem | undefined {
    const value = super.get(key);
    if (value !== undefined) {
      return value;
    }

    for (const regexStr of this.keys()) {
      try {
        const regex = new RegExp(`^${regexStr}&`);
        if (regex.test(key)) {
          return this.get(regexStr);
        }
      } catch (e) {
        continue;
      }
    }
    return undefined;
  }
}

function testdebug() {
  const routeMap = new RegexHashMap();
  const item1: RouteItem = {
    path: "/home"
  };
  const item2: RouteItem = {
    path: "/about"
  };
  const item3: RouteItem = {
    path: "/user/\\d+"
  };
  routeMap.set(item1?.path || '', item1);
  routeMap.set(item2?.path || '', item2);
  routeMap.set(item3?.path || '', item3);

  console.log(routeMap.get("/home")?.path); // { path: "/home", handler: [Function] }
  console.log(routeMap.get("/user/123")?.path); // { path: "/user/\\d+", handler: [Function] }
  console.log(routeMap.get("/user/abc")?.path); // undefined
}
