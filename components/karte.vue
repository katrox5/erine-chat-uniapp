<template>
  <view class="card__container">
    <view class="card__header">
      <text class="card__label">Q</text>
      <text class="card__title">{{ prompt }}</text>
    </view>
    <view class="card__content">
      <text class="card__label">A</text>
      <markdown :source="output" />
    </view>
  </view>
  <!-- SSE组件 -->
  <event-source v-if="isEventSourceActive" ref="eventSourceRef" @response="handleResponse" />
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useContentStore } from '@/stores/content'
  import { useModelStore } from '@/stores/model'
  import { modelAdapter } from '@/adapters'
  import markdown from '@/components/markdown/markdown'
  import eventSource from '@/components/event-source/event-source'

  const isEventSourceActive = ref(true)
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
  const { currentModel, modelData } = storeToRefs(modelStore)

  const output = ref('')
  const loading = ref(false)

  onMounted(() => {
    if (props.answer) {
      output.value = props.answer
      loading.value = false
      return
    }
    sendRequest()
  })

  function sendRequest() {
    const { auth, ...headers } = modelData.value
    const adapter = modelAdapter.get(currentModel.value)
    adapter.request(auth, headers, eventSourceRef.value)
  }

  async function handleResponse(resp) {
    if (resp.event === 'message') {
      const data = JSON.parse(resp.data)
      output.value += data?.result
    } else if (resp.event === 'close') {
      setAnswer(output.value, props.index)
    }
  }
</script>

<style scoped>
  .card__container {
    margin: 8rpx 32rpx;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: rgb(2 4 38 / 5%) 0 0.0625rem 0.125rem 0;
  }
  .card__header {
    position: relative;
    padding: 32rpx 20rpx;
    border-bottom: #eee solid 1px;
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
  .card__content {
    position: relative;
    padding: 32rpx 20rpx;
    font-size: 28rpx;
  }
</style>
