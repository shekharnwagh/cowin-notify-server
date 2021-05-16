import axios, { AxiosRequestConfig } from 'axios';
import safeStringify from 'fast-safe-stringify';
import VError from 'verror';
import { notifyToFlock } from './flock';
import Constants from '../common/constants';
import { logger, getCurrentFormattedTimestamp } from '../utils';

interface Session {
    session_id: string;
    date: string;
    available_capacity: number;
    min_age_limit: number;
    vaccine: string;
    slots: string[];
}

interface Center {
    center_id: number;
    name: string;
    address: string;
    state_name: string;
    district_name: string;
    block_name: string;
    pincode: number;
    lat: number;
    long: number;
    from: string;
    to: string;
    fee_type: string;
    sessions: Session[];
}

export interface SessionsResponse {
    centers: Center[];
}

interface AvailableSlot {
    centerId: number;
    address: string;
    feeType: string;
    sessions: Session[];
}

interface Headers {
    'User-Agent': string;
    Accept: string;
    'Accept-Language': string;
    Origin?: string;
    Connection: string;
    Referer?: string;
    TE: string;
    'Cache-Control': string;
}

export class CheckSlotAndNotifyService {
    private constructHeaders = (): Headers => {
        const { USER_AGENT, ACCEPT, ACCEPT_LANGUAGE, CONNECTION, TE, CACHE_CONTROL } =
            Constants.REQUEST_HEADERS;
        return {
            'User-Agent': USER_AGENT.FIREFOX_1,
            Accept: ACCEPT.ACCEPT_JSON_TEXT,
            'Accept-Language': ACCEPT_LANGUAGE.EN_US,
            Connection: CONNECTION.KEEP_ALIVE,
            TE: TE.TRAILERS,
            'Cache-Control': CACHE_CONTROL.NO_CACHE,
        };
    };

    private processSessionResponse = (centersData: Center[]): AvailableSlot[] => {
        const availableSlots: AvailableSlot[] = [];

        if (centersData && centersData.length) {
            centersData.forEach((centerData: Center) => {
                const availableSessions: Session[] = [];
                if (centerData && centerData.sessions && centerData.sessions.length) {
                    centerData.sessions.forEach((session: Session) => {
                        if (session && session.available_capacity) {
                            availableSessions.push(session);
                        }
                    });
                }

                if (availableSessions.length) {
                    logger.debug(`Found slots for Center: ${safeStringify(centerData)}`);
                    const {
                        center_id: centerId,
                        name,
                        address,
                        block_name: blockName,
                        district_name: districtName,
                        state_name: stateName,
                        pincode,
                        fee_type: feeType,
                    } = centerData;
                    availableSlots.push({
                        centerId,
                        address: `${name}, ${address}, ${blockName}, ${districtName}, ${stateName} - ${pincode}`,
                        feeType,
                        sessions: availableSessions,
                    });
                }
            });
        }

        return availableSlots;
    };

    public checkAndNotifyForDistrict = async (
        districtCode: number,
        dateStr: string,
    ): Promise<void> => {
        const { SESSIONS_BY_DISTRICT: apiUrl } = Constants.API_URL;
        const requestConfig: AxiosRequestConfig = {
            params: {
                district_id: districtCode,
                date: dateStr,
            },
            headers: this.constructHeaders(),
        };

        try {
            logger.info(
                `Fetching slots data with request: ${safeStringify({
                    apiUrl,
                    requestConfig: { params: requestConfig.params },
                })}`,
            );
            const res = await axios.get(apiUrl, requestConfig);

            if (res && res.status === 200 && res.data) {
                if (res.data && res.data.centers && res.data.centers.length) {
                    logger.debug(
                        `Got response with statusCode: ${res.status} and ${res.data.centers.length} centers data`,
                    );
                    const availableSlots = this.processSessionResponse(
                        res.data.centers as Center[],
                    );

                    if (availableSlots.length) {
                        logger.info(`Available ${availableSlots.length} slots`);
                        logger.info(`Slots available: ${safeStringify(availableSlots)}`);

                        await notifyToFlock(safeStringify(availableSlots));
                    } else {
                        logger.info(`No slots found at ${getCurrentFormattedTimestamp()}`);
                    }
                }
            } else if (res && res.status) {
                const error: VError = new VError(
                    `API returned non-success response (statusCode: ${
                        res.status
                    }, response: ${safeStringify(res.data)})`,
                );
                throw error;
            } else {
                const error: VError = new VError('ERR while fetching data from API');
                throw error;
            }
        } catch (err) {
            if (err && err.response && err.response.data) {
                const error: VError = new VError(
                    safeStringify(err.response.data),
                    'ERR in checkAndNotifyForDistrict',
                );
                throw error;
            }
            const error: VError = new VError(err, 'ERR in checkAndNotifyForDistrict');
            throw error;
        }
    };

    checkAndNotifySlotsForToday = async (districtCode: number): Promise<void> => {
        try {
            const dateStr = getCurrentFormattedTimestamp('DD-MM-YYYY');
            await this.checkAndNotifyForDistrict(districtCode, dateStr);
        } catch (err) {
            const error: VError = new VError(err, 'ERR in checkAndNotifySlotsForToday');
            throw error;
        }
    };

    checkAndNotifySlotsForWashim = async (dateStr: string): Promise<void> => {
        try {
            const { WASHIM: districtCode } = Constants.CODES.DISTRICT;
            await this.checkAndNotifyForDistrict(districtCode, dateStr);
        } catch (err) {
            const error: VError = new VError(err, 'ERR in checkAndNotifySlotsForWashimToday');
            throw error;
        }
    };
}
