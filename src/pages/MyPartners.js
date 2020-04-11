import React from 'react'
import {Route} from 'react-router-dom'
//import {isMobile} from 'react-device-detect'
import Header from '../components/Header'
import TileView from '../components/TileView'
import SwipeView from '../components/SwipeView'
import OBContext from '../OBContext'

class MyPartners extends React.Component{
    static contextType = OBContext

    componentDidMount(){
        /*if (isMobile){
            this.props.history.push('/partners/swipe/0')
        }*/
    }

    render(){
        return(
            <div className='view-partners-page'>
                <Header clickableTitle={true} match={this.props.match} path='/partners' pageTitle='My Partners' history={this.props.history} displayNav={true}/>
                <main className='user-cards'>
                <Route exact path={'/partners'} render={({match}) => { return (
                        <TileView path='/partners' partner={true} history={this.props.history} match={match} loadUsers={() => this.context.methods.loadPartners()}/>
                    )}}/>
                <Route path={'/partners/swipe/:index'} render={({match}) => { return (
                    <SwipeView path='/partners' partner={true} history={this.props.history} match={match} loadUsers={() => this.context.methods.loadPartners()}/>
                )}}/>
                </main>
            </div>
        )
    }
}

export default MyPartners