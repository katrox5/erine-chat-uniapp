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
        v-if="fullBtnVisible"
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
    <view>
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
      <textarea
        v-model="prompt"
        placeholder="请输入问题"
        placeholder-style="color: #ccc"
        maxlength="-1"
        class="footer__input--full"
        :style="{ height: fullInputHeight }"
        @keyboardheightchange="keyboardHeightChangeHandler"
      />
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

  const fullBtnVisible = ref(false)
  const popupVisible = ref(false)
  const fullInputHeight = ref('80vh')

  const { openPopup, closePopup } = {
    openPopup() {
      popupVisible.value = true
    },
    closePopup() {
      popupVisible.value = false
    },
  }

  const lineChangeHandler = ({ detail }) => {
    // FIXME 使用 fullInput 编辑不会触发更新
    fullBtnVisible.value = detail.lineCount >= 4
  }

  const keyboardHeightChangeHandler = ({ detail }) => {
    // FIXME 高度变化有延迟，会出现频闪现象
    fullInputHeight.value = `calc(80vh - ${detail.height}px)`
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
  .footer__input--full {
    box-sizing: border-box;
    font-size: 32rpx;
    padding-inline: 16rpx;
    width: 100%;
    /* FIXME fullInput 无法滑动 */
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
