import { io } from 'socket.io-client'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './views/Home/Home';
import NavigationBar from './components/Navigation/NavigationBar';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import Booking from './views/Booking/Booking';
import { withRouter } from "react-router";
import { useState } from 'react'



// const ADDRESS = process.env.REACT_APP_API_URL
// export const socket = io(ADDRESS, { transports: ['websocket'] })

function App() {

  return (
    <Container className="overflow-hidden" fluid>

      <Container className="position-relative p-outside">
        <Router>
          <NavigationBar />
          <Route path="/" exact render={(routerProps) =>
            <Home {...routerProps} />}>
          </Route>
          <Route path="/register" exact render={(routerProps) =>
            <Register {...routerProps} />}>
          </Route>
          <Route path="/login" exact render={(routerProps) =>
            <Login {...routerProps} />}>
          </Route>
          <Route path="/booking" exact render={(routerProps) =>
            <Booking {...routerProps} />}>
          </Route>
        </Router>

      </Container>
    </Container >
  );
}

export default App;
