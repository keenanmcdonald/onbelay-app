import React from 'react'
import ApiService from '../services/ApiService'
import OBContext from '../OBContext'

class LetsClimbButton extends React.Component{
    static contextType = OBContext

    constructor(props){
        super(props)

        this.state = {
            mode: 'standard'
        }
    }

    checkStatus(){
        ApiService.hasRequested(this.context.user.id, this.props.id)
            .then(hasRequested => {
                if (hasRequested){
                    if (this.state.mode !== 'requested'){
                        this.setState({mode: 'requested'})
                    }
                }
                else if (this.state.mode !== 'standard'){
                    this.setState({mode: 'standard'})
                }
            })
    }

    render(){
        this.checkStatus()

        let className = ''
        let text = '' 
        if (this.state.mode === 'standard'){
            className = 'lets-climb'
            text = `Let's Climb!`
        }
        else if (this.state.mode === 'requested'){
            className = 'requested depressed'
            text = 'Requested'
        }

        return (
            <button className={className} onClick={() => this.props.handlePartnerRequest()}>{text}</button>
        )
    }
}

export default LetsClimbButton