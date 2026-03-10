const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'leads.json');

// Ensure data directory and file exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Submit lead
app.post('/api/signup', (req, res) => {
  const { name, email, phone, city, babyAge, packagingFrequency, willingToPay, howHeard } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const leads = JSON.parse(fs.readFileSync(DATA_FILE));
  const newLead = {
    id: Date.now(),
    name,
    email,
    phone: phone || '',
    city: city || '',
    babyAge: babyAge || '',
    packagingFrequency: packagingFrequency || '',
    willingToPay: willingToPay || '',
    howHeard: howHeard || '',
    timestamp: new Date().toISOString()
  };

  leads.push(newLead);
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2));

  res.json({ success: true, message: 'Thank you! We will notify you when BabyBowl launches.' });
});

// Admin route to view all leads
app.get('/admin/leads', (req, res) => {
  const leads = JSON.parse(fs.readFileSync(DATA_FILE));
  res.send(`
    <html>
    <head>
      <title>BabyBowl - Leads Dashboard</title>
      <style>
        body { font-family: sans-serif; padding: 2rem; background: #f9f9f9; }
        h1 { color: #c0392b; }
        table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        th { background: #c0392b; color: white; padding: 12px; text-align: left; font-size: 13px; }
        td { padding: 10px 12px; border-bottom: 1px solid #eee; font-size: 13px; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: #fef9f9; }
        .count { background: white; padding: 1rem 1.5rem; border-radius: 8px; display: inline-block; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .count span { font-size: 2rem; font-weight: bold; color: #c0392b; }
      </style>
    </head>
    <body>
      <h1>BabyBowl — Fake Door Test Leads</h1>
      <div class="count">Total Signups: <span>${leads.length}</span></div>
      <table>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>City</th>
          <th>Baby Age</th>
          <th>Uses Packaged Food</th>
          <th>Willing to Pay</th>
          <th>How Heard</th>
          <th>Timestamp</th>
        </tr>
        ${leads.map((l, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${l.name}</td>
            <td>${l.email}</td>
            <td>${l.phone}</td>
            <td>${l.city}</td>
            <td>${l.babyAge}</td>
            <td>${l.packagingFrequency}</td>
            <td>${l.willingToPay}</td>
            <td>${l.howHeard}</td>
            <td>${new Date(l.timestamp).toLocaleString('en-IN')}</td>
          </tr>
        `).join('')}
      </table>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`BabyBowl server running on port ${PORT}`);
});
