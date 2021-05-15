import express from 'express';
import router from './src/routes/router';
import { logger } from './src/utils';
import Constants from './src/common/constants';

const app = express();

app.use(express.json());
app.use('/api', router);

if (process.env.APP_ENV === Constants.APP_ENV.DEVELOPMENT) {
    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
    const HOST = process.env.HOST ? process.env.HOST : 'localhost';

    app.listen(PORT, HOST, () => {
        logger.info(`Started server on HOST: ${HOST}, at PORT: ${PORT}`);
    });
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
    logger.info(`CowinNotifyServer: listening on port ${port}`);
});
