  //sections - sections are really ExtJS column layouts
so.section = {

      selection:so.setSection({
        id:'sni-selection-section',
        items:[  
              so.col.selection                                                                
        ]
      }),

      global : so.setSection({
        id:'sni-global-section',
        items:[  
              so.col.global                                                                
        ]
      }),

      status : so.setSection({
        id:'sni-status-section',
        items:[  
              so.col.status,
              so.col.advertising                                                                       
        ]
      }),

      eventsCoreTech : so.setSection({
        id:'sni-event-section',
        items:[
              so.col.events,
              so.col.core,
              so.col.tech
        ]
      }),

       source : so.setSection({
        id:'sni-source-section',
        items:[
              so.col.source
        ]
      })        

};

//main            
so.components = [ 
        so.section.selection,
        so.section.global, 
        so.section.status,
        so.section.eventsCoreTech,
        so.section.source                                                             
];

//CQ.Ext.namespace('SNI.CQ.wcm','SniSiteOptimizer');

/**
 * @class so.plugin
 * @extends CQ.Ext.Viewport
 * The so.plugin is used by the Ad Team to assign Preferred Terms to sni-asset pages, 
 * view reports of aggregated analytics from CQ pages and the analytics shadow structure
 * for more information visit: https://wiki.scrippsnetworks.com/display/wcm/Site+Optimizer+Implementation
 * you will need to have an SNI login to this site
 *
 * @constructor
 * Creates a new so.plugin.
 * @param {Object} config The config object
 */
so.plugin = CQ.Ext.extend(CQ.Ext.Viewport, {
    
    constructor: function(config) {
        // init component by calling super constructor
        so.plugin.superclass.constructor.call(this, {

            //"id":"cq-notification-site-optimizer",
            "id":"sni-siteoptimizer",
            "layout":"border",
            "renderTo":CQ.Util.ROOT_ID,
            "items": [
                {
                    "id":"cq-header",
                    "xtype":"container",
                    "cls": "cq-siteadmin-header",
                    "autoEl":"div",
                    "region":"north",
                    boxMinWidth:1237,
                    style:{
                      position:'fixed',
                      zIndex:10001
                    },
                    "items": [
                        {
                            "xtype":"panel",
                            "border":false,
                            "layout":"column",
                            "cls": "cq-header-toolbar",
                            "items": [
                                new CQ.Switcher({}),
                                new CQ.UserInfo({}),
                                new CQ.HomeLink({})
                            ]
                        }
                    ]
                },
                {
                    region:"center",
                    id:"sni-siteoptimizer-wrapper",
                    boxMinWidth:1237,
                    autoScroll: true,
                    xtype: 'container', // TabPanel itself has no title
                    items: so.components
                }
            ]

         });  //end of super.constructor() call
    }, //end of constructor()

    initComponent : function() {
        so.plugin.superclass.initComponent.call(this);

    }

});     // ------- end of SNI.CQ.wcm.SniSiteOptimizer 

CQ.Ext.reg("sni-site-optimizer", so.plugin);
