public with sharing class AccountListAuraController{
    
    @AuraEnabled (cacheable = true)
    public static List<Account> getAccounts1(){
        return [SELECT Name, Phone, LastModifiedBy.Name, Nivel__c FROM Account WHERE Nivel__c = 1 ORDER BY Name];
    }
    
    @AuraEnabled (cacheable = true)
    public static List<Account> getAccounts2(){
        return [SELECT Name, Phone, LastModifiedBy.Name, Nivel__c FROM Account WHERE Nivel__c = 2 ORDER BY Name];
    }
    
    @AuraEnabled
    public static void changeLevelAura(Object selectedAccounts){
        
        if(selectedAccounts != null){
        system.debug('object ' + selectedAccounts);
        string selaccsStr = string.valueOf(selectedAccounts);
        system.debug('selaccsStr ' + selaccsStr);
        List<Account> accs = (List<Account>)JSON.deserialize(selaccsStr, List<Account>.class);
        system.debug('accs ' + accs);

        for (Account a : accs){
            changeALevel (a);
        }
        update accs;
        }
    }
    
    
    private static void changeALevel(Account a){
        
        if (a != null){
            
            if ( a.Nivel__c == 1 ) a.Nivel__c = 2;
            else if ( a.Nivel__c == 2 ) a.Nivel__c = 1;
        }
    }
}