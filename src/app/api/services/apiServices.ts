import axios from 'axios';
import '../../core/services/interceptorsService';

export default {
  getCompanies: async () => {
    return axios.get('/api/public/jobs?page=1').then((response) => response)
  }
}

