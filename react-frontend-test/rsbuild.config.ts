import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/rspack";
import { pluginLess } from "@rsbuild/plugin-less";

export default defineConfig({
  plugins: [
    // 配置 Rsbuild 插件
    pluginReact(),
    pluginLess(),
  ],
  dev: {
    // 与本地开发有关的选项
  },
  html: {
    // 与 HTML 生成有关的选项
    title: "A-Strange-Project", // 浏览器标签页标题
    favicon: "./public/icon.png", // 网站图标
    meta: {
      description:
        "??????",
    },
  },
  tools: {
    // 与底层工具有关的选项
    rspack: {
      plugins: [
        tanstackRouter({
          target: "react",
          autoCodeSplitting: true,
        }),
      ],
    },
  },
  output: {
    // 与构建产物有关的选项
    assetPrefix: "/strange/",
    distPath: {
      root: 'dist/strange',
    },
  },
  resolve: {
    // 与源代码解析、编译方式相关的选项
    alias: {
      // 源代码别名
      "@component": "src/component",
      "@pages": "src/pages",
      "@service": "src/service",
      "@type": "src/type",
      "@const": "src/const",
    },
  },
  source: {
    define: {
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.PUBLIC_URL": JSON.stringify("/strange"),
    },
  },
  server: {
    base: "/strange",
    // 与 Rsbuild 服务器有关的选项
    // 在本地开发和预览时都会生效
    proxy: {
      // 配置代理
      "/strange_api": {
        target: "http://localhost:10011/",
        changeOrigin: true,
        pathRewrite: { "^/strange_api": "" },
      },
    },
  },
  security: {
    // 与 Web 安全有关的选项
  },
  performance: {
    // 与构建性能、运行时性能有关的选项
  },
  // moduleFederation: {
  //   // 与模块联邦有关的选项
  // },
  environments: {
    // 为每个环境定义不同的 Rsbuild 配置
  },
});