import axios from 'axios';
import safeStringify from 'fast-safe-stringify';
import VError from 'verror';
import Constants from '../common/constants';
import { logger } from '../utils';

interface IData {
    text: string;
}

const appEnv: string = process.env.APP_ENV ? process.env.APP_ENV : 'dev';

export const post = async (message: string, url: string, channel: string): Promise<void> => {
    const { SERVICE } = Constants;
    const text = `*[${SERVICE} - ${appEnv}]* ${message}`;
    const data: IData = {
        text,
    };
    try {
        await axios.post(url, data);
        logger.info(`Sent to Flock (Channel: ${channel}): ${safeStringify(text)}`);
    } catch (err) {
        const error: VError = new VError(err, 'ERR while sending to flock');
        logger.error(error.stack);
    }
};

export const notifyToFlock = (message: any): Promise<any> => {
    const { TEST_DEV: testDevChannelUrl } = Constants.FLOCK.URL;
    const { TEST_DEV: testDevChannel } = Constants.FLOCK.CHANNEL;

    return post(message, testDevChannelUrl, testDevChannel);
};
