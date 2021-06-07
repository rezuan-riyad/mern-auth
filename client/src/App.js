import React from 'react'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import './App.css'
import FormLayout from './components/FormLayout'
import { Container } from 'react-bootstrap'
import './scss/custom.scss'
import { UserProvider } from './components/contexts/UserContext'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateComponent from './components/PrivateComponent'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          <Route exact path="/">
            <PrivateComponent>
              <Dashboard />
            </PrivateComponent>
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <UserProvider>
              <FormLayout>
                <Container>
                  <Register />
                </Container>
              </FormLayout>
            </UserProvider>
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
