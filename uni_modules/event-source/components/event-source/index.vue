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
  import { fetchEventSource } from "../../node_modules/@microsoft/fetch-event-source"

  export default {
  	methods: {
      handleRequest(request = {}) {
        if (!Object.keys(request).length) {
          return
        }
        const { url } = request;
        if (!url) {
          return this.handleEmitData({
            type: "warn",
            msg: "URL cannot be empty.",
          })
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
          return this.handleEmitData({
            type: "warn",
            msg: "The current device does not support EventSource.",
          })
        }
        const { url, ...headers } = request
        fetchEventSource(url, {
          ...headers,
          onopen() {
            that.handleEmitData({ type: "onopen" })
          },
          onmessage(res) {
            that.handleEmitData({ type: "onmessage", data: res.data })
          },
          onclose() {
            that.handleEmitData({ type: "onclose" })
          },
          onerror(error) {
            that.handleEmitData({ type: "onerror", data: JSON.stringify(error) })
          }
        })
  		}
  	}
  }
</script>
