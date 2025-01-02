<template>
  <view style="position: relative">
    <view class="main__top-mask" />
    <scroll-view
      style="height: 100%"
      scroll-y
      scroll-with-animation
      :scroll-top="scrollTop"
      :lower-threshold="20"
      @scroll="onScroll"
      @scrolltolower="startAutoScroll"
    >
      <template
        v-for="({ prompt, answer }, index) in contents"
        :key="currentModel + index + hashCode(prompt)"
      >
        <karte :prompt="prompt" :answer="answer" :index="index" />
      </template>
    </scroll-view>
    <view class="main__bottom-mask" />
  </view>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useContentStore } from '@/stores/content'
  import { useModelStore } from '@/stores/model'
  import { hashCode, useWaveNumber } from '@/utils/math'
  import { useAutoResetRef } from '@/utils/ref'
  import Karte from './karte'

  const contentStore = useContentStore()
  const modelStore = useModelStore()
  const { contents, isFetching } = storeToRefs(contentStore)
  const { currentModel } = storeToRefs(modelStore)

  const scrollTop = ref(0)
  const waveNumber = useWaveNumber()

  function scrollToBottom() {
    // 手动滚动视图不会更新 scrollTop
    // 且 scrollTop 赋同一值时不会触发滚动
    // 故此处附加一波动值 waveNumber
    scrollTop.value = Number.MAX_SAFE_INTEGER + waveNumber()
  }

  onMounted(() =>
    // 入场时滚动到底部
    setTimeout(scrollToBottom, (contents.value.length - 1) * 150),
  )

  let timer

  const { startAutoScroll, stopAutoScroll } = {
    startAutoScroll() {
      if (isFetching.value && !timer) {
        timer = setInterval(scrollToBottom, 800)
      }
    },
    stopAutoScroll() {
      if (timer) {
        clearInterval(timer)
        timer = undefined
      }
    },
  }

  watch(isFetching, () => (isFetching.value ? startAutoScroll() : setTimeout(stopAutoScroll, 800)))

  const inertia = useAutoResetRef(0)
  let lastScrollTop

  const onScroll = ({ detail }) => {
    if (timer) {
      if (
        detail.scrollTop - lastScrollTop < 0 &&
        // 连续 15 次向上滚动动作停止自动滚动
        inertia.value++ >= 25
      ) {
        stopAutoScroll()
      }
    }
    lastScrollTop = detail.scrollTop
  }
</script>

<style lang="scss" scoped>
  @mixin mask($dir) {
    position: absolute;
    width: 100%;
    height: 16rpx;
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
