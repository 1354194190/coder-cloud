import { createApp } from 'vue'
import App from './App.vue'

import { getStore, setupConfig } from '@fast-cf/cf-core';
import { setupFramework } from "@fast-cf/cf-framework";
import "@fast-cf/cf-framework-core/style.css";
import "@fast-cf/cf-core/style.css";
import "@fast-cf/cf-framework/style.css";

import { loadConfig } from './config'
const app = createApp(App).use(getStore())
setupConfig(import.meta.env)
setupFramework(app, loadConfig())
  .then(() => {
    app.mount('#app')
  })
  .catch((err: any) => {
    throw err
  })
