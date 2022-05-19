@isTest
private class AccountListAuraControllerTest {


    @isTest static void getAccounts1 (){
		Account acc1 = new Account(Name='Test Account1', Nivel__c=1);
		Account acc2 = new Account(Name='Test Account2', Nivel__c=2);
        insert acc1;
        insert acc2;
        
        Test.startTest();
        List<Account> accsLevel1 = AccountListAuraController.getAccounts1 ();
        Test.stopTest();
        integer expectedSize = [SELECT Nivel__c FROM Account WHERE Nivel__c = 1].size(); 
        System.assertEquals(expectedSize, accsLevel1.size(), 'the method is not returning the right accounts');
    }
    
    @isTest static void getAccounts2 (){
		Account acc1 = new Account(Name='Test Account1', Nivel__c=1);
		Account acc2 = new Account(Name='Test Account2', Nivel__c=2);
        insert acc1;
        insert acc2;
        
        Test.startTest();
        List<Account> accsLevel2 = AccountListAuraController.getAccounts2 ();
        Test.stopTest();
        integer expectedSize = [SELECT Nivel__c FROM Account WHERE Nivel__c = 2].size(); 
        System.assertEquals(expectedSize, accsLevel2.size(), 'the method is not returning the right accounts');
    }
    
    @isTest static void changeLevels1to2 (){
        
		Account acc1 = new Account(Name='Test Account1', Nivel__c=1);
		Account acc2 = new Account(Name='Test Account2', Nivel__c=2);
        insert acc1;
        insert acc2;
        List<Account> accsLevel1 = AccountListAuraController.getAccounts1 ();
        List<Account> accsLevel2 = AccountListAuraController.getAccounts2 ();
        integer expectedSize = accsLevel1.size() + accsLevel2.size();
		List<string> accsToChange1 = new List<string>();
        for(Account a : accsLevel1){
            accsToChange1.add(a.id);
        } 
        Test.startTest();
        AccountListAuraController.changeLevels(accsToChange1);
        Test.stopTest();
        integer actualSize = [SELECT Nivel__c FROM Account WHERE Nivel__c = 2].size(); 
        System.assertEquals(expectedSize, actualSize, 'level change 1 to 2 error');
    }    
        
        @isTest static void changeLevels2to1 (){
		Account acc1 = new Account(Name='Test Account1', Nivel__c=1);
		Account acc2 = new Account(Name='Test Account2', Nivel__c=2);
        insert acc1;
        insert acc2;
        List<Account> accsLevel1 = AccountListAuraController.getAccounts1 ();
        List<Account> accsLevel2 = AccountListAuraController.getAccounts2 ();
        integer expectedSize = accsLevel1.size() + accsLevel2.size();
		List<string> accsToChange2 = new List<string>();
        for(Account a : accsLevel2){
            accsToChange2.add(a.id);
        }

        Test.startTest();
        AccountListAuraController.changeLevels(accsToChange2);

        Test.stopTest();
        integer actualSize = [SELECT Nivel__c FROM Account WHERE Nivel__c = 1].size(); 
        System.assertEquals(expectedSize, actualSize, 'level change 2 to 1 error');
    } 
}