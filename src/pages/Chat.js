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
            partners: [],
            messages: [],
            other: {},
        }

        this.sendMessage = this.sendMessage.bind(this)
    }
    componentDidMount(){
        this.loadMessages()
        this.getOtherInfo()
        this.scrollToBottom()
        this.loadPartners()
        this.interval = setInterval(() => this.loadMessages(), 5000);
    }

    componentDidUpdate(){
        this.scrollToBottom()
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
      

    loadMessages(){
        ApiService.getMessages(this.context.user.id, this.props.match.params.id)
            .then(messages => {
                if (messages.length !== this.state.messages.length){
                    this.scrollToBottom()
                    this.setState({messages})
                }
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

    loadPartners(){
        this.context.methods.loadPartners()
            .then(partners => {
                console.log('partners: ', partners)
                this.setState({partners})
            })
    }

    scrollToBottom(){
        this.messagesEnd.scrollIntoView({behavior: "smooth"})
    }

    render(){
        const messages = []
        const partners = []

        for (let i = 0; i < this.state.messages.length; i++){
            messages.push(
                <ChatMessage key={i} fromUser={this.state.messages[i].from_id === this.context.user.id}{...this.state.messages[i]}/>
            )
        }

        for (let i = 0; i < this.state.partners.length; i++){
            partners.push(
                <div className='partner-select' id={this.state.partners[i].id} key={this.state.partners[i].id}>
                    <img className='chat-photo partner' src={this.state.partners[i].photo_url} alt='partner'></img>
                    <h3 className='partner-name'>{this.state.partners[i].name}</h3>
                    <p className='last-message'>{}</p> 
                </div>
            )
        }

        return (
            <div className='chat-page'>
                <Header pageTitle='Messages' match={this.props.match} history={this.props.history} displayNav={true} />
                <main className='messages-main'>
                    <div className='sidepanel'>
                        <h2>Partners</h2>
                        <ul>
                            {partners}
                        </ul>
                    </div>
                    <div className='chat-window'>
                        <ChatHeader {...this.state.other}/>
                        <div className='chat-messages'>
                            {messages}
                            <div style={{float:"left", clear: "both"}} ref={(el) => {this.messagesEnd = el}}></div>
                        </div>
                        <ChatInput sendMessage={(content) => this.sendMessage(content)}/>
                    </div>

                </main>
            </div>
        )
    }
}

export default Chat