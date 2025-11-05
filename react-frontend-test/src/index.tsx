import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ConfigProvider, App as AntDApp } from "antd";
import zhCN from "antd/locale/zh_CN";

import "./tailwind.css";

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: "#1677ff",
          colorLink: "#1677ff",
        },
        components: {
          // Message 配置
          Message: {
            contentPadding: '12px 20px',
            contentBg: 'rgba(55, 65, 81, 0.5)',
            colorText: '#ffffff',
            fontFamily: 'PingFang SC, Helvetica Neue, Arial, sans-serif',
            fontSize: 14,
            lineHeight: 1.5,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: 8,
          },
          // Table 配置
          Table: {
            colorBgContainer: '#1f1f1f',
            colorText: '#ffffff',
            colorTextHeading: '#ffffff',
            colorBorderSecondary: '#434343',
            headerBg: '#1d1d1d',
            headerColor: '#ffffff',
            rowHoverBg: 'rgba(255, 255, 255, 0.08)',
            rowSelectedBg: 'rgba(24, 144, 255, 0.2)',
            cellPaddingBlock: 8,
            cellPaddingInline: 16,
            
          },
          // Pagination 配置
          Pagination: {
            colorText: '#ffffff',
            colorBgContainer: '#1f1f1f',
            colorPrimary: '#1677ff',
            colorPrimaryHover: '#4096ff',
            colorBgTextHover: 'rgba(255, 255, 255, 0.08)',
            colorBgTextActive: 'rgba(255, 255, 255, 0.15)',
            itemActiveBg: '#1677ff',
            itemActiveColor: '#ffffff',
            itemSize: 32,
            borderRadius: 6,
          },
          // Form 配置
          Form: {
            labelColor: '#ffffff',
            colorText: '#ffffff',
            colorTextDescription: 'rgba(255, 255, 255, 0.65)',
          },
          // Input 配置
          Input: {
            colorBgContainer: '#2d2d2d',
            colorText: '#ffffff',
            colorTextPlaceholder: 'rgba(255, 255, 255, 0.45)',
            colorBorder: '#434343',
            colorPrimaryHover: '#4096ff',
            colorPrimary: '#1677ff',
          },
          // Select 配置（分页器下拉框）
          Select: {
            colorBgContainer: '#2d2d2d',
            colorBgElevated: '#2d2d2d',
            colorText: '#ffffff',
            colorTextPlaceholder: 'rgba(255, 255, 255, 0.45)',
            colorBorder: '#434343',
            colorPrimaryHover: '#4096ff',
            optionSelectedBg: 'rgba(22, 119, 255, 0.2)',
            optionActiveBg: 'rgba(255, 255, 255, 0.08)',
          },
          // Button 配置
          Button: {
            colorBgContainer: '#2d2d2d',
            colorText: '#ffffff',
            colorBorder: '#434343',
            defaultHoverBg: 'rgba(255, 255, 255, 0.08)',
            defaultHoverColor: '#4096ff',
            defaultHoverBorderColor: '#4096ff',
          },
        },
        cssVar: true,
        inherit: false,
        hashed: false,
      }}
    >
      <AntDApp className="h-screen w-screen bg-gray-900">
        <App />
      </AntDApp>
    </ConfigProvider>
  );
}