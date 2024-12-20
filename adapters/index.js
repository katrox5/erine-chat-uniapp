
export const modelList = [
  'Erine-Speed-128K',
]

export const modelAuth = new Map([
  [
    'Erine-Speed-128K',
    [
      {
        key: 'apiKey',
        name: 'API Key',
      },
      {
        key: 'secretKey',
        name: 'Secret Key',
      },
    ]
  ],
])

export const modelOptions = new Map([
  [
    'Erine-Speed-128K',
    [
      {
        key: 'temperature',
        name: '生成温度', 
        type: 'number',
        range: [10, 100, 5, 0],
        default: 0.8,
      },
      {
        key: 'penalty_score',
        name: '重复惩罚',
        type: 'number',
        range: [0, 100, 10, 100],
        default: 1.0,
      },
    ]
  ],
])
