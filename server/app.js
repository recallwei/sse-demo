import express from 'express'

const app = express()
const PORT = 3333

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/sse', async function (req, res) {
  console.log('SSE 推送事件开始!')
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive'
  })
  res.flushHeaders()

  let shouldStop = false

  res.on('close', () => {
    console.log('已停止推送')
    shouldStop = true
    res.end()
  })

  let count = 0

  while (count <= 20 && !shouldStop) {
    await new Promise((resolve) => setTimeout(resolve, 200))
    res.write('retry: 0\n\n')
    res.write(`event: ping\n`)
    res.write(`data: ping ${++count}\n\n`)
    console.log('已发送', '消息类型：ping', count)
    res.write(`event: custom\n`)
    res.write(`data: custom ${count}\n\n`)
    console.log('已发送', '消息类型：custom', count)
  }
})

app.listen(PORT, () => {
  console.log(`正在监听端口： ${PORT}`)
})
