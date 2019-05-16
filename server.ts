import "reflect-metadata"; 
import { createExpressServer } from "routing-controllers";
import cors = require('cors')
import leadsController from './controllers/leadsController'
import contactsController from './controllers/contactsController'

const port = 3001
const app = createExpressServer({
    controllers: [leadsController, contactsController]
});

app.listen(port, () => console.log('fired'))

