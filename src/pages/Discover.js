import React from 'react'
import {Route} from 'react-router-dom'
//import {isMobile} from 'react-device-detect'
import Header from '../components/Header'
import OBContext from '../OBContext'
import TileView from '../components/TileView'
import SwipeView from '../components/SwipeView'
import '../stylesheets/Discover.css'


class Discover extends React.Component{
    static contextType = OBContext

    componentDidMount(){
        /*if (isMobile){
            this.props.history.push('/discover/swipe/0')
        }*/
    }

    render(){
        return(
            <div className='find-partners-page'>
                <Header clickableTitle={true} match={this.props.match} path='/discover' pageTitle='Discover' history={this.props.history} displayNav={true}/>
                <main className='user-cards'>
                    <Route exact path={'/discover'} render={({match}) => { return (
                        <TileView path='/discover' partner={false} history={this.props.history} match={match} loadUsers={() => this.context.methods.loadMatches()}/>
                    )}}/>
                    <Route path={'/discover/swipe/:index'} render={({match}) => { return (
                        <SwipeView path='/discover' partner={false} history={this.props.history} match={match} loadUsers={() => this.context.methods.loadMatches()}/>
                    )}}/>
                </main>
            </div>
        )
    }
}

export default Discover