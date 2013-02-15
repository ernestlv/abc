(function(so){
//tabs in a tab panel
so.tab = {

                  title : so.db.setTab({
                          id:'sni-title-tab',
                          title:'title',
                          labelWidth:50,
                          items:[
                            so.form.createComposite('title')
                          ]
                  }),

                  current_url : so.db.setTab({
                          id:'sni-url-tab',
                          title:'url',
                          labelWidth:50,
                          items:[
                            so.form.createComposite('current_url')
                          ]
                  })

};

so.tabpanel = {
                  xtype:'tabpanel',
                  id:'sni-search',
                  plain:true,
                  activeTab:0,
                  width:500,
                  height:80,
                  style:{
                    margin:'0px auto'
                  },
                  bodyStyle:{
                      border:'1px solid #000',
                      borderTop: '0px',
                      borderBottomLeftRadius:'.5em',
                      borderBottomRightRadius:'.5em'
                  },
                  items:[
                    so.tab.title, 
                    so.tab.current_url
                  ]
}; 

//A side is a column in a setfield composed of columns
so.side = {

                tag1 : {
                                        id:'sni-tag1-side',
                                        columnWidth:.5,
                                        layout:'form',
                                        border:false,
                                        style:{
                                          margin:'25px 5px'
                                        },
                                        items:[
                                          so.form.createComposite('content_tag1') 
                                        ]                                
                },

                tag2 : {
                                        id:'sni-tag2-side',
                                        columnWidth:.5,
                                        layout:'form',
                                        border:false,
                                        style:{
                                          margin:'25px 5px'
                                        },
                                        items:[
                                          so.form.createComposite('content_tag2')
                                        ]                              
                },

                title : {
                                        id:'sni-title-side',
                                        columnWidth:.5,
                                        layout:'form',
                                        border:false,
                                        style:{
                                          margin:'0px 5px'
                                        },
                                        items:[
                                          so.form.createComposite('show_title')
                                        ]                                  
                },

                abbreviation : {
                                        id:'sni-abbreviation-side',
                                        columnWidth:.5,
                                        layout:'form',
                                        border:false,
                                        style:{
                                          margin:'0px 5px'
                                        },
                                        items:[
                                          so.form.createCombo('show_abbr')
                                        ] 
                }

};

//setfields.
so.set = {

      search : so.db.setFieldset({
                id:'sni-searchterm-set',
                title : 'search term',
                height: 105,
                //width: '50%', //598-30-10,   //width of the column less the left and right margin of the setfield less the left blue border
                style:{
                  margin: '20px 10px 20px 20px'
                },
                items : so.tabpanel 
      }),

      content : so.db.setFieldset({
                id:'sni-content-set',
                title : 'content tags',
                height: 105,
                //width: '50%', //598-30-10, //width of the column less the left and right margin of the setfield less the right blue border
                style:{
                  margin: '20px 20px 20px 10px'
                },
                layout : 'column',  //setfield compose of columns. column width defined in so.side element
                items : [
                      so.side.tag1, 
                      so.side.tag2
                ]
      }),

      status : so.db.setFieldset({ 
                id: 'sni-satus-set',
                title:'status', 
                width:253,
                style:{
                  margin: '20px 10px 20px 20px'
                },
                items:[
                so.form.createCombo('status')
      ]}),

      assetC : so.db.setFieldset({
                id:'sni-assetC-set',
                title:'asset classification', 
                width:253,
                style:{
                  margin: '20px 10px 20px 20px'
                },
                labelWidth:50,
                items:[
                so.form.createCombo('category'),
                so.form.createCombo('section'),
                so.form.createCombo('source'),
                so.form.createComposite('general')
      ]}),

      format : so.db.setFieldset({
                id:'sni-format-set',
                title:'format',
                width:253,
                style:{
                  margin: '20px 20px 20px 10px'
                },
                labelWidth:70,
                items:[
                so.form.createCombo('asset_type'),
                so.form.createRadio('has_image')
      ]}),

      popularity : so.db.setFieldset({
                id:'sni-popularity-set',
                title:'popularity',
                width:253,
                style:{
                  margin: '20px 20px 20px 10px'
                },
                labelWidth:50,
                items:[
                so.form.createCheckBox('rating'),
                {
                    id:'sni-reviewcount-wrapper',
                    fieldLabel:'review count:',
                    width:164,
                    layout:'column',
                    bodyStyle:{
                      border:'0px'
                    },
                    items:[
                        so.form.createCombo('reviewCountMin'),
                        so.form.createCombo('reviewCountMax')
                    ]
                }
      ]}),

      cook : so.db.setFieldset({
                id:'sni-cook-set',
                title:'cook time',
                width:253,
                style:{
                  margin: '20px 20px 20px 10px'
                },
                labelWidth:1, //shrink label to minimum. extjs does not work with 0.
                labelPad:0,
                items:[
                  {
                      id:'sni-cooktime-wrapper',
                      width:218,
                      fieldLabel:' ', //we need thid to display form white background
                      layout:'column',
                      bodyStyle:{
                        border:'0px'
                      },
                      items:[
                        so.form.createCombo('timeMin'),
                        so.form.createCombo('timeMax')
                      ]
                  }
      ]}),

      sponsorshipCodes : so.db.setFieldset({
                id:'sni-sponsorship-set',
                title:'sponsorship codes',
                width:253,
                style:{
                  margin: '20px 10px 20px 20px'
                },
                labelWidth:80,
                items:[
                so.form.createComposite('sponsorship')
      ]}),

      packageName : so.db.setFieldset({
                id:'sni-package-set',
                title:'package name',
                width:253,
                style:{
                  margin: '20px 10px 20px 20px'
                },
                labelWidth:80,
                items:[
                so.form.createComposite('package')
      ]}),

      hubGroupings : so.db.setFieldset({
                id:'sni-hubgroup-set',
                title:'hub groupings',
                width:253, 
                style:{
                  margin: '20px 10px 20px 20px'
                },
                labelWidth:80,
                items:[
                so.form.createRadio('hubType')
                //so.form.createCombo('hubID'),
                //so.form.createCombo('hubSponsor')
      ]}),

      preferredTerms : so.db.setFieldset({
                id:'sni-preferredterms-set',
                title:'preferred terms', 
                width:253, 
                style:{
                  margin: '20px 20px 20px 10px'
                },
                items:[
                so.form.createCombo('preferred_term'),
                so.form.createCombo('alternate_term'),
                so.form.createCombo('sub_term')
      ]}),

      events : so.db.setFieldset({
                id:'sni-events-set',
                title:'',
                width:320, 
                style:{
                  margin: '20px 20px 20px 20px'
                },
                bodyStyle:{
                  marginTop: '10px'
                },
                items:[
                so.form.createComposite('occasions'),
                so.form.createComposite('season'),
                so.form.createComposite('who_s_dining')
      ]}),

      core : so.db.setFieldset({
                id:'sni-core-set',
                title:'', 
                width:332, 
                style:{
                  margin: '20px 20px 20px 20px'
                },
                bodyStyle:{
                  marginTop: '10px'
                },
                items:[
                so.form.createComposite('mealPart'),
                so.form.createComposite('mealType'),
                so.form.createComposite('main_ingredient'),
                so.form.createComposite('dish'),
                so.form.createComposite('drinks'),
                so.form.createComposite('herbs_and_spices')
      ]}),

      tech: so.db.setFieldset({
                id:'sni-tech-set',
                title:'', 
                width:320, 
                style:{
                  margin: '20px 20px 20px 20px'
                },
                bodyStyle:{
                  marginTop: '10px'
                },
                items:[
                so.form.createComposite('cuisine'),
                so.form.createComposite('cooking'),
                so.form.createComposite('nutrition'),
                so.form.createComposite('taste'),
                so.form.createComposite('technique'),
                so.form.createComposite('cookware')
      ]}),

      sourceShow:so.db.setFieldset({
                id:'sni-sourceshow-set',
                title:'name of show',
                layout:'column',
                width:797,
                style:{
                  margin: '20px 10px 20px 20px'
                },
                items: [
                      so.side.title, 
                      so.side.abbreviation
                ]
      }),

      sourceChef: so.db.setFieldset({
                id:'sni-sourcechef-set',
                title:'name of chef',
                width:319,
                style:{
                  margin: '20px 20px 20px 10px'
                },
                items:[
                so.form.createComposite('talent')
      ]})

};  
})(so);
