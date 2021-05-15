import { Request, Response } from 'express';
import VError from 'verror';
import { logger } from '../utils';

export class CheckSlotAndNotifyController {
    public checkSlotAndNotify = async (request: Request, response: Response) => {
        try {
            logger.info(JSON.stringify(request.header));
            response.status(200).send();
        } catch (err) {
            const error: VError = new VError(err, 'ERR in CheckSlotAndNotify');
            logger.error(error.stack);
            response.status(500).send({ success: false, error: error.stack });
        }
    };
}
