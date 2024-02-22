import { fileURLToPath, URL } from 'node:url'

import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { wrapperEnv } from './build/utils';
import { createProxy } from './build/vite/proxy';
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import { OUTPUT_DIR, chunkSizeWarningLimit, terserOptions, rollupOptions } from './build/constant'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_PROXY } =
    viteEnv;
  return {
    base: VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      // 压缩
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'components': fileURLToPath(new URL('./src/components/components', import.meta.url)),
        'form': fileURLToPath(new URL('./src/components/form', import.meta.url)),
        'layout': fileURLToPath(new URL('./src/components/layout', import.meta.url)),
        'table': fileURLToPath(new URL('./src/components/table', import.meta.url)),
        'api': fileURLToPath(new URL('./src/api', import.meta.url)),
        'pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
        '@fast-cf/cf-framework': '@fast-cf/cf-naiveui',
      },
      dedupe: ['vue']
    },
    // 全局 css 注册
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import "src/styles/common/style.scss";`
        }
      }
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: ['edge90', 'chrome90', 'firefox90', 'safari15'],
      outDir: OUTPUT_DIR,
      // minify: 'terser', // 如果需要用terser混淆，可打开这两行
      // terserOptions: terserOptions,
      rollupOptions: rollupOptions,
      chunkSizeWarningLimit: chunkSizeWarningLimit
    }
  };
};