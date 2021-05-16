import cron from 'node-cron';
import VError from 'verror';
import Constants from '../common/constants';
import { CheckSlotAndNotifyService } from './checkSlotAndNotify';
import { logger, getCurrentFormattedTimestamp } from '../utils';

export class CronScheduler {
    private scheduler: cron.ScheduledTask;

    private checkAndNotifyService: CheckSlotAndNotifyService;

    constructor() {
        const { EVERY_5_MINUTES } = Constants.CRON_SCHEDULES;
        this.checkAndNotifyService = new CheckSlotAndNotifyService();
        this.scheduler = cron.schedule(
            EVERY_5_MINUTES,
            () => {
                try {
                    logger.info('Triggering checkAndNotifySlotsForWashim');
                    const date = getCurrentFormattedTimestamp('DD-MM-YYYY');
                    this.checkAndNotifyService.checkAndNotifySlotsForWashim(date);
                } catch (err) {
                    const error: VError = new VError(err, 'ERR in scheduled job');
                    logger.error(error.stack);
                }
            },
            {
                scheduled: false,
            },
        );
        logger.info('Scheduler initialized');
    }

    public startScheduler = (): void => {
        this.scheduler.start();
        logger.info('Scheduler started');
    };

    public stopScheduler = (): void => {
        this.scheduler.stop();
        logger.info('Scheduler stopped');
    };
}
