<template>
  <view v-if="modalVisible">
    <view @click="hide" class="modal__backdrop" />
    <view class="modal__container">
      <image @click="hide" class="modal__close-btn" src="/static/icons/close.svg" />
      <text class="modal__title">设置</text>
      <view class="modal__content">
        <text class="modal__label">生成温度</text>
        <slider block-size="14" />
        <text class="modal__label">重复惩罚</text>
        <slider block-size="14" />
      </view>
    </view>
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  const modalVisible = ref(false)
  
  const show = () => modalVisible.value = true
  const hide = () => modalVisible.value = false
  
  defineExpose({
    show,
    hide,
  })
</script>

<style scoped>
  .modal__container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    
    width: 85%;
    padding: 24rpx;
    background-color: white;
    border-radius: 6rpx;
  }
  .modal__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .modal__close-btn {
    position: absolute;
    top: 16rpx;
    right: 16rpx;
    width: 32rpx;
    height: 32rpx;
  }
  .modal__title {
    font-size: 32rpx;
  }
  .modal__content {
    margin-top: 32rpx;
  }
  .modal__label {
    font-size: 24rpx;
    color: gray;
    margin-left: 24rpx;
  }
</style>
