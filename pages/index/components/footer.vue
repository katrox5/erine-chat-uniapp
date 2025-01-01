<template>
  <view class="footer__container">
    <view class="footer__top-mask" />
    <fui-textarea
      v-model="prompt"
      maxlength="-1"
      height="64rpx"
      placeholder="请输入问题"
      :padding="['24rpx', '56rpx', '24rpx', '24rpx']"
    />
    <fui-icon
      custom-prefix="custom-icon"
      name="icon-send"
      size="36"
      color="dimgray"
      class="footer__send"
      @click="submit"
    />
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  import { useContentStore } from '@/stores/content'
  import fuiTextarea from '@/components/firstui/fui-textarea/fui-textarea'
  import fuiIcon from '@/components/firstui/fui-icon/fui-icon.vue'

  const contentStore = useContentStore()
  const { addPrompt } = contentStore

  const prompt = ref('')

  function submit() {
    // TODO 生成中返回
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
    position: relative;
  }
  .footer__top-mask {
    position: absolute;
    inset: -36rpx 0;
    width: 100%;
    height: 36rpx;
    background-image: linear-gradient(to bottom, transparent, #f3f3f3);
    z-index: 1;
  }
  .footer__send {
    position: absolute;
    inset: 50% 10rpx auto auto;
    padding: 8rpx;
    border-radius: 8rpx;
    transform: translateY(-50%);
    &:active {
      background-color: #f3f3f3;
    }
  }
</style>
