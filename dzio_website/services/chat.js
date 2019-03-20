// import axios  from 'axios';
import axios from './../helpers/axios';

export const groupService = {
    getMessages
};


function getMessages(groupId) {

    return axios.post('/api/group/'+groupId+'/messages');
}