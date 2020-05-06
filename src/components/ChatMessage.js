import React from 'react'

function ChatMessage(props){
    return (
        <div className={`chat-message-container ${props.fromUser ? 'user' : 'other'}`}>
            <div className={`chat-message ${props.fromUser ? 'user' : 'other'}`}>
                <p className='chat-message-text'>{props.content}</p>
            </div>
        </div>
    )
}

export default ChatMessage