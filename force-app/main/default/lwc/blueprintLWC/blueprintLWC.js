import { LightningElement,track,wire,api } from 'lwc';
import {createRecord, getRecord} from "lightning/uiRecordApi";
import getBlueprintData from  '@salesforce/apex/IITBluePrintHandler.getBlueprintData'
import GaugeJS from '@salesforce/resourceUrl/GaugeJS';
import { loadScript } from 'lightning/platformResourceLoader';
import { loadStyle } from 'lightning/platformResourceLoader';
import CUSTOM_CSS from '@salesforce/resourceUrl/BlueprintCSS';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import BlueprintCourseHrs_LOGO from '@salesforce/resourceUrl/BlueprintCourseHrs';
import BlueprintElevateHrs_LOGO from '@salesforce/resourceUrl/BlueprintElevateHrs';
import BlueprintWellnessHrs_LOGO from '@salesforce/resourceUrl/BlueprintWellnessHrs';
import Blueprint_LOGO from '@salesforce/resourceUrl/StudentBlueprintLogo';
import UserId_var from '@salesforce/user/Id';



export default class BlueprintLWC extends LightningElement {
    BlueprintCourseHrs_IMG = BlueprintCourseHrs_LOGO;
    BlueprintElevateHrs_IMG = BlueprintElevateHrs_LOGO;
    BlueprintWellnessHrs_IMG = BlueprintWellnessHrs_LOGO;
    Blueprint_LOGO = Blueprint_LOGO;
    UserId_var = UserId_var;
    @api isLoaded = false;
    @track AcademicYearsList = [];
    @track AcademicYearsToDisplay = [];
    @track AcademicYearsOptionMap = {};
    // @track contactBannerID = null;
    // @track contactDOB = new Date(); 
    @track contactVerified = false;
    @track contactNotVerified = false;     
    @track detailBlockVisible = false;
    @track AdvisorCommentsPresent = false;
    @track isMobile = false;

    @track TotalHoursArray = [];
    @track TotalHoursMap = {};
    // Constant set to 84 hours for wellness - sleeping/eating/exercising etc. 
    wellnessHours = 84;

    @track ReactiveGauage1 = null;
    @track gauge1 = null;
    @track gauge2 = null;
    @track gauge3 = null;
    
    @track gauge4 = null;
    @track gauge5 = null;
    @track gauge6 = null;

    @track gauge7 = null;
    @track gauge8 = null;
    @track gauge9 = null;
    
    @track gauge10 = null;
    @track gauge11 = null;
    @track gauge12 = null;        

    @track gauge13 = null;
    @track gauge14 = null;
    @track gauge15 = null;        
    
    @track responseJSON;
    @track isModalOpen = false;
    
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }    

    showToast()
    {
        this.isLoaded = true;
        const event = new ShowToastEvent({
            title: 'Saved!',
            variant: 'success',
        });
        this.dispatchEvent(event);
        
    }


    get options() {
        this.AcademicYearsOptionMap = this.AcademicYearsList.map(x => {            
            return({label: x, value: x});
          });
          return this.AcademicYearsOptionMap;
    }

    // showSpinner() is called upon a loading event to show an animation and block the user from making any updates.
    showSpinner()
    {
        this.isLoaded = false;
    }

    // updageGaugeData() is called after a BP save event - runs to recalculate gauges and rerender
    updageGaugeData(event)
    {
        var delayInMilliseconds = 1000; //1.5 second
        // var Scope_BannerID = this.contactBannerID;
        // var Scope_DOB = this.contactDOB;
        var Scope = this;

        setTimeout(function() {
            
            getBlueprintData({UserId:UserId_var}).then(response=>{

                Scope.responseJSON = JSON.parse(response);
                var WellnessHours = Scope.wellnessHours;
                Scope.responseJSON.BluePrintList.forEach(function (item, index) {
                    item.TotalHours_Fall = item.IIT_Total_Committed_Hours_fall__c + WellnessHours;
                    item.TotalHours_Spring = item.IIT_Total_Committed_Hours_spring__c + WellnessHours;
                    item.TotalHours_SumWin = item.IIT_Total_Committed_Hours_sumwin__c + WellnessHours;
                  });                   
                if(Scope.responseJSON.SuccessfulLookup == true)
                {
                    Scope.isLoaded = true;
                    Scope.contactVerified = true;
                    const event = new ShowToastEvent({
                        title: 'Saved!',
                        variant: 'success',
                    });
                    this.dispatchEvent(event);              
                }
            }).catch(error =>{
                console.error(error);
                Scope.isLoaded = true;
            })          

        }, delayInMilliseconds);

    }
    // setBannerID(event)
    // {
    //     this.contactBannerID = event.target.value;
    // }
    // setDOB(event)
    // {
    //     this.contactDOB = event.target.value;
    // }
    

    contactLookupHandler()
    {
        var Scope = this;
        var delayInMilliseconds = 7000;
        Scope.isLoaded = false;
        //Set a timeout for loading the page 
        setTimeout(function() { 
            Scope.isLoaded = true;
            Scope.AcademicYearsToDisplay = [];
        }, delayInMilliseconds);

        // Call apex class to get BP records using the userID from @salesforce/user/Id
        getBlueprintData({UserId:UserId_var}).then(response=>{

            var WellnessHours = this.wellnessHours;
            this.responseJSON = JSON.parse(response);

            // Updaing the responseJSON response to account for WellnessHours
            this.responseJSON.BluePrintList.forEach(function (item, index) {
                item.TotalHours_Fall = item.IIT_Total_Committed_Hours_fall__c + WellnessHours;
                item.TotalHours_Spring = item.IIT_Total_Committed_Hours_spring__c + WellnessHours;
                item.TotalHours_SumWin = item.IIT_Total_Committed_Hours_sumwin__c + WellnessHours;
              });            
            
            // On successful json response
            if(this.responseJSON.SuccessfulLookup == true)
            {
                // Placeing each IIT_Academic_Year_formulaText__c in list to open accordion view - The accordion needs to have these open breifly so the gauge.js renders.
                this.responseJSON.BluePrintList.forEach(function (item, index) {
                    Scope.AcademicYearsList.push(item.IIT_Academic_Year_formulaText__c);
                  });
                Scope.AcademicYearsToDisplay = Scope.AcademicYearsList;
                this.contactVerified = true;                
            }
            // On failed json response
            else{
                    this.contactVerified = false;
                    this.contactNotVerified = true;
                    this.isLoaded = true;
                    const event = new ShowToastEvent({
                        title: 'Access Not Granted',
                        message:'If you belive you have encountered an error please contact studentsystem@iit.edu',
                        variant: 'error',
                    });
                    this.dispatchEvent(event);
            }
        }).catch(error =>{
            console.error(error);
        })
        
    }
    
    viewDetail(event)
    {
        this.detailBlockVisible = true;
    }
    viewGlobal(event)
    {
        this.detailBlockVisible = false;
    }
    
    // This is called once the lwc loads
    renderedCallback() {

        if (this.contactVerified == true)
        {
            Promise.all([
                loadScript(this, GaugeJS),
                loadStyle(this, CUSTOM_CSS)
              ]).then(() => {
                //   setting data for gauges
                  var opts = {
                    angle: 0.15, // The span of the gauge arc
                    lineWidth: 0.44, // The line thickness
                    radiusScale: 1, // Relative radius
                    pointer: {
                      length: 0.6, // // Relative to gauge radius
                      strokeWidth: 0.035, // The thickness
                      color: '#000000' // Fill color
                    },
                    limitMax: false,     // If false, max value increases automatically if value > maxValue
                    limitMin: false,     // If true, the min value of the gauge will be fixed
                    colorStart: '#11DA4E',   // Colors
                    colorStop: '#11DA4E',    // just experiment with them
                    strokeColor: '#E0E0E0',  // to see which ones work best for you
                    generateGradient: true,
                    highDpiSupport: true,     // High resolution support
                    staticLabels: {
                        font: "10px sans-serif",  // Specifies font
                        labels: [0, 40, 80, 120, 168],  // Print labels at these values
                        color: "#000000",  // Optional: Label text color
                        fractionDigits: 0  // Optional: Numerical precision. 0=round off.
                      },
                      percentColors: [[0.0, "#11DA4E" ], [0.85, "#11DA4E"],[.88, "#FFDD00"], [.95, "#ff0000"]],
                  };
                  var target1 = this.template.querySelector('[data-id="guageJS_1"]');
                  var target2 = this.template.querySelector('[data-id="guageJS_2"]');
                  var target3 = this.template.querySelector('[data-id="guageJS_3"]');

                  var target4 = this.template.querySelector('[data-id="guageJS_4"]');
                  var target5 = this.template.querySelector('[data-id="guageJS_5"]');
                  var target6 = this.template.querySelector('[data-id="guageJS_6"]');

                  var target7 = this.template.querySelector('[data-id="guageJS_7"]');
                  var target8 = this.template.querySelector('[data-id="guageJS_8"]');
                  var target9 = this.template.querySelector('[data-id="guageJS_9"]');

                  var target10 = this.template.querySelector('[data-id="guageJS_10"]');
                  var target11 = this.template.querySelector('[data-id="guageJS_11"]');
                  var target12 = this.template.querySelector('[data-id="guageJS_12"]');

                  var target13 = this.template.querySelector('[data-id="guageJS_13"]');
                  var target14 = this.template.querySelector('[data-id="guageJS_14"]');
                  var target15 = this.template.querySelector('[data-id="guageJS_15"]');                  
                //   var gauge1 = new window.Gauge(target1).setOptions(opts);
                  this.gauge1 = new window.Gauge(target1).setOptions(opts);
                  this.gauge2 = new window.Gauge(target2).setOptions(opts);
                  this.gauge3 = new window.Gauge(target3).setOptions(opts);

                  this.gauge4 = new window.Gauge(target4).setOptions(opts);
                  this.gauge5 = new window.Gauge(target5).setOptions(opts);
                  this.gauge6 = new window.Gauge(target6).setOptions(opts);

                  this.gauge7 = new window.Gauge(target7).setOptions(opts);
                  this.gauge8 = new window.Gauge(target8).setOptions(opts);
                  this.gauge9 = new window.Gauge(target9).setOptions(opts);

                  this.gauge10 = new window.Gauge(target10).setOptions(opts);
                  this.gauge11 = new window.Gauge(target11).setOptions(opts);
                  this.gauge12 = new window.Gauge(target12).setOptions(opts);
                  
                  this.gauge13 = new window.Gauge(target13).setOptions(opts);
                  this.gauge14 = new window.Gauge(target14).setOptions(opts);
                  this.gauge15 = new window.Gauge(target15).setOptions(opts); 
                
                var maxGuageValue = 168;
                //   Guage1
                this.gauge1.maxValue = maxGuageValue; // set max gauge value
                this.gauge1.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                this.gauge1.animationSpeed = 32; // set animation speed (32 is default value)
                this.gauge1.set(this.responseJSON.BluePrintList[0].TotalHours_Fall); // set actual value
                //   Guage2
                this.gauge2.maxValue = maxGuageValue; // set max gauge value
                this.gauge2.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                this.gauge2.animationSpeed = 32; // set animation speed (32 is default value)
                this.gauge2.set(this.responseJSON.BluePrintList[0].TotalHours_Spring); // set actual value                
                //   Guage3
                this.gauge3.maxValue = maxGuageValue; // set max gauge value
                this.gauge3.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                this.gauge3.animationSpeed = 32; // set animation speed (32 is default value)
                this.gauge3.set(this.responseJSON.BluePrintList[0].TotalHours_SumWin); // set actual value                
                //   Guage4
                this.gauge4.maxValue = maxGuageValue; // set max gauge value
                this.gauge4.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                this.gauge4.animationSpeed = 32; // set animation speed (32 is default value)
                this.gauge4.set(this.responseJSON.BluePrintList[1].TotalHours_Fall); // set actual value  
                //   Guage5
                this.gauge5.maxValue = maxGuageValue; // set max gauge value
                this.gauge5.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                this.gauge5.animationSpeed = 32; // set animation speed (32 is default value)
                this.gauge5.set(this.responseJSON.BluePrintList[1].TotalHours_Spring); // set actual value                                
                //   Guage6
                this.gauge6.maxValue = maxGuageValue; // set max gauge value
                this.gauge6.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                this.gauge6.animationSpeed = 32; // set animation speed (32 is default value)
                this.gauge6.set(this.responseJSON.BluePrintList[1].TotalHours_SumWin); // set actual value                                                                                              

                //   Guage7
                this.gauge7.maxValue = maxGuageValue; // set max gauge value
                this.gauge7.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                this.gauge7.animationSpeed = 32; // set animation speed (32 is default value)
                this.gauge7.set(this.responseJSON.BluePrintList[2].TotalHours_Fall); // set actual value  
                
                //   Guage8
                this.gauge8.maxValue = maxGuageValue; // set max gauge value
                this.gauge8.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                this.gauge8.animationSpeed = 32; // set animation speed (32 is default value)
                this.gauge8.set(this.responseJSON.BluePrintList[2].TotalHours_Spring); // set actual value                                                                                              
                
                //   Guage9
                this.gauge9.maxValue = maxGuageValue; // set max gauge value
                this.gauge9.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                this.gauge9.animationSpeed = 32; // set animation speed (32 is default value)
                this.gauge9.set(this.responseJSON.BluePrintList[2].TotalHours_SumWin); // set actual value  
                
                //   Guage10
                this.gauge10.maxValue = maxGuageValue; // set max gauge value
                this.gauge10.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                this.gauge10.animationSpeed = 32; // set animation speed (32 is default value)
                this.gauge10.set(this.responseJSON.BluePrintList[3].TotalHours_Fall); // set actual value  
                
                //   Guage11
                this.gauge11.maxValue = maxGuageValue; // set max gauge value
                this.gauge11.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                this.gauge11.animationSpeed = 32; // set animation speed (32 is default value)
                this.gauge11.set(this.responseJSON.BluePrintList[3].TotalHours_Spring); // set actual value  
                
                //   Guage12
                this.gauge12.maxValue = maxGuageValue; // set max gauge value
                this.gauge12.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                this.gauge12.animationSpeed = 32; // set animation speed (32 is default value)
                this.gauge12.set(this.responseJSON.BluePrintList[3].TotalHours_SumWin); // set actual value  
                
                //   Guage13
                this.gauge13.maxValue = maxGuageValue; // set max gauge value
                this.gauge13.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                this.gauge13.animationSpeed = 32; // set animation speed (32 is default value)
                this.gauge13.set(this.responseJSON.BluePrintList[4].TotalHours_Fall); // set actual value  
                
                //   Guage14
                this.gauge14.maxValue = maxGuageValue; // set max gauge value
                this.gauge14.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                this.gauge14.animationSpeed = 32; // set animation speed (32 is default value)
                this.gauge14.set(this.responseJSON.BluePrintList[4].TotalHours_Spring); // set actual value  
                
                //   Guage15
                this.gauge15.maxValue = maxGuageValue; // set max gauge value
                this.gauge15.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                this.gauge15.animationSpeed = 32; // set animation speed (32 is default value)
                this.gauge15.set(this.responseJSON.BluePrintList[4].TotalHours_SumWin); // set actual value                  
              });              

        }
        // Runs if the contact is not verified
        else if (this.contactVerified == false)
        {
            // Checking to see if this is rendered via mobile browswer.
            let check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            if (check == true)
            {
                this.isMobile = true;
            }
            // Call contactLookupHandler() if the app is loaded using a desktop/laptop browswer
            else{
                this.contactLookupHandler();
            }            
        }
        
    }
    
    handleLogout() {
        // /secur/logout.jsp?retUrl=YourLoginpageURL
        window.location.href = "/studentblueprint/secur/logout.jsp?retUrl=https://test-myiit.cs34.force.com/studentblueprint/login";

    }
    
}