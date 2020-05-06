import React from 'react'
import ChatMessage from '../components/ChatMessage'
//import ChatInput from '../components/ChatInput'
import ApiService from '../services/ApiService'
import OBContext from '../OBContext'
import Header from '../components/Header'
import ChatHeader from '../components/ChatHeader'
import ChatInput from '../components/ChatInput'
import './Chat.css'

class Chat extends React.Component{
    static contextType = OBContext

    constructor(props){
        super(props)

        this.state = {
            messages: [],
            other: {}
        }

        this.sendMessage = this.sendMessage.bind(this)
    }
    componentDidMount(){
        this.loadMessages()
        this.getOtherInfo()
    }

    loadMessages(){
        ApiService.getMessages(this.context.user.id, this.props.match.params.id)
            .then(messages => {
                this.setState({messages})
            })
    }

    getOtherInfo(){
        ApiService.getUser(this.props.match.params.id)
            .then(user => {
                this.setState({other: user})
            })
    }

    sendMessage(content){
        ApiService.sendMessage(this.context.user.id, this.props.match.params.id, content)
            .then(() => {
                this.loadMessages()
            })
    }

    render(){
        const messages = []

        for (let i = 0; i < this.state.messages.length; i++){
            messages.push(
                <ChatMessage key={i} fromUser={this.state.messages[i].from_id === this.context.user.id}{...this.state.messages[i]}/>
            )
        }
        return (
            <div className='chat-page'>
                <Header pageTitle='Messages' match={this.props.match} history={this.props.history} displayNav={true} />
                <div className='chat-window'>
                    <ChatHeader {...this.state.other}/>
                    <div className='chat-messages'>
                        {messages}
                    </div>
                    <ChatInput sendMessage={(content) => this.sendMessage(content)}/>
                </div>
            </div>
        )
    }
}

export default Chat