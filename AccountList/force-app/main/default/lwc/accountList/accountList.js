import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountListAuraController.getAccounts';

const table_columns = [
    {label:'Name', fieldName: 'Name', type: 'text' },
    {label:'Website', fieldName: 'Website', type: 'url' },
    {label:'Description', fieldName: 'Description', type: 'text' },
];

export default class AccountList extends LightningElement {

    columns = table_columns;


    @wire(getAccounts) accounts;

}