import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import {AuthProvider} from './context/auth'
import AuthRoute from './utils/AuthRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar/>
          <Route exact path='/' component={Home}></Route>
          <AuthRoute exact path='/login' component={Login}></AuthRoute>
          <AuthRoute exact path='/register' component={Register}></AuthRoute>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
