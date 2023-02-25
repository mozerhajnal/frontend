import axiosInstance from 'axios';

export default async function makeAxiosRequest(
  method,
  urlPath,
  token = null,
  data = null
) {
  try {
    const res = await axiosInstance({
      baseURL: process.env.REACT_APP_API_SERVER,
      method: 'cors',
      url: urlPath,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });
    return res.data;
  } catch (err) {
    if (err.response) {
      throw err.response.data;
    } else if (err.request) {
      throw err.request;
    } else {
      throw new Error(`Error: ${err.message}`);
    }
  }
}
