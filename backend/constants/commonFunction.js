function responseBody(message,status,data=null){
    let responseBody = {
        message,
        status
    }
    if(data){
        responseBody.data = data
    }
    return responseBody
}

module.exports = {
    responseBody
}