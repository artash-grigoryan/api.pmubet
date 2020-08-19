import axios from 'axios'


function getAxios() {
    // let state = store.getState();
    // let user = JSON.parse(localStorage.getItem('user'));
    // let token = state.authentication.publicKey;
    // if (user && user.token) {
    //     token = user.token;
    // }

    return axios.create({
        baseURL: process.env.API_URL,
        // headers: {
        //     "Authorization": `Bearer ${token}`
        // }
    })
}

export default getAxios();
