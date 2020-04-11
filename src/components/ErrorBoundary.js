import React from 'react'
import Header from './Header'

class ErrorBoundary extends React.Component{
    constructor(props){
        super(props)
        this.state = {hasError: false, errorMessage: ''}
    }

    static getDerivedStateFromError(error){
        return {hasError: true, errorMessage: error.message}
    }

    render() {
        if (this.state.hasError){
            return (
                <div className='error-page'>
                    <Header pageTitle='' displayNav={false}/>
                    <h1>ERROR</h1>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary