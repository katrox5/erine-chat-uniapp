<template>
  <view class="header__container">
    <text class="header__title">Erine-Speed-128K</text>
    <view class="header__btn-group">
      <image class="header__btn header__clear-btn" src="/static/icons/clear.svg" />
      <image class="header__btn" src="/static/icons/setup.svg" @click="navigateToSetup" />
    </view>
    <view class="header__bottom-mask" />
  </view>
</template>

<script setup>
  function navigateToSetup() {
    uni.navigateTo({
      url: '/pages/setup/index',
      animationType: 'slide-in-right',
      animationDuration: 150
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
    border-radius: 15%;
  }
  .header__clear-btn {
    width: 44rpx;
    height: 44rpx;
  }
  .header__bottom-mask {
    position: absolute;
    width: 100%;
    height: 36rpx;
    bottom: -36rpx;
    left: 0;
    background-image: linear-gradient(to top, transparent, #f3f3f3);
  }
</style>
