import axios from 'axios';

export default axios.create({
  baseURL: `https://judgeonline.df.r.appspot.com/api/`,
});
