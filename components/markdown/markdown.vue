<template>
  <view style="position: relative; min-height: 1rem;">
    <rich-text space="nbsp" :nodes="parseNodes(source)" />
    <view v-if="isLoading" class="cursor"> &nbsp; </view>
  </view>
</template>

<script setup>
  import MarkdownIt from './lib/markdown-it.min.js'
  import hljs from './lib/highlight/uni-highlight.min.js'
  import './lib/highlight/atom-one-dark.css'

  const props = defineProps({
    source: String,
    isLoading: Boolean,
  })

  const markdown = MarkdownIt({
    html: true,
    highlight: function (code, lang) {
      let preCode = ''
      try {
        preCode = hljs.highlightAuto(code).value
      } catch {
        preCode = markdown.utils.escapeHtml(code)
      }
      const lines = preCode.split(/\n/).slice(0, -1)
      const html = lines.map((line) => (line ? '<div>' + line + '</div>' : '')).join('')

      let htmlCode = '<div style="position:relative">'
      htmlCode += `<div style="position:absolute;right:2px;font-size:12px;color:#aaa;">${lang}</div>`
      htmlCode += `<pre class="hljs" style="padding:12px 8px 8px;overflow-x:auto;display:block;border-radius:5px;"><code>${html}</code></pre>`
      htmlCode += '</div>'
      return htmlCode
    },
  })
  const parseNodes = (value) => {
    if (!value) return
    // 解析<br />到\n
    value = value.replace(/<br>|<br\/>|<br \/>/g, '\n')
    value = value.replace(/&nbsp;/g, ' ')
    let htmlString = ''
    if (value.split('```').length % 2) {
      let mdtext = value
      if (mdtext[mdtext.length - 1] != '\n') {
        mdtext += '\n'
      }
      htmlString = markdown.render(mdtext)
    } else {
      htmlString = markdown.render(value)
    }

    return htmlString
  }
</script>

<style scoped>
  @keyframes blink-cursor {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: #fff;
    }
  }
  .cursor {
    position: absolute;
    right: 0;
    bottom: 0;
    border-right: 0.35rem solid;
    animation: blink-cursor 1s step-end infinite;
    mix-blend-mode: difference;
  }
</style>
