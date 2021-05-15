import express, { Request, Response } from 'express';
import Constants from './src/constants';
import { logger } from './src/utils';

const app = express();

app.use(express.json());

app.get('/status', (request: Request, response: Response) => {
    response.status(200).send({ success: true });
});

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
