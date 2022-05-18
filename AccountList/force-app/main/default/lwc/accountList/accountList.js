import { LightningElement, wire } from 'lwc';
import getAccounts1 from '@salesforce/apex/AccountListAuraController.getAccounts1';
import getAccounts2 from '@salesforce/apex/AccountListAuraController.getAccounts2';
import changeLevelAura from '@salesforce/apex/AccountListAuraController.changeLevelAura';


const table_columns = [
    {label:'Nombre', fieldName: 'Name', type: 'text' },
    {label:'Teléfono', fieldName: 'Phone', type: 'Phone' },
    {label:'Último en modificarla', fieldName: 'LastModifiedBy.Name', type: 'Name' },
    {label:'Nivel', fieldName: 'Nivel__c', type: 'Checkbox' },

];

export default class AccountList extends LightningElement {

    searchKey = '';

    @wire(getAccounts1) accounts1;
    @wire(getAccounts2) accounts2;    
    columns = table_columns;

    handleclick(){
        var el = this.template.querySelector('lightning-datatable');
        var selected = el.getSelectedRows();
        console.log(selected);
        this.searchKey = JSON.stringify(selected);
        console.log(this.searchKey);

        changeLevelAura({ selectedAccounts : '$searchKey' })
           .then(result => {
               if(result){
                   console.log(result);
               }
           })
           .catch(error => {
               console.log('Error: ', error);
           })

    }
    
}
