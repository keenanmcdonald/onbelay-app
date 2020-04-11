import React from 'react'
import ApiService from '../services/ApiService'
import OBContext from '../OBContext'
import LetsClimbButton from '../components/LetsClimbButton'
import BlockButton from './BlockButton'
import './Profile.css'


class Profile extends React.Component{
    static contextType = OBContext

    constructor(props){
        super(props)

        this.handlePartnerRequest = this.handlePartnerRequest.bind(this)
    }

    checkPartner(){
        ApiService.isPartner(this.context.user.id, this.props.id)
            .then(isPartner => {
                if (isPartner) {
                    this.props.history.push('/partners')
                    /*ApiService.getContact(this.props.id)
                        .then(() => {
                            this.props.history.push('/partners')
                        })*/
                }
                else{
                    this.setState({state: this.state}) //re render
                }
            })
    }

    handleEditProfile(){
        this.props.history.push('/edit_profile')
    }

    handlePartnerRequest(){
        ApiService.createPartnerRequest(this.context.user.id, this.props.id)
            .then(() => {
                this.checkPartner()
            })
    }

    render(){
        let styles = []
        if (this.props.sport){
            styles.push('sport')
        }
        if (this.props.trad){
            styles.push('trad')
        }

        styles = styles.join('  |  ')
        let content;
        if (this.props.partner){
            content = (            
                <div className='partner-content'>
                    <div className='profile-element'>
                        <label htmlFor='phone'>Phone</label>
                        <p className='phone'>{this.props.phone}</p>
                    </div>
                    <div className='profile-button-container'>
                        <BlockButton id={this.props.id} history={this.props.history} match={this.props.match}/>
                    </div>
                </div>
            )
        }
        else if (this.props.id === this.context.user.id){
            
            content = (
                <div className='self-content'>
                    <div className='profile-element'>
                        <label htmlFor='phone'>phone (visible to your partners)</label>
                        <p>{this.props.phone}</p>
                    </div>
                    <div className='profile-element'>
                        <label htmlFor='seeking'>seeking partners that...</label>
                        <p>{`Climb at least ${this.props.min_grade} and are within ${this.props.radius} miles of ${this.props.address}`}</p>
                    </div>
                    <div className='profile-button-container'>
                        <button className='edit-profile-button' onClick={() => this.handleEditProfile()}>Edit Profile</button>
                        <button className='logout-button' onClick={() => this.context.methods.logout()}>Log out</button>
                    </div>
                </div>
            )
        }
        else {
            content = (
                <div className='match-content'>
                    <div className='profile-button-container'>
                        <LetsClimbButton id={this.props.id} handlePartnerRequest={() => this.handlePartnerRequest()}/>
                        <BlockButton id={this.props.id} history={this.props.history} match={this.props.match}/>
                    </div>
                </div>
            )    
        }

    
        return (
            <div className='user-profile'>
                <div className='photo-container'>
                    <img className='profile-photo' src={this.props.photo_url} alt='user profile'/>
                </div>
                <h1 className='name'>{this.props.name}</h1>
                <div className='profile-element'>
                    <label htmlFor='bio'>about</label>
                    <p className='bio'>{this.props.bio}</p>
                </div>
                <div className='profile-element'>
                    <label htmlFor='styles'>styles</label>
                    <p className='styles'>{styles}</p>

                </div>
                <div className='profile-element'>
                    <label htmlFor='redpoint'>highest redpoint</label>
                    <p className='redpoint'>{this.props.max_grade}</p>
                </div>
                {content}
            </div>
        )    
    }
}

export default Profile