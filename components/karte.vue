<template>
  <view>
    <fui-card :margin="['8rpx', '32rpx']" :title="prompt">
      <view class="card__content">
        <view v-if="output">
          <ua-markdown :source="output" />
        </view>
        <view v-else class="card__skeleton">
          <view class="card__skeleton-bar" style="width: 100%" />
          <view class="card__skeleton-bar" style="width: 60%" />
        </view>
      </view>
    </fui-card>
    <!-- 异步SSE组件 -->
    <event-source ref="eventSourceRef" @response="handleResponse" />
  </view>
</template>

<script setup>
  import { defineAsyncComponent, onMounted, ref, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useContentStore } from '@/stores/content'
  import { useModelStore } from '@/stores/model'
  import { modelAdapter } from '@/adapters'
  import { useTypeWriter } from '@/utils/chat'
  import fuiCard from '@/components/firstui/fui-card/fui-card'
  import uaMarkdown from '@/components/ua-markdown/ua-markdown'

  const isEventSourceActive = ref(false)
  const eventSourceRef = ref(null)

  // 发请求时再加载SSE组件
  const eventSource = defineAsyncComponent(() => {
    return new Promise(async (resolveComp) => {
      await new Promise((resolve) => watch(isEventSourceActive, resolve, { once: true }))
      resolveComp(import('@/components/event-source/event-source'))
    })
  })

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

  const { text: output, addText: addOutput, flush } = useTypeWriter()
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
    isEventSourceActive.value = true
    watch(
      eventSourceRef,
      () => {
        const { auth, ...headers } = modelData.value
        const adapter = modelAdapter.get(currentModel.value)
        adapter.request(auth, headers, eventSourceRef.value)
      },
      { once: true },
    )
  }

  async function handleResponse(resp) {
    if (resp.event === 'message') {
      const data = JSON.parse(resp.data)
      // data?.result && addOutput(data.result)
      output.value += data?.result
    } else if (resp.event === 'close') {
      // await flush()
      setAnswer(output.value, props.index)
    }
  }
</script>

<style scoped>
  .card__content {
    font-size: 28rpx;
    padding: 32rpx 20rpx;
  }
  .card__skeleton {
    display: flex;
    flex-direction: column;
    row-gap: 16rpx;
  }
  .card__skeleton-bar {
    height: 32rpx;
    border-radius: 8rpx;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.06) 25%,
      rgba(0, 0, 0, 0.15) 37%,
      rgba(0, 0, 0, 0.06) 63%
    );
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
  }
  @keyframes skeleton-loading {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
</style>
