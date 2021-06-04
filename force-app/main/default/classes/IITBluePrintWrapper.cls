public class IITBluePrintWrapper {
    
    boolean SuccessfulLookup = True;
    string ConnectionMessage;
  string AdvisorComments = '';
    contact ContactVar = new contact();
    list<IIT_Student_Blueprint__c> BluePrintList = new list<IIT_Student_Blueprint__c>();
    
    
    public void getBlueprintWrapperData(string UserId)
    {
        list<contact> MatchingContactList = new list<contact>();
        list<User> MatchingUserList = new list<User>();
        try {
            
            MatchingUserList = [SELECT ID, ContactId from User where 
            ID = :UserId];

            MatchingContactList = [SELECT ID, Name,IIT_Comments_from_Advisor__c from Contact where 
            ID = :MatchingUserList[0].ContactId];

            if(MatchingContactList.size() != 1)
            {
                SuccessfulLookup = False;
                ConnectionMessage = 'Account not found.';
            }
            else
            {
                ContactVar = MatchingContactList[0];
                AdvisorComments = ContactVar.IIT_Comments_from_Advisor__c;
                BluePrintList = [SELECT ID,Contact__c,Academic_Year__c,IIT_Academic_Year_formulaText__c,
                                IIT_guagediv_data_id1__c,IIT_guagediv_data_id2__c,IIT_guagediv_data_id3__c,
                                IIT_guagecanvas_data_id1__c,IIT_guagecanvas_data_id2__c,IIT_guagecanvas_data_id3__c,
			                    IIT_Total_Committed_Hours_fall__c, IIT_Total_Committed_Hours_spring__c, 
            			        IIT_Total_Committed_Hours_sumwin__c, IIT_Courses_Total_hours_committed_fall__c,
                                IIT_Courses_Total_hours_committed_spring__c, IIT_Courses_Total_hours_committed_sumwin__c,
                                IIT_Elevate_Total_hours_committed_fall__c, IIT_Elevate_Total_hours_committed_spring__c,
                                IIT_Elevate_Total_hours_committed_sumwin__c from IIT_Student_Blueprint__c 
                                where Contact__c = :MatchingContactList[0].ID order by Academic_Year__c ASC Limit 5];
                if (BluePrintList.size() != 5)
                {
                    SuccessfulLookup = False;
                }
                
            }
            
        } catch (Exception e) {
            SuccessfulLookup = False;
            throw new AuraHandledException(e.getMessage());
        }        
    }
    
}