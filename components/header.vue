<template>
  <view class="header__container">
    <text class="header__title">{{ currentModel }}</text>
    <view class="header__btn-group">
      <image class="header__btn header__clear" src="/static/icons/clear.svg" @click="openPopup" />
      <image class="header__btn" src="/static/icons/setup.svg" @click="navigateToSetup" />
    </view>
    <view class="header__bottom-mask" />
  </view>
  <fui-top-popup :show="popupVisible" @close="closePopup">
    <view class="popup__container">
      <text class="popup__tips">是否清除所有对话？该操作不可恢复。</text>
      <button plain class="popup__btn popup__confirm" @click="(clearContents(), closePopup())">
        确认清除
      </button>
      <button plain class="popup__btn popup__cancel" @click="closePopup"> 取消 </button>
    </view>
  </fui-top-popup>
</template>

<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useModelStore } from '@/stores/model'
  import { useContentStore } from '@/stores/content'
  import fuiTopPopup from '@/components/firstui/fui-top-popup/fui-top-popup'

  const modelStore = useModelStore()
  const { currentModel } = storeToRefs(modelStore)
  const { clearContents } = useContentStore()

  const popupVisible = ref(false)

  function openPopup() {
    popupVisible.value = true
  }

  function closePopup() {
    popupVisible.value = false
  }

  function navigateToSetup() {
    uni.navigateTo({
      url: '/pages/setup/index',
      animationType: 'slide-in-right',
      animationDuration: 150,
    })
  }
</script>

<style scoped>
  .header__container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12rpx 24rpx;
    padding-top: var(--status-bar-height);
  }
  .header__title {
    font-size: 40rpx;
    font-weight: bold;
    color: transparent;
    background-image: linear-gradient(to right, #8270ff, #59b8ed);
    -webkit-background-clip: text;
  }
  .header__btn-group {
    display: flex;
    column-gap: 16rpx;
  }
  .header__btn {
    width: 40rpx;
    height: 40rpx;
    /* #ifdef H5 */
    cursor: pointer;
    /* #endif */
  }
  .header__clear {
    width: 44rpx;
    height: 44rpx;
  }
  .header__bottom-mask {
    z-index: 12;
    position: absolute;
    width: 100%;
    height: 36rpx;
    bottom: -36rpx;
    left: 0;
    background-image: linear-gradient(to top, transparent, #f3f3f3);
  }
  .popup__container {
    margin-top: var(--status-bar-height);
    background-color: #f8f8f8;
  }
  .popup__tips {
    background-color: #fff;
    color: #7f7f7f;
    font-size: 26rpx;
    display: flex;
    padding: 40rpx 60rpx;
    align-items: center;
    justify-content: center;
    border-bottom: 0.5px solid #eee;
  }
  .popup__btn {
    background-color: #fff;
    border: none;
    border-radius: 0;
    font-size: 32rpx;
  }
  .popup__btn:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .popup__confirm {
    color: #ff2b2b;
  }
  .popup__cancel {
    color: black;
    margin-top: 12rpx;
  }
</style>
