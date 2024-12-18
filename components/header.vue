<template>
  <view class="header__container">
    <text class="header__title">Erine-Speed-128K</text>
    <view class="header__btn-group">
      <image class="header__btn header__clear-btn" src="/static/icons/clear.svg" />
      <image class="header__btn" src="/static/icons/setting.svg" />
    </view>
  </view>
</template>

<script setup>
  
</script>

<style scoped>
  .header__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12rpx 24rpx;
    padding-top: var(--status-bar-height, 18rpx);
  }
  .header__title {
    font-size: 36rpx;
    font-weight: bold;
    color: transparent;
    background-image: linear-gradient(to right, #8270ff, #59b8ed);
    -webkit-background-clip: text;
  }
  .header__btn-group {
    display: flex;
    column-gap: 12rpx;
  }
  .header__btn {
    width: 32rpx;
    height: 32rpx;
    border-radius: 15%;
  }
  .header__btn:active {
    background-color: lightgray;
  }
  .header__clear-btn {
    width: 36rpx;
    height: 36rpx;
  }
</style>
