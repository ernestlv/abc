var so = {

  //******* CORE UTILITIES **************

  trim: function(v){
    return v.replace(/^\s*/,'').replace(/\s*$/,'');
  },

  mix: function(s, t){
    var p;
    for (p in s){
          if (s.hasOwnProperty(p)){
              t[p] = s[p];
          }
    }
    return t;
  },

  isEmpty: function(o){
    for(var k in o){
      if(o.hasOwnProperty(k)){
        return false;
      }
    }
    return true;
  },

  query: function( q ){
    return document.querySelector( q );
  },

  queryID: function( i ){
    return document.getElementById(i);
  },

  //*****  FUNCTIONS TO SETUP LAYOUT ***********

  setSection: function(t){

    var x = {    
              layout:'column',
              border:false
    };
    return so.mix(t, x);
  },

  //set column

  setColumn: function(t){

    var x = {
        layout:'column',
        columnWidth:1.0,
        style:{
          margin:'10px 10px'
        },
        bodyStyle:{
          border: '10px solid #094ea1',
          backgroundColor: '#094ea1',
          borderTop: '0px',
          borderBottomRightRadius: '.5em',
          borderBottomLeftRadius: '.5em'
        }         
    };
    return so.mix(t, x);
  },

  //set column
  setSubColumn: function(i){

    var x = {
        columnWidth:1.0,
        border:false,
        cls:'sni-subcol'   
    };
    return so.mix(i, x);
  },

  setFieldset: function(t, i){

      var x = {
              xtype:'fieldset',
              cls:'sni-fieldset',
              layout:'form',
              items:i,
              style:{
                margin: '0px',
                padding: '0px'
              },
              bodyStyle:{
                marginTop: '30px'
              }
            };

      if (typeof t === 'string'){
        x.title = t;
        x.border = x.title ? true : false;
      }else{
        x = so.mix(t, x);
      }
      return x;
  },

  setTab: function(t){

        var x = {
            layout:'form',
            border:false
        };
        return so.mix(t, x);
  },

  setComposite: function(f, x){

    var o = {
        xtype:'compositefield',
        items:so.fields[f]
    };

    return so.mix(x, o);
  },

  //********** EXTJS CONSTRUCTORS *****************

  //set comobox
  setCombo: function(f){

    var o = so.fields[f];
    o.store = new CQ.Ext.data.ArrayStore(o.store);
   return new CQ.Ext.form.ComboBox(o);
  },

  //set checkbox
  setCheckBox: function(f){
    var o = so.fields[f];
   return new CQ.Ext.form.CheckboxGroup(o);
  },

  //set checkbox
  setRadio: function(f){
    var o = so.fields[f];
   return new CQ.Ext.form.RadioGroup(o);
  },

  //set Slider
  setSlider: function(f){
    var o = so.fields[f];
    return new CQ.Ext.Slider(o);
  },

  setSpinner: function(f){
    var o = so.fields[f];
    return new CQ.Ext.ux.form.SpinnerField(o);
  },

  //********** EXTJS CONFIGS *****************

  setFieldFilter: function(f, a){

    var x = { //field properties
      xtype:'textfield',
       width:100
    };

    var b = { //button properties
      xtype:'button',
      text:'add',
      handler: function(){
        so.rest.handleFilter(f.id);
      }
    };

    return [so.mix(f, x), so.mix(a, b)];
  },

  setLightbox: function( f, a ){

    var x = { //field properties
      xtype:'textfield',
      width:100
    };

    var b = { //button properties
      xtype: 'button',
      text: 'all >',
      handler: function(){
          
          so.rest.getLightbox({ 
              field:f.id, //id must match DB name
              title:f.fieldLabel.replace(':','')
          });
      }
    };

    return [ so.mix( f, x ), so.mix( a, b ) ];
  },

  //set combo configuration
  setFieldCombo: function(f){

   return so.mix(f, { 
          width:100,
          store:{
             fields: ['value', 'label'],
             data : [['','']]
          },
          valueField:'value',
          displayField:'label',
          mode: 'local',
          emptyText:'Select ...',
          listeners:{
                    select:function (combo, record, index){//runs when value is selected
                            
                      so.rest.handleCombo( f.id, combo );
                    },
                    expand:function( combo ){//runs when combo is clicked
                      
                      so.rest.getCombo( f.id, combo );
                    }
          }
      });
  },

  setFieldCheckBox: function(f){

    return so.mix(f, {
          // Put all controls in a single column with width 100%
          columns: 1
    });
  },

  setFieldRadio: function(f){

    return so.mix(f, {
          // Put all controls in a single column with width 100%
          columns: 1
    });
  },

  setFieldSlider: function(f){

    if (!f.tooltip){
      f.tooltip = function(thumb){
          var c = thumb.slider.restData.nameValueMap[thumb.value] ? thumb.slider.restData.nameValueMap[thumb.value] : 0;
          return String.format('<b>{0} ({1})</b>', thumb.value, c);
      };
    }
    return so.mix(f, {
          width: 100,
          value: 1,
          increment: 1,
          minValue: 1,
          maxValue: 5,

          listeners:{
            render:function( slider ){
              so.rest.getSlider({
                field:f.id,
                slider:slider
              });
            },

            dragend: function( slider ){
              so.rest.handleSlider(f.id, slider);
            }
          },
          plugins : new CQ.Ext.slider.Tip({
                    getText: f.tooltip
            }),
    });
  },

  setFieldSpinner: function(f){

    return so.mix(f, {
          minValue: 0,
          maxValue: 1000000,
          incrementValue: 1
    });
  },

  //******* EXPRESSIONS, FILTERS, SELECTIONS HANDLERS ****************

  addedExpressions: {},

  redoExpressions: function( field, action ){

    var current=true, currentE = {}, addedE = {};
    
    if (action === 'delete'){
        for(var x in so.currentExpressions){
            if (x === field){
                delete so.currentExpressions[x];
                current = false;
            }else{
              if (current) {
                currentE[x] = so.currentExpressions[x];
              }else{
                addedE[x] = so.currentExpressions[x];
              }
            }
        }
    }

    if (action === 'query'){
        for(var x in so.currentExpressions){
            if (x === field){
                addedE[x] = so.currentExpressions[x];
                current = false;
            }else{
              if (current) {
                currentE[x] = so.currentExpressions[x];
              }else{
                addedE[x] = so.currentExpressions[x];
              }
            }
        }
    }
    
    so.currentExpressions = currentE;
    so.addedExpressions = addedE;
    so.rest.getFilter( so.doExpressions );
  },

  isRangeExpression: function(field){
    return so.currentExpressions[field].type === 'TermRangeExpression';
  },

  resetField:false,

  doReset: function(field){
    var o = CQ.Ext.getCmp(field);
    //extjs will fire a check event several times for checkboxes, since a checkbox may be multi-value.
    //site optimizer will fire an ajax transaction everytime a check event is fired.
    //we need the so.resetField flag to advice SO if extjs is resetting a checkbox in which case the ajax transaction is aborted.
    so.resetField = true;
    o.reset();
    so.resetField = false;
    console.log('reset: '+field);
  },


  //this function is called when a user deletes a filter from "your selections"
  removeExpression: function( v ){
    
    var e = so.queryID( v );
    var field = e.id.replace('-select', '');
    if ( so.isRangeExpression( field ) ){
      so.doReset(field+'_min');
      so.doReset(field+'_max');
    }else{
      so.doReset(field);
    }
    $CQ( e ).remove();
    so.removeOrdinality(field);
    so.fixGlobalSectionTopMargin();
    //we need to re-query the selections for whatever filters we have left.
    so.redoExpressions( field, 'delete' );
  },

  isExclusion: function(){

    var v = $CQ('#sni-selection input[name=sni-selection-radio]:checked').val();
    return v === 'e' || false;
  },

  getExpressionSelector: function( negated ){
    
    return negated ? '.sni-wrapper-x .sni-selection-list' : '.sni-wrapper .sni-selection-list';
  },

  //keeps the order we must submit the expressions to the web serivce.
  ordinality: [],

  getOrdinality: function( f ){
    var o = so.ordinality, l = o.length, i;
    for (i=0; i<l; i++){
      if ( o[i] === f ){
        return i;
      }
    }
    return -1;
  },

  removeOrdinality: function( f ){
    var i  = so.getOrdinality(f);
    if (i !== -1 ){
      so.ordinality.splice(i , 1);
    }
  },

  addOrdinality: function( f ){
    so.removeOrdinality(f);
    so.ordinality.push( f );
    console.log('ordinality: '+so.ordinality.join(','));
  },

  currentExpressions: {},

  getExpressionValue: function(f){
    return (f.valueList && f.valueList.join(',')) || (f.lowerBound && f.lowerBound + ', '+f.upperBound) || f.value;
  },

  updateExpressions: function(f, o){
    
    var v, id, e, s, x;

    //saves in currentExpressions
    so.currentExpressions[f.field] = f;

    //remove from your selections
    id = f.field+'-select';
    e = so.queryID( id );
    if ( e ) {
      $CQ( e ).remove();
    }
    //add to your selections
    v = so.getExpressionValue(f);
    s = so.getExpressionSelector(f.negated);
    o = {
          id: id,
          value: f.field+'='+v,
          size:  f.count
    }
    document.querySelector(s).innerHTML += so.html.getSelectionEntry( o );

    //fix ordinality
    so.removeOrdinality(f.field);
    so.addOrdinality(f.field);

    so.fixGlobalSectionTopMargin();
  },

  format2Thousand: function(v){
    return v >= 1000 ? Math.round(v/1000) + 'K' : v;
  },

  updateTotalAssets:function(){
    var o=so.ordinality, l = o.length;
    if ( l ){
          var f = o[l-1]; //last expression added
          var e = so.currentExpressions[f];
          var c = so.format2Thousand(e.count);
          document.querySelector('#sni-get-subcol .sni-size').innerHTML = c + ' total';
    }else{
          document.querySelector('#sni-get-subcol .sni-size').innerHTML = '0 total';
    }
  },

  //process expressiones returned by an ajax request.
  doExpressions: function( data ){
          
        var e = data.expressions;  //this is coming from REST service.
        for (var i=0; i< e.length; i+=1){
            so.updateExpressions( e[i] );
        }
        so.updateTotalAssets();
  },

  getExpressions: function( expressions ){

        var b = [], v, x;
        var o = so.ordinality, l = o.length, i;

        for(i=0; i<l; i++){ //we loop ordinality to make sure expressions are submitted in the right order.
          e = expressions[o[i]]; //expressions is the list of filters we have in your selection area.
          if (e){ //we check if expression is in current list. expressions might be in 1 of two lists currentExpressions or addedExpressions
            b.push(e);
          }
        }
        return b;
  },

  displayExclusions:false, 

  toggleExclusions: function(){
    
     if ( !so.displayExclusions ){
        so.displayExclusions = true;
        $CQ('#CQ #sni-selection .sni-label-single').hide();
        $CQ('#CQ #sni-selection .sni-label-top').show();
        $CQ('#CQ #sni-selection .sni-wrapper-x').show();
        $CQ('#sni-selection .sni-tab').html('remove exclusions -');
     }else{
        so.displayExclusions = false;
        $CQ('#CQ #sni-selection .sni-label-single').show();
        $CQ('#CQ #sni-selection .sni-label-top').hide();
        $CQ('#CQ #sni-selection .sni-wrapper-x').hide();
        $CQ('#sni-selection .sni-tab').html('add exclusions +');
        $CQ('#sni-selection input[name=sni-selection-radio][value=i]').attr('checked', 'checked');
     }
     so.fixGlobalSectionTopMargin();
  },

  switchExpression: function(ui, senderID){
    
    var e = ui.item[0];
    var s = so.queryID(senderID); //sender list
    var field = e.id.replace('-select', '');
    var x = so.currentExpressions[field];
    if (s.id === 'sni-inclusions'){
      x.negated = true;
    }else{
      x.negated = false;
    }
    so.redoExpressions( field, 'query' );
  },


  //**********  WEB SERVICE RESPONSE TRANSLATORS ******************

  transformMap: function( m ){

      var a = [];
      for (x in m){
        if (m.hasOwnProperty(x)){
          a.push( {value:x, count:m[x]} );
        }
      }
      return a;
  },

  transformComboMap: function( m ){

      var a = [];
      for (x in m){
        if (m.hasOwnProperty(x)){
          a.push( [ x+'||'+m[x], x+' ('+m[x]+')' ] );
        }
      }
      return a;
  },

  transformSliderMap: function( m ){

      var a = [];
      for (x in m){
        if (m.hasOwnProperty(x)){
          a.push( {value:x-0, count:m[x]-0} );
        }
      }
      return a;
  },

  transformAssets: function( data ){
      var a = data.assetInfoList, l = a.length, i, r, b=[];
      for (i=0; i<l; i++){
          r = a[i].report;
          b.push([
            r.url,
            r.title,
            r.status,
            r.asset_type,
            r.has_image,
            r.category,
            r.section,
            r.source,
            r.general_subjects,
            r.sponsorship,
            r.preferred_term,
            r.alternate_term,
            r.sub_term,
            r.hub_type,
            r.hub_sponsor,
            r.content_tag1,
            r.content_tag2,
            r.occasions,
            r.season,
            r.who_s_dining,
            r.meal_part,
            r.main_type,
            r.main_ingredient,
            r.dish,
            r.drinks,
            r.herbs_and_spices,
            r.cuisine,
            r.cooking_styles,
            r.nutrition,
            r.taste,
            r.technique,
            r.cookware_and_gagets,
            r.show_title,
            r.show_abbr,
            r.talent
            ]);
      }
      return b;
  },

  //************* MISCELLANEOUS HELPERS *****************

  //fix sectionsince sni-selection is fixed position
  fixGlobalSectionTopMargin:function(){

    document.getElementById('sni-global').style.marginTop = document.getElementById('sni-selection').offsetHeight + 'px';
  },

  getSelectedRatings: function(){

    var a = CQ.Ext.getCmp('rating').getValue();
    var b = [];
    $CQ.each(a, function(i, e){
      b.push( e.boxLabel );
    });
    return b;
  },

  //originally used for review count and cook time.
  getSelectedRange: function(field, cmp){

    var cmpMin = CQ.Ext.getCmp(field+'_min');
    var cmpMax = CQ.Ext.getCmp(field+'_max');
    var v1 = cmpMin.getValue().split('||')[0];
    var v2 = cmpMax.getValue().split('||')[0];
    if ( !v1 ){ return [v2, v2]; }
    if ( !v2 ){ return [v1, v1]; }
    return [v1,v2];
  },

  selectFilterType: function(config){

    var f=config.field, v=config.values, t=config.type, x={};
    if (t === 'range'){
        x[f] = {
          "type":"TermRangeExpression",
          "field":f,
          "lowerBound":v[0],
          "upperBound":v[1],
          "negated":so.isExclusion()
        };
        return x;
    }
    if (v.length > 1){
        x[f] = {
          "type":"TermMultiValueExpression",
          "field":f,
          "valueList":v,
          "negated":so.isExclusion()
        };
        return x;
    }
    x[f] = {
      "type":"TermExpression",
      "field":f,
      "value":v.join(''),
      "operator":"LIKE",
      "negated":so.isExclusion()                  
    };
    return x;
  },

  getAssets: function(){

    CQ.Ext.getCmp('sni-siteoptimizer').destroy();
    new CQ.Ext.Viewport({
            id:'sni-results-page',
            layout:'border',
            renderTo:CQ.Util.ROOT_ID,
            items:[
                        {
                            "id":"cq-header",
                            "xtype":"container",
                            "cls": "cq-siteadmin-header",
                            "autoEl":"div",
                            "region":"north",
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
                                id:'sni-result',
                                xtype: 'container', // TabPanel itself has no title
                                style:{
                                  overflow:'hidden'
                                },
                                html:'<iframe src="sni-site-optimizer.result.html" frameborder=0 width=100% height=100%></iframe>',
                        }
            ]
         });
  }

};