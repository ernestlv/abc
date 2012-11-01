

so.fields={
            filterTitle:so.f.setFieldFilter({
                          id: 'filterTitle',
                          fieldLabel:'filter By:',
                          width:392         
            }),

            filterURL:so.f.setFieldFilter({
                          id: 'filterURL',
                          fieldLabel: 'filter By:',
                          width:392                 
            }),

            //property name must match DB name.
            content_tag1:so.f.setLightbox({
                          id: 'content_tag1', //id must match DB name.
                          fieldLabel: 'content tag 1:',
                          width: 102                                                                   
            }),

            content_tag2:so.f.setLightbox({
                          id: 'content_tag2',
                          fieldLabel: 'content tag 2:',
                          width: 102                                                             
            }),

            status: so.f.setFieldCombo({
                  id: 'status',
                  fieldLabel: 'status:',
                  width: 114   
            }),

            category:so.f.setFieldCombo({ //extjs combo
                  id:'category',
                  fieldLabel:'category:',
                  width: 114
              }),

              section:so.f.setFieldCombo({ //combo
                  id:'section',
                  fieldLabel:'section:',
                  width: 114
              }),

              source:so.f.setFieldCombo({ //combo
                  id:'source',
                  fieldLabel:'source:',
                  width: 114
              }),

              general:so.f.setFieldCombo({ //combo
                  id:'general-subjects',
                  fieldLabel:'general subject:',
                  width: 114
              }),

            asset_type:so.f.setLightbox({
                  id: 'asset_type',
                  fieldLabel: 'asset type:',
                  width: 108                                                                         
            }),    

            has_image:so.f.setFieldRadio({
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
                              
                              so.rest.handleRadio('has_image', radio, function(filter, radio){
                                return ['N'];
                              }); 
                          }
                        }
                      }
                  ]
            }),

            rating:so.f.setFieldCheckBox({
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
                              
                              so.rest.handleCheck('rating', chkbox, so.f.getSelectedRatings);
                          }
                        }
                      },{
                        id:'rating2',
                        boxLabel: '2',
                        listeners:{
                          check:function(chkbox, chked){
                            
                            so.rest.handleCheck('rating', chkbox, so.f.getSelectedRatings);
                          }
                        }
                      },{
                        id: 'rating3',
                        boxLabel: '3',
                        listeners:{
                          check:function(chkbox, chked){
                            
                            so.rest.handleCheck('rating', chkbox, so.f.getSelectedRatings);
                          }
                        }
                      },{
                        id: 'rating4',
                        boxLabel: '4',
                        listeners:{
                          check:function(chkbox, chked){
                            
                            so.rest.handleCheck('rating', chkbox, so.f.getSelectedRatings);
                          }
                        }
                      },{
                        id: 'rating5',
                        boxLabel: '5',
                        listeners:{
                          check:function(chkbox, chked){
                            
                            so.rest.handleCheck('rating', chkbox, so.f.getSelectedRatings);
                          }
                        }
                      }
                  ]
            }),

            reviewCountMin: so.f.setFieldCombo({ //combo
                  id:'review_count_min',
                  //fieldLabel:'min:',
                  emptyText:'min',
                  width: 80,
                  listeners:{
                    select:function (combo, record, index){//runs when value is selected
    
                      so.rest.handleRange('review_count', combo, so.f.getSelectedRange);
                    },
                    expand:function( combo ){//runs when combo is clicked
                      
                      so.rest.getCombo('review_count', combo);
                    }
                  }
            }),

            reviewCountMax: so.f.setFieldCombo({ //combo
                  id:'review_count_max',
                  //fieldLabel:'max:',
                  emptyText:'max',
                  
                  width: 80,
                  listeners:{
                    select:function (combo, record, index){//runs when value is selected
                            
                      so.rest.handleRange('review_count', combo, so.f.getSelectedRange);
                    },
                    expand:function( combo ){//runs when combo is clicked
                      
                      so.rest.getCombo('review_count', combo);
                    }
                  }
            }),

            timeMin:so.f.setFieldCombo({ //combo
                  id:'cook_time_min',
                  //fieldLabel:'min:',
                  emptyText:'min',
                  width: 105,
                  listeners:{
                    select:function (combo, record, index){//runs when value is selected
                            
                      so.rest.handleRange('cook_time', combo, so.f.getSelectedRange);
                    },
                    expand:function( combo ){//runs when combo is clicked
                      
                      so.rest.getCombo('cook_time', combo);
                    }
                  }
            }),

            timeMax:so.f.setFieldCombo({ //combo
                  id:'cook_time_max',
                  //fieldLabel:'max:',
                  emptyText:'max',
                  width: 105,
                  listeners:{
                    select:function (combo, record, index){//runs when value is selected
                            
                      so.rest.handleRange('cook_time', combo, so.f.getSelectedRange);
                    },
                    expand:function( combo ){//runs when combo is clicked
                      
                      so.rest.getCombo('cook_time', combo);
                    }
                  }
            }),

            sponsorship:so.f.setLightbox({
                    id: 'sponsorship',
                    fieldLabel:'sponsorship:',
                    width: 98                           
            }),

           hubType:so.f.setFieldRadio({
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

              hubID:so.f.setFieldCombo({
                  id:'hubID',
                  fieldLabel:'hub id:',
                  width:135,
                  disabled:true
              }),

              hubSponsor:so.f.setFieldCombo({
                  id:'hub_sponsor',
                  fieldLabel:'hub sponsor:',
                  width:135,
                  disabled:true
              }), 

              preferred_term:so.f.setFieldCombo({
                  id:'preferred_term',
                  fieldLabel:'preferred term:',
                  width:115
              }), 

              altTerm:so.f.setFieldCombo({
                  id:'alternate_term',
                  fieldLabel:'alternate term:',
                  width:115
              }), 

              subTerm:so.f.setFieldCombo({
                  id:'sub_term',
                  fieldLabel:'sub term:',
                  width:115
              }),

              occasions:so.f.setLightbox({
                          id: 'occasions',
                          fieldLabel: 'occasions:',
                          width:145                                                                         
              }),

              season:so.f.setLightbox({
                          id: 'season',
                          fieldLabel: 'season:',
                          width:145                                                                         
              }), 

              whos_dining:so.f.setLightbox({
                          id: 'whos_dining',
                          fieldLabel: "who's dining:",
                          width:145                                                                 
              }), 

              mealPart:so.f.setFieldCombo({ //combo
                  id:'meal_part',
                  fieldLabel:'meal part:',
                  width: 193
              }),  

              mealType:so.f.setFieldCombo({ //combo
                  id:'main_type',
                  fieldLabel:'meal type:',
                  width: 193
              }), 

              main_ingredient:so.f.setLightbox({
                          id: 'main_ingredient',
                          fieldLabel: 'main ingredient:',
                          width:157                                                                
              }),  

              dish:so.f.setLightbox({
                          id: 'dish',
                          fieldLabel: 'dish:',
                          width:157                                                                    
              }), 

              drinks:so.f.setFieldCombo({ //combo
                  id:'drinks',
                  fieldLabel:'drinks:',
                  width: 193
              }),  

              herbs_and_spices:so.f.setLightbox({
                          id: 'herbs_and_spices',
                          fieldLabel: 'herbs & spices:',
                          width:155                                                                      
              }),  

              cuisine:so.f.setLightbox({
                          id: 'cuisine',
                          fieldLabel: 'cuisine:',
                          width:145                                                                     
              }),  

              cooking:so.f.setFieldCombo({ //combo
                  id:'cooking_styles',
                  fieldLabel:'cooking styles:',
                  width: 180
              }),  

              nutrition:so.f.setFieldCombo({ //combo
                  id:'nutrition',
                  fieldLabel:'nutrition:',
                  width: 180
              }),  

              taste:so.f.setFieldCombo({ //combo
                  id:'taste',
                  fieldLabel:'taste:',
                  width: 180
              }), 

              technique:so.f.setFieldCombo({ //combo
                  id:'technique',
                  fieldLabel:'technique:',
                  width: 180
              }),

              cookware:so.f.setFieldCombo({ //combo
                  id:'cookware',
                  fieldLabel:'cookware & gadgets:',
                  width: 180
              }),   

              show_title:so.f.setLightbox({
                          id: 'show_title',
                          fieldLabel: 'show title:',
                          width:224                                                                   
              }),

              show_abbr:so.f.setLightbox({
                          id: 'show_abbr',
                          fieldLabel: 'abbreviation:',
                          width:224                                                                
              }), 

              talent:so.f.setLightbox({
                          id: 'talent',
                          fieldLabel: 'talent:',
                          width:145                                                                     
              })       
};  //end fields
