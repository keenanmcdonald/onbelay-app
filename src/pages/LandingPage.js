import React from 'react'
import Header from '../components/Header'
import {Link} from 'react-router-dom'
import './LandingPage.css'

class LandingPage extends React.Component{
    render(){
        return (
            <div className='landing-page'>
                <Header match={this.props.match} pageTitle='' history={this.props.history} displayNav={false}/>
                <main>
                    <h2>Welcome to onBelay</h2>
                    <p>onBelay is a web app designed to help climbers find climbing partners and connect with other climbers wherever they are in the world.</p>
                    <p>If you're a climber and want to use the app to connect with others. Then <Link className='link' to='/create_account'>create an account</Link></p>
                    <p>Already have an account? <Link className='link' to='/login'>log in</Link></p>
                    <p>If you're simply looking to explore the functionality of the app and want to see an example of the app populated with fake users, log in with the link above using:</p>
                    <p>email: user@onbelayapp.com</p>
                    <p>password: Climbing1</p>
                </main> 
            </div> 
        )
    }
}

export default LandingPage