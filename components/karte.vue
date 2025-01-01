<template>
  <view class="card__container">
    <view class="card__header">
      <text class="card__label">Q</text>
      <text class="card__title">{{ prompt }}</text>
      <fui-icon
        v-if="isLatest && !isFetching"
        @click="reload"
        class="card__reload"
        name="refresh"
        color="#666"
        font-weight="bold"
        :size="32"
      />
    </view>
    <view class="card__content">
      <text class="card__label">A</text>
      <markdown :is-loading="isLoading" :source="output" />
    </view>
  </view>
  <!-- SSE组件 为最新对话时启用，否则卸载 -->
  <event-source v-if="isLatest" ref="eventSourceRef" @response="handleResponse" />
</template>

<script setup>
  import { onMounted, ref, computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useContentStore } from '@/stores/content'
  import { useModelStore } from '@/stores/model'
  import { modelAdapter } from '@/adapters'
  import markdown from '@/components/markdown/markdown'
  import eventSource from '@/components/event-source/event-source'
  import fuiIcon from '@/components/firstui/fui-icon/fui-icon.vue'

  const eventSourceRef = ref(null)

  const props = defineProps({
    prompt: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    answer: String,
  })

  const modelStore = useModelStore()
  const contentStore = useContentStore()
  const { setAnswer } = contentStore
  const { contents, isFetching } = storeToRefs(contentStore)
  const { currentModel, modelData } = storeToRefs(modelStore)

  const output = ref('')
  const isLatest = computed(() => contents.value.length - 1 === props.index)
  const isLoading = computed(() => isLatest.value && isFetching.value)

  onMounted(() => (props.answer ? (output.value = props.answer) : sendRequest()))

  function sendRequest() {
    const { auth, ...headers } = modelData.value
    const adapter = modelAdapter.get(currentModel.value)
    adapter.request(auth, headers, eventSourceRef.value)
  }

  function reload() {
    output.value = ''
    sendRequest()
  }

  async function handleResponse(resp) {
    switch (resp.event) {
      case 'open':
        isFetching.value = true
        break
      case 'message':
        const data = JSON.parse(resp.data)
        output.value += data?.result
        break
      case 'close':
        setAnswer(output.value, props.index)
      case 'error':
        isFetching.value = false
        break
    }
  }
</script>

<style lang="scss" scoped>
  .card__container {
    margin: 8rpx 32rpx;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: rgb(2 4 38 / 5%) 0 0.0625rem 0.125rem 0;
  }
  %card__padding {
    position: relative;
    padding: 32rpx 20rpx;
  }
  .card__header {
    @extend %card__padding;
    border-bottom: #eee solid 1px;
  }
  .card__content {
    @extend %card__padding;
    font-size: 28rpx;
  }
  .card__label {
    position: absolute;
    inset: 0 5rpx;
    font-size: 36rpx;
    font-style: italic;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    opacity: 0.06;
  }
  .card__title {
    font-size: 28rpx;
    color: #555;
  }
  .card__reload {
    $bg-color: #eee;
    position: absolute;
    inset: 2rpx 2rpx auto auto;
    border-radius: 50%;
    padding: 8rpx;
    background-color: $bg-color;
    &:active {
      background-color: lighten($bg-color, 3%);
    }
  }
</style>
