import moment from 'moment-timezone';
import Constants from '../common/constants';

const { IST } = Constants.TZ;

export const getCurrentFormattedTimestamp = (format?: string): string => {
    const momentObj = moment().tz(IST);
    const formattedTimestamp = momentObj.format(format);
    return formattedTimestamp;
};

export const formatTimestamp = (dateTime: string, format?: string): string => {
    const momentObj = moment(dateTime).tz(IST);
    const formattedTimestamp = momentObj.format(format);
    return formattedTimestamp;
};
