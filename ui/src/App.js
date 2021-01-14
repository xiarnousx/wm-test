import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Home } from './Home';
import { NearbyPartners } from './NearbyPartners';
import { LoginForm } from './LoginForm';
import { isLoggedIn, logout } from './server/auth';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: isLoggedIn()};
    }

    handleLogin() {
        this.setState({loggedIn: true});
        this.router.history.push('/partners/find');
    }

    handleLogout() {
        logout();
        this.setState({loggedIn: false});
        this.router.history.push('/');
    }

    render() {
        const {loggedIn} = this.state;
        return (
            <Router ref={(router) => this.router = router}>
              <div>
                <NavBar loggedIn={loggedIn} onLogout={this.handleLogout.bind(this)} />
                <section className="section">
                  <div className="container">
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/partners/find" component={NearbyPartners} />
                      <Route exact path="/login" render={() => <LoginForm onLogin={this.handleLogin.bind(this)} />} />
                    </Switch>
                  </div>
                </section>
              </div>
            </Router>
          );
    }
}