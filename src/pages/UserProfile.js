import React from 'react'
import Header from '../components/Header'
import Profile from '../components/Profile'
import OBContext from '../OBContext'


class UserProfile extends React.Component{
    static contextType = OBContext;

    render(){
    
        return (
            <div className='user-profile-page'>
                <Header match={this.props.match} pageTitle='Profile' history={this.props.history} displayNav={true}/>
                <main>
                    <Profile history={this.props.history} match={this.props.match} {...this.context.user} partner={false}/>
                </main>
            </div>
        )    
    }
}

export default UserProfile