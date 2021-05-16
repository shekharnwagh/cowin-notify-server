import { Request, Response } from 'express';
import VError from 'verror';
import { CronScheduler } from '../services/cronScheduler';
import { logger } from '../utils';

export class CronSchedulerController {
    private service: CronScheduler;

    constructor() {
        this.service = new CronScheduler();
    }

    public startScheduler = (request: Request, response: Response): void => {
        try {
            logger.info('Starting scheduler');
            this.service.startScheduler();
            response.status(200).send();
        } catch (err) {
            const error: VError = new VError(err, 'ERR in starting scheduler');
            logger.error(error.stack);
            response.status(500).send();
        }
    };

    public stopScheduler = (request: Request, response: Response): void => {
        try {
            logger.info('Stopping scheduler');
            this.service.stopScheduler();
            response.status(200).send();
        } catch (err) {
            const error: VError = new VError(err, 'ERR in stopping scheduler');
            logger.error(error.stack);
            response.status(500).send();
        }
    };
}
