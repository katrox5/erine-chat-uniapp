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
    <image @click="submit" class="footer__btn" src="/static/icons/send.svg" />
  </view>
</template>

<script setup>
  import { ref, inject } from 'vue'
  import { useContentStore } from '@/stores/content'
  import fuiTextarea from '@/components/firstui/fui-textarea/fui-textarea'
  import { toastKey } from '@/constants'
  
  const contentStore = useContentStore()
  const { addPrompt } = contentStore
  
  const toast = inject(toastKey)
  
  const prompt = ref('')
  
  function submit() {
    // TODO 生成中返回
    if (prompt.value === '') {
      toast.value.show({
        text: '问题不能为空'
      })
      return
    }
    addPrompt(prompt.value)
    prompt.value = ''
  }
</script>

<style scoped>
  .footer__container {
    position: relative;
  }
  .footer__top-mask {
    position: absolute;
    width: 100%;
    height: 36rpx;
    top: -36rpx;
    left: 0;
    background-image: linear-gradient(to bottom, transparent, #f3f3f3);
  }
  .footer__btn {
    width: 48rpx;
    height: 48rpx;
    border-radius: 25%;
    position: absolute;
    right: 10rpx;
    top: 50%;
    transform: translateY(-50%);
  }
  .footer__btn:active {
    background-color: lightgray;
  }
</style>
