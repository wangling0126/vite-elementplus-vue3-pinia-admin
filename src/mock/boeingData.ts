import Mock from 'mockjs'
export const boeingData = Mock.mock({
  'array|50-100': [
    {
      title: '@ctitle(5, 10)',
      'code|10000-99999': 23567,
      'list|5-20': [
        {
          label: '@ctitle(3, 6)',
          value: '@ctitle(2, 20)'
        }
      ]
    }
  ]
})
