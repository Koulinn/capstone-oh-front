import { io } from 'socket.io-client'
import { useEffect } from 'react'

const ADDRESS = process.env.REACT_APP_API_URL
export const socket = io(ADDRESS, { transports: ['websocket'] })

function App() {
  useEffect(() => {
    socket.on('connect', () => {
        console.log('Socket Connection established!')
    })

}, [])
  return (
    <div >
    <h1>APP</h1>
    </div>
  );
}

export default App;
