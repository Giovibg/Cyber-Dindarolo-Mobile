import axios from 'axios'


import * as SecureStore from 'expo-secure-store'

const getAccess = async () => {
    const access_token = await SecureStore.getItemAsync('access_token');
}

const getRefresh = async () => {
    return await SecureStore.getItemAsync('refresh_token');
    
    
};
const saveAccess = async(access_token) => {
    await SecureStore.setItemAsync('access_token', access_token)

}

const saveRefresh = async(refresh_token) => {
    await SecureStore.setItemAsync('refresh_token', refresh_token)

}


const baseURL = 'http://192.168.178.106:80/'


const APIrequest = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Authorization': " " ,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

APIrequest.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
    
        if (error.response.status === 401 && originalRequest.url === baseURL+'api/refresh/') {
            this.props.navigation.navigate("Login");
            return Promise.reject(error);
        }
        if(originalRequest.url === '/api/token/') {
            return Promise.reject(error);
        }
        if(originalRequest.url === '/jwt_auth/register/') {
            return Promise.reject(error);
        }

        if (error.response.status === 401)  
        {
           getRefresh().then(refreshToken =>   {
           
            if (refreshToken){ 
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);
                console.log(tokenParts.exp);
                if (tokenParts.exp > now) {
                    return APIrequest
                    .post('/api/refresh/', {refresh: refreshToken})
                    .then((response) => {
                        saveAccess(response.data.access)
        
                        APIrequest.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                        originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
        
                        return APIrequest(originalRequest);
                    })
                    .catch(err => {
                        console.log(err)
                    });
                }else{
                    console.log("Refresh token is expired", tokenParts.exp, now);
                    this.props.navigation.navigate("Login");
                }
            }else{
                console.log("Refresh token not available.");
                console.log("url:",originalRequest.url)
                this.props.navigation.navigate("Login");
            }
           });
                
        }      
      // specific error handling done elsewhere
      return Promise.reject(error);
    }
);


export default APIrequest