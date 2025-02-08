const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/auth.route.js');
const movieRouter = require('./routers/movie.route.js');
const tvRouter = require('./routers/tv.route.js');
const searchRouter = require('./routers/searchRouter.route.js');
const protectRoute = require('./middleware/protectRoute.js');

const ENV_VARS = require('./config/envVars.js');
const connectDB = require('./config/db.js');

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = ENV_VARS.PORT;
connectDB();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/movie', protectRoute, movieRouter);
app.use('/api/v1/tv', protectRoute, tvRouter);
app.use('/api/v1/search', protectRoute, searchRouter);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});
