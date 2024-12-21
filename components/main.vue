<template>
  <view>
    <template v-for="({ prompt, answer }, index) in contents">
      <karte :prompt="prompt" :answer="answer" :index="index" />
    </template>
  </view>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useContentStore } from '@/stores/content'
  import Karte from '@/components/karte'

  const contentStore = useContentStore()
  const { contents } = storeToRefs(contentStore)
</script>
