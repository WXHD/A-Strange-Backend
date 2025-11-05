import { RouterProvider } from "@tanstack/react-router";
import { App as AntDApp } from "antd";
import { type MessageInstance } from "antd/es/message/interface";
import { useMount } from "ahooks";
import { type HookAPI } from "antd/es/modal/useModal";
import { type NotificationInstance } from "antd/es/notification/interface";

// 导入路由实例
import { router } from "./router";

declare global {
  interface Window {
    globalMessage: MessageInstance;
    globalModal: HookAPI;
    globalNotification: NotificationInstance;
  }
}

export function App() {
  const { message, modal, notification } = AntDApp.useApp();

  useMount(() => {
    window.globalMessage = message;
    window.globalModal = modal;
    window.globalNotification = notification;
  });

  return <RouterProvider router={router} />;
}
