
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
                    //boxMinWidth:1237,
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
                    region:'center',
                    id:'sni-siteoptimizer-iframe',
                    xtype: 'container', // TabPanel itself has no title
                    style:{
                      overflow:'hidden'
                    },
                    html:[
                        '<iframe id="sni-dashboard" src="sni-site-optimizer.db.html" frameborder=0 width=100% height=100%></iframe>',
                        '<iframe id="sni-result" src="about:blank" frameborder=0 width=100% height=100% style="display:none"></iframe>'
                    ].join('')
                }
            ]

         });  //end of super.constructor() call
    }, //end of constructor()

    initComponent : function() {
        so.plugin.superclass.initComponent.call(this);

    }

});     // ------- end of SNI.CQ.wcm.SniSiteOptimizer 

CQ.Ext.reg("sni-site-optimizer", so.plugin);
