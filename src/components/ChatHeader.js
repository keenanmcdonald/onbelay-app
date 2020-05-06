import React from 'react'

function ChatHeader(props){
    const imageUrl = props.photo_url

    return (
        <div className='chat-header'>
            <img className='chat-photo' src={imageUrl} alt='other user'></img>
            <h3 className='name'>{props.name}</h3>
        </div>
    )
}

export default ChatHeader