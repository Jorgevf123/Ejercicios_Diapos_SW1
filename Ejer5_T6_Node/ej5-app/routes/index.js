var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  const items  = ['Madrid', 'Sevilla', 'Valencia', 'Bilbao'];
  const images = [
    'https://picsum.photos/seed/1/300/180',
    'https://picsum.photos/seed/2/300/180',
    'https://picsum.photos/seed/3/300/180'
  ];
  res.render('index', { title: 'Inicio', items, images });
});

module.exports = router;

