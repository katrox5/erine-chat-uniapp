<template>
  <view class="view__body">
    <Header />
    <Main class="view__main" />
    <Footer />
  </view>
</template>

<script setup>
  import Header from './components/header'
  import Main from './components/main'
  import Footer from './components/footer'
</script>

<style scoped>
  .view__body {
    height: 100vh;
    background-color: #f3f3f3;
    display: flex;
    flex-direction: column;
  }
  .view__main {
    flex: 1 1 0%;
    overflow-y: hidden;
  }
</style>
