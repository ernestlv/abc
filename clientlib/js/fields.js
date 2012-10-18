

so.fields={
            filterTitle:so.setFieldFilter({
                          id: 'filterTitle',
                          fieldLabel:'filter By:',
                          width:392         
            }),

            filterURL:so.setFieldFilter({
                          id: 'filterURL',
                          fieldLabel: 'filter By:',
                          width:392                 
            }),

            //property name must match DB name.
            content_tag1:so.setLightbox({
                          id: 'content_tag1', //id must match DB name.
                          fieldLabel: 'content tag 1:',
                          width: 102                                                                   
            }),

            content_tag2:so.setLightbox({
                          id: 'content_tag2',
                          fieldLabel: 'content tag 2:',
                          width: 102                                                             
            }),

            status: so.setFieldCombo({
                  id: 'status',
                  fieldLabel: 'status:',
                  width: 114   
            }),

            category:so.setFieldCombo({ //extjs combo
                  id:'category',
                  fieldLabel:'category:',
                  width: 114
              }),

              section:so.setFieldCombo({ //combo
                  id:'section',
                  fieldLabel:'section:',
                  width: 114
              }),

              source:so.setFieldCombo({ //combo
                  id:'source',
                  fieldLabel:'source:',
                  width: 114
              }),

              general:so.setFieldCombo({ //combo
                  id:'general-subjects',
                  fieldLabel:'general subject:',
                  width: 114
              }),

            asset_type:so.setLightbox({
                  id: 'asset_type',
                  fieldLabel: 'asset type:',
                  width: 108                                                                         
            }),    

            has_image:so.setFieldRadio({
                  id:'has_image',
                  fieldLabel: 'has Image:',
                  fieldClass: 'sni-has-image',
                  vertical:false,
                  columns: 2,
                  width:145,
                  items: [
                      {
                        style:{
                          backgroundColor:'#000'
                        },
                        boxLabel: 'yes', 
                        name: 'has_image',
                        listeners:{
                          check:function(radio, chked){
                              //console.log('check yes');
                              so.rest.handleRadio('has_image',  radio, function(filter, radio){
                                return ['Y'];
                              });
                          }
                        }
                      },{
                        boxLabel: 'no', 
                        name: 'has_image',
                        listeners:{
                          check:function(radio, chked){
                              //console.log('check no');
                              so.rest.handleRadio('has_image', radio, function(filter, radio){
                                return ['N'];
                              }); 
                          }
                        }
                      }
                  ]
            }),

            rating:so.setFieldCheckBox({
                  id:'rating',
                  fieldLabel: 'rating:',
                  vertical:false,
                  columns: 5,
                  width:164,
                  items: [
                      {
                        id: 'rating1',
                        boxLabel: '1',
                        listeners:{
                          check:function(chkbox, chked){
                              //console.log('check 1');
                              so.rest.handleCheck('rating', chkbox, so.getSelectedRatings);
                          }
                        }
                      },{
                        id:'rating2',
                        boxLabel: '2',
                        listeners:{
                          check:function(chkbox, chked){
                            //console.log('check 2');
                            so.rest.handleCheck('rating', chkbox, so.getSelectedRatings);
                          }
                        }
                      },{
                        id: 'rating3',
                        boxLabel: '3',
                        listeners:{
                          check:function(chkbox, chked){
                            //console.log('check 3');
                            so.rest.handleCheck('rating', chkbox, so.getSelectedRatings);
                          }
                        }
                      },{
                        id: 'rating4',
                        boxLabel: '4',
                        listeners:{
                          check:function(chkbox, chked){
                            //console.log('check 4');
                            so.rest.handleCheck('rating', chkbox, so.getSelectedRatings);
                          }
                        }
                      },{
                        id: 'rating5',
                        boxLabel: '5',
                        listeners:{
                          check:function(chkbox, chked){
                            //console.log('check 5');
                            so.rest.handleCheck('rating', chkbox, so.getSelectedRatings);
                          }
                        }
                      }
                  ]
            }),

            reviewCountMin: so.setFieldCombo({ //combo
                  id:'review_count_min',
                  //fieldLabel:'min:',
                  emptyText:'min',
                  width: 80,
                  listeners:{
                    select:function (combo, record, index){//runs when value is selected
    
                      so.rest.handleRange('review_count', combo, so.getSelectedRange);
                    },
                    expand:function( combo ){//runs when combo is clicked
                      
                      so.rest.getCombo('review_count', combo);
                    }
                  }
            }),

            reviewCountMax: so.setFieldCombo({ //combo
                  id:'review_count_max',
                  //fieldLabel:'max:',
                  emptyText:'max',
                  
                  width: 80,
                  listeners:{
                    select:function (combo, record, index){//runs when value is selected
                            
                      so.rest.handleRange('review_count', combo, so.getSelectedRange);
                    },
                    expand:function( combo ){//runs when combo is clicked
                      
                      so.rest.getCombo('review_count', combo);
                    }
                  }
            }),

            timeMin:so.setFieldCombo({ //combo
                  id:'cook_time_min',
                  //fieldLabel:'min:',
                  emptyText:'min',
                  width: 105,
                  listeners:{
                    select:function (combo, record, index){//runs when value is selected
                            
                      so.rest.handleRange('cook_time', combo, so.getSelectedRange);
                    },
                    expand:function( combo ){//runs when combo is clicked
                      
                      so.rest.getCombo('cook_time', combo);
                    }
                  }
            }),

            timeMax:so.setFieldCombo({ //combo
                  id:'cook_time_max',
                  //fieldLabel:'max:',
                  emptyText:'max',
                  width: 105,
                  listeners:{
                    select:function (combo, record, index){//runs when value is selected
                            
                      so.rest.handleRange('cook_time', combo, so.getSelectedRange);
                    },
                    expand:function( combo ){//runs when combo is clicked
                      
                      so.rest.getCombo('cook_time', combo);
                    }
                  }
            }),

            sponsorship:so.setLightbox({
                    id: 'sponsorship',
                    fieldLabel:'sponsorship:',
                    width: 98                           
            }),

           hubType:so.setFieldRadio({
                          id:'hub_type',
                          fieldLabel: 'hub type:',
                          fieldClass: 'sni-hub-type',
                          vertical:true,
                          columns: 2,
                          width:135,
                          items: [
                              {
                                boxLabel: 'recipe', 
                                name: 'hub_type',
                                listeners:{
                                  check:function(radio, chked){
                                    so.rest.handleRadio('hub_type', radio);
                                  }
                                }
                              },
                              {
                                boxLabel: 'show', 
                                name: 'hub_type',
                                listeners:{
                                  check:function(radio, chked){
                                    so.rest.handleRadio('hub_type', radio);
                                  }
                                }
                              },
                              {
                                boxLabel: 'null', 
                                name: 'hub_type',
                                listeners:{
                                  check:function(radio, chked){
                                    so.rest.handleRadio('hub_type', radio);
                                  }
                                }
                              },
                              {
                                boxLabel: 'talent', 
                                name: 'hub_type',
                                listeners:{
                                  check:function(radio, chked){
                                    so.rest.handleRadio('hub_type', radio);
                                  }
                                }
                              },
                              {
                                boxLabel: 'article', 
                                name: 'hub_type',
                                listeners:{
                                  check:function(radio, chked){
                                    so.rest.handleRadio('hub_type', radio);
                                  }
                                }
                              }
                          ]
            }),

              hubID:so.setFieldCombo({
                  id:'hubID',
                  fieldLabel:'hub id:',
                  width:135,
                  disabled:true
              }),

              hubSponsor:so.setFieldCombo({
                  id:'hub_sponsor',
                  fieldLabel:'hub sponsor:',
                  width:135,
                  disabled:true
              }), 

              preferred_term:so.setFieldCombo({
                  id:'preferred_term',
                  fieldLabel:'preferred term:',
                  width:115
              }), 

              altTerm:so.setFieldCombo({
                  id:'alternate_term',
                  fieldLabel:'alternate term:',
                  width:115
              }), 

              subTerm:so.setFieldCombo({
                  id:'sub_term',
                  fieldLabel:'sub term:',
                  width:115
              }),

              occasions:so.setLightbox({
                          id: 'occasions',
                          fieldLabel: 'occasions:',
                          width:145                                                                         
              }),

              season:so.setLightbox({
                          id: 'season',
                          fieldLabel: 'season:',
                          width:145                                                                         
              }), 

              whos_dining:so.setLightbox({
                          id: 'whos_dining',
                          fieldLabel: "who's dining:",
                          width:145                                                                 
              }), 

              mealPart:so.setFieldCombo({ //combo
                  id:'meal_part',
                  fieldLabel:'meal part:',
                  width: 193
              }),  

              mealType:so.setFieldCombo({ //combo
                  id:'main_type',
                  fieldLabel:'meal type:',
                  width: 193
              }), 

              main_ingredient:so.setLightbox({
                          id: 'main_ingredient',
                          fieldLabel: 'main ingredient:',
                          width:157                                                                
              }),  

              dish:so.setLightbox({
                          id: 'dish',
                          fieldLabel: 'dish:',
                          width:157                                                                    
              }), 

              drinks:so.setFieldCombo({ //combo
                  id:'drinks',
                  fieldLabel:'drinks:',
                  width: 193
              }),  

              herbs_and_spices:so.setLightbox({
                          id: 'herbs_and_spices',
                          fieldLabel: 'herbs & spices:',
                          width:155                                                                      
              }),  

              cuisine:so.setLightbox({
                          id: 'cuisine',
                          fieldLabel: 'cuisine:',
                          width:145                                                                     
              }),  

              cooking:so.setFieldCombo({ //combo
                  id:'cooking_styles',
                  fieldLabel:'cooking styles:',
                  width: 180
              }),  

              nutrition:so.setFieldCombo({ //combo
                  id:'nutrition',
                  fieldLabel:'nutrition:',
                  width: 180
              }),  

              taste:so.setFieldCombo({ //combo
                  id:'taste',
                  fieldLabel:'taste:',
                  width: 180
              }), 

              technique:so.setFieldCombo({ //combo
                  id:'technique',
                  fieldLabel:'technique:',
                  width: 180
              }),

              cookware:so.setFieldCombo({ //combo
                  id:'cookware',
                  fieldLabel:'cookware & gadgets:',
                  width: 180
              }),   

              show_title:so.setLightbox({
                          id: 'show_title',
                          fieldLabel: 'show title:',
                          width:224                                                                   
              }),

              show_abbr:so.setLightbox({
                          id: 'show_abbr',
                          fieldLabel: 'abbreviation:',
                          width:224                                                                
              }), 

              talent:so.setLightbox({
                          id: 'talent',
                          fieldLabel: 'talent:',
                          width:145                                                                     
              })       
};  //end fields
