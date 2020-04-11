import React from 'react'
//import {isMobile} from 'react-device-detect'
import UserCard from '../components/UserCard'
import OBContext from '../OBContext'

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

        return(
            <div className='tile-view-container'>
                {userCards}
            </div>
        )
    }
}

export default TileView