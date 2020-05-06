import React from 'react'

function ChatInput(props){

    function handleSubmit(e){
        e.preventDefault()
        props.sendMessage(e.target.input.value)
    }

    return (
        <div className='chat-input-container'>
            <form className='chat-input-form' onSubmit={e => handleSubmit(e)}>
                <input name='input' className='chat-input'></input>
                <button className='chat-send' type='submit'>Send</button>
            </form>
        </div>
    )
}

export default ChatInput