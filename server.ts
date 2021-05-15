import express from 'express';
import router from './src/routes/router';
import Constants from './src/common/constants';
import { logger } from './src/utils';

const app = express();

app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const HOST = process.env.HOST ? process.env.HOST : 'localhost';

if (process.env.APP_ENV && process.env.APP_ENV !== Constants.APP_ENV.DEVELOPMENT) {
    app.listen(PORT, () => {
        logger.info(`Started server on APP_ENV: ${process.env.APP_ENV}, at PORT: ${PORT}`);
    });
} else {
    app.listen(PORT, HOST, () => {
        logger.info(`Started server on HOST: ${HOST}, at PORT: ${PORT}`);
    });
}
