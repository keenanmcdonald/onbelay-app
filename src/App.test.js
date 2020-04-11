import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CreateAccount from './pages/CreateAccount'
import Discover from './pages/Discover'
import Login from './pages/Login'
import MyPartners from './pages/MyPartners'
import UserProfile from './pages/UserProfile'
import BlockButton from './components/BlockButton'
import ErrorMessage from './components/ErrorMessage'
import Header from './components/Header'
import ImageCropper from './components/ImageCropper'
import LetsClimbButton from './components/LetsClimbButton'
import NavButton from './components/NavButton'
import Profile from './components/Profile'
import UserCard from './components/UserCard'
import UserNavButton from './components/UserNavButton'
import OBContext from './OBContext'

it('LandingPage renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <OBContext.Provider value={{
        user: {}
      }}>
        <LandingPage />
      </OBContext.Provider>
    </BrowserRouter>, 
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});

it('CreateAccount renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <OBContext.Provider value={{
        user: {}
      }}>
        <CreateAccount />
      </OBContext.Provider>
    </BrowserRouter>, 
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});

it('Discover page renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <OBContext.Provider value={{
        user: {}
      }}>
        <Discover />
      </OBContext.Provider>
    </BrowserRouter>, 
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});


it('Login page renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <OBContext.Provider value={{
        user: {}
      }}>
        <Login />
      </OBContext.Provider>
    </BrowserRouter>, 
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});

it('MyPartners page renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <OBContext.Provider value={{
        user: {}
      }}>
        <MyPartners />
      </OBContext.Provider>
    </BrowserRouter>, 
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});

it('UserProfile page renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <OBContext.Provider value={{
        user: {}
      }}>
        <UserProfile />
      </OBContext.Provider>
    </BrowserRouter>, 
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});

it('BlockButton component renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <OBContext.Provider value={{
        user: {}
      }}>
        <BlockButton />
      </OBContext.Provider>
    </BrowserRouter>, 
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});

it('Error Message component renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <OBContext.Provider value={{
        user: {}
      }}>
        <ErrorMessage />
      </OBContext.Provider>
    </BrowserRouter>, 
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});

it('Header component renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <OBContext.Provider value={{
        user: {}
      }}>
        <Header />
      </OBContext.Provider>
    </BrowserRouter>, 
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});

it('ImageCropper component renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <OBContext.Provider value={{
        user: {}
      }}>
        <ImageCropper />
      </OBContext.Provider>
    </BrowserRouter>, 
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});

it('LetsClimbButton component renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <OBContext.Provider value={{
        user: {}
      }}>
        <LetsClimbButton />
      </OBContext.Provider>
    </BrowserRouter>, 
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});

it('NavButton component renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <OBContext.Provider value={{
        user: {}
      }}>
        <NavButton match={{path: ''}}/>
      </OBContext.Provider>
    </BrowserRouter>, 
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});

it('Profile component renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <OBContext.Provider value={{
        user: {}
      }}>
        <Profile />
      </OBContext.Provider>
    </BrowserRouter>, 
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});

it('UserCard component renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <OBContext.Provider value={{
        user: {}
      }}>
        <UserCard />
      </OBContext.Provider>
    </BrowserRouter>, 
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});

it('UserNavButton component renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <OBContext.Provider value={{
        user: {}
      }}>
        <UserNavButton match={{url: ''}}/>
      </OBContext.Provider>
    </BrowserRouter>, 
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});
