"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
if (process.argv[2] !== 'test') {
    var server = new index_1.default();
    server.start();
}
//# sourceMappingURL=server.js.map