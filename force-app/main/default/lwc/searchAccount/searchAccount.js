import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountService.getAccounts';
export default class SearchAccount extends LightningElement {
	@track searchKey;
	@track accounts;
	@track error;
	@track data;

	@wire (getAccounts,{strAccountName: '$searchKey'})
	wiredAccounts({data, error}){
		if(data) {
			this.accounts =data;
			this.error = undefined;
		}else {
			this.accounts =undefined;
			this.error = error;
		}
	}

	handleKeyChange(event){
		this.searchKey = event.target.value;
	}
}