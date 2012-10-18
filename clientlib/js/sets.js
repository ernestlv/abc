//tabs in a tab panel
so.tab = {

                  title : so.setTab({
                          id:'sni-title-tab',
                          title:'title',
                          labelWidth:50,
                          items:[
                            so.setComposite('filterTitle')
                          ]
                  }),

                  url : so.setTab({
                          id:'sni-url-tab',
                          title:'url',
                          labelWidth:50,
                          items:[
                            so.setComposite('filterURL')
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
                    so.tab.url
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
                                          so.setComposite('content_tag1', {
                                              width:140
                                          }) 
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
                                          so.setComposite('content_tag2', {
                                              width:140
                                          })
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
                                          so.setComposite('show_title')
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
                                          so.setComposite('show_abbr')
                                        ] 
                }

};

//setfields.
so.set = {

      search : so.setFieldset({
                id:'sni-searchterm-set',
                title : 'search term',
                height: 105,
                width: 598-30-10,   //width of the column less the left and right margin of the setfield less the left blue border
                style:{
                  margin: '20px 10px 20px 20px'
                },
                items : so.tabpanel 
      }),

      content : so.setFieldset({
                id:'sni-content-set',
                title : 'content tags',
                height: 105,
                width: 598-30-10, //width of the column less the left and right margin of the setfield less the right blue border
                style:{
                  margin: '20px 20px 20px 10px'
                },
                layout : 'column',  //setfield compose of columns. column width defined in so.colset element
                items : [
                      so.side.tag1, 
                      so.side.tag2
                ]
      }),

      status : so.setFieldset({ 
                id: 'sni-satus-set',
                title:'status', 
                width:253,
                style:{
                  margin: '20px 10px 20px 20px'
                },
                items:[
                so.setCombo('status')
      ]}),

      assetC : so.setFieldset({
                id:'sni-assetC-set',
                title:'asset clasification', 
                width:253,
                style:{
                  margin: '20px 10px 20px 20px'
                },
                items:[
                so.setCombo('category'),
                so.setCombo('section'),
                so.setCombo('source'),
                so.setCombo('general')
      ]}),

      format : so.setFieldset({
                id:'sni-format-set',
                title:'format',
                width:253,
                style:{
                  margin: '20px 20px 20px 10px'
                },
                labelWidth:70,
                items:[
                so.setComposite('asset_type'),
                so.setRadio('has_image')
      ]}),

      popularity : so.setFieldset({
                id:'sni-popularity-set',
                title:'popularity',
                width:253,
                style:{
                  margin: '20px 20px 20px 10px'
                },
                labelWidth:50,
                items:[
                so.setCheckBox('rating'),
                {
                    id:'sni-reviewcount-wrapper',
                    fieldLabel:'review count:',
                    width:164,
                    layout:'column',
                    bodyStyle:{
                      border:'0px'
                    },
                    items:[
                        so.setCombo('reviewCountMin'),
                        so.setCombo('reviewCountMax')
                    ]
                }
      ]}),

      cook : so.setFieldset({
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
                        so.setCombo('timeMin'),
                        so.setCombo('timeMax')
                      ]
                  }
      ]}),

      sponsorshipCodes : so.setFieldset({
                id:'sni-sponsorship-set',
                title:'sponsorship codes',
                width:253,
                style:{
                  margin: '20px 10px 20px 20px'
                },
                labelWidth:80,
                items:[
                so.setComposite('sponsorship')
      ]}),

      hubGroupings : so.setFieldset({
                id:'sni-hubgroup-set',
                title:'hub groupings',
                width:253, 
                style:{
                  margin: '20px 10px 20px 20px'
                },
                labelWidth:80,
                items:[
                so.setRadio('hubType'),
                so.setCombo('hubID'),
                so.setCombo('hubSponsor')
      ]}),

      preferredTerms : so.setFieldset({
                id:'sni-preferredterms-set',
                title:'preferred terms', 
                width:253, 
                style:{
                  margin: '20px 20px 20px 10px'
                },
                items:[
                so.setCombo('preferred_term'),
                so.setCombo('altTerm'),
                so.setCombo('subTerm')
      ]}),

      events : so.setFieldset({
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
                so.setComposite('occasions'),
                so.setComposite('season'),
                so.setComposite('whos_dining')
      ]}),

      core : so.setFieldset({
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
                so.setCombo('mealPart'),
                so.setCombo('mealType'),
                so.setComposite('main_ingredient'),
                so.setComposite('dish'),
                so.setCombo('drinks'),
                so.setComposite('herbs_and_spices')
      ]}),

      tech: so.setFieldset({
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
                so.setComposite('cuisine'),
                so.setCombo('cooking'),
                so.setCombo('nutrition'),
                so.setCombo('taste'),
                so.setCombo('technique'),
                so.setCombo('cookware')
      ]}),

      sourceShow:so.setFieldset({
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

      sourceChef: so.setFieldset({
                id:'sni-sourcechef-set',
                title:'name of chef',
                width:319,
                style:{
                  margin: '20px 20px 20px 10px'
                },
                items:[
                so.setComposite('talent')
      ]})

};