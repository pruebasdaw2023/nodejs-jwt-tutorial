const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({
    text: 'API WORKS!!!'
  });
});

router.post('/api/login', (req, res) => {
  const user = {id: 3}
  const token = jwt.sign({user}, 'my_secret_key', {expiresIn: '1m'})
  res.json({
    token
  })
})

router.get('/api/protected', ensureToken, (req, res) => {

  jwt.verify(req.token, 'my_secret_key', (error, data) => {
    if (error) {
      res.sendStatus(403)
    } else {
      res.json({
        text: 'Protected!!!',
        data
      })
    }
  })

})

function ensureToken(req, res, next){
  const bearerHeader = req.headers['authorization']
  console.log(bearerHeader)
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(403)
  }
}

module.exports = router;
