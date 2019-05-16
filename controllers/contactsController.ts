import {JsonController, OnUndefined, Req, Res, Get, Post, Body} from "routing-controllers";
import * as contactData from '../data/contacts.json';
import {Request, Response, response} from "express";
import uuidv1 = require('uuid/v1');
import { verifyInput } from '../utils/verifyInput'

@JsonController('/api')
export default class contactsController {
    contactList: any

    constructor() {
        this.contactList = contactData
    }

    @OnUndefined(404)
    @Get('/contacts')
    public getContacts(@Req() request: Request, @Res() response: Response): any {
        return response.json(this.contactList);
    }

    @Post('/contacts')
    public createContact(@Body() body: any, @Res() response: Response): any {
        let contactId: any
        let verify: any
        let contactBody = body
        let user: boolean = false

         //verify input fields
         verify = verifyInput(contactBody)

         if(!verify) { 
             return response.status(400).json({error: "all fields must be populated"})    
         }
        
         //check for existing user
        for(var key in this.contactList) {
            if(this.contactList[key].contact.email === contactBody.email) {
                user = true
            }
        }  

        //if user does not exist create one
        if(!user) {

            //generate unique id
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

            //save data
            this.contactList.push({contact})
            
            return response.status(201).send(contact)  
        }
        else {
            return response.status(400).send({error: "user already exists"})    
        }
    }
}