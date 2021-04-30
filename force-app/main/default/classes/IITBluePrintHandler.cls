public with sharing class IITBluePrintHandler{

    @AuraEnabled
    public static string getBlueprintData(string BannerID, date DOB){
        IITBluePrintWrapper BluePrintWrapperObj = new IITBluePrintWrapper();
        system.debug(DOB);
        BluePrintWrapperObj.getBlueprintWrapperData(BannerID, DOB);
        return JSON.serialize(BluePrintWrapperObj);
    }

}