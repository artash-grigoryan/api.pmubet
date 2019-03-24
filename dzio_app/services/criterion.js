import axios  from 'axios';

export const criterionService = {
    getCriteria
};

function getCriteria() {

    return axios.get('/api/criteria');
}