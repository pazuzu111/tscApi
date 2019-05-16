import * as express from 'express';
import * as bodyParser from 'body-parser';
import "reflect-metadata"; // this shim is required
import {createExpressServer} from "routing-controllers";
import cors = require('cors')
import leadsController from './controllers/leadsController'

const port = 3001
const app = createExpressServer({
    controllers: [leadsController] // we specify controllers we want to use
});

app.listen(port, () => {
    console.log('fired')
})

