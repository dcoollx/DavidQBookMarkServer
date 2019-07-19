const express = require('express');
const winston = require('winston');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');


const bmRoute = require('../bookmarks/bookmarks.route');
require('dotenv').config();

const {NODE_ENV} = require('./config');
const app = express();
const logger = winston.createLogger({
  level:'info',
  format: winston.format.json(),
  transports:[
    new winston.transports.File({filename:'info.log'})
  ]
});



const morganOptions = 'common';
function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    logger.info('Unathorized access rejected');
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  // move to the next middleware
  next();
}

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan(morganOptions));


//paths
app.get('/', express.static('public'));
app.use('/bookmarks',validateBearerToken,bmRoute);

//erros
app.use((err, req, res, next)=>{
  let response;
  if(NODE_ENV === 'production'){
    logger.error(err);
    response = {error:{message:'Critical Server Error'}};
  }else{
    response = {error:{message:err.message,err}};
  }
  res.status(500).json(response);
});
module.exports = app;