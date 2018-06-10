import express from 'express';
import { Nuxt, Builder } from 'nuxt';
import router from './routes/index.js';

const app = express();

app.use(express.static('static'));

let config = require('./nuxt.config.js');
const nuxt = new Nuxt(config);
const builder = new Builder(nuxt);
builder.build();

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true);

	if (req.method == 'OPTIONS') {
	  res.send(200);
	} else {
	  next();
	}
});

router(app);
app.use(nuxt.render);

let server = app.listen(8899, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at http://%s:%s', host, port);
});