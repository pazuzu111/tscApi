import { Controller, Post, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('/api/leads')
export default class leadsController {
    
    //get all leads at route => '/'
    @Get()
    public getLeads(req: Request, res: Response): void {
    
    }
    
    //create a lead at route => 'lead'
    @Post('leads')
    private createLead(req: Request, res: Response): void {

    }

}