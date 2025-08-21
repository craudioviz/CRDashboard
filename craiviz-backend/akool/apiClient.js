const axios = require('axios');
const getValidToken = require('./akoolToken');

async function createAkoolClient() {
  const token = await getValidToken();
  if (!token) throw new Error('Token retrieval failed.');

  return axios.create({
    baseURL: 'https://openapi.akool.com/api/open/v3',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
}

module.exports = createAkoolClient;
