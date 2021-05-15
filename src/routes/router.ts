import express, { Request, Response } from 'express';
import { CheckSlotAndNotifyController } from '../controllers/checkSlotAndNotify';

const router = express.Router();
const checkSlotAndNotifyController = new CheckSlotAndNotifyController();

router.get('/status', (req: Request, resp: Response) => {
    resp.status(200).send({
        success: true,
    });
});

router.get('/check_and_notify_washim', checkSlotAndNotifyController.checkAndNotifyWashim);

export default router;
