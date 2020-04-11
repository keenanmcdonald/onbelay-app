import React from 'react'
import OBContext from '../OBContext'
import './NavButton.css'

class UserNavButton extends React.Component {
    static contextType = OBContext

    handleViewProfile(){
        this.props.history.push(`/user_profile/${this.context.user.id}`)
    }
    render(){
        const imageUrl = this.context.user.photo_url

        return (
            <div className='nav-button-container'>
                <button className={`nav-button user-nav-button ${(this.props.match.url === `/user_profile/${this.context.user.id}` || (this.props.match.path === '/edit_profile')) ? 'depressed' : ''}`} onClick={() => this.handleViewProfile()}>
                    <img className='user-thumbnail' src={imageUrl} alt='button with profile thumbail'></img>
                </button>
            </div>
        )
    }
}

export default UserNavButton