//tabs in a tab panel
so.tab = {

                  title : so.f.setTab({
                          id:'sni-title-tab',
                          title:'title',
                          labelWidth:50,
                          items:[
                            so.f.setComposite('filterTitle')
                          ]
                  }),

                  url : so.f.setTab({
                          id:'sni-url-tab',
                          title:'url',
                          labelWidth:50,
                          items:[
                            so.f.setComposite('filterURL')
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
                                          so.f.setComposite('content_tag1', {
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
                                          so.f.setComposite('content_tag2', {
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
                                          so.f.setComposite('show_title')
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
                                          so.f.setComposite('show_abbr')
                                        ] 
                }

};

//setfields.
so.set = {

      search : so.f.setFieldset({
                id:'sni-searchterm-set',
                title : 'search term',
                height: 105,
                width: 598-30-10,   //width of the column less the left and right margin of the setfield less the left blue border
                style:{
                  margin: '20px 10px 20px 20px'
                },
                items : so.tabpanel 
      }),

      content : so.f.setFieldset({
                id:'sni-content-set',
                title : 'content tags',
                height: 105,
                width: 598-30-10, //width of the column less the left and right margin of the setfield less the right blue border
                style:{
                  margin: '20px 20px 20px 10px'
                },
                layout : 'column',  //setfield compose of columns. column width defined in so.side element
                items : [
                      so.side.tag1, 
                      so.side.tag2
                ]
      }),

      status : so.f.setFieldset({ 
                id: 'sni-satus-set',
                title:'status', 
                width:253,
                style:{
                  margin: '20px 10px 20px 20px'
                },
                items:[
                so.f.setCombo('status')
      ]}),

      assetC : so.f.setFieldset({
                id:'sni-assetC-set',
                title:'asset clasification', 
                width:253,
                style:{
                  margin: '20px 10px 20px 20px'
                },
                items:[
                so.f.setCombo('category'),
                so.f.setCombo('section'),
                so.f.setCombo('source'),
                so.f.setCombo('general')
      ]}),

      format : so.f.setFieldset({
                id:'sni-format-set',
                title:'format',
                width:253,
                style:{
                  margin: '20px 20px 20px 10px'
                },
                labelWidth:70,
                items:[
                so.f.setComposite('asset_type'),
                so.f.setRadio('has_image')
      ]}),

      popularity : so.f.setFieldset({
                id:'sni-popularity-set',
                title:'popularity',
                width:253,
                style:{
                  margin: '20px 20px 20px 10px'
                },
                labelWidth:50,
                items:[
                so.f.setCheckBox('rating'),
                {
                    id:'sni-reviewcount-wrapper',
                    fieldLabel:'review count:',
                    width:164,
                    layout:'column',
                    bodyStyle:{
                      border:'0px'
                    },
                    items:[
                        so.f.setCombo('reviewCountMin'),
                        so.f.setCombo('reviewCountMax')
                    ]
                }
      ]}),

      cook : so.f.setFieldset({
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
                        so.f.setCombo('timeMin'),
                        so.f.setCombo('timeMax')
                      ]
                  }
      ]}),

      sponsorshipCodes : so.f.setFieldset({
                id:'sni-sponsorship-set',
                title:'sponsorship codes',
                width:253,
                style:{
                  margin: '20px 10px 20px 20px'
                },
                labelWidth:80,
                items:[
                so.f.setComposite('sponsorship')
      ]}),

      hubGroupings : so.f.setFieldset({
                id:'sni-hubgroup-set',
                title:'hub groupings',
                width:253, 
                style:{
                  margin: '20px 10px 20px 20px'
                },
                labelWidth:80,
                items:[
                so.f.setRadio('hubType'),
                //so.f.setCombo('hubID'),
                //so.f.setCombo('hubSponsor')
      ]}),

      preferredTerms : so.f.setFieldset({
                id:'sni-preferredterms-set',
                title:'preferred terms', 
                width:253, 
                style:{
                  margin: '20px 20px 20px 10px'
                },
                items:[
                so.f.setCombo('preferred_term'),
                so.f.setCombo('altTerm'),
                so.f.setCombo('subTerm')
      ]}),

      events : so.f.setFieldset({
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
                so.f.setComposite('occasions'),
                so.f.setComposite('season'),
                so.f.setComposite('whos_dining')
      ]}),

      core : so.f.setFieldset({
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
                so.f.setCombo('mealPart'),
                so.f.setCombo('mealType'),
                so.f.setComposite('main_ingredient'),
                so.f.setComposite('dish'),
                so.f.setCombo('drinks'),
                so.f.setComposite('herbs_and_spices')
      ]}),

      tech: so.f.setFieldset({
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
                so.f.setComposite('cuisine'),
                so.f.setCombo('cooking'),
                so.f.setCombo('nutrition'),
                so.f.setCombo('taste'),
                so.f.setCombo('technique'),
                so.f.setCombo('cookware')
      ]}),

      sourceShow:so.f.setFieldset({
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

      sourceChef: so.f.setFieldset({
                id:'sni-sourcechef-set',
                title:'name of chef',
                width:319,
                style:{
                  margin: '20px 20px 20px 10px'
                },
                items:[
                so.f.setComposite('talent')
      ]})

};