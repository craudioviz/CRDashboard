const axios = require('axios');

const contributor = {
  id: 'roy_henderson',
  avatar: {
    id: 'avatar_roy',
    traits: ['visionary', 'modularist', 'empathy-driven'],
    ux: 'audit-first',
  },
  telemetry: 'https://crdashboard-1.onrender.com/telemetry',
};

axios.post('https://crdashboard-1.onrender.com/telemetry', {
  event: 'onboard_contributor',
  status: 'success',
  contributor,
})
.then(res => {
  console.log('✅ Contributor onboarded:', res.data);
})
.catch(err => {
  console.error('❌ Onboarding failed:', err.message);
});