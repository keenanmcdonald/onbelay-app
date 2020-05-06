import config from '../config'

const ApiService = {
    loginWithCredentials(credentials, showError) {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then(res => {
                if (!res.ok){
                    res.json()
                        .then(resJson => {
                            showError(resJson.error)  
                        })
                }
                else{
                    return res.json()
                }
            })
    },
    loginWithToken(showError){
        return fetch(`${config.API_ENDPOINT}/auth/verify_token`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
        })
            .then(res => {
                if (!res.ok){
                    throw new Error(res)
                }
                return res.json()
            })
            .catch(res => console.log(res))
    },
    getUser(id){
        return fetch(`${config.API_ENDPOINT}/users/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
        })
            .then(res => {
                if (!res.ok){
                    throw new Error(res)
                }
                return res.json()
            })
            .catch(res => console.log(res))
    },
    getContact(id){
        return fetch(`${config.API_ENDPOINT}/users/${id}/contact`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
        })
            .then(res => {
                if (!res.ok){
                    throw new Error(res)
                }
                return res.json()
            })
            .catch(res => console.log(res))
    },
    postUser(user, showError) {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',  
                'Authorization': `bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(user),
        })
            .then(res => {
                if (!res.ok){
                    res.json()
                        .then(resJson => {
                            showError(resJson.error)
                            return null
                        })
                }
                else{
                    return res.json()
                }
            })
    },
    updatePhoto(photo, user_id){
        const data = new FormData()
        data.append('photo', photo)

        return fetch(`${config.API_ENDPOINT}/users/${user_id}/photo`, {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: data,
        })
            .then(res => {
                if (!res.ok){
                    throw new Error(res.json())
                }
                return res.json()
            })
            .catch(res => console.log(res))
    },
    updateUser(user, user_id){
        return fetch(`${config.API_ENDPOINT}/users/${user_id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(user),
        })
            .then(res => {
                if (!res.ok){
                    throw new Error(res)
                }
                return res.json()
            })
            .catch(res => console.log(res))
    },
    getMatches(user_id){
        return fetch(`${config.API_ENDPOINT}/users/${user_id}/matches`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
        })
            .then(res => {
                if (!res.ok){
                    throw new Error(res)
                }
                return res.json()
            })
            .catch(res => console.log(res))
    },
    createPartnerRequest(user_id, requested_id){
        return fetch(`${config.API_ENDPOINT}/partners/request`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify({user_id, requested_id}),
        })
            .then(res => {
                if (!res.ok){
                    throw new Error(res)
                }
                return;
            })
            .catch(res => console.log(res))

    },
    hasRequested(user_id, requested_id){
        return fetch(`${config.API_ENDPOINT}/partners/request/${user_id}/${requested_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
        })
            .then(res => {
                if (!res.ok){
                    throw new Error(res)
                }
                return res.json()
            })
            .catch(res => console.log(res))
    },
    hasSeen(user_id, seen_id){
        return fetch(`${config.API_ENDPOINT}/users/${user_id}/has_seen/${seen_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
        })
            .then(res => {
                if (!res.ok){
                    throw new Error(res)
                }
                return res.json()
            })
            .catch(res => console.log(res))

    },
    getPartners(user_id){
        return fetch(`${config.API_ENDPOINT}/partners/${user_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
        })
            .then(res => {
                if (!res.ok){
                    throw new Error(res)
                }
                return res.json()
            })
            .catch(res => console.log(res))
    },
    isPartner(user_id, partner_id){
        return fetch(`${config.API_ENDPOINT}/partners/is_partner/${user_id}/${partner_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
        })
            .then(res => {
                if (!res.ok){
                    throw new Error(res)
                }
                return res.json()
            })
            .catch(res => console.log(res))
    },
    blockUser(user_id, blocked_id){
        return fetch(`${config.API_ENDPOINT}/users/${user_id}/blocked/${blocked_id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
        })
            .then(res => {
                if (!res.ok){
                    throw new Error(res)
                }
                return res.json()
            })
            .catch(res => console.log(res))
    },
    getMessages(user_id, to_id){
        return fetch(`${config.API_ENDPOINT}/messages/${user_id}/${to_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
        })
            .then(res => {
                if (!res.ok){
                    throw new Error(res)
                }
                return res.json()
            })
            .catch(res => console.log(res))
    },
    sendMessage(user_id, to_id, content){
        return fetch(`${config.API_ENDPOINT}/messages/${user_id}/${to_id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify({content}),
        })
            .then(res => {
                if (!res.ok){
                    throw new Error(res)
                }
                return res.json()
            })
            .catch(res => console.log(res))
     },
}

export default ApiService