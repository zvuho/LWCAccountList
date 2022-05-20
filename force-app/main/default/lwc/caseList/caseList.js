import { LightningElement, wire } from 'lwc';
import getCasesWeb from '@salesforce/apex/CaseListAuraController.getCasesWeb';
import getCasesPhone from '@salesforce/apex/CaseListAuraController.getCasesPhone';
import getCasesEmail from '@salesforce/apex/CaseListAuraController.getCasesEmail';
import changeOriginAura from '@salesforce/apex/CaseListAuraController.changeOriginAura';
import { refreshApex } from '@salesforce/apex';


const table_columns = [
    {label:'Número', fieldName: 'CaseNumber', type: 'Auto Number' },
    {label:'Descripcion', fieldName: 'Description', type: 'Long Text Area' },
    {label:'Origen', fieldName: 'Origin', type: 'Picklist' },

];

export default class CaseList extends LightningElement {
    value = 'Web';

    get options() {
        return [
            { label: 'Web', value: 'Web' },
            { label: 'Teléfono', value: 'Phone' },
            { label: 'Email', value: 'Email' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }

    selCasesWeb = '';
    selCasesPhone = '';
    selCasesEmail = '';

    @wire(getCasesEmail) casesEmail;
    @wire(getCasesPhone) casesPhone;
    @wire(getCasesWeb) casesWeb;
    columns = table_columns;

    handleclick(){
        console.log('handleclick');

        var dts = this.template.querySelectorAll('lightning-datatable');
        console.log('dts: ', dts);

        var dt0 = dts[0];
        console.log('dt0: ', dt0);

        var selectedPhone = dt0.getSelectedRows();
        console.log('selectedPhone: ', selectedPhone);
        this.selCasesPhone = JSON.stringify(selectedPhone);
        console.log('selCasesPhone: ', this.selCasesPhone);

        changeOriginAura({ selectedCases : this.selCasesPhone , origin : this.value}).then(() => {
            console.log('inPhone');
            refreshApex(this.casesEmail);
            refreshApex(this.casesPhone);
            refreshApex(this.casesWeb);
            
            dt0.selectedRows=[];
            dt1.selectedRows=[];
            dt2.selectedRows=[];
        });


        var dt1 = dts[1];
        console.log('dt1: ', dt1);

        var selectedWeb = dt1.getSelectedRows();
        console.log('selectedWeb: ', selectedWeb);
        this.selCasesWeb = JSON.stringify(selectedWeb);
        console.log('selCasesWeb: ', this.selCasesWeb);

        changeOriginAura({ selectedCases : this.selCasesWeb , origin : this.value}).then(() => {
            console.log('inWeb');
            refreshApex(this.casesEmail);
            refreshApex(this.casesPhone);
            refreshApex(this.casesWeb);
            dt0.selectedRows=[];
            dt1.selectedRows=[];
            dt2.selectedRows=[];
        });


        var dt2 = dts[2];
        console.log('dt2: ', dt2);

        var selectedEmail = dt2.getSelectedRows();
        console.log('selectedEmail: ', selectedEmail);
        this.selCasesEmail = JSON.stringify(selectedEmail);
        console.log('selCasesEmail: ', this.selCasesEmail);

        changeOriginAura({ selectedCases : this.selCasesEmail , origin : this.value}).then(() => {
            console.log('inEmail');
            refreshApex(this.casesEmail);
            refreshApex(this.casesPhone);
            refreshApex(this.casesWeb);
            dt0.selectedRows=[];
            dt1.selectedRows=[];
            dt2.selectedRows=[];
        });


    }
    
}