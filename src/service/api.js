import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '33396171-581c3cabf7afd0272218aaf17';

axios.defaults.baseURL = BASE_URL;

export const fetchPhotos = (searchQuery, page) => {

    return axios(BASE_URL, { params:
      { key: KEY,
        q: searchQuery,
        page: page,
        per_page: 15,
        image_type: 'photo',
        orientation: 'horizontal',
    }
   });
  };