import helpers from '../helpers/helpers';
import axios from "axios"

const { BaseUrl } = helpers

export const requestApi = async ({ url, method, data, token }) => {
    const headers = 
    { 
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8"    
    }

    if(token){
        headers['Authorization'] = `Bearer ${token}`
    }

    const config = {
        url: `${BaseUrl}${url}`, 
        method, 
        headers
    }

    if(data){
        config.data = data
    }

    console.log(config.url)

    return axios(config)
        .then(response => {
            return { result: response.data, responseStatus: true }
        })
        .catch((error) => {
            console.log(error)
            if(error.response){
                //Request made and server responded
                return { responseStatus: false, errorMsg: error.response.data }
            } 


            else if(error.request){
                //Request made but no server response
                return { responseStatus: false, errorMsg: {error: 'Server error, try again later'} }
            } 
            
            
            else{
                return { responseStatus: false, errorMsg: {error: 'Server error, try again later'} }
            }
        })        

}


export const onRequestApi = async ({ requestInfo, successCallBack, failureCallback }) => {
    try {

        if(!successCallBack || !failureCallback || !requestInfo){
            throw new Error()
        }
        
        const request = await requestApi(requestInfo)

        const { result, responseStatus, errorMsg } = request

        if(responseStatus){
            return successCallBack({ requestInfo, result })
        
        } else{
            if(errorMsg && errorMsg.error){
                return failureCallback({ requestInfo, errorMsg: errorMsg.error })
            
            } else{
                return failureCallback({ requestInfo, errorMsg: 'Server error!' })
            }
        }
        
    } catch (error) {
        console.log(error)
        return failureCallback({ requestInfo, errorMsg: 'Server error!' })
    }
}