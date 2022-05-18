import { LightningElement, api, wire } from 'lwc';
import getApexData from '@salesforce/apex/BodyTableController.getData';
import makeAccountActive from '@salesforce/apex/BodyTableController.makeAccountActive';
import { refreshApex } from '@salesforce/apex';

const columns = [
    { label: 'Name', fieldName: 'name' },
    { label: 'AccountNumber', fieldName: 'accNum'},
];

export default class BodyTableComponent extends LightningElement {
    apexData;
    columns = columns;
    error;

    setOfIds = new Set();
    selectedRows = [];
    @api pageNumber = 0;

    @wire(getApexData, { pageNumber: '$pageNumber' })
    wiredInfo({ error, data }) {
        if (data) {
            this.apexData = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.apexData = undefined;
        }
    }

    getSelectedName(event) {
        const selectedRows = event.detail.selectedRows;
        console.log('selectedRows --> ' + JSON.stringify(selectedRows));
        for (let i = 0; i < selectedRows.length; i++){
            this.setOfIds.add(selectedRows[i].id);
        }        
    }

    handleActivate(){
        if(this.setOfIds.size > 0 ){
            let recIdList =  Array.from(this.setOfIds);
            makeAccountActive({accIds: recIdList })
                .then((result) => {
                    if(result){
                        // Need to refresh the view again
                        refreshApex(this.apexData)
                    }
                    this.error = undefined;
                })
                .catch((error) => {
                    this.error = error;
                });
        }
    }

}