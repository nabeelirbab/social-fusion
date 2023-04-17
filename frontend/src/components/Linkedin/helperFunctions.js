
import axios from 'axios'
const baseUrl = `http://localhost:3300/api/linkedin`
const accessToken =localStorage.getItem('token')
export async function getChats() {
     try {      
        const res = await axios(`${baseUrl}/find-chats`, {
            method: 'GET',
            headers: {
            token:accessToken
        }
        })
         return res.data
     }
    catch (error) {
        console.log('error / invalid credentials')
    }
}

export async function connect() {
    try {      
        const res = await axios(`${baseUrl}/connect`, {
            method: 'POST',
            headers: {
            token:accessToken
        }
        })
        console.log(res.data)
    }
    catch (error) {
        console.log('error / invalid credentials')
    }
}

export async function getChat(profileId) {
     try {      
        const res = await axios(`${baseUrl}/find-chat/${profileId}`, {
            method: 'GET', 
            headers: {
            token:accessToken
        }
        })
         return res.data
     }
    catch (error) {
        console.log('error / invalid credentials')
    }
}

export async function sendChat(profileId,msg) {
     try {      
        const res = await axios(`${baseUrl}/send-chat/${profileId}`, {
            method: 'POST', 
            headers: {
            token:accessToken
            },
            data: {
               msg
           }
        })
         console.log(res.data)
         return res.data
     }
    catch (error) {
        console.log('error / invalid credentials')
    }
}