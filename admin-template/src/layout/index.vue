<script setup lang="ts">
import { CfLayout } from '@fast-cf/cf-framework'
import { useLayout} from '@fast-cf/cf-core'
const layout = useLayout();
</script>

<template>
  <CfLayout>
    <RouterView />
  </CfLayout>
</template>

<style scoped>

</style>
