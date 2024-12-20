let token = ''

function getToken(apiKey, secretKey) {
  return Promise((resolve) => {
    const url =
      'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=%API_KEY%&client_secret=%SECRET_KEY%'
    uni.request({
      url: url.replace('%API_KEY%', apiKey).replace('%SECRET_KEY%', secretKey),
      method: 'POST',
      success(res) {
        resolve(res.data.access_token)
      },
    })
  })
}

async function request(body, auth) {
  if (!token) {
    token = await getToken(auth.apiKey, auth.secretKey)
  }
  uni.request({
    url: `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-speed-128k?access_token=${token}`,
    method: 'POST',
    enableChunked: true,
    body: JSON.stringify({
      ...body,
      stream: true,
    }),
    success(res) {
      console.log(res.data)
    },
    fail() {
      console.log('fail')
    },
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
  readMessages,
}
