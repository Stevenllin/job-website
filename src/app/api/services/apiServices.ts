import axios from 'axios';
import '../../core/services/interceptorsService';

export default {
  getCountries: async () => {
    return axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
      .then(({ data: { data } }) => data)
  },
  postCities: async (data: string) => {
    return axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
      country: data
    }).then(({ data: { data } }) => data)
  }
}

