const axios = require('axios');
// function for geting token from local storage
function getToken(){
    if(window.localStorage){
        return window.localStorage.getItem("Token")
    }
    return ""
}
// function for geting user details from local storage
function getUser(){
    if(window.localStorage){
        var retrievedObject = window.localStorage.getItem("User");
        return JSON.parse(retrievedObject)
    }
    return ""
}
// function for checking user is authenticated or not
function isAuthenticated(){
    if(window.localStorage){
        const token=window.localStorage.getItem("Token");
        return Boolean(token);
    }
    return false;
}
//for updateing latest information of the user
function updateUser(){
    let token=getToken()
    let header={Authorization:"bearer "+token}
    console.log(token)
    axios.get('http://localhost:3035/api/v1/user/getuser',{headers:header})
        .then(function (response) {
            console.log(response)
            window.localStorage.setItem("User",JSON.stringify(response.data.user))
        })
        .catch(function (error) {
            console.log(error)
        })
    
}

export {isAuthenticated,getToken,getUser,updateUser}