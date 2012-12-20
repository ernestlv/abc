(function(so){
//sub-columns
so.subcol = {

      selection : so.db.setSubColumn({
              id:'sni-selection-subcol',
              columnWidth:.88,
              style:{
                margin:'0px'
              },
              html: so.selection.display(),
              listeners:{
                afterrender:function(){   // make things dragabble
                  var switched, senderID;
                  $CQ('#sni-selection .sni-selection-list').sortable({
                    connectWith:'.sni-selection-list',
                    start:function(e, ui){
                      
                      switched = false;
                      senderID = '';
                    },
                    //change:function(e,ui){
                      //console.log('sorting sorting '+ui.item[0].id);
                    //},
                    stop:function(e, ui){
                      
                      if (switched){
                         //$CQ(this).sortable('cancel');
                         so.selection.move(ui, senderID);
                      }else{
                         so.selection.drag(ui); 
                      }
                    },
                    receive:function(e, ui){

                      senderID = ui.sender[0].id;
                      switched=true;
                    }
                    //remove:function(e, ui){
                      //console.log('removing '+ui.item.parent()[0].id);
                    //}
                  });

                  $CQ('#sni-inclusions').click(so.selection.remove);
                  $CQ('#sni-exclusions').click(so.selection.remove);
                  
                  $CQ('#sni-selection .sni-tab').click(so.selection.toggle);
                }
              }
      }),

      get : so.db.setSubColumn({
              id:'sni-get-subcol',
              columnWidth:.12,
              style:{
                margin:'0px'
              },
              html: so.selection.doButton(),
              listeners:{
                afterrender:function(){
                  $CQ('#sni-selection .sni-get-assets a').click(so.g.showResult);
                }
              }
      }),

      search : so.db.setSubColumn({
              id:'sni-search-subcol',
              columnWidth:.5,
              bodyStyle:{
                borderTopLeftRadius:'.5em',
                borderBottomLeftRadius:'.5em'
              },
              items:[
                so.set.search
              ]
      }),

      content : so.db.setSubColumn({
              id:'sni-content-subcol',
              columnWidth:.5,
              bodyStyle:{
                borderTopRightRadius:'.5em',
                borderBottomRightRadius:'.5em'
              },
              items:[
                so.set.content
              ]
      }),

      statusLeft : so.db.setSubColumn({
              id:'sni-statusleft-subcol',
              columnWidth:.5,
              height:472,
              bodyStyle:{
                borderTopLeftRadius:'.5em',
                borderBottomLeftRadius:'.5em'
              },
              items:[
                so.set.status,
                so.set.assetC
              ]
      }),

      statusRight : so.db.setSubColumn({
              id:'sni-statusright-subcol',
              columnWidth:.5,
              height:472,
              bodyStyle:{
                borderTopRightRadius:'.5em',
                borderBottomRightRadius:'.5em'
              },
              items:[
                so.set.format,
                so.set.popularity,
                so.set.cook
              ]
      }),

      adLeft : so.db.setSubColumn({
              id:'sni-adleft-subcol',
              columnWidth:.5,
              height:472,
              bodyStyle:{
                borderTopLeftRadius:'.5em',
                borderBottomLeftRadius:'.5em'
              },
              items:[                                            
                so.set.sponsorshipCodes,
                so.set.hubGroupings
              ]
      }),

      adRight : so.db.setSubColumn({
              id:'sni-adright-subcol',
              columnWidth:.5,
              height:472,
              bodyStyle:{
                borderTopRightRadius:'.5em',
                borderBottomRightRadius:'.5em'
              },
              items:[
                so.set.preferredTerms
              ]
      }),

      events: so.db.setSubColumn({
              id:'sni-events-subcol',
              height:350,
              bodyStyle:{
                borderTopLeftRadius:'.5em',
                borderBottomLeftRadius:'.5em',
                borderTopRightRadius:'.5em',
                borderBottomRightRadius:'.5em'
              },
              items:[
                so.set.events
              ]
      }),

      core: so.db.setSubColumn({
              id:'sni-core-subcol',
              height:350,
              bodyStyle:{
                borderTopLeftRadius:'.5em',
                borderBottomLeftRadius:'.5em',
                borderTopRightRadius:'.5em',
                borderBottomRightRadius:'.5em'
              },
              items:[
                so.set.core
              ]
      }),

      tech: so.db.setSubColumn({
              id:'sni-tech-subcol',
              height:350,
              bodyStyle:{
                borderTopLeftRadius:'.5em',
                borderBottomLeftRadius:'.5em',
                borderTopRightRadius:'.5em',
                borderBottomRightRadius:'.5em'
              },
              items:[
                so.set.tech
              ]
      }),

      sourceLeft: so.db.setSubColumn({
              id:'sni-sourceleft-subcol',
              columnWidth:.7,
              bodyStyle:{
                borderTopLeftRadius:'.5em',
                borderBottomLeftRadius:'.5em'
              },
              items:[
                so.set.sourceShow
              ]
      }),

      sourceRight: so.db.setSubColumn({
              id:'sni-sourceright-subcol',
              columnWidth:.3,
              bodyStyle:{
                borderTopRightRadius:'.5em',
                borderBottomRightRadius:'.5em'
              },
              items:[
                so.set.sourceChef
              ]
      })

};



//columns - 
so.column = {

      selection : so.db.setColumn({
                            id:'sni-selection',
                            border:false,
                            style:{
                              margin:'0px',
                              position:'fixed',
                              zIndex:'10001',
                              padding:'20px 10px 15px'
                            },
                            bodyCssClass:'sni-selection-body',
                            bodyStyle:{
                              borderRadius:'0px',
                              //borderBottom:'1px solid #61b9ff',
                              paddingBottom:'15px'
                            },
                            items:[
                              so.subcol.selection,
                              so.subcol.get   
                            ]                             
      }),

      global : so.db.setColumn({
                            id:'sni-global',
                            title:'global filters',
                            items:[
                              so.subcol.search,
                              so.subcol.content   
                            ],
                            listeners:{
                              afterrender: so.fixTopMargin
                            }                             
      }),

      status :  so.db.setColumn({
                            id:'sni-satus-col',
                            title:'status & format',
                            columnWidth:.5,
                            items:[
                              so.subcol.statusLeft,
                              so.subcol.statusRight
                            ],
      }),

      advertising : so.db.setColumn({
                              id:'sni-advertising-col',
                              title:'advertising tags',
                              columnWidth:.5,
                              items:[
                                so.subcol.adLeft,
                                so.subcol.adRight
                              ]
      }),

      events : so.db.setColumn({
                            id:'sni-events-col',
                            title:'events',
                            columnWidth:.33,
                            items:[
                              so.subcol.events
                            ]                          
      }),

      core : so.db.setColumn({
                            id:'sni-core-col',
                            title:'core cooking content',
                            columnWidth:.34,
                            items:[
                              so.subcol.core
                            ]                           
      }),

      tech : so.db.setColumn({
                            id:'sni-tech-col',
                            title:'techniques & style',
                            columnWidth:.33,
                            items:[
                              so.subcol.tech
                            ] 
      }),

      source: so.db.setColumn({
                            id:'sni-source',
                            title:'content source',
                            items:[
                                so.subcol.sourceLeft,
                                so.subcol.sourceRight
                            ]
      })

};
})(so)
