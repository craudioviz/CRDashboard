const createAkoolClient = require('./akool/apiClient');

(async () => {
  try {
    const client = await createAkoolClient();
    const response = await client.get('/some-protected-endpoint');
    console.log('🔍 API Response:', response.data);
  } catch (err) {
    console.error('❌ API call failed:', err.message);
  }
})();
