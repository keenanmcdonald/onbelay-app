import React from 'react'
import Profile from '../components/Profile'
import OBContext from '../OBContext'


class SwipeView extends React.Component{
    static contextType = OBContext

    constructor(props){
        super(props)

        this.state = {
            users: [],
            index: parseInt(this.props.match.params.index),
        }
    }

    componentDidMount(){
        this.props.loadUsers()
            .then(users => {
                this.setState({users})
            })
    }

    goRight(){
        if (this.state.index === this.state.users.length - 1){
            this.setState({index: 0})
        }
        else{
            this.setState({index: this.state.index + 1}) 
        }
        this.props.history.push(`${this.props.path}/swipe/${this.state.index}`)

    }

    goLeft(){
        if (this.state.index === 0){
            this.setState({index: this.state.users.length - 1})
        }
        else{
            this.setState({index: this.state.index - 1})
        }
        this.props.history.push(`${this.props.path}/swipe/${this.state.index}`)
    }


    render(){
        return (
            <div className='swipe-flex-container'>
                <button className='left' onClick={()=> this.goLeft()}>
                    <img className='arrow' src={require('../images/arrow-left.png')} alt='left arrow'/>
                </button>
                {this.state.users.length ? <Profile history={this.props.history} match={this.props.match} {...this.state.users[this.state.index]} partner={this.props.partner}/> : ''}
                <button className='right' onClick={()=> this.goRight()}>
                    <img className='arrow' src={require('../images/arrow-right.png')} alt='right arrow'/>
                </button>
            </div>
        )    
    }
}

export default SwipeView