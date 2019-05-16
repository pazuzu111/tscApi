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
    // @OnUndefined(404)
    @Get('/leads')
    public getLeads(@Req() request: Request, @Res() response: Response): any {
        return response.json(this.leadsList);
    }
    
    //create a lead & associated contact at route => '/leads'
    @Post('/leads')
    // @OnUndefined(400)
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
       
        for(var key in this.contactList) {
            if(this.contactList[key].contact.email == lead.email) {
                contactId = this.contactList[key].contact.id
                console.log('email: ', contactId)
            }
        }

        //if contact does not exist create contact
        if(!contactId) {
            contactId = uuidv1()
            
            //mock contact schema
            let contact = {
                id: contactId,
                first_name: lead.first_name,
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

            //mock db automated properties
            lead.contact_id = contactId   
            lead.created_at = new Date()    
            lead.updated_at = new Date()  
            
            //save data
            this.leadsList.push({lead})

            return response.status(201).send(lead) 
        }
    }

    // @OnUndefined(404)
    @Get('/contacts')
    public getContacts(@Req() request: Request, @Res() response: Response): any {
        return response.json(this.contactList);
    }

    // @OnUndefined(400)
    @Post('/contacts')
    public createContact(@Body() body: any, @Res() response: Response): any {
        let contactId: any
        let verify: any
        let contactBody = body
        let user: boolean = false

         //verify input fields
         verify = verifyLead(contactBody)

         if(!verify) { 
             return response.status(400).json({error: "all fields must be populated"})    
         }
        
        for(var key in this.contactList) {
            if(this.contactList[key].contact.email === contactBody.email) {
                user = true
            }
        }  

        if(!user) {
            console.log("creating contact...", contactBody.email)

            contactId = uuidv1()
            
            //mock contact schema
            let contact = {
                id: contactId,
                first_name: contactBody.first_name,
                last_name: contactBody.last_name,
                email: contactBody.email,
                phone: contactBody.phone,
                created_at : new Date(),    
                updated_at : new Date()  
            }

            this.contactList.push({contact})
            return response.status(201).send(contact)  
        }
        else {
            return response.status(400).json({error: "user already exists"})    
        }
    }
}