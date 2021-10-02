const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Routes
const routes = require('./routes');

// Middlewares
const errorHandler = require('./utils/errorHandler');

const app = express();

mongoose.Promise = global.Promise;

app.use(
	cors({
		origin:
			process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : '*',
		optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
		credentials: true, // To receive cookies from client
	})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'));

// Connect to Mongo
mongoose
	.connect(process.env.MONGO_DB_URL)
	.then(() => console.log('DB is connected.'))
	.catch((err) => console.log('DB connection error:', err));

app.use(passport.initialize());

// Handle authentication with JWT & local Passport strategies
require('./passport/strategies');

app.use('/api', routes);

// Global error handler
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve(__dirname, 'public')));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'public', 'index.html'));
	});
}

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
