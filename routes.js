const express = require('express');
const routes = express.Router();
require('./controllers/postsController');

// Routes
routes.get('/home', indexController)

routes.get('/create', createController)

routes.get('/:id', showController)

routes.post('/insert', insertController)

routes.get('/edit/:id',editController)

routes.post('/edit/:id',updateController)

routes.get('/delete/:id', deleteController)

module.exports = routes