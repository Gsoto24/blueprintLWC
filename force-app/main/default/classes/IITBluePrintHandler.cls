public with sharing class IITBluePrintHandler{

    @AuraEnabled
    public static string getBlueprintData(string UserId){
        IITBluePrintWrapper BluePrintWrapperObj = new IITBluePrintWrapper();
        BluePrintWrapperObj.getBlueprintWrapperData(UserId);
        return JSON.serialize(BluePrintWrapperObj);
    }
    
    public static void SetUserAndBpRelationship(list <Contact> newContactList, Map<ID, Contact> oldContactMap, IITTriggerContext triggerContext){
        
        if(triggerContext == IITTriggerContext.AFTER_UPDATE)
        {
		//Getting list of contacts to activate for BP
        list<Contact> newContactList_ToActivate = new list<Contact>();

		//Loop to build values for newContactList_ToActivate
        for (Contact ContactRecord: newContactList) {
            
            //Varibale storing the old contact record retrieved from oldContactMap
            //**May need to add validation to exclude for contacts with bp records already present or missing key contact values
            Contact oldContactRecord = new Contact();
            oldContactRecord = oldContactMap.get(ContactRecord.Id);
            
            if(oldContactRecord.IIT_Blueprint_Activation__c == False && ContactRecord.IIT_Blueprint_Activation__c == TRUE){
                newContactList_ToActivate.add(ContactRecord);
            }
            
        }            

		//Process logic for only contacts that are getting activated            
        if (newContactList_ToActivate.size() > 0 ) {
			list<Contact> newContactList_ToActivateNoUserRecord = new list<Contact>();
            list<Contact> newContactList_ToActivateNoBPRecord = new list<Contact>();
            
            list<User> UserRecordsToCreateList = new list<User>();
			list<IIT_Student_Blueprint__c> BlueprintRecordsToCreateList = new list<IIT_Student_Blueprint__c>();
            
            //This section reviews the contact records to update if they already have User records, if not place them into newContactList_ToActivateNoUserRecord
			list<User> UserRecordList = [select id, ContactId from User where ContactId in :newContactList_ToActivate];

            list<ID> ContactIDRelatedToUserList = new list<ID>();
            for (User UserRecord:UserRecordList)
            {
                ContactIDRelatedToUserList.add(UserRecord.ContactId);
            }
            
            for(Contact ContactRecord: newContactList_ToActivate){
                if (!ContactIDRelatedToUserList.contains(ContactRecord.ID))
                {
                    newContactList_ToActivateNoUserRecord.add(ContactRecord);
                }
            }
            
            //This section reviews the contact records if they already have BP records, if not place them into newContactList_ToActivateNoBPRecord
			list<IIT_Student_Blueprint__c> BPList = [select id, Contact__c from IIT_Student_Blueprint__c where Contact__c in :newContactList_ToActivate ];            
            set<ID> ContactIDswithBPSet = new set<ID>();
           
            for (IIT_Student_Blueprint__c BP: BPList)
            {
                ContactIDswithBPSet.add(BP.Contact__c);
            }
            
            for(Contact ContactRecord: newContactList_ToActivate){
                if (!ContactIDswithBPSet.contains(ContactRecord.ID))
                {
                    newContactList_ToActivateNoBPRecord.add(ContactRecord);
                }                
            }
            
            //This section creates User Records for newContactList_ToActivateNoUserRecord
            for (Contact ContactRecord: newContactList_ToActivateNoUserRecord)
            {
                User UserRecord = new User();
				String LastNameShortened;
                if(ContactRecord.LastName.length()<4)
                {
                    LastNameShortened = ContactRecord.LastName;
                }
                else
                {
                    LastNameShortened = (ContactRecord.LastName).substring(0,4);
                }
                
	            UserRecord.firstName = ContactRecord.FirstName;
	            UserRecord.lastName = ContactRecord.LastName;
	            UserRecord.ContactId = ContactRecord.Id;
	            UserRecord.Username = ContactRecord.IIT_IIT_Email__c;
	            UserRecord.Email = ContactRecord.IIT_IIT_Email__c;
	            UserRecord.CommunityNickname = (ContactRecord.FirstName).substring(0,1) + LastNameShortened +'-'+ContactRecord.IIT_IIT_Email__c;
				UserRecord.Alias = (ContactRecord.FirstName).substring(0,1) + LastNameShortened;
                UserRecord.TimeZoneSidKey = 'America/Chicago'; // Required
                UserRecord.LocaleSidKey = 'en_US'; // Required
                UserRecord.EmailEncodingKey = 'ISO-8859-1'; // Required
                UserRecord.LanguageLocaleKey = 'en_US'; // Required
                UserRecord.ProfileId = '00ej0000001G6JF';
                
                UserRecordsToCreateList.add(UserRecord);
                
            }
            
            for (Contact ContactRecord: newContactList_ToActivateNoBPRecord)
            {
				
//                BP Year 1
				IIT_Student_Blueprint__c BPRecord1 = new IIT_Student_Blueprint__c();              
                BPRecord1.Contact__c = ContactRecord.Id;
                BPRecord1.Academic_Year__c = system.Today();
                BPRecord1.Blueprint_Index__c = 1;
                BlueprintRecordsToCreateList.add(BPRecord1);
                
//                BP Year 2                    
                IIT_Student_Blueprint__c BPRecord2 = new IIT_Student_Blueprint__c();
                BPRecord2.Contact__c = ContactRecord.Id;
                BPRecord2.Academic_Year__c = system.Today().addYears(1);
                BPRecord2.Blueprint_Index__c = 2;
                BlueprintRecordsToCreateList.add(BPRecord2);                
                

//                BP Year 3
                IIT_Student_Blueprint__c BPRecord3 = new IIT_Student_Blueprint__c();
				BPRecord3.Contact__c = ContactRecord.Id;
                BPRecord3.Academic_Year__c = system.Today().addYears(2);              
                BPRecord3.Blueprint_Index__c = 3;
                BlueprintRecordsToCreateList.add(BPRecord3);                

//                BP Year 4                    
                IIT_Student_Blueprint__c BPRecord4 = new IIT_Student_Blueprint__c();
				BPRecord4.Contact__c = ContactRecord.Id;
                BPRecord4.Academic_Year__c = system.Today().addYears(3);              
				BPRecord4.Blueprint_Index__c = 4;                
                BlueprintRecordsToCreateList.add(BPRecord4);                
                    
//                BP Year 5                    
                IIT_Student_Blueprint__c BPRecord5 = new IIT_Student_Blueprint__c();
				BPRecord5.Contact__c = ContactRecord.Id;
                BPRecord5.Academic_Year__c = system.Today().addYears(4);
				BPRecord5.Blueprint_Index__c = 5;                
                BlueprintRecordsToCreateList.add(BPRecord5);                                
                                
            }
//            DML Statements
			insert UserRecordsToCreateList;
            insert BlueprintRecordsToCreateList;            
            
        }            
            
        }
    }

}