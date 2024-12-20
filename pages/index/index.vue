<template>
  <view class="view__body">
    <Header />
    <Main class="view__main" />
    <Footer />
  </view>
  <fui-toast ref="toast" />
</template>

<script setup>
  import { ref, provide } from 'vue'
  import Header from '@/components/header'
  import Main from '@/components/main'
  import Footer from '@/components/footer'
  import fuiToast from '@/components/firstui/fui-toast/fui-toast'
  import { toastKey } from '@/constants'

  const toast = ref(null)
  provide(toastKey, toast)
</script>

<style scoped>
  .view__body {
    height: 100vh;
    background-color: #f3f3f3;
    display: flex;
    flex-direction: column;
  }
  .view__main {
    flex: 1 1 0%;
    overflow-y: scroll;
  }
</style>
