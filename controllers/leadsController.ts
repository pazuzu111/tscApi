import {JsonController, OnUndefined, Req, Res, Get, Post, Body} from "routing-controllers";
import * as leadsData from '../data/leads.json';
import * as contactData from '../data/contacts.json';
import {Request, Response, response} from "express";
import uuidv1 = require('uuid/v1');
import { verifyLead } from '../utils/verifyLeadFields'

@JsonController('/api')
export default class leadsController {
    leadsList: any
    contactList: any

    constructor() {
        this.leadsList = leadsData
        this.contactList = contactData
    }
    
    //get all leads at route => '/leads'
    @Get('/leads')
    public getLeads(@Req() request: Request, @Res() response: Response): any {
        return response.json(this.leadsList);
    }
}