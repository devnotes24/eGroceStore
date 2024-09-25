const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const bodyparser = require('body-parser');
const multiTenantMiddleware = require('./config/multiTenantMiddleware');
// eslint-disable-next-line import/no-extraneous-dependencies
const myReqLogger = require('./Utilities/ReqLogger');
require('dotenv').config();
const route = require('./routes/routes');

const app = express();
const allowedOrigins = [
  'https://product-review-system-ochre.vercel.app',
  'http://localhost:3000',
];

app.use(cors({
  origin: function (origin, callback) {
    // If the origin is in the allowedOrigins array or if it's undefined (for non-browser requests), allow it
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    } 
  },
  credentials: true // Allow cookies to be sent with requests
})); 

app.use(myReqLogger);
app.use(multiTenantMiddleware);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
//app.use('/', route);
app.use('/', route);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
