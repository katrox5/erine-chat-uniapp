<template>
  <view style="position: relative">
    <view class="main__top-mask" />
    <scroll-view
      style="height: 100%"
      scroll-y
      scroll-with-animation
      :scroll-top="scrollTop"
      :lower-threshold="20"
      :show-scrollbar="false"
      @scroll="onScroll"
      @scrolltolower="enableAutoScroll = true"
    >
      <template
        v-for="({ prompt, answer }, index) in contents"
        :key="currentModel + index + hashCode(prompt)"
      >
        <karte
          :prompt="prompt"
          :answer="answer"
          :index="index"
          @scroll-to-bottom="scrollToBottom"
        />
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
  import Karte from './karte'

  const contentStore = useContentStore()
  const modelStore = useModelStore()
  const { contents, isFetching } = storeToRefs(contentStore)
  const { currentModel } = storeToRefs(modelStore)

  const scrollTop = ref(0)
  const enableAutoScroll = ref(true)
  const waveNumber = useWaveNumber()

  function scrollToBottom() {
    if (!enableAutoScroll.value) return
    // 手动滚动视图不会更新 scrollTop
    // 且 scrollTop 赋同一值时不会触发滚动
    // 故此处附加一波动值 waveNumber
    scrollTop.value = Number.MAX_SAFE_INTEGER + waveNumber()
  }

  onMounted(() =>
    // 入场时滚动到底部
    setTimeout(scrollToBottom, (contents.value.length - 1) * 150),
  )

  watch(isFetching, () => isFetching.value && (enableAutoScroll.value = true))

  const onScroll = ({ detail }) => {
    if (detail.deltaY > 0) {
      enableAutoScroll.value = false
    }
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
