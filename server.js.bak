const express = require('express');
const path = require('path');
const app = express();

app.use('/dashboard', express.static(path.join(__dirname, 'dashboard')));
app.use('/backend', express.static(path.join(__dirname, 'backend')));
app.use('/avatars', express.static(path.join(__dirname, 'avatars')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.redirect('/dashboard/roy.html');
});

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`🌐 Live at http://localhost:${PORT}/dashboard/roy.html`);
});
