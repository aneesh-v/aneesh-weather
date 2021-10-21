const express = require('express');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

// Rate limiting
const limiter = rateLimiter({
    windowMs: 10 * 60 * 1000,
    max: 30,
    message:
        'Too many request placed. Please contact the developer - aneeshv28@gmail.com',
});
app.use(limiter);
app.set('trust proxy', 1);

// Routes
app.use('/api', require('./router/weather'));

// Static folder
app.use(express.static('public'));

// Enable cors
app.use(cors);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
