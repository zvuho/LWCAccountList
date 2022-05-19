import { LightningElement, wire } from 'lwc';
import getAccounts1 from '@salesforce/apex/AccountListAuraController.getAccounts1';
import getAccounts2 from '@salesforce/apex/AccountListAuraController.getAccounts2';
import changeLevelAura from '@salesforce/apex/AccountListAuraController.changeLevelAura';
import { refreshApex } from '@salesforce/apex';


const table_columns = [
    {label:'Nombre', fieldName: 'Name', type: 'text' },
    {label:'Teléfono', fieldName: 'Phone', type: 'Phone' },
    {label:'Último en modificarla', fieldName: 'LastModifiedBy.Name', type: 'Name' },
    {label:'Nivel', fieldName: 'Nivel__c', type: 'Checkbox' },

];

export default class AccountList extends LightningElement {

    selAccounts1 = '';
    selAccounts2 = '';

    @wire(getAccounts1) accounts1;
    @wire(getAccounts2) accounts2;    
    columns = table_columns;

    handleclick(){

        var dts = this.template.querySelectorAll('lightning-datatable');
        console.log('dtsss: ', dts);

        var dt1 = dts[0];
        console.log('dt1: ', dt1);

        var selected1 = dt1.getSelectedRows();
        console.log('selected1: ', selected1);
        this.selAccounts1 = JSON.stringify(selected1);
        console.log('selAccounts1: ', this.selAccounts1);

        changeLevelAura({ selectedAccounts : this.selAccounts1 }).then(() => {
            refreshApex(this.accounts1);
        });

        var dt2 = dts[1];
        console.log('dt2: ', dt2);
   
        var selected2 = dt2.getSelectedRows();
        console.log('selected2: ', selected2);
        this.selAccounts2 = JSON.stringify(selected2);
        console.log('selAccounts2: ', this.selAccounts2);
   
        changeLevelAura({ selectedAccounts : this.selAccounts2 }).then(() => {
            refreshApex(this.accounts2);
        });

    }
    
}