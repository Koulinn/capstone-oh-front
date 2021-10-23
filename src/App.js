import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom';


const ADDRESS = process.env.REACT_APP_API_URL
export const socket = io(ADDRESS, { transports: ['websocket'] })


function App() {

  return (
    <div >
    <h1>APP</h1>
    
    </div>
  );
}

export default App;
