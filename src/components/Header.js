import React from 'react'
import './Header.css';
import UserNavButton from './UserNavButton'
import NavButton from './NavButton'
import OBContext from '../OBContext'

class Header extends React.Component{
    static contextType = OBContext

    handleLogoClick(){
        this.props.history.push('/')
    }

    handleTitleClick(){
        if (this.props.path){
            this.props.history.push(this.props.path)
        }
    }

    render(){
        let nav = ''

        if (this.context.user.name  && this.props.displayNav){
            nav = (
                <div>
                    <NavButton title='discover' path='/discover' iconUrl={require('../images/users.png')} imgAlt='partners icon' match={this.props.match} history={this.props.history}/>
                    <NavButton title='partners' path='/partners' iconUrl={require('../images/partners.png')} imgAlt='discover icon' match={this.props.match} history={this.props.history}/>
                    <UserNavButton title='profile' match={this.props.match} history={this.props.history}/>
                </div>
            )
        }

        return (
            <header>
                <div className='logo-container' onClick={() => this.handleLogoClick()}>
                    <img className='figure-eight-logo' src={require('../images/figure-eight-logo.png')} alt='figure eight logo'/>
                    <h1 className='onbelay-title'>onBelay</h1>
                </div>
                <div className='page-title-container'>
                    <h2 className={this.props.clickableTitle ? 'clickable' : ''} onClick={() => this.handleTitleClick()}>{this.props.pageTitle}</h2>
                </div>
                <div className='nav-buttons'>
                    {nav}
                </div>
            </header>
        )
    }
}

export default Header