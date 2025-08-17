import { useState } from 'react';
import axios from 'axios';
export default function OnboardingForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(${import.meta.env.VITE_API_BASE_URL}/api/onboarding, { email, name });
      setStatus('Onboarding complete');
    } catch (err) {
      setStatus('Error: ' + err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome to CRAI</h2>
      <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' required />
      <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Name' />
      <button type='submit'>Start Onboarding</button>
      <p>{status}</p>
    </form>
  );
}
