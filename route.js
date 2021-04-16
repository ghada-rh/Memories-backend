import express from 'express';

const route = express.Router();

route.get('/', (req, res) => {
   res.send('server is up and running !');
});

export default route;