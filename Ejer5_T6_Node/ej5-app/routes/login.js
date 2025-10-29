const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/',
  express.urlencoded({ extended: false }),
  (req, res) => {
    const { user } = req.body;
    res.send(`Login recibido. ¡Hola, ${user || 'anónimo'}!`);
  }
);

module.exports = router;
