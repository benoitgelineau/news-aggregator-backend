const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

// Routes
const publicRoutes = require('./routes/api');
const privateRoutes = require('./routes/secure-api');

// Middlewares
const verify_user = require('./routes/auth');
const error_handler = require('./_helpers/errorHandler');

const app = express();

const { APP_URL, NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';

mongoose.Promise = global.Promise;

app.use(
	cors({
		origin: APP_URL,
		optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
		credentials: true, // To receive cookies from client
	})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Connect to Mongo
mongoose
	.connect(
		`mongodb://mongo:27017/myapp`
		// { useNewUrlParser: true }
	)
	.then(() => console.log('MongoDB connected...'))
	.catch((err) => console.log('MongoDB connection error:', err));

app.use(passport.initialize());

// Passport authentication to secure the api
require('./config/passport');

app.use('/api', publicRoutes);
app.use('/api/user', verify_user, privateRoutes);

// Global error handler
app.use(error_handler);

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
