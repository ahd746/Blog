const express = require('express');
const routes = express.Router();
require('./controllers/postsController');

// Routes
routes.get('/', indexController)


routes.get('/about',(req,res)=>res.send('Hello from about page'))

routes.get('/create', createController)

routes.get('/:id', showController)

routes.post('/insert', insertController)

routes.get('/edit/:id',editController)

routes.post('/edit/:id',updateController)

routes.get('/delete/:id', deleteController)

module.exports = routes