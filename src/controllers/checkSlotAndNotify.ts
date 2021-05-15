import { Request, Response } from 'express';
import VError from 'verror';
import { CheckSlotAndNotifyService } from '../services/checkSlotAndNotify';
import { logger, getCurrentFormattedTimestamp, formatTimestamp } from '../utils';

export class CheckSlotAndNotifyController {
    private service: CheckSlotAndNotifyService;

    constructor() {
        this.service = new CheckSlotAndNotifyService();
    }

    public checkAndNotifyWashim = async (request: Request, response: Response) => {
        try {
            const { date: dateQuery } = request.query;
            const dateStr =
                dateQuery && dateQuery.length
                    ? formatTimestamp(dateQuery as string, 'DD-MM-YYYY')
                    : getCurrentFormattedTimestamp('DD-MM-YYYY');
            await this.service.checkAndNotifySlotsForWashim(dateStr);
            response.status(200).send();
        } catch (err) {
            const error: VError = new VError(err, 'ERR in CheckSlotAndNotify');
            logger.error(error.stack);
            response.status(500).send({ success: false, error: error.stack });
        }
    };
}
