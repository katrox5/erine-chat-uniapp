<template>
  <view class="view__body">
    <Header />
    <Container class="view__container" />
    <Footer />
  </view>
</template>

<script setup>
  import Header from '@/components/header.vue'
  import Container from '@/components/container.vue'
  import Footer from '@/components/footer.vue'
</script>

<style scoped>
  .view__body {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .view__container {
    flex: 1 1 0%;
    overflow-y: scroll;
  }
</style>
