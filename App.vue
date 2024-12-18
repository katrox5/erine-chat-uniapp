<script>
  export default {
    // #ifdef APP-ANDROID
    onLastPageBackPress: function () {
      if (firstBackTime == 0) {
        uni.showToast({
          title: '再按一次退出应用',
          position: 'bottom',
        })
        firstBackTime = Date.now()
        setTimeout(() => {
          firstBackTime = 0
        }, 2000)
      } else if (Date.now() - firstBackTime < 2000) {
        firstBackTime = Date.now()
        uni.exit()
      }
    },
    // #endif
  }
</script>

<style>
  
</style>
