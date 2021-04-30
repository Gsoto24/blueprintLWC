import { LightningElement,track,wire,api } from 'lwc';
import {createRecord, getRecord} from "lightning/uiRecordApi";
import getBlueprintData from  '@salesforce/apex/IITBluePrintHandler.getBlueprintData'
import GaugeJS from '@salesforce/resourceUrl/GaugeJS';
import { loadScript } from 'lightning/platformResourceLoader';
import { loadStyle } from 'lightning/platformResourceLoader';
import CUSTOM_CSS from '@salesforce/resourceUrl/BlueprintCSS';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'



export default class BlueprintLWC extends LightningElement {
    @api isLoaded = false;
    activeSections = ['Academic Year: 2021 - 2022','Academic Year: 2021 - 2022',
                    'Academic Year: 2022 - 2023','Academic Year: 2023 - 2024',
                    'Academic Year: 2024 - 2025', 'Academic Year: 2025 - 2026',
                    'Academic Year: 2026 - 2027','Academic Year: 2027 - 2028',
                    'Academic Year: 2028 - 2029','Academic Year: 2029 - 2030'];
    @track contactBannerID = null;
    @track contactDOB = new Date(); 
    @track contactVerified = false;
    @track detailBlockVisible = false;
    @track AdvisorCommentsPresent = false;

    @track TotalHoursArray = [];
    @track TotalHoursMap = {};
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
    showSpinner()
    {
        this.isLoaded = false;
    }
    updageGaugeData(event)
    {
        var delayInMilliseconds = 1000; //1.5 second
        var Scope_BannerID = this.contactBannerID;
        var Scope_DOB = this.contactDOB;
        var Scope = this;

        setTimeout(function() {
            
            getBlueprintData({BannerID:Scope.contactBannerID, DOB:Scope.contactDOB}).then(response=>{

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
    setBannerID(event)
    {
        this.contactBannerID = event.target.value;
    }
    setDOB(event)
    {
        this.contactDOB = event.target.value;
    }
    

    contactLookupHandler(event)
    {
        var Scope = this;
        var delayInMilliseconds = 7000;
        setTimeout(function() { 
            Scope.isLoaded = true;      
        }, delayInMilliseconds);

        getBlueprintData({BannerID:this.contactBannerID, DOB:this.contactDOB}).then(response=>{

            var WellnessHours = this.wellnessHours;
            this.responseJSON = JSON.parse(response);
            console.log(this.responseJSON);

            this.responseJSON.BluePrintList.forEach(function (item, index) {
                item.TotalHours_Fall = item.IIT_Total_Committed_Hours_fall__c + WellnessHours;
                item.TotalHours_Spring = item.IIT_Total_Committed_Hours_spring__c + WellnessHours;
                item.TotalHours_SumWin = item.IIT_Total_Committed_Hours_sumwin__c + WellnessHours;
              });            

            if(this.responseJSON.SuccessfulLookup == true)
            {
                // code to place each IIT_Academic_Year_formulaText__c in list to open accordion view -- review, does not work
                // this.responseJSON.BluePrintList.forEach(function (item, index) {
                //     // this.activeSections.push(item.IIT_Academic_Year_formulaText__c);
                //   });
                  
                this.contactVerified = true;
                // if (this.AdvisorCommentsPresent != null)
                // {
                //     this.AdvisorCommentsPresent = true;
                // }
                // this.updateReactiveVars(this);
            }
            else{
                console.log('Did not grant entry');
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
    

    renderedCallback() {
        // this code runs each time markup is rendered & contact is verified
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
    }

    
}