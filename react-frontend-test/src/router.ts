import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// 创建并导出路由实例
export const router = createRouter({
  routeTree,
  basepath: "/strange",
  defaultPreload: "intent",
  scrollRestoration: true,
});

// 注册路由实例以确保类型安全
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
