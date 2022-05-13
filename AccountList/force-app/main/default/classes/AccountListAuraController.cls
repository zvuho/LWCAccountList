public with sharing class AccountListAuraController{
    @AuraEnabled (cacheable = true)
    public static List<Account> getAccounts1(){
        return [SELECT Name, Phone, LastModifiedBy.Name, Nivel__c FROM Account WHERE Nivel__c = 1 ORDER BY Name];
    }

    @AuraEnabled (cacheable = true)
    public static List<Account> getAccounts2(){
        return [SELECT Name, Phone, LastModifiedBy.Name, Nivel__c FROM Account WHERE Nivel__c = 2 ORDER BY Name];
    }


}