<template>
  <view class="view__body">
    <view class="view__header">
      <fui-icon class="header__return-btn" name="arrowleft" size="48" @click="navigateBack" />
      <text class="header__title">设置</text>
    </view>
    <view class="view__scroll-container">
      <view class="container__card">
        <view class="card__item" @click="toggleActionSheet">
          <text class="item__label">当前模型</text>
          <view class="item__preview">
            <fui-icon name="arrowright" size="32" color="dimgray" />
            <text>{{ modelList[modelSelected] }}</text>
          </view>
        </view>
      </view>
      <view class="container__card">
        <view class="card__item">
          <text class="item__label">生成温度</text>
          <slider block-size="14" />
        </view>
        <view class="card__item">
          <text class="item__label">重复惩罚</text>
          <slider block-size="14" />
        </view>
      </view>
    </view>
  </view>
  <fui-action-sheet
    mask-closable
    :show="actionSheetVisible"
    :itemList="modelList"
    @click="selectModel"
    @cancel="toggleActionSheet"
  />
</template>

<script setup>
  import { ref } from 'vue'
  import fuiIcon from '@/components/firstui/fui-icon/fui-icon.vue'
  import fuiActionSheet from '@/components/firstui/fui-actionsheet/fui-actionsheet.vue'
  
  const modelList = ['Erine-Speed-128K']
  const actionSheetVisible = ref(false)
  const modelSelected = ref(0)
  
  function navigateBack() {
    uni.navigateBack({
      animationType: 'slide-out-right',
      animationDuration: 150
    })
  }
  
  function toggleActionSheet() {
    actionSheetVisible.value = !actionSheetVisible.value
  }
  
  function selectModel({ index }) {
    modelSelected.value = index
    toggleActionSheet()
  }
</script>

<style scoped>
  .view__body {
    height: 100vh;
    background-color: #f3f3f3;
  }
  .view__header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: var(--status-bar-height);
    padding-bottom: 24rpx;
  }
  .header__return-btn {
    position: absolute;
    left: 8rpx;
  }
  .header__title {
    font-weight: 500;
  }
  .view__scroll-container {
    flex: 1 1 0%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    row-gap: 16rpx;
  }
  .container__card {
    margin: 0 24rpx;
    padding: 18rpx 0 18rpx 24rpx;
    background-color: #fff;
    border-radius: 16rpx;
  }
  .card__item {
    display: grid;
    align-items: center;
    grid-template-columns: .3fr .7fr;
  }
  .card__item:not(:first-child) {
    border-top: 3rpx solid #f3f3f3;
  }
  .item__label {
    font-size: 32rpx;
  }
  .item__preview {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding-right: 18rpx;
    font-size: 30rpx;
    color: darkgray;
  }
</style>
