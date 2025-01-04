<template>
  <view class="footer__container">
    <textarea
      v-model="prompt"
      placeholder="请输入问题"
      placeholder-style="color: #ccc"
      auto-height="true"
      maxlength="-1"
      class="footer__input"
      @linechange="lineChangeHandler"
    />
    <view class="footer__btn-group">
      <fui-icon
        custom-prefix="custom-icon"
        name="icon-send"
        size="36"
        color="dimgray"
        class="footer__btn"
        @click="submit"
      />
      <fui-icon
        v-if="maxmizeBtnVisible"
        custom-prefix="custom-icon"
        name="icon-maxmize"
        font-weight="bold"
        size="36"
        color="dimgray"
        class="footer__btn"
        @click="openPopup"
      />
    </view>
  </view>
  <fui-bottom-popup :show="popupVisible" :maskClosable="false">
    <view :style="{ paddingBottom: '24rpx', marginBottom: fullInputBottomValue }">
      <view style="display: flex">
        <fui-icon
          custom-prefix="custom-icon"
          name="icon-minimize"
          font-weight="bold"
          size="36"
          color="dimgray"
          class="footer__btn"
          style="margin-inline: auto 12rpx"
          @click="closePopup"
        />
      </view>
      <scroll-view scroll-y>
        <textarea
          v-model="prompt"
          placeholder="请输入问题"
          placeholder-style="color: #ccc"
          maxlength="-1"
          auto-height
          class="footer__input-full"
          :adjust-position="false"
          @keyboardheightchange="keyboardHeightChangeHandler"
        />
      </scroll-view>
    </view>
  </fui-bottom-popup>
</template>

<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useContentStore } from '@/stores/content'
  import fuiIcon from '@/components/firstui/fui-icon/fui-icon.vue'
  import fuiBottomPopup from '@/components/firstui/fui-bottom-popup/fui-bottom-popup'

  const contentStore = useContentStore()
  const { isFetching } = storeToRefs(contentStore)
  const { addPrompt } = contentStore

  const prompt = ref('')

  const popupVisible = ref(false)
  const maxmizeBtnVisible = ref(false)
  const fullInputBottomValue = ref('0')

  const { openPopup, closePopup } = {
    openPopup() {
      popupVisible.value = true
    },
    closePopup() {
      popupVisible.value = false
    },
  }

  const { lineChangeHandler, keyboardHeightChangeHandler } = {
    lineChangeHandler({ detail }) {
      maxmizeBtnVisible.value = detail.lineCount >= 4
    },
    keyboardHeightChangeHandler({ detail }) {
      fullInputBottomValue.value = `${detail.height}px`
    },
  }

  function submit() {
    if (isFetching.value) {
      return
    }
    if (prompt.value === '') {
      uni.showToast({
        title: '问题不能为空',
        icon: 'none',
      })
      return
    }
    addPrompt(prompt.value)
    prompt.value = ''
  }
</script>

<style lang="scss" scoped>
  .footer__container {
    display: flex;
    padding: 12rpx;
    padding-left: 24rpx;
    background-color: #f8f8f8;
    border-top: 1px solid #eee;
  }
  .footer__input {
    font-size: 32rpx;
    padding-inline: 6rpx;
    background-color: #fff;
    border-radius: 8rpx;
    max-height: 200rpx;
    min-height: 100%;
    flex-grow: 1;
    overflow-y: auto;
  }
  .footer__input-full {
    box-sizing: border-box;
    font-size: 32rpx;
    padding-inline: 16rpx;
    width: 100%;
    min-height: 50vh;
    max-height: 50vh;
  }
  .footer__btn-group {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    height: 100%;
  }
  .footer__btn {
    padding: 8rpx;
    border-radius: 8rpx;
    &:active {
      background-color: #f3f3f3;
    }
  }
</style>
