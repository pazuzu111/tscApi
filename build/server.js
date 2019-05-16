"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var routing_controllers_1 = require("routing-controllers");
var leadsController_1 = require("./controllers/leadsController");
var contactsController_1 = require("./controllers/contactsController");
var port = 3001;
var app = routing_controllers_1.createExpressServer({
    controllers: [leadsController_1.default, contactsController_1.default]
});
app.listen(port, function () { return console.log('fired'); });
//# sourceMappingURL=server.js.map