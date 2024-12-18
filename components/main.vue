<template>
  <view>
    <template v-for="i in 10">
      <fui-card :margin="['8rpx', '32rpx']" title="标题文字" tag="12/18 16:50">
        <view class="fui-card__content">
          这是一个基础卡片的示例，此处为自定义内容区域，自行控制内容样式。
        </view>
      </fui-card>
    </template>
  </view>
</template>

<script setup>
  import fuiCard from '@/components/firstui/fui-card/fui-card.vue'
</script>

<style scoped>
  .fui-card__content {
    font-size: 28rpx;
    padding: 32rpx 20rpx;
    box-sizing: border-box;
  }
</style>
