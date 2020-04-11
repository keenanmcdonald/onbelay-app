import React from 'react'
import './UserCard.css'

function UserCard(props){
    let styles = []
    if (props.sport){
        styles.push('sport')
    }
    if (props.trad){
        styles.push('trad')
    }

    styles = styles.join('  |  ')

    function handleClick(){
        if (props.match.path === '/partners'){
            props.history.push(`/partners/swipe/${props.index}`)
        }
        else{
            props.history.push(`/discover/swipe/${props.index}`)
        }
    }

    return(
        <div className='user-card' onClick={() => handleClick()}>
            <img className='photo-thumbnail' alt='profile thumbnail' src={props.photo_url}/>
            <div className='user-card-text'>
                <h1 className='name'>{props.name}</h1>
                <p className='styles'>{styles}</p>
                <p className='redpoint'>{props.max_grade}</p>
            </div>
        </div>
    )
}

export default UserCard