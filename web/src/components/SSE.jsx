import { useEffect, useState } from 'react'

function SSE() {
  const [sseSource, setSSESource] = useState(null)
  const [pingList, setPingList] = useState([])

  useEffect(() => {
    window.addEventListener('beforeunload', () => closeConnection())
    return () => {
      window.removeEventListener('beforeunload', () => closeConnection())
      closeConnection()
    }
  }, [])

  const closeConnection = () => {
    if (sseSource) {
      sseSource.close()
      setSSESource(null)
      setPingList(['已断开连接，等待重新连接...'])
    } else {
      alert('当前无连接')
      return
    }
  }

  const createConnection = () => {
    if (!sseSource) {
      const source = new EventSource('http://localhost:3333/sse')
      setSSESource(source)
      source.addEventListener('open', () => {
        console.log('Connection Opened')
        setPingList(['已建立连接，准备传输数据...'])
      })
      source.addEventListener('error', (e) => {
        console.log('Connection Error', e)
      })
      source.addEventListener('ping', (e) => {
        console.log(e)
        setPingList((prev) => [...prev, e.data])
      })
      source.addEventListener('custom', (e) => {
        console.log(e)
      })
    } else {
      alert('建立新连接前请断开当前连接')
    }
  }

  return (
    <div>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => createConnection()}
      >
        建立连接
      </div>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => closeConnection()}
      >
        断开连接
      </div>
      <div style={{ marginTop: '10px' }}>
        {pingList.map((item, index) => (
          <div key={item + index}>{item}</div>
        ))}
      </div>
    </div>
  )
}

export default SSE
