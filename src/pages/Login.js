import React from 'react'
import ApiService from '../services/ApiService'
import config from '../config'
import Header from '../components/Header'
import OBContext from '../OBContext'
import ScaleLoader from 'react-spinners/ScaleLoader'

import './Login.css'

// eslint-disable-next-line
const REGEX_EMAIL_VALIDATION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const REGEX_UPPER_LOWER_NUMBER = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\S]+/



class Login extends React.Component{
    static contextType = OBContext

    constructor(props){
        super(props)
        this.state = {
            email: {
                value: '',
                touched: false
            },
            password: {
                value: '',
                touched: false,
            },
            repeatPassword: {
                value: '',
                touched: false,
            },
            error: '',
            loading: false,
        }
    }

    updateEmail(email) {
        this.setState({email: {value: email, touched: true}})
    }
    updatePassword(password) {
        this.setState({password: {value: password, touched: true}})
    }
    updateRepeatPassword(repeatPassword) {
        this.setState({repeatPassword: {value: repeatPassword, touched: true}})
    }
    updateStaySignedIn(staySignedIn){
        this.setState({staySignedIn})
    }

    validatePassword(){
        const password = this.state.password.value

        if (password.length < 8) {
            return 'Password must be longer than 8 characters'
        }
        if (password.length > 72) {
            return 'Password must be less than 72 characters'
        }
        if (!REGEX_UPPER_LOWER_NUMBER.test(password)) {
            return 'Password must contain at least one 1 upper case, lower case and number'
        }
        return null
    }

    validateEmail(){
        const email = this.state.email.value
        if (!(REGEX_EMAIL_VALIDATION.test(email))){
            return 'must enter valid email'
        }
    }



    submitForm(e){
        e.preventDefault()

        const user = {
            email: this.state.email.value,
            password: this.state.password.value
        }
        this.setState({loading: true})
        ApiService.loginWithCredentials(user, this.context.methods.showError)
            .then(res => {
                window.localStorage.removeItem(config.TOKEN_KEY)
                window.sessionStorage.setItem(config.TOKEN_KEY, res.authToken)
                if(this.state.staySignedIn){
                    let expiryDate = new Date()
                    expiryDate.setMonth(expiryDate.getMonth() + 1)
                    window.localStorage.setItem(config.TOKEN_KEY, res.authToken)
                }
                this.setState({loading: false})
                this.context.methods.updateUser(res.user)
                this.props.history.push('/discover')
            })
            .catch(error => {
                this.setState({loading: false})
                this.context.methods.showError(error.message)    
            })
    }
    render(){
        return (
            <div className='login-page'>
                <Header pageTitle='Log In' match={this.props.match} history={this.props.history} displayNav={false}/>
                <form className='login-form'>
                    <div className='form-elements'>
                        <div className='form-element'>
                            <label htmlFor='email'>email</label>
                            <input className='input' name='email' id='email' type='text' onChange={e=> this.updateEmail(e.target.value)}/>
                            <p className='validation-error'>{this.state.email.touched ? this.validateEmail() : ''}</p>
                        </div>
                        <div className='form-element'>
                            <label htmlFor='password'>password</label>
                            <input className='input' name='password' id='password' type='password' onChange={e => this.updatePassword(e.target.value)}/>
                            <p className='validation-error'>{this.state.password.touched ? this.validatePassword() : ''}</p>
                        </div>
                        <div className='form-element'>
                            <input name='stay-signed-in' id='stay-signed-in' type='checkbox' onChange={e => this.updateStaySignedIn(e.target.value)}/>
                            <label htmlFor='stay-signed-in' className='stay-signed-in-label'>stay signed in</label>
                        </div>
                    </div>
                    <div className='button-container'>
                        <button 
                            id='submit' 
                            type='submit' 
                            onClick={e => this.submitForm(e)}
                            disabled={
                                    this.validateEmail() || 
                                    this.validatePassword()
                                }
                        >
                            Log In
                        </button>
                        <ScaleLoader
                            color={'#65EBA4'}
                            loading={this.state.loading}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default Login