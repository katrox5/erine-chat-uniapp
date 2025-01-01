<template>
  <view>
    <template v-for="({ prompt, answer }, index) in contents" :key="currentModel+index">
      <karte :prompt="prompt" :answer="answer" :index="index" />
    </template>
  </view>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useContentStore } from '@/stores/content'
  import { useModelStore } from '@/stores/model'
  import Karte from './karte'

  const contentStore = useContentStore()
  const modelStore = useModelStore()
  const { contents } = storeToRefs(contentStore)
  const { currentModel } = storeToRefs(modelStore)
</script>
