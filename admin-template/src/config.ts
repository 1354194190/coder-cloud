import { getStore, useConfig } from '@fast-cf/cf-core';
const pinia = getStore()
const config = useConfig()

const routes = [
  {
    path: '/',
    redirect: {
      name: 'dashboard',
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      tags: ['login'],
    },
    component: () => import('@/views/login.vue'),
  },
]
export function loadConfig() {
  const options = {
    plugins: {
      pinia: pinia,
    },
    env: import.meta.env,
    modules: config.getAppModules(),

    request: {
      getProjectId: () => {
        return null
      }
    },
    router: {
      routes: routes,
    }
  }
  return options;
}