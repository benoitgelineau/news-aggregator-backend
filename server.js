const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

// Routes
const routes = require('./routes');

// Middlewares
const errorHandler = require('./utils/errorHandler');

const app = express();

const { PUBLIC_URL } = process.env;

mongoose.Promise = global.Promise;

app.use(
	cors({
		origin: PUBLIC_URL,
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
	.connect(`mongodb://mongo:27017/myapp`)
	.then(() => console.log('MongoDB connected...'))
	.catch((err) => console.log('MongoDB connection error:', err));

app.use(passport.initialize());

// Handle authentication with JWT & local Passport strategies
require('./passport/strategies');

app.use('/api', routes);

// Global error handler
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
