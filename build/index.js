"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var bodyParser = require("body-parser");
var core_1 = require("@overnightjs/core");
var cors = require("cors");
var ServerIndex = (function (_super) {
    tslib_1.__extends(ServerIndex, _super);
    function ServerIndex() {
        var _this = _super.call(this) || this;
        _this.port = 3001;
        _this.healthCheckMsg = "server live on port: " + _this.port + " ";
        _this.app.use(bodyParser.json());
        _this.app.use(bodyParser.urlencoded({ extended: true }));
        _this.app.use(cors());
        return _this;
    }
    ServerIndex.prototype.start = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log(_this.healthCheckMsg);
        });
    };
    return ServerIndex;
}(core_1.Server));
exports.default = ServerIndex;
//# sourceMappingURL=index.js.map