import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { company } from '../companyName';
import { invoice } from '../invoiceInfo';
import { bill } from '../billItem';
import { profile} from '../profiles';


@Component({
  
	selector: 'app-invoice',
  
	templateUrl: './invoice.component.html',
  
	styleUrls: ['./invoice.component.css']
	
})


export class InvoiceComponent implements OnInit {

  view:string = 'none';
  profileForm;
  i=0;
  selectedvalue = 'INR';

	allProfiles: profile[] = [
			{text: 'INR', value: 'INR'},
    		{text:'USD', value: 'USD'},
    		{text: 'GBP', value: 'GBP'}
	];
	settings = {
        	bigBanner: false,
        	timePicker: false,
        	format: 'dd-MM-yyyy',
        	defaultOpen: false
    	};
	dated: Date = new Date;

	address: company = {
	name: 'My Company Name',
	address: '23 North St., Ahmedabad, Gujarat',
	email: 'tested@tester.com',
	contact: 1234567890,
	privileged: false
	};
	client: company = {
	name: 'Global Client',
	address: '456 North St., Ahmedabad, Gujarat 380001',
	contact: 9004567890,
	email: 'tested@client.com',
	privileged: true
	};

	invoiceInfo: invoice = {
	number: 4653,
	date: this.dated,
	dueDate: this.dated,
	currency: 'INR'
	};

	billItems: bill[] =  [
            {
                item: "Microsoft Office",
                task: "Microsoft Office suite installation",
                hours: 2,
                rate: 120
            },
            {
                item: "Oracle SQL developer",
                task: "SQL developer installation",
                hours: 1,
                rate: 140
            },
        ];
	
	

	total: number = 0;
	calculatedTotal: number=0;
	discount: number = 7;
	taxes: number = 18;
	deposit: number = 400;
	tempItem: string;
	tempTask: string;
	tempHours: number;
	tempRate: number;

	isSelected(e){
		this.selectedvalue = e.target.value
	}

	getValue(){
		this.total = 0;
		for (let index = 0; index < this.billItems.length; index++) {
			console.log(this.billItems[index].hours);
			this.total += (this.billItems[index].hours * this.billItems[index].rate);
			
		}

	}
	
	privChange(e) {
        // add 5% discount if you have privileged
		if (e.privileged== true) {
			this.discount += 5;
		}
		if (e.privileged==false) {
			this.discount -= 5;
		}
        // subtract 5% discount if you have not privileged
	}

	onSelect(i) {
        //delete selected item from list	
		this.billItems.splice(i,1)
		console.log(this.billItems);
		this.getValue();
		this.calculatetotal();
	}
    
	getSubTotal() : number {
        // Calculate rounded Subtotal
        return this.total;
    }

	calculatetotal():void{
		var temp = this.total;
		temp-= (this.total * this.discount/100.0);
		temp+= (this.total * this.taxes/100.0);
		if(this.deposit<=temp){
			temp-= this.deposit;
		}

		console.log(temp);
        this.calculatedTotal = temp;

	}

	getTotal():number {
        // Calculate rounded Total
		return this.calculatedTotal;
	}
	
  	mouseEnterAddItem():void{
    this.view = 'block';
    }

 	mouseLeaveAddItem(){
        // don't display addItem division
        this.view= 'none';
    }
	
	addItem(data): void {
        // add an item into billItems array
		console.log(data);
		this.billItems.push(data);
		console.log(this.billItems);
		this.getValue();
		this.calculatetotal();
  	}
	  

	constructor() { }

	ngOnInit() {
		this.profileForm= new FormGroup({
			item: new FormControl(''),
			task: new FormControl(''),
			hours: new FormControl(''),
			rate: new FormControl('')
		  });
		  this.getValue()
		  this.calculatetotal();
		}
	

	}
