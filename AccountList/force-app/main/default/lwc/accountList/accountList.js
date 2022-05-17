import { LightningElement, wire } from 'lwc';
import getAccounts1 from '@salesforce/apex/AccountListAuraController.getAccounts1';
import getAccounts2 from '@salesforce/apex/AccountListAuraController.getAccounts2';
import changeLevelAura from '@salesforce/apex/AccountListAuraController.changeLevelAura';

const accIds = [];

const table_columns = [
    {label:'Nombre', fieldName: 'Name', type: 'text' },
    {label:'Teléfono', fieldName: 'Phone', type: 'Phone' },
    {label:'Último en modificarla', fieldName: 'LastModifiedBy.Name', type: 'Name' },
    {label:'Nivel', fieldName: 'Nivel__c', type: 'Checkbox' },

];

export default class AccountList extends LightningElement {


    @wire(getAccounts1) accounts1;
    @wire(getAccounts2) accounts2;
    @wire(changeLevelAura, { selectedAccounts }) changeLevelAura;
    
    columns = table_columns;

    handleclick(){
        var el = this.template.querySelector('lightning-datatable');
        var selected = el.getSelectedRows();
        console.log(selected);
        changeLevelAura({selectedAccounts : selected});
    }
    
}
