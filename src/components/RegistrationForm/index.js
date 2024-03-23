import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    username: '',
    lastname: '',
    usernameError: '',
    lastnameError: '',
    submitError: false,
    success: false,
  }

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastname: event.target.value})
  }

  validateForm = () => {
    const {username, lastname} = this.state
    let usernameError = ''
    let lastnameError = ''

    if (!username && !lastname) {
      usernameError = 'Required'
      lastnameError = 'Required'
    } else if (!username) {
      usernameError = 'Required'
    } else if (!lastname) {
      lastnameError = 'Required'
    }

    this.setState({usernameError, lastnameError})

    return !usernameError && !lastnameError
  }

  handleBlur = (fieldName, value) => {
    if (!value.trim()) {
      this.setState({[`${fieldName}Error`]: 'Required'})
    } else {
      this.setState({[`${fieldName}Error`]: ''})
    }
  }

  submitForm = event => {
    event.preventDefault()
    const isValid = this.validateForm()

    if (isValid) {
      // Clear any previous error messages
      this.setState({submitError: false, usernameError: '', lastnameError: ''})

      // Mock API call or any other logic to handle successful submission
      setTimeout(() => {
        this.setState({success: true})
      }, 1000)
    } else {
      // Display error message for incomplete fields
      this.setState({submitError: true})
    }
  }

  resetForm = () => {
    this.setState({
      username: '',
      lastname: '',
      usernameError: '',
      lastnameError: '',
      submitError: false,
      success: false,
    })
  }

  renderForm = () => {
    const {username, lastname, usernameError, lastnameError} = this.state

    return (
      <form onSubmit={this.submitForm}>
        <div>
          <label htmlFor="userName">FIRST NAME</label>
          <input
            type="text"
            id="userName"
            value={username}
            placeholder="FIRST NAME"
            onChange={this.onChangeName}
            onBlur={() => this.handleBlur('username', username)}
          />
          <p>{usernameError}</p>
        </div>
        <div>
          <label htmlFor="lastname">LAST NAME</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            placeholder="LAST NAME"
            onChange={this.onChangeLastName}
            onBlur={() => this.handleBlur('lastname', lastname)}
          />
          <p>{lastnameError}</p>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }

  renderSuccessView = () => (
    <div className="success-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
      />
      <h1>Submitted Successfully</h1>
      <button type="submit" onClick={this.resetForm}>
        Submit Another Response
      </button>
    </div>
  )

  render() {
    const {submitError, success} = this.state

    return (
      <div>
        <h1>Registration</h1>
        {success ? this.renderSuccessView() : this.renderForm()}
      </div>
    )
  }
}

export default RegistrationForm
