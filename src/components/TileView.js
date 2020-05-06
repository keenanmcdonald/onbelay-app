import React from 'react'
//import {isMobile} from 'react-device-detect'
import UserCard from '../components/UserCard'
import OBContext from '../OBContext'
import {Link} from 'react-router-dom'

class TileView extends React.Component{
    static contextType = OBContext
    constructor(props){
        super(props)

        this.state = {
            users: []
        }
    }

    componentDidMount(){
        this.props.loadUsers()
            .then(users => {
                this.setState({users})
            })
        /*if (isMobile){
            this.props.history.push(`${this.props.path}/swipe/0`)
        }*/
        
    }

    generateCards(users){
        const userCards = []
        for (let i = 0; i < users.length; i++){
            userCards.push(<UserCard match={this.props.match} history={this.props.history} key={i} index={i} {...users[i]} partner={this.props.partner}/>)
        }
        return userCards
    }

    render(){
        const userCards = this.generateCards(this.state.users)
        let noMatchMessage = ''
        if (this.props.partner){
            noMatchMessage = <p className='no-matches-message'>You don't seem to have any partners, go to the <Link to='/discover'>discover page</Link> and request some partners.</p>
        }
        else{
            noMatchMessage = <p className='no-matches-message'>You don't seem to have any matches. Try adjusting your search criteria from the <Link to='/edit_profile'>edit profile page</Link>.</p>
        }

        return(
            <div className='tile-view-container'>
                {userCards.length ? userCards : (
                    <div className='no-matches-message-container'>
                        {noMatchMessage}
                    </div>
                )}
            </div>
        )
    }
}

export default TileView