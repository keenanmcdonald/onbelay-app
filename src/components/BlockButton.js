import React from 'react'
import ApiService from '../services/ApiService'
import OBContext from '../OBContext'

class BlockButton extends React.Component{
    static contextType = OBContext

    handleClick(){
        ApiService.blockUser(this.context.user.id, this.props.id)
            .then(() => {
                if (this.props.match.url.includes('discover')){
                    this.props.history.push('/discover')
                }
                else{
                    this.props.history.push('/partners')
                }
            })
    }

    render(){

        return (
            <button className='block-button' onClick={() => this.handleClick()}>Block</button>
        )
    }
}

export default BlockButton