so.rest = {

        getField: function( field, handler ){
                
                var requestObj = {
                   "currentFilters":{
                      "type":"filters",
                      "expressions":so.expressions.get( so.g.currentExpressions )
                   },

                   "filterFieldName":field
                };
                                
                var data= JSON.stringify(requestObj);

                console.log('ajax request /imp/report/field: '+data);
 
                $CQ.ajax({
                        url:'/imp/report/field',
                        dataType: 'json', 
                        data: data,
                        success: handler
                });
        },

        getFilter: function( expression, handler ){

                //normalize the arguments
                if (arguments.length === 1){
                  handler = expression;
                  expression  = {};
                }else{
                    if (expression.type === 'filter'){
                        expression.values = [expression.values];
                    }
                }

                if( expression.values ){ //user selected a field value

                    //if user manually clears a checkbox, the code determines if the field value is empty,
                    //then removes the filter from your selections and aborts the transaction.
                    var value = expression.values.join('');
                    if (!value){ //user cleared a field
                        so.expressions.remove( expression.field+'-select' );
                        return;
                    }
                    so.g.addedExpressions = so.expressions.selectType( expression );
                    delete so.g.currentExpressions[expression.field]; //we remove field from the current expressions since it is already in the added expression
                }else{ //this should be true only when user deletes a filter from "your selections" or switch a filter from 1 list to the other.

                    if ( so.f.isEmpty( so.g.addedExpressions ) ){ //this is true when user deleted the last filter.
                      so.f.displayTotal(); //check last expression added and update total
                      return;
                    }
                }


                var currentFilters = {
                        "type":"filters",
                        "expressions":so.expressions.get( so.g.currentExpressions )
                };
                
                var addedFilters = {
                        "type":"filters",
                        "expressions":so.expressions.get( so.g.addedExpressions )                     
                };

                var requestObj = {
                     "currentFilters": currentFilters,
                     "filtersAdded": addedFilters
                }

                var data = JSON.stringify(requestObj);

                console.log('ajax request /imp/report/filters: '+data);

                $CQ.ajax({
                  url:'/imp/report/filters',
                  dataType: 'json', 
                  data: data,
                  success: handler
                });
        },

        getAssets: function(request, handler){

            var requestObj = {
               "currentFilters":{
                    "type":"filters",
                    "expressions":so.expressions.get( so.g.currentExpressions )
                },
               "pageNum":request.page,
               "sortingObject":request.sort
            };

            var data = JSON.stringify(requestObj);

            console.log((new Date())+' ajax request /imp/report/assetlist: '+data);
        
            $CQ.ajax({
                url:'/imp/report/assetlist',
                dataType: 'json', 
                data: data,
                success: handler
            });
        },

        getPageViews: function(request, handler){

            var requestObj = {
                   "filters":{
                        "type":"filters",
                        "expressions":[{
                            "type":"TermMultiValueExpression",
                            "negated":false,
                            "field":"page_id",
                            "valueList":["12","13","16"],
                            "count":0
                            }]
                    }
            };

            var data = JSON.stringify(requestObj);

            console.log('ajax request /imp/report/pageviews: '+data);
        
            $CQ.ajax({
                url:'/imp/report/pageviews',
                dataType: 'json', 
                data: data,
                success: handler,
                error: handler
            });
        },

        getModifyAssets: function(id, handler, all){
            var value = CQ.Ext.getCmp( id ).getValue();
            if (!value){
                return;
            }

            var expressions;
            if ( all ){
                expressions = so.expressions.get( so.g.currentExpressions );
                if (!expressions.length){ //no filters = no records to update;
                    return;
                }
            }else{
                var b = [];
                $CQ('.sni-maf-checks input[type=checkbox]:checked').each(function(){
                    var i = $CQ(this).val();
                    b.push(so.result.restData.assetInfoList[i].report.current_url);
                });

                if (!b.length){ //no selected rows.
                    return;
                }
                expressions = [
                    {
                      "type":"TermMultiValueExpression",
                      "negated":false,
                      "field":"current_url",
                      "valueList":b
                    }
                ];
            }

            var requestObj = {
                    "changeList":[
                        {
                            "user":"joe-user",
                            "attribute":id,
                            "value":value,
                            "currentFilters":{
                                "type":"filters",
                                "expressions":expressions
                            }
                        }
                    ]
            };

            var data = JSON.stringify(requestObj);

            console.log('ajax request /imp/assets: '+data);
        
            $CQ.ajax({
                url:'/imp/assets',
                dataType: 'json', 
                data: data,
                success: handler
            });
        },

/////////////// REST HANDLERS FOR FIELD SERVICE /////////////////////////
        getLightbox: function( config ){

                so.rest.getField(config.field, function( data ){ 

                        var map = so.rest.transformMap( data.nameValueMap );  
                        so.lightbox.open({
                                field: config.field, 
                                title: config.title,
                                data:map
                        });
                        so.lightbox.restData = data;
                });
        },

        getCombo: function( field, combo ){

                so.rest.getField(field, function( data ){
                        
                        var map = so.rest.transformCombo( data.nameValueMap );  
                        var store = combo.getStore();
                        store.loadData( map );
                        combo.restData = data;
                });
        },

        getSlider: function( field, slider ){

                so.rest.getField(field, function( data ){

                        var map = so.rest.transformSlider( data.nameValueMap );
                        var min = map[0].value, max = map[0].value;
                        for (var i=1; i<map.length; i+=1){
                          min = map[i].value < min ? map[i].value : min;
                          max = map[i].value > max ? map[i].value : max;
                        }
                        slider.setMinValue( min );
                        slider.setMaxValue( max );
                        if (config.multi){
                          slider.setValue(0, min);
                          slider.setValue(1, max);
                        }else{
                          slider.setValue( min );
                        }
                        slider.restData = data;
                });
        },

        getSpinner: function( field, spinner ){

                so.rest.getField(field, function( data ){

                        var map = so.rest.transformSlider( data.nameValueMap );
                        var min = map[0].value, max = map[0].value;
                        for (var i=1; i<map.length; i+=1){
                          min = map[i].value < min ? map[i].value : min;
                          max = map[i].value > max ? map[i].value : max;
                        }
                        spinner.minValue = min;
                        spinner.maxValue = max;
                        spinner.restData = data;
                });
        },

/////////////// REST HANDLERS FOR FILTER SERVICE /////////////////////////

        handleFilter: function( filter ){

              var me = CQ.Ext.getCmp( filter );
              var v = me.getValue();
              so.rest.getFilter({field:filter, values:v, type:'filter'}, so.expressions.do);
        },

        handleLightbox: function(filter, lightbox){
                
                var v = lightbox.getValues();
                var l = so.f.getLabel(v);
                 //update field in form
                var c = CQ.Ext.getCmp( filter );
                c.setValue( l );
                so.rest.getFilter({field:filter, values:v, type:'lightbox' }, so.expressions.do);
        },

        handleCombo:  function (filter, combo, f){
                    
                var v = typeof f === 'function' ?  f( filter, combo ) : [combo.getValue()];
                so.rest.getFilter( { field:filter, values:v, type:'combo' }, so.expressions.do);
        },

        handleRange:  function (filter, combo, f){
                      
                var v = typeof f === 'function' ?  f( filter, combo ) : [combo.getValue()];
                so.rest.getFilter( { field:filter, values:v, type:'range' }, so.expressions.do);
        },

        handleRadio:  function (filter, radio, f){

                //when a radio switches values extjs fires a check event to check the new value and
                //then fires a check event again to uncheck the old value.
                //in the second case we do not want to call ajax.
                //code below checks if the radio value is uncheck then ajax call is aborted.
                if ( !radio.getValue() ){
                  return;
                }

                var v = typeof f === 'function' ?  f( filter, radio ) : ( radio.getValue() ? [radio.boxLabel] : [] );
                            
                so.rest.getFilter({field:filter, values:v, type:'radio'}, so.expressions.do);
        },

        handleCheck:  function (filter, checkbox, f){ //special case since a checkbox has multi-values

                //the code checks if extjs called the function using a reset event and abort the transaction.
                //note: when extjs resets a set of checkboxes; extjs will fire the check event to uncheck them several times
                //then we need to abort the ajax call. The so.expressions.remove function will call ajax in the right moment.
                if ( so.f.isReset ){
                  return;
                }

                var v = typeof f === 'function' ?  f( filter, checkbox ) : ( checkbox.getValue() ? [checkbox.boxLabel] : [] );
                            
                so.rest.getFilter({field:filter, values:v, type:'check'}, so.expressions.do);
        },

        handleSlider: function(filter, slider){

                var v = slider.getValues();
                so.rest.getFilter({field:filter, values:v, type:'slider' }, so.expressions.do);
        },

        handleSpinner: function(filter, spinner){
                
                var v = spinner.getValue();
                so.rest.getFilter({field:filter, values:v, type:'spinner' }, so.expressions.do);
        },

        handleResultPage:function( assets ){

                  console.log((new Date())+'ajax done');
                  so.result.restData = assets;

                  var data = so.rest.transformAssets(assets);

                  so.result.loadGrid( data );  

                  so.result.fixAttributePanel();   

                  so.result.fixSplit();


                  document.querySelector('#sni-matching-assets .count').innerHTML = so.f.displayTotal();
                  document.querySelector('#sni-loaded-assets .count').innerHTML = so.result.displayTotal();
                  so.rest.getPageViews({}, so.rest.handlePageViews);

                  //enable modify asset action
                  if (!so.maf){ //if maf is not loaded we go and get it
                      $CQ.getScript('/apps/sni-site-optimizer/clientlib/js/maf.js', function(){
                        $CQ('.sni-first-col .sni-col-title').click( so.maf.display );
                        $CQ('#sni-modify-search-button').click( so.maf.hide );
                      });
                  }
                  console.log((new Date())+'data load done');
        },

        handlePageViews:function(data){
                  document.querySelector('#sni-total-page-views .count').innerHTML = '1.5mm';
        },

        handleModifyAssets:function(data){
                    alert('done!');
        },

//**********  WEB SERVICE RESPONSE TRANSFORMATIONS ******************

  transformMap: function( m ){

      var i, l=m.length, x, a = [];
      for (i=0; i<l; i++){
          x = m[i];
          a.push( {value:x.label, rawValue:x.value, count:x.count} );
      }
      return a;
  },

  transformCombo: function( m ){

      var i, l=m.length, x, a = [];
      for (i=0; i<l; i++){
        x = m[i];
          a.push( [ x.value, x.label+' ('+x.count+')' ] );
      }
      return a;
  },

  transformSlider: function( m ){

      var a = [];
      for (x in m){
        if (m.hasOwnProperty(x)){
          a.push( {value:x-0, count:m[x]-0} );
        }
      }
      return a;
  },

  transformAssets: function( data ){
      function loadValues( data ){
        
        var f = so.grid.fields, l = f.length, i, w, x=[];
        for (i=0; i<l; i++){
          w = data[f[i].name];
          x.push( w ? w.value : '???' );
        }
        return x;
      };

      var a = data.assetInfoList, l = a.length, i, r, b=[];
      for (i=0; i<l; i++){
          r = a[i].report;
          b.push(loadValues(r));
          /* b.push([
            r.url.value,
            r.title.value,
            r.status.value,
            r.asset_type.value,
            r.has_image.value,
            r.category.value,
            r.section.value,
            r.source.value,
            r.general_subjects.value,
            r.sponsorship.value,
            r.preferred_term.value,
            r.alternate_term.value,
            r.sub_term.value,
            r.hub_type.value,
            r.hub_sponsor.value,
            r.content_tag1.value,
            r.content_tag2.value,
            r.occasions.value,
            r.season.value,
            r.who_s_dining.value,
            r.meal_part.value,
            r.meal_type.value,
            r.main_ingredient.value,
            r.dish.value,
            r.drinks.value,
            r.herbs_and_spices.value,
            r.cuisine.value,
            r.cooking_styles.value,
            r.nutrition.value,
            r.taste.value,
            r.technique.value,
            r.cookware_and_gagets.value,
            r.show_title.value,
            r.show_abbr.value,
            r.talent.value
            ]); */
      }
      return b;
  }

}