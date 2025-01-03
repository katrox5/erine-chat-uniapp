<template>
  <view class="header__container">
    <text class="header__title">{{ currentModel }}</text>
    <view class="header__btn-group">
      <fui-icon
        custom-prefix="custom-icon"
        name="icon-clear"
        size="48"
        color="#1677ff"
        @click="openPopup"
      />
      <fui-icon name="setup" size="48" @click="navigateToSetup" />
    </view>
  </view>
  <fui-top-popup :show="popupVisible" @close="closePopup">
    <view class="popup__container">
      <text class="popup__tips">是否清除所有对话？该操作不可恢复。</text>
      <button plain class="popup__confirm" @click="clearContents(), closePopup()">
        确认清除
      </button>
      <button plain class="popup__cancel" @click="closePopup"> 取消 </button>
    </view>
  </fui-top-popup>
</template>

<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useModelStore } from '@/stores/model'
  import { useContentStore } from '@/stores/content'
  import fuiIcon from '@/components/firstui/fui-icon/fui-icon.vue'
  import fuiTopPopup from '@/components/firstui/fui-top-popup/fui-top-popup'

  const modelStore = useModelStore()
  const { currentModel } = storeToRefs(modelStore)
  const { clearContents } = useContentStore()

  const popupVisible = ref(false)

  const { openPopup, closePopup } = {
    openPopup() {
      popupVisible.value = true
    },
    closePopup() {
      popupVisible.value = false
    },
  }

  function navigateToSetup() {
    uni.navigateTo({
      url: '/pages/setup/index',
      animationType: 'slide-in-right',
      animationDuration: 150,
    })
  }
</script>

<style lang="scss" scoped>
  .header__container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--status-bar-height) 24rpx 12rpx;
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
    column-gap: 12rpx;
  }
  .popup__container {
    margin-top: var(--status-bar-height);
    background-color: #f8f8f8;
  }
  .popup__tips {
    color: #7f7f7f;
    font-size: 26rpx;
    display: flex;
    justify-content: center;
    padding: 40rpx 60rpx;
    background-color: #fff;
    border-bottom: 0.5px solid #eee;
  }
  %popup__btn {
    background-color: #fff;
    border: none;
    border-radius: 0;
    font-size: 32rpx;
    &:active {
      background-color: #00000033;
    }
  }
  .popup__confirm {
    @extend %popup__btn;
    color: #ff2b2b;
  }
  .popup__cancel {
    @extend %popup__btn;
    color: #000;
    margin-top: 12rpx;
  }
</style>
