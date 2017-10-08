let http = require('http')
let util = require('util')

http.get('http://easy-mock.com/mock/59d02e089cabc90bb5e4fe90/example/list', (res) => {
  let data = ''
  res.on('data', (chunk) => {
    data += chunk
  })
  res.on('end', () => {
    let result = JSON.parse(data)
    console.log(('result: ' + '\n'))
    console.log(util.inspect(result))
    for (let item of result) {
      console.log(('result: ' + item.title))
    }
  })
})
