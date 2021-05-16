import express, { Request, Response } from 'express';
import { CheckSlotAndNotifyController } from '../controllers/checkSlotAndNotify';
import { CronSchedulerController } from '../controllers/cronScheduler';

const router = express.Router();
const checkSlotAndNotifyController = new CheckSlotAndNotifyController();
const cronSchedulerController = new CronSchedulerController();

router.get('/status', (req: Request, resp: Response) => {
    resp.status(200).send({
        success: true,
    });
});

router.get('/check_and_notify_washim', checkSlotAndNotifyController.checkAndNotifyWashim);

router.get('/scheduler_start', cronSchedulerController.startScheduler);
router.get('/scheduler_stop', cronSchedulerController.stopScheduler);

export default router;
