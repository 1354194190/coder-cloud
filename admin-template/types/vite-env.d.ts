/// <reference types="vite/client" />

declare module "@fast-cf/cf-framework-core"
declare module "@fast-cf/cf-framework";
declare module "@fast-cf/cf-core"

interface ImportMetaEnv {
  // 标题
  VITE_GLOB_APP_TITLE: string;
  // 端口
  VITE_DEV_PORT: string;
  // 开发地址
  VITE_DEV_PATH: string
  // 生产地址
  VITE_PRO_PATH: string
}