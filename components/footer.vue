<template>
  <view class="footer__container">
    <fui-textarea
      v-model="text"
      maxlength="-1"
      height="64rpx"
      placeholder="请输入问题"
      :padding="['24rpx', '48rpx', '18rpx', '24rpx']"
    />
    <image class="footer__btn" src="/static/icons/send.svg" />
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  import fuiTextarea from '@/components/firstui/fui-textarea/fui-textarea.vue'
  const text = ref('')
</script>

<style scoped>
  .footer__container {
    position: relative;
  }
  .footer__btn {
    width: 48rpx;
    height: 48rpx;
    border-radius: 25%;
    position: absolute;
    right: 6rpx;
    top: 50%;
    transform: translateY(-50%);
  }
  .footer__btn:active {
    background-color: lightgray;
  }
</style>
