<template>
  <view>
    <scroll-view scroll-y scroll-with-animation :scroll-top="scrollTop" id="main__container">
      <template v-for="({ prompt, answer }, index) in contents" :key="currentModel + index">
        <karte :prompt="prompt" :answer="answer" :index="index" />
      </template>
    </scroll-view>
  </view>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useContentStore } from '@/stores/content'
  import { useModelStore } from '@/stores/model'
  import Karte from './karte'

  const contentStore = useContentStore()
  const modelStore = useModelStore()
  const { contents } = storeToRefs(contentStore)
  const { currentModel } = storeToRefs(modelStore)

  const scrollTop = ref(0)

  onMounted(() =>
    // 首次加载时，滚动到底部
    setTimeout(
      () => (scrollTop.value = Number.MAX_SAFE_INTEGER),
      (contents.value.length - 1) * 150,
    ),
  )
</script>

<style scoped>
  #main__container {
    height: 100%;
  }
</style>
