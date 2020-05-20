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
            activePartner: {index: 0, id: undefined},
            messages: [],
            conversation: [],
        }

        this.sendMessage = this.sendMessage.bind(this)
    }
    componentDidMount(){
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
        ApiService.getMessages(this.context.user.id)
            .then(messages => {
                if (messages.length !== this.state.messages.length){
                    console.log(messages[0].from_id, this.state.activePartner.id)
                    this.setState({messages})
                    this.scrollToBottom()
                }
                this.setState({
                    conversation: messages.filter(message => message.from_id === this.state.activePartner.id || message.to_id === this.state.activePartner.id)
                })
            })
    }

    sendMessage(content){
        ApiService.sendMessage(this.context.user.id, this.state.activePartner.id, content)
            .then(() => {
                this.loadMessages()
            })
    }

    loadPartners(){
        this.context.methods.loadPartners()
            .then(partners => {
                this.setState({partners, activePartner: {id: partners[this.state.activePartner.index].id, index: this.state.activePartner.index}})
                this.loadMessages()
            })
    }

    scrollToBottom(){
        this.messagesEnd.scrollIntoView({behavior: "smooth"})
    }

    handleSelectConversation(id){
        const index = this.state.partners.findIndex(partner => partner.id === id)
        this.setState({activePartner: {index, id}})
        this.loadMessages()
    }

    render(){
        const messages = []
        const partners = []

        for (let i = 0; i < this.state.conversation.length; i++){
            messages.push(
                <ChatMessage key={i} fromUser={this.state.conversation[i].from_id === this.context.user.id}{...this.state.conversation[i]}/>
            )
        }

        for (let i = 0; i < this.state.partners.length; i++){
            this.state.messages.reverse()
            const lastMessage = this.state.messages.find(message => message.from_id === this.state.partners[i].id || message.to_id === this.state.partners[i].id)
            this.state.messages.reverse()

            
            partners.push(
                <div className='partner-select' id={this.state.partners[i].id} key={this.state.partners[i].id} onClick={() => this.handleSelectConversation(this.state.partners[i].id)}>
                    <img className='chat-photo partner' src={this.state.partners[i].photo_url} alt='partner'></img>
                    <h3 className='partner-name'>{this.state.partners[i].name}</h3>
                    {lastMessage ? <p className={`last-message ${lastMessage.from_id === this.context.user.id ? 'from' : 'to'}`}>{lastMessage.content}</p> : ''}
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
                        <ChatHeader {...this.state.partners[this.state.activePartner.index]}/>
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