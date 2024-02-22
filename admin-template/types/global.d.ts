interface Window {
  $loading: any
  $message: any
  $dialog: any
  // 语言
  $t: any
  $vue: any
  // 键盘按键记录
  $KeyboardActive?: { [T: string]: boolean }
  onKeySpacePressHold?: Function
  $cf: any
  $widge: any

  // 编辑 JSON 的存储对象
  opener: any
}

declare type Recordable<T = any> = Record<string, T>
interface ImportMetaEnv extends ViteEnv {
  __: unknown;
}
declare interface ViteEnv {
  VITE_PORT: number;
  VITE_USE_MOCK: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_DROP_CONSOLE: boolean;
  VITE_GLOB_PROD_MOCK: boolean;
  VITE_GLOB_IMG_URL: string;
  VITE_PROXY: [string, string][];
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
}