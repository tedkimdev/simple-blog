require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const mongoose = require('mongoose');
const api = require('./api');

const session = require('koa-session');

const ssr = require('./ssr');

const {
  PORT: port = 4000,
  MONGO_URI: mongoURI,
  COOKIE_SIGN_KEY: signKey
} = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
  console.log('connected to mongodb');
}).catch((e) => {
  console.error(e);
});

const app = new Koa();
const router = new Router();

// Setting router
router.use('/api', api.routes());
router.get('/', ssr);

const path = require('path');
const serve = require('koa-static');
const staticPath = path.join(__dirname, '../../blog-frontend/build');

// Applying bodyParser
app.use(bodyParser());

// Session/Key
const sessionConfig = {
  maxAge: 86400000, // one day
  // signed: true //default
}

app.use(session(sessionConfig, app));
app.keys = [signKey];

// Applying router
app.use(router.routes()).use(router.allowedMethods());

app.use(serve(staticPath));
app.use(ssr);

app.listen(port, () => {
  console.log('listening to port', port);
});