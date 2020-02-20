import axios  from 'axios';

export const languageService = {
    getLanguages
};

function getLanguages() {

    return axios.get('/api/languages');
}