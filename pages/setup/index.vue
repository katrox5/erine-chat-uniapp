<template>
  <view class="view__body">
    <view class="view__header">
      <fui-icon class="header__return" name="arrowleft" size="48" @click="navigateBack" />
      <text class="header__title">设置</text>
    </view>
    <view class="view__scroll-container">
      <!-- 模型 -->
      <view class="container">
        <view class="container__card">
          <view class="card__item" @click="toggleActionSheet">
            <text class="item__label">当前模型</text>
            <view class="item__button">
              <text>{{ currentModel }}</text>
              <fui-icon name="arrowright" size="32" color="dimgray" />
            </view>
          </view>
        </view>
      </view>
      <!-- 凭据 -->
      <view class="container">
        <text class="container__title">凭据</text>
        <view class="container__card">
          <template v-for="item in modelAuth.get(currentModel)">
            <view class="card__item">
              <text class="item__label">{{ item.name }}</text>
              <input
                v-model="modelData.auth[item.key]"
                :placeholder="'填写 ' + item.name"
                placeholder-class="item__input--placehoder"
                class="item__input"
              />
            </view>
          </template>
        </view>
      </view>
      <!-- 参数 -->
      <view class="container">
        <text class="container__title">参数</text>
        <view class="container__card">
          <template v-for="item in modelOptions.get(currentModel)">
            <view class="card__item">
              <text class="item__label">{{ item.name }}</text>
              <view v-if="item.type === 'number'" class="item__slider">
                <slider
                  :min="item.range[0]"
                  :max="item.range[1]"
                  :step="item.range[2]"
                  :value="modelData.options[item.key] * 100 - item.range[3]"
                  @change="(e) => optionChange((e.detail.value + item.range[3]) / 100, item.key)"
                  style="margin: 8rpx 0; flex-grow: 1"
                  block-size="14"
                />
                <text>{{ modelData.options[item.key]?.toFixed(2) }}</text>
              </view>
            </view>
          </template>
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
  import { storeToRefs } from 'pinia'
  import fuiIcon from '@/components/firstui/fui-icon/fui-icon.vue'
  import fuiActionSheet from '@/components/firstui/fui-actionsheet/fui-actionsheet'
  import { modelList, modelAuth, modelOptions } from '@/adapters'
  import { useModelStore } from '@/stores/model'

  const actionSheetVisible = ref(false)

  const modelStore = useModelStore()
  const { currentModel, modelData } = storeToRefs(modelStore)

  function navigateBack() {
    uni.navigateBack({
      animationType: 'slide-out-right',
      animationDuration: 150,
    })
  }

  function optionChange(value, option) {
    modelData.value.options[option] = value
  }

  function toggleActionSheet() {
    actionSheetVisible.value = !actionSheetVisible.value
  }

  function selectModel({ index }) {
    currentModel.value = modelList[index]
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
  .header__return {
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
  .container {
    margin: 0 24rpx;
  }
  .container__title {
    display: block;
    margin-left: 16rpx;
    margin-bottom: 10rpx;
    font-size: 20rpx;
    color: dimgray;
  }
  .container__card {
    padding: 8rpx 24rpx;
    background-color: #fff;
    border-radius: 16rpx;
  }
  .card__item {
    display: grid;
    align-items: center;
    grid-template-columns: 0.4fr 0.6fr;
    padding: 16rpx 0 16rpx 0;
  }
  .card__item:not(:first-child) {
    border-top: 3rpx solid #f3f3f3;
  }
  .item__label {
    font-size: 32rpx;
  }
  .item__button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 30rpx;
    color: dimgray;
    /* #ifdef H5 */
    cursor: pointer;
    /* #endif */
  }
  .item__input {
    font-size: 24rpx;
    text-align: right;
  }
  .item__input--placehoder {
    color: darkgray;
  }
  .item__slider {
    display: flex;
    align-items: center;
    column-gap: 32rpx;
    font-size: 30rpx;
    color: dimgray;
  }
</style>
