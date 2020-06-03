import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import OBContext from './OBContext'
import LandingPage from './pages/LandingPage'
import CreateAccount from './pages/CreateAccount'
import EditProfile from './pages/EditProfile'
import Discover from './pages/Discover'
import MyPartners from './pages/MyPartners'
import UserProfile from './pages/UserProfile'
import ErrorMessage from './components/ErrorMessage'
import config from './config'
import './stylesheets/App.css';
import ApiService from './services/ApiService'

class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      user: {},
      gmapsLoaded: false,
      content: (
        <main></main>
      ),
      error: {
        hidden: true,
        message: '',
        dismissError: this.dismissError()
      }
    }

    this.updateUser = this.updateUser.bind(this)
    this.loadMatches = this.loadMatches.bind(this)
    this.loadPartners = this.loadPartners.bind(this)
    this.logout = this.logout.bind(this)
    this.dismissError = this.dismissError.bind(this)
    this.showError = this.showError.bind(this)
  }

  initMap = () => {
    this.setState({
      gmapsLoaded: true,
    })
  }

  componentDidMount(){
    window.initMap = this.initMap
    const gmapScriptEl = document.createElement(`script`)
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&callback=initMap`
    document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
  
    //keep-me-logged-in handling
    let authToken
    if (window.localStorage.getItem(config.TOKEN_KEY)){
      authToken = window.localStorage.getItem(config.TOKEN_KEY)
    }
    else if (window.sessionStorage.getItem(config.TOKEN_KEY)){
      authToken = window.sessionStorage.getItem(config.TOKEN_KEY)
    }

    if (authToken){
      window.sessionStorage.setItem(config.TOKEN_KEY, authToken)
      ApiService.loginWithToken(this.showError)
        .then(user => {
          this.updateUser(user)
        })
      }
  }

  noScroll() {
    window.scrollTo(0, 0);
  }

  updateUser(user){
    this.setState({user: {...user}})
  }

  showError(message){
    this.setState({error: {
      message,
      hidden: false,
    }})
    // add listener to disable scroll
    window.addEventListener('scroll', this.noScroll);
  }

  dismissError(){
    this.setState({error: {
      message: '',
      hidden: true
    }})

    // Remove listener to re-enable scroll
    window.removeEventListener('scroll', this.noScroll);
  }

  logout(){
    this.setState({user: {}})
    window.localStorage.removeItem(config.TOKEN_KEY)
    window.sessionStorage.removeItem(config.TOKEN_KEY)
    this.props.history.push('/')
  }

  loadMatches(){
    return ApiService.getMatches(this.state.user.id)
        .then(matches => {
            this.setState({matches: matches})
            return matches
        })
  }

  loadPartners(){
    return ApiService.getPartners(this.state.user.id)
        .then(res => {
            this.setState({partners: res})
            return res
        })
  }

  render(){
    const contextValue = {
      ...this.state,
      methods: {
        loadMatches: this.loadMatches,
        loadPartners: this.loadPartners,
        updateUser: this.updateUser,
        logout: this.logout,
        showError: this.showError,
      }
    }

    let content;

    if (this.state.user.name){
      content = (
        <Switch>
          <Route exact path='/'>
            <Redirect to='/discover' />
          </Route>
          <Route path='/create_account' component={CreateAccount}/>
          <Route path='/discover' component={Discover}/>
          <Route path='/partners' component={MyPartners}/>
          <Route path='/edit_profile' component={EditProfile}/>
          <Route path='/user_profile/:user_id' component={UserProfile}/>
          <Route path='/login' component={LandingPage}/>
          <Redirect from='*' to='/'/>
        </Switch>
      )
    }
    else if (this.state.user.email){
      content = (
        <Switch>
          <Route exact path='/'>
            <Redirect to='/login' />
          </Route>
          <Route path='/create_account' component={CreateAccount}/>
          <Route path='/edit_profile' component={EditProfile}/>
          <Route path='/login' component={LandingPage}/>
          <Redirect from='*' to='/'/>
        </Switch>
      )
    }
    else{
      content = (
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/login' component={LandingPage}/>
          <Route path='/create_account' component={CreateAccount}/>
          <Redirect from='*' to='/'/>
        </Switch>
      )
    }



    return (
      <div className="App">
        {this.state.gmapsLoaded && (
          <OBContext.Provider value={contextValue}>
            <ErrorMessage {...this.state.error} onClick={() => this.dismissError()}/>
            {content}
          </OBContext.Provider>
        )}
      </div>
    )
  }
}

export default App;
