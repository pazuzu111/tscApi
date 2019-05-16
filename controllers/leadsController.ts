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
    
    //create a lead & associated contact at route => '/leads'
    @Post('/leads')
    @OnUndefined(400)
    private async createLead(@Body() body: any, @Res() response: Response) {
        let contactId: any
        let verify: boolean
        let lead = body
        
        //verify input fields
        verify = verifyLead(lead)

        if(!verify) { 
            return response.status(400).json({error: "all fields must be populated"})    
            throw new Error() 
        }

        //check if contact already exist
        // this.contactList.forEach((x: any, index: any) => console.log(x[index]))
       
        for(var key in this.contactList) {
            if(this.contactList[key].contact.email == lead.email) {
                contactId = this.contactList[key].contact.id
                console.log('email: ', contactId)
            }
        }

        //if contact does not exist create contact
        if(!contactId) {
            console.log('contactID: false - create', contactId)
            contactId = uuidv1()
                //mock contact schema
            let contact = {
                id: contactId,
                first_name: lead.name,
                last_name: lead.last_name,
                email: lead.email,
                phone: lead.phone,
                created_at : new Date(),    
                updated_at : new Date()  
            }

            //mock db automated properties
            lead.contact_id = contactId   
            lead.created_at = new Date()    
            lead.updated_at = new Date()  
            
            //save data
            this.leadsList.push({lead})
            this.contactList.push({contact})

            return response.status(201).send(lead) 
        }
        else {  
            console.log('contactID:', contactId)


            //mock db automated properties
            lead.contact_id = contactId   
            lead.created_at = new Date()    
            lead.updated_at = new Date()  
            
            //save data
            this.leadsList.push({lead})

            return response.status(201).send(lead) 
        }
    }
}