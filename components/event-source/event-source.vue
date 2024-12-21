<template>
  <view
    v-show="false"
    id="event-source"
    :props="request"
    :change:props="eventSource.handleRequest"
  />
</template>

<script>
  export default {
    data() {
      return {
        request: {},
      }
    },
    methods: {
      send(request) {
        this.request = request
      },
      emits(resp) {
        this.$emit('response', { ...resp })
      },
    },
  }
</script>

<script module="eventSource" lang="renderjs">
  import { fetchEventSource } from './lib/fetch-event-source/index'

  export default {
  	methods: {
      handleRequest(request = {}) {
        if (!Object.keys(request).length) {
          return
        }
        const { url } = request;
        if (!url) {
          // #ifdef H5
          console.log('[warn] URL cannot be empty.')
          // #endif
          return
        }
        this.handleSSE(request)
      },
  		handleEmitData(data = {}) {
  			this.$ownerInstance.callMethod('emits', data);
  		},
  		handleSSE(request = {}) {
        const that = this
        // 检查浏览器是否支持SSE
  			if (!('EventSource' in window)) {
          // #ifdef H5
          console.log('[warn] The current device does not support EventSource.')
          // #endif
          return
        }
        const { url, ...headers } = request
        fetchEventSource(url, {
          ...headers,
          onopen() {
            that.handleEmitData({ event: 'open' })
          },
          onmessage(res) {
            that.handleEmitData({ event: 'message', data: res.data })
          },
          onclose() {
            that.handleEmitData({ event: 'close' })
          },
          onerror(error) {
            that.handleEmitData({ event: 'error', data: JSON.stringify(error) })
          }
        })
  		}
  	}
  }
</script>
