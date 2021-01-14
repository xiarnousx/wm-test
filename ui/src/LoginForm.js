import React, { Component } from 'react';
import { login } from './server/auth';

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    // Init with system default user for Demo purpose.
    // todo: remove values for username and password.
    this.state = {username: 'ramz', password: 'pass', error: false};
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleClick(event) {
    event.preventDefault();
    const {username, password} = this.state;
    login(username, password).then((ok) => {
      if (ok) {
        this.props.onLogin();
      } else {
        this.setState({error: true});
      }
    });
  }

  render() {
    const {username, password, error} = this.state;
    return (
      <form>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" name="username" value={username}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" name="password" value={password}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="field">
          <p className="help is-danger">{error && 'Invalid credentials'}</p>
          <div className="control">
            <button className="button is-link" onClick={this.handleClick.bind(this)}>Login</button>
          </div>
        </div>
      </form>
    );
  }
}