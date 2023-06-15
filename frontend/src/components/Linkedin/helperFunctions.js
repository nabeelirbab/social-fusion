
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

export async function connect(userName,password) {
    try {      
        const res = await axios(`${baseUrl}/connect`, {
            method: 'POST',
            headers: {
            token:accessToken
            }
            ,
            data: {
                userName,
                password
            }
        })
        console.log(res.data)
        // if(res.data)
    }
    catch (error) {
        console.log('error / invalid credentials')
        toast.error('invalid credentials')
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

 export const getVideo = async (urn) => {
     const token = localStorage.getItem('linkedin_token')
     let accessToken;
        if (token) {
            accessToken = token
        }
        if (!accessToken) {
            if (token) {
                accessToken=token   
            }
        }
     try {
         const response = await axios(`http://localhost:3300/api/linkedin/video/${urn}`, 
             {
                 method: 'GET',
      }
        
      );
        console.log(response);
       if (response) {
         console.log(response.dat)
          // console.log('Post Created Successfully');
          // toast.success('Post Created Successfully')
      }
      else {
        toast.error('Error posting article');
      }
    } catch (error) {
      toast.error(error);
    }
  }