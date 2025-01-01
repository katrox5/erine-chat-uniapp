<template>
  <view style="position: relative">
    <view class="main__top-mask" />
    <scroll-view
      style="height: 100%"
      scroll-y
      scroll-with-animation
      :scroll-top="scrollTop"
      :upper-threshold="20"
      @scrolltoupper="interruptAutoScroll"
    >
      <template v-for="({ prompt, answer }, index) in contents" :key="currentModel + index">
        <karte :prompt="prompt" :answer="answer" :index="index" />
      </template>
    </scroll-view>
    <view class="main__bottom-mask" />
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
  
  const interruptAutoScroll = () => {
    console.log('interrupt')
  }
</script>

<style lang="scss" scoped>
  @mixin mask($dir) {
    position: absolute;
    width: 100%;
    height: 24rpx;
    background-image: linear-gradient(to $dir, transparent, #f3f3f3);
    z-index: 1;
  }
  .main__top-mask {
    @include mask(top);
  }
  .main__bottom-mask {
    @include mask(bottom);
    bottom: 0;
  }
</style>
