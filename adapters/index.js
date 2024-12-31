import ernie35128k from './ernie-3.5-128k'
import yi34bChat from './yi-34b-chat'

export const modelList = ['ERNIE-3.5-128K', 'Yi-34B-Chat']

export const modelAuth = new Map([
  [
    'ERNIE-3.5-128K',
    [
      {
        key: 'apiKey',
        name: 'API Key',
      },
      {
        key: 'secretKey',
        name: 'Secret Key',
      },
    ],
  ],
  [
    'Yi-34B-Chat',
    [
      {
        key: 'apiKey',
        name: 'API Key',
      },
      {
        key: 'secretKey',
        name: 'Secret Key',
      },
    ],
  ],
])

export const modelOptions = new Map([
  [
    'ERNIE-3.5-128K',
    [
      {
        key: 'temperature',
        name: '生成温度',
        type: 'number',
        range: [10, 100, 5],
        default: 0.8,
      },
      {
        key: 'penalty_score',
        name: '重复惩罚',
        type: 'number',
        range: [100, 200, 10],
        default: 1.0,
      },
    ],
  ],
  [
    'Yi-34B-Chat',
    [
      {
        key: 'temperature',
        name: '生成温度',
        type: 'number',
        range: [10, 100, 5],
        default: 0.8,
      },
      {
        key: 'penalty_score',
        name: '重复惩罚',
        type: 'number',
        range: [100, 200, 10],
        default: 1.0,
      },
    ],
  ],
])

export const modelAdapter = new Map([
  ['ERNIE-3.5-128K', ernie35128k],
  ['Yi-34B-Chat', yi34bChat],
])
