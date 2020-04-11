import React from 'react'
import './NavButton.css'

class NavButton extends React.Component {

    handleClick(){
        this.props.history.push(this.props.path)
    }

    render(){

        return (
            <div ref={this.dropdown} className='nav-button-container'>
                <button className={`nav-button ${(this.props.match.path === this.props.path) ? 'depressed' : ''}`} onClick={() => this.handleClick()}>
                    <img className='nav-thumbnail' src={this.props.iconUrl} alt={this.props.imgAlt}></img>
                </button>
            </div>
        )
    }
}

export default NavButton