"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import Constants from './src/constants';
const utils_1 = require("./src/utils");
const app = express_1.default();
app.use(express_1.default.json());
app.get('/status', (request, response) => {
    response.status(200).send({ success: true });
});
// if (process.env.APP_ENV === Constants.APP_ENV.DEVELOPMENT) {
//     const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
//     const HOST = process.env.HOST ? process.env.HOST : 'localhost';
//     app.listen(PORT, HOST, () => {
//         logger.info(`Started server on HOST: ${HOST}, at PORT: ${PORT}`);
//     });
// }
const port = process.env.PORT || 8080;
app.listen(port, () => {
    utils_1.logger.info(`CowinNotifyServer: listening on port ${port}`);
});
//# sourceMappingURL=server.js.map