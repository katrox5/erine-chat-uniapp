let token = ''

function getToken(apiKey, secretKey) {
  return new Promise((resolve) => {
    const url =
      'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=%API_KEY%&client_secret=%SECRET_KEY%'
    uni.request({
      url: url.replace('%API_KEY%', apiKey).replace('%SECRET_KEY%', secretKey),
      method: 'POST',
      success(res) {
        resolve(res)
      },
    })
  })
}

async function request({ auth, headers, messenger, success, fail }) {
  if (!token) {
    const res = await getToken(auth.apiKey, auth.secretKey)
    if (res.statusCode === 200) {
      token = res.data.access_token
    } else {
      fail({ status_code: res.statusCode, ...res.data })
      return
    }
  }
  success()
  const { messages, options } = headers
  messenger?.send({
    url: `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/yi_34b_chat?access_token=${token}`,
    method: 'POST',
    body: JSON.stringify({
      stream: true,
      messages: messages.length % 2 ? messages : messages.slice(0, -1),
      ...options,
    }),
  })
}

function* readMessages(messages) {
  for (let i = 0; i < messages.length; i += 2) {
    const prompt = messages[i]
    const answer = messages[i + 1]
    if (
      prompt['role'] != 'user' ||
      !prompt['content'] ||
      answer?.['role'] != 'assistant' ||
      !answer['content']
    ) {
      continue
    }
    yield {
      prompt: prompt['content'],
      answer: answer['content'],
    }
  }
}

export default {
  request,
  readMessages,
}
