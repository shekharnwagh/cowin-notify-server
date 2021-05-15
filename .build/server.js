"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./src/routes/router"));
const utils_1 = require("./src/utils");
const constants_1 = __importDefault(require("./src/common/constants"));
const app = express_1.default();
app.use(express_1.default.json());
app.use('/api', router_1.default);
if (process.env.APP_ENV === constants_1.default.APP_ENV.DEVELOPMENT) {
    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
    const HOST = process.env.HOST ? process.env.HOST : 'localhost';
    app.listen(PORT, HOST, () => {
        utils_1.logger.info(`Started server on HOST: ${HOST}, at PORT: ${PORT}`);
    });
}
const port = process.env.PORT || 8080;
app.listen(port, () => {
    utils_1.logger.info(`CowinNotifyServer: listening on port ${port}`);
});
//# sourceMappingURL=server.js.map