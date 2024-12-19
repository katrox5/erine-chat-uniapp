<template>
  <view>
    <template v-for="item in contents">
      <fui-card :margin="['8rpx', '32rpx']" :title="item?.prompt" tag="12/18 16:50">
        <view class="fui-card__content">
          <view v-if="item?.answer">
            {{ item.answer }}
          </view>
          <view v-else class="fui-card__skeleton">
            <view class="fui-card__skeleton-bar" style="width: 100%;" />
            <view class="fui-card__skeleton-bar" style="width: 60%;" />
          </view>
        </view>
      </fui-card>
    </template>
  </view>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useContentStore } from '@/stores/content'
  import fuiCard from '@/components/firstui/fui-card/fui-card'
  
  const contentStore = useContentStore()
  const { contents } = storeToRefs(contentStore)
</script>

<style scoped>
  .fui-card__content {
    font-size: 28rpx;
    padding: 32rpx 20rpx;
    box-sizing: border-box;
  }
  .fui-card__skeleton {
    display: flex;
    flex-direction: column;
    row-gap: 16rpx;
  }
  .fui-card__skeleton-bar {
    height: 32rpx;
    border-radius: 8rpx;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.06) 25%, rgba(0, 0, 0, 0.15) 37%, rgba(0, 0, 0, 0.06) 63%);
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
  }
  @keyframes skeleton-loading {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
</style>
