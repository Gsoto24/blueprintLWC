public class IITBluePrintWrapper {
    
    boolean SuccessfulLookup = True;
    string ConnectionMessage;
  string AdvisorComments = '';
    contact ContactVar = new contact();
    list<IIT_Student_Blueprint__c> BluePrintList = new list<IIT_Student_Blueprint__c>();
    
    
    public void getBlueprintWrapperData(string BannerID, Date DOB)
    {
        list<contact> MatchingContactList = new list<contact>();
        try {
            MatchingContactList = [SELECT ID, Name,IIT_Comments_from_Advisor__c from Contact where 
            TargetX_SRMb__BannerID__c = :BannerID AND Birthdate = :DOB ];
            if(MatchingContactList.size() != 1)
            {
        SuccessfulLookup = False;
                ConnectionMessage = 'Banner ID was not found.';
            }
            else
            {
        ContactVar = MatchingContactList[0];
                AdvisorComments = ContactVar.IIT_Comments_from_Advisor__c;
                BluePrintList = [SELECT ID,Academic_Year__c,IIT_Academic_Year_formulaText__c,
                                IIT_guagediv_data_id1__c,IIT_guagediv_data_id2__c,IIT_guagediv_data_id3__c,
                                IIT_guagecanvas_data_id1__c,IIT_guagecanvas_data_id2__c,IIT_guagecanvas_data_id3__c,
			                    IIT_Total_Committed_Hours_fall__c, IIT_Total_Committed_Hours_spring__c, 
            			        IIT_Total_Committed_Hours_sumwin__c, IIT_Courses_Total_hours_committed_fall__c,
                                IIT_Courses_Total_hours_committed_spring__c, IIT_Courses_Total_hours_committed_sumwin__c,
                                IIT_Elevate_Total_hours_committed_fall__c, IIT_Elevate_Total_hours_committed_spring__c,
                                IIT_Elevate_Total_hours_committed_sumwin__c from IIT_Student_Blueprint__c 
			                    where Contact__c = :ContactVar.ID order by Academic_Year__c ASC Limit 5];
                
            }
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }        
    }
    
}