<template>
  <view class="footer__container">
    <textarea
      v-model="prompt"
      placeholder="请输入问题"
      placeholder-style="color: #ccc"
      auto-height="true"
      maxlength="-1"
      class="footer__input"
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
  import { storeToRefs } from 'pinia'
  import { useContentStore } from '@/stores/content'
  import fuiIcon from '@/components/firstui/fui-icon/fui-icon.vue'

  const contentStore = useContentStore()
  const { isFetching } = storeToRefs(contentStore)
  const { addPrompt } = contentStore

  const prompt = ref('')

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
    align-items: flex-end;
    padding: 12rpx;
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
  .footer__send {
    padding: 8rpx;
    border-radius: 8rpx;
    &:active {
      background-color: #f3f3f3;
    }
  }
</style>
