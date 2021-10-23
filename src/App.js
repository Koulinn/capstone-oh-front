import { io } from 'socket.io-client'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './views/Home/Home';
import NavigationBar from './components/Navigation/NavigationBar';


const ADDRESS = process.env.REACT_APP_API_URL
export const socket = io(ADDRESS, { transports: ['websocket'] })


function App() {

  return (
    < >
    <Router>
      <NavigationBar/>
      <Route path="/" exact render={(routerProps) =>
              <Home {...routerProps} />}>
        </Route>
    </Router>
    
    </>
  );
}

export default App;
