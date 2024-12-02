
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const app = express();
app.use(bodyParser.json());
const port = 5000;
 
app.use(cors());

const firebaseConfig = {
  apiKey: "AIzaSyD_6QfNz_qk4AkuROtxgTtSKSwa_CsuGv8",
  authDomain: "netflix-3fc8c.firebaseapp.com",
  projectId: "netflix-3fc8c",
  storageBucket: "netflix-3fc8c.firebasestorage.app",
  messagingSenderId: "950889774143",
  appId: "1:950889774143:web:61218aa3cbdb5397678c8a"
};


// Initialize Firebase Admin SDK
const serviceAccount = require('./netflix.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https:///Movies/6ELP6TJ0ix4kH9cUsRFw.firebaseio.com'
});

const db = admin.firestore();


app.post('/api/login', (req, res) => {
    const { email, pass } = req.body;
    if (email === 'test@gmail.com' && pass === 'test') {
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
});

// Endpoint to get movies
app.get('/api/getMovies', async (req, res) => {
  try {
    const moviesRef = db.collection('Movies');
    const snapshot = await moviesRef.get();
    const movies = snapshot.docs.map(doc => doc.data());
    res.json(movies);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/api/getbanner', async (req, res) => {
  try {
    const bannerRef = db.collection('banner');
    const snapshot = await bannerRef.get();
    const banner = snapshot.docs.map(doc => doc.data());
    res.json(banner);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/api/getSliders', async (req, res) => {
  try {
    const sliderRef = db.collection('slider');
    const snapshot = await sliderRef.get();
    const sliders = snapshot.docs.map(doc => doc.data());
    res.json(sliders);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});