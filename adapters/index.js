import ernieSpeed128k from './ernie-speed-128k'

export const modelList = ['Ernie-Speed-128K']

export const modelAuth = new Map([
  [
    'Ernie-Speed-128K',
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
    'Ernie-Speed-128K',
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

export const modelAdapter = new Map([['Ernie-Speed-128K', ernieSpeed128k]])
