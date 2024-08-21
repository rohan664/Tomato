import {BACKEND_URL} from "./constants"
import axios from "axios"

async function getApiResponse(url,body,method){
    const urlWithNoAuthentications = ["api/user/signin","api/user/signin"]
    const header = {
        "Content-Type" : "application/json"
    }
    if(!urlWithNoAuthentications.includes(url)){
        let accessToken = localStorage.getItem("accessToken")
        header["Authorization"] = `${"Bearer"} ${accessToken}`
    }
    let requestParameter = {
        method: method,
        url : `${BACKEND_URL}${url}`,
        data : body,
        // headers: method === 'GET' ? {} : header,                                                                    
        headers : header,
        timeout: 60000,
    }
    return axios(requestParameter)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        console.warn("error",error)
        return error.response.data
    })
}
export {getApiResponse}