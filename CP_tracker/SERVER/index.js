import {express, cors, bodyParser, PORT, authConfig} from './config.js';
import { auth } from 'express-openid-connect';
import pkg from 'express-openid-connect';
const { requiresAuth } = pkg;
const app = express();
import tasksRoute from './routes/TasksRoute.js'
// const { auth } = require('express-oauth2-jwt-bearer');
// const guard = require('express-jwt-permissions');
// const dotenv = require('dotenv');
// dotenv.config();

// const {OAuth2Client} = require('google-auth-library');

app.use(express.json());
app.use(cors({
    origin: '*' // Adjust this to match your frontend's origin
  }));

// const port = process.env.PORT || 8080;

// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(authConfig));

// req.isAuthenticated is provided from the auth router


// const jwtCheck = auth({
//   audience: 'https://www.codename-x.org',
//   issuerBaseURL: 'https://codename-x.us.auth0.com/',
//   tokenSigningAlg: 'RS256'
// });

// // enforce on all endpoints
// app.use(jwtCheck);

// app.get('/authorized', function (req, res) {
//     res.send('Secured Resource');
// });

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });
//Express middleware
app.use('/tasks', tasksRoute); 


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });