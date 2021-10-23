import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/store'
import { persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import {Container} from 'react-bootstrap'


ReactDOM.render(
  
  <Provider store={store}>
  <PersistGate persistor={persistor}>
    <Container className="overflow-hidden p-outside" fluid>
      <App />
    </Container>
  </PersistGate>
</Provider>
  ,
  document.getElementById('root')
);

