const express = require('express');
const app = express();
const router = express.Router();

const path = __dirname = 'views/';
const port = 8080;

router.use(function (req,res,next) {
    console.log('/' + req.method);
    next();
  });
  
  router.get('/', function(req,res){
    res.sendFile(path + 'index.html');
  });

  app.use(express.static(path));
app.use('/', router);

if (require.main === module) {
  app.listen(port, function () {
      console.log('App is listening on port 8080!');
  });
} else {
  module.exports = app;
}