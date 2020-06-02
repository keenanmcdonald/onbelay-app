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
                    <Link className='link' to='/create_account'>create an account</Link>
                    <Link className='link' to='/login'>log in</Link>
                </main> 
            </div> 
        )
    }
}

export default LandingPage