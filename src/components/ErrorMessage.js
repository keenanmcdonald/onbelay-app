import React from 'react'

function ErrorMessage(props){
    return (
        <div className={`error-overlay ${props.hidden ? 'hidden' : ''}`}>
            <div className={`error-container ${props.hidden ? 'hidden' : ''}`}>
                <p>Something went wrong:</p>
                <p className='error'>{props.message}</p>
                <button className='error-dismiss-button' onClick={() => props.onClick()}>Ok</button>
            </div>
        </div>
    )
}

export default ErrorMessage