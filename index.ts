import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import cors = require('cors')



export default class ServerIndex extends Server {
    constructor() {
        super()

        // Setup middleware
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true})); 
        this.app.use(cors())   
    }

    private port: Number = 3001 
    private readonly healthCheckMsg: String = `server live on port: ${this.port} `;


    public start(): void {
        this.app.listen(this.port, () => {
            console.log(this.healthCheckMsg);
        });    
    }
}

