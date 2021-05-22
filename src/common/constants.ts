const constants = {
    SERVICE: 'CowinNotifyServer',
    APP_ENV: {
        PRODUCTION: 'production',
        STAGING: 'staging',
        DEVELOPMENT: 'dev',
    },
    API_URL: {
        GET_STATES: 'https://cdn-api.co-vin.in/api/v2/admin/location/states',
        GET_DISTRICTS: 'https://cdn-api.co-vin.in/api/v2/admin/location/districts',
        SESSIONS_BY_DISTRICT:
            'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict',
        SESSIONS_BY_PIN:
            'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin',
    },
    CODES: {
        STATE: {
            MAHARASHTRA: 21,
        },
        DISTRICT: {
            WASHIM: 369,
        },
    },
    FLOCK: {
        URL: {
            TEST_DEV:
                'https://api.flock.com/hooks/sendMessage/946c8448-101d-478b-8273-ea0f041ce475',
        },
        CHANNEL: {
            TEST_DEV: 'Test_Dev',
        },
    },
    REQUEST_HEADERS: {
        USER_AGENT: {
            FIREFOX_1:
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:88.0) Gecko/20100101 Firefox/88.0',
        },
        ACCEPT: {
            ACCEPT_JSON_TEXT: 'application/json, text/plain, */*',
        },
        ACCEPT_LANGUAGE: {
            EN_US: 'Accept-Language',
        },
        CONNECTION: {
            KEEP_ALIVE: 'keep-alive',
        },
        TE: {
            TRAILERS: 'Trailers',
        },
        CACHE_CONTROL: {
            NO_CACHE: 'no-cache',
        },
    },
    CRON_SCHEDULES: {
        EVERY_5_MINUTES: '*/2 * * * *',
    },
    TZ: {
        IST: 'Asia/Kolkata',
    },
};

export default constants;
