import React from 'react'
import Header from '../components/Header'
import ApiService from '../services/ApiService'
import config from '../config'
import OBContext from '../OBContext'
import {Link} from 'react-router-dom'
import ScaleLoader from 'react-spinners/ScaleLoader'
import FacebookLogin from 'react-facebook-login'
import '../stylesheets/LandingPage.css'

// eslint-disable-next-line
const REGEX_EMAIL_VALIDATION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const REGEX_UPPER_LOWER_NUMBER = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\S]+/


class LandingPage extends React.Component{
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

    responseFacebook = (response) => {
        console.log(response)
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
                if (res.user.name){
                    this.props.history.push('/discover')
                }
                else{
                    this.props.history.push('/edit_profile')
                }
            })
            .catch(error => {
                this.setState({loading: false})
                this.context.methods.showError(error.message)    
            })
    }

    render(){
        return (
            <div className='landing-page'>
                <Header match={this.props.match} pageTitle='' history={this.props.history} displayNav={false} loginLink={true}/>
                <main>
                    <div className='logo-container'>
                        <img className='figure-eight-logo' src={require('../images/figure-eight-logo-black.png')} alt='figure eight logo'/>
                        <h2 className='onbelay-title'>onBelay</h2>
                    </div>
                    <p>onBelay is a web app designed to help climbers find climbing partners and connect with other climbers wherever they are in the world.</p>
                    <form className='login-form'>
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
                                <input name='stay-signed-in' id='stay-signed-in' type='checkbox' onChange={e => this.updateStaySignedIn(e.target.value)}/>
                                <label htmlFor='stay-signed-in' className='stay-signed-in-label'>stay signed in</label>
                            </div>
                        </div>
                        <div className='button-container'>
                            <button 
                                className={`
                                    landing-page-button
                                    ${this.validateEmail() || this.validatePassword() ? 'disabled' : ''}
                                `}
                                type='submit' 
                                onClick={e => this.submitForm(e)}
                                disabled={
                                        this.validateEmail() || 
                                        this.validatePassword()
                                    }
                                
                            >
                                {this.state.loading ? '' : 'Log in'}
                                <ScaleLoader
                                    color={'#272727'}
                                    loading={this.state.loading}
                                />
                            </button>
                        </div>
                    </form>
                    <Link to='/create_account'><button className='landing-page-button'>Sign up</button></Link>
                    <FacebookLogin
                        appId="2463742723728211"
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={this.responseFacebook} />
                </main> 
            </div> 
        )
    }
}

export default LandingPage