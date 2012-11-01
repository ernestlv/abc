so.rest = {

        getField: function( field, handler ){
                
                var requestObj = {
                   "currentFilters":{
                      "type":"filters",
                      "expressions":so.f.getExpressions( so.g.currentExpressions )
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

        getFilter: function( config, handler ){

                //normalize the arguments
                if (arguments.length === 1){
                  handler = config;
                  config  = {};
                }else{
                    if (config.type === 'filter'){
                        config.values = [config.values];
                    }
                }

                if( config.values ){ //user selected a field value

                    //if user manually clears a checkbox, the code determines if the field value is empty,
                    //then removes the filter from your selections and aborts the transaction.
                    var value = config.values.join('');
                    if (!value){ //user cleared a field
                        so.f.removeExpression( config.field+'-select' );
                        return;
                    }
                    so.g.addedExpressions = so.f.selectFilterType( config );
                    delete so.g.currentExpressions[config.field]; //we remove field from the current expressions since it is already in the added expression
                }else{ //this should be true only when user deletes a filter from "your selections" or switch a filter from 1 list to the other.

                    if ( so.f.isEmpty( so.g.addedExpressions ) ){ //this is true when user deleted the last filter.
                      so.f.displayTotal(); //check last expression added and update total
                      return;
                    }
                }


                var currentFilters = {
                        "type":"filters",
                        "expressions":so.f.getExpressions( so.g.currentExpressions )
                };
                
                var addedFilters = {
                        "type":"filters",
                        "expressions":so.f.getExpressions( so.g.addedExpressions )                     
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

        getAssets: function(config, handler){

            var requestObj = {
               "currentFilters":{
                    "type":"filters",
                    "expressions":so.f.getExpressions( so.g.currentExpressions )
                },
               "pageNum":config.page,
               "sortingObject":config.sort
            };

            var data = JSON.stringify(requestObj);

            console.log('ajax request /imp/report/assetlist: '+data);
        
            $CQ.ajax({
                url:'/imp/report/assetlist',
                dataType: 'json', 
                data: data,
                success: handler
            });
        },

        getPageViews: function(config, handler){

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

/////////////// REST HANDLERS FOR FIELD SERVICE /////////////////////////
        getLightbox: function( config ){

                so.rest.getField(config.field, function( data ){ 

                        var map = so.f.transformMap( data.nameValueMap );  
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
                        
                        var map = so.f.transformComboMap( data.nameValueMap );  
                        var store = combo.getStore();
                        store.loadData( map );
                        combo.restData = data;
                });
        },

        getSlider: function( field, slider ){

                so.rest.getField(field, function( data ){

                        var map = so.f.transformSliderMap( data.nameValueMap );
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

                        var map = so.f.transformSliderMap( data.nameValueMap );
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
              so.rest.getFilter({field:filter, values:v, type:'filter'}, so.f.doExpressions);
        },

        handleLightbox: function(filter, lightbox){

                var v = lightbox.getValues();
                 //update field in form
                var c = CQ.Ext.getCmp( filter );
                c.setValue( v.join(', ') );
                so.rest.getFilter({field:filter, values:v, type:'lightbox' }, so.f.doExpressions);
        },

        handleCombo:  function (filter, combo, f){
                    
                var v = typeof f === 'function' ?  f( filter, combo ) : [combo.getValue()];
                so.rest.getFilter( { field:filter, values:v, type:'combo' }, so.f.doExpressions );
        },

        handleRange:  function (filter, combo, f){
                      
                var v = typeof f === 'function' ?  f( filter, combo ) : [combo.getValue()];
                so.rest.getFilter( { field:filter, values:v, type:'range' }, so.f.doExpressions );
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
                            
                so.rest.getFilter({field:filter, values:v, type:'radio'}, so.f.doExpressions);
        },

        handleCheck:  function (filter, checkbox, f){ //special case since a checkbox has multi-values

                //the code checks if extjs called the function using a reset event and abort the transaction.
                //note: when extjs resets a set of checkboxes; extjs will fire the check event to uncheck them several times
                //then we need to abort the ajax call. The so.f.removeExpression function will call ajax in the right moment.
                if ( so.f.isReset ){
                  return;
                }

                var v = typeof f === 'function' ?  f( filter, checkbox ) : ( checkbox.getValue() ? [checkbox.boxLabel] : [] );
                            
                so.rest.getFilter({field:filter, values:v, type:'check'}, so.f.doExpressions);
        },

        handleSlider: function(filter, slider){

                var v = slider.getValues();
                so.rest.getFilter({field:filter, values:v, type:'slider' }, so.f.doExpressions);
        },

        handleSpinner: function(filter, spinner){
                
                var v = spinner.getValue();
                so.rest.getFilter({field:filter, values:v, type:'spinner' }, so.f.doExpressions);
        },

        handleResultPage:function( assets ){

                  so.result.restData = assets;

                  var data = so.f.transformAssets(assets);

                  so.result.loadGrid( data );  

                  so.result.fixAttributePanel();   

                  so.result.fixSplit();


                  document.querySelector('#sni-matching-assets .count').innerHTML = so.f.displayTotal();
                  document.querySelector('#sni-loaded-assets .count').innerHTML = so.result.displayAssetsTotal();
                  so.rest.getPageViews({}, so.rest.handlePageViews);
        },

        handlePageViews:function(data){
                  document.querySelector('#sni-total-page-views .count').innerHTML = '1.5mm';
        }
}