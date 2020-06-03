import React from 'react'
import ApiService from '../services/ApiService'
import config from '../config'
import Header from '../components/Header'
import OBContext from '../OBContext'
import ScaleLoader from 'react-spinners/ScaleLoader'
import '../stylesheets/LandingPage.css'

// eslint-disable-next-line
const REGEX_EMAIL_VALIDATION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const REGEX_UPPER_LOWER_NUMBER = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\S]+/


class CreateAccount extends React.Component{
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

    validateRepeatPassword(){
        if (!(this.state.repeatPassword.value === this.state.password.value)){
            return 'Passwords do not match'
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
        ApiService.postUser(user, this.context.methods.showError)
            .then(res => {
                if (res){
                    ApiService.loginWithCredentials({email: user.email, password: user.password})
                        .then(res => {
                            window.sessionStorage.setItem(config.TOKEN_KEY, res.authToken)
                            if(this.state.staySignedIn){
                                let expiryDate = new Date()
                                expiryDate.setMonth(expiryDate.getMonth() + 1)
                                window.localStorage.setItem(config.TOKEN_KEY, res.authToken)
                            }
                            this.setState({loading: false})
                            this.context.methods.updateUser(res.user)
                            this.props.history.push('/edit_profile')    
                        })
                }
            })
    }

    render(){
        return (
            <div className='create-account-page'>
                <Header match={this.props.match} pageTitle='Create Account' history={this.props.history} displayNav={false}/>
                <main>
                    <div className='logo-container'>
                        <img className='figure-eight-logo' src={require('../images/figure-eight-logo-black.png')} alt='figure eight logo'/>
                        <h2 className='onbelay-title'>onBelay</h2>
                    </div>
                    <form className='create-account-form'>
                        <div className='form-elements'>
                            <div className='form-element'>
                                <label htmlFor='email'>email</label>
                                <input className='input-block' name='email' id='email' type='text' onChange={e=> this.updateEmail(e.target.value)}/>
                                <p className='validation-error'>{this.state.email.touched ? this.validateEmail() : ''}</p>
                            </div>
                            <div className='form-element'>
                                <label htmlFor='password'>password</label>
                                <input className='input-block' name='password' id='password' type='password' onChange={e => this.updatePassword(e.target.value)}/>
                                <p className='validation-error'>{this.state.password.touched ? this.validatePassword() : ''}</p>

                            </div>
                            <div className='form-element'>
                                <label htmlFor='repeatPassword'>repeat password</label>
                                <input className='input-block' name='repeatPassword' id='repeatPassword' type='password' onChange={e => this.updateRepeatPassword(e.target.value)}/>
                                <p className='validation-error'>{this.state.repeatPassword.touched ? this.validateRepeatPassword() : ''}</p>
                            </div>
                            <div className='form-element'>
                                <input name='staySignedIn' id='stay-signed-in' type='checkbox' onChange={e => this.updateStaySignedIn(e.target.value)}/>
                                <label htmlFor='staySignedIn' className='stay-signed-in-label'>stay signed in</label>
                            </div>
                        </div>
                        <div className='button-container'>
                            <button 
                                className={
                                    this.validateEmail() || this.validatePassword() || this.validateRepeatPassword() ? 'disabled' : ''
                                }
                                id='submit' 
                                type='submit' 
                                onClick={e => this.submitForm(e)}
                                disabled={
                                    this.validateEmail() || 
                                    this.validatePassword() ||
                                    this.validateRepeatPassword()
                                }
                                >
                                    {this.state.loading ? '' : 'Create'}
                                    <ScaleLoader
                                        color={'#272727'}
                                        loading={this.state.loading}
                                    />
                                </button>
                            
                        </div>
                    </form>
                </main>
            </div>
        )
    }
}

export default CreateAccount