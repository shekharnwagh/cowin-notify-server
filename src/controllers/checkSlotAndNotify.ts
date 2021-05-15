import { Request, Response } from 'express';
import safeStringify from 'fast-safe-stringify';
import VError from 'verror';
import { CheckSlotAndNotifyService } from '../services/checkSlotAndNotify';
import { notifyToFlock } from '../services/flock';
import { logger, getCurrentFormattedTimestamp, formatTimestamp } from '../utils';

export class CheckSlotAndNotifyController {
    private service: CheckSlotAndNotifyService;

    constructor() {
        this.service = new CheckSlotAndNotifyService();
    }

    public checkAndNotifyWashim = async (request: Request, response: Response) => {
        try {
            const { date: dateQuery } = request.query;
            logger.debug(
                `Got request to check slots and notify for Washim with query: ${safeStringify(
                    request.query,
                )}`,
            );
            const dateStr =
                dateQuery && dateQuery.length
                    ? formatTimestamp(dateQuery as string, 'DD-MM-YYYY')
                    : getCurrentFormattedTimestamp('DD-MM-YYYY');
            logger.debug(`Selected date param as ${dateStr}`);
            await this.service.checkAndNotifySlotsForWashim(dateStr);
            logger.debug(`Request completed for check and notify for Washim (date: ${dateStr})`);
            response.status(200).send();
        } catch (err) {
            const error: VError = new VError(err, 'ERR in CheckSlotAndNotify');
            logger.error(error.stack);
            notifyToFlock(`*[NotifyServer]* ${error.stack}`);
            response.status(500).send({ success: false, error: error.stack });
        }
    };
}
