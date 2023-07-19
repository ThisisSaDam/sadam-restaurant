
import React,{ Component } from 'react'
  
class Form extends Component{
  constructor(props){
    super(props)
    this.state = { email:'',password:''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  // Form submitting logic, prevent default page refresh 
  async handleSubmit(event){
    event.preventDefault()
    const { email, password } = this.state;
    const response = await fetch('https://puce-frightened-camel.cyclic.app/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password,
      })
    })

    const data = await response.json()
    const { message } = data
    if (message === 'error') alert('Đăng ký thất cmm bại!')
    else alert('Ngon!!!')
  }
  
  // Method causes to store all the values of the 
  // input field in react state single method handle 
  // input changes of all the input field using ES6 
  // javascript feature computed property names
  handleChange(event){
    this.setState({
      // Computed property names
      // keys of the objects are computed dynamically
      [event.target.name] : event.target.value
    })
  }
  
  // Return a controlled form i.e. values of the 
  // input field not stored in DOM values are exist 
  // in react component itself as state
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='email'>Email:</label>
            <input 
              name='email'
              placeholder='email' 
              value = {this.state.email}
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
            <button>Create Account</button>
          </div>
        </form>
    )
  }
}
  
export default Form;