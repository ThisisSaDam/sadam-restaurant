
import React, { Component } from 'react'
import { Context } from '../context'
import { Navigate } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Form submitting logic, prevent default page refresh 
  async handleSubmit(event) {
    event.preventDefault()
    const { email, password } = this.state;
    const response = await fetch('http://localhost:3003/api/login', {
      method: 'POST',
      body: JSON.stringify({ username: email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    const { message, token, role } = data;
    if (message === 'error') alert(message)
    else {
      const {updateToken, updateRole} = this.context
      updateToken(token)
      updateRole(role)

      document.cookie = `token=${token}`
      document.cookie = `role=${role}`
    }
  }

  // Method causes to store all the values of the 
  // input field in react state single method handle 
  // input changes of all the input field using ES6 
  // javascript feature computed property names
  handleChange(event) {
    this.setState({
      // Computed property names
      // keys of the objects are computed dynamically
      [event.target.name]: event.target.value
    })
  }

  // Return a controlled form i.e. values of the 
  // input field not stored in DOM values are exist 
  // in react component itself as state
  render() {
    return (
      <Context.Consumer>
        {({token, role}) => {
          if (!token) {
            return (
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label htmlFor='email'>Email:</label>
                  <input
                    name='email'
                    placeholder='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='password'>Password:</label>
                  <input
                    name='password'
                    placeholder='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <button>Log in</button>
                </div>
              </form>
            )
          } else {
            switch (role) {
              case 'ADMIN': return <Navigate to={'/admin'} />;
              default: return <Navigate to={'/'} />
            }
          }}
        }
      </Context.Consumer>
    )
  }
}

Login.contextType = Context
export default Login;