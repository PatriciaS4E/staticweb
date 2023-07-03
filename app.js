var express  = require('express');
var app      = express();
var cors = require('cors');
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var serverAca = 'http://aca-web.gencat.cat/sdim2/apirest/catalog';
var serverAcaLastOb = 'http://aca-web.gencat.cat/sentilo-catalog-web/component/map/EMBASSAMENT-EST.';

app.use(cors());
app.use(express.static('public'));

app.all("/aca/*", function(req, res) {
  console.log('redirecting to Server1');
  apiProxy.web(req, res, {
    target: serverAca,
    changeOrigin: false, 
    ignorePath: true
  });
});

app.all("/acalast/:id", function(req, res){
  console.log('redirecting to Server2' + req.params.id);
  apiProxy.web(req, res, {
    target: serverAcaLastOb+req.params.id+'/lastOb/',
    changeOrigin: false,
    ignorePath: true
  });
});

app.listen(3000);
