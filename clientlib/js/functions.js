so.f = {

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
    return so.f.mix(t, x);
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
    return so.f.mix(t, x);
  },

  //set column
  setSubColumn: function(i){

    var x = {
        columnWidth:1.0,
        border:false,
        cls:'sni-subcol'   
    };
    return so.f.mix(i, x);
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
        x = so.f.mix(t, x);
      }
      return x;
  },

  setTab: function(t){

        var x = {
            layout:'form',
            border:false
        };
        return so.f.mix(t, x);
  },

  setComposite: function(f, x){

    var o = {
        xtype:'compositefield',
        items:so.fields[f]
    };

    return so.f.mix(x, o);
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

    return [so.f.mix(f, x), so.f.mix(a, b)];
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

    return [ so.f.mix( f, x ), so.f.mix( a, b ) ];
  },

  //set combo configuration
  setFieldCombo: function(f){

   return so.f.mix(f, { 
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

    return so.f.mix(f, {
          // Put all controls in a single column with width 100%
          columns: 1
    });
  },

  setFieldRadio: function(f){

    return so.f.mix(f, {
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
    return so.f.mix(f, {
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

    return so.f.mix(f, {
          minValue: 0,
          maxValue: 1000000,
          incrementValue: 1
    });
  },

  //******* EXPRESSIONS, FILTERS, SELECTIONS HANDLERS ****************

    //sort expressions using array
  sortExpressions:function(filters, expressions){
      var f = filters, l = f.length;
      var i, x, b = [];
      for (i=0; i<l; i++){
        x = expressions[f[i]];
        x && b.push(x);
      }
      return b;
  },

  getFilters: function(dashboard, ftype){
      var b = [];
      if (dashboard){
          var x = dashboard.$CQ('#sni-'+ftype+' li'), i, l = x.length;
          for (i=0; i<l; i++){
              b.push(x[i].id.replace('-select', ''));
          }
      }
      return b;
  },

  /*getExclusions: function(dashboard){
      var b = [];
      var x = db.$CQ('#sni-exclusions li'), i, l = x.length;
      for (i=0; i<l; i++){
          b.push(x[i].id.replace('-select', ''));
      }
      return b;
  },*/

  //return expressions sorted using the visual index in "Your selections"
  getExpressions: function( expressions ){

        var b = [], f, e, i;
        var dashboard = so.g.getDashboard(); //when call from result screen we need to point to dahsboard
        dashboard = dashboard ? dashboard.contentWindow : null;
        f = so.f.getFilters(dashboard, 'inclusions'); //is there filters in "your selections"?
        if (f.length){
          e = so.f.sortExpressions(f, expressions); //is there expressions for current filters?
          b = e.length ? b.concat(e) : b;
        }
        f = so.f.getFilters(dashboard, 'exclusions');
        if (f.length){
          e = so.f.sortExpressions(f, expressions);
          b = e.length ? b.concat(e) : b;
        }
        if ( !b.length ){ //first time we add an expression there will be no inclusion nor exclusion filters but there will be expressions.
          for(i in expressions){
              b.push(expressions[i])
          }
        }
        return b;
  },

  deleteExpression: function(field){
    delete so.g.currentExpressions[field]
  },

  redoExpressions: function(){

    var e, l, ae = {}, i, x;
    //we dont know the original order of the expressions so everything should be considered an added expression
    //and do the query again
    e = so.f.getExpressions(so.g.currentExpressions); //returns expressions sorted using the visual index in "your selections"
    l = e.length;
    for(i=0; i<l; i++){
      x = e[i];
      ae[x.field] = x;
    }

    so.g.currentExpressions = {};
    so.g.addedExpressions = ae;
    so.rest.getFilter( so.f.doExpressions );
  },

  isReset:false,

  reset: function(field){
    var o = CQ.Ext.getCmp(field);
    //extjs will fire a check event several times for checkboxes, since a checkbox may be multi-value.
    //site optimizer will fire an ajax transaction everytime a check event is fired.
    //we need the so.f.isReset flag to advice SO if extjs is resetting a checkbox in which case the ajax transaction is aborted.
    so.f.isReset = true;
    o.reset();
    so.f.isReset = false;
  },


  //this function is called when a user deletes a filter from "your selections"
  removeExpression: function( v ){
    
    var e = so.f.queryID( v );
    var f = e.id.replace('-select', '');
    if ( so.f.isRangeExpression( f ) ){
      so.f.reset(f+'_min');
      so.f.reset(f+'_max');
    }else{
      so.f.reset(f);
    }
    $CQ( e ).remove();
    so.f.fixTopMargin();
    so.f.deleteExpression( f );
    so.f.redoExpressions(); //we need to re-query the selections for whatever filters we have left.
  },

  isExclusion: function(){
    var v = $CQ('#sni-selection input[name=sni-selection-radio]:checked').val();
    return v === 'e' || false;
  },

  getExpressionSelector: function( negated ){
    
    return negated ? '.sni-wrapper-x .sni-selection-list' : '.sni-wrapper .sni-selection-list';
  },

  addExpressions: function(f, o){
    
    var v, id, e, s, x;

    //saves in currentExpressions
    so.g.currentExpressions[f.field] = f;

    //remove from your selections
    id = f.field+'-select';
    e = so.f.queryID( id );
    if ( e ) {
      $CQ( e ).remove();
    }
    //add to your selections
    v = so.f.getExpressionValue(f);
    s = so.f.getExpressionSelector(f.negated);
    o = {
          id: id,
          value: f.field+' = '+v,
          size:  f.count
    }
    document.querySelector(s).innerHTML += so.html.getSelectionEntry( o );
    so.f.fixTopMargin();
  },

  //process expressiones returned by an ajax request.
  doExpressions: function( data ){
          
        var e = data.expressions;  //this is coming from REST service.
        for (var i=0; i< e.length; i+=1){
            so.f.addExpressions( e[i] );
        }
        //total in get assets button
        document.querySelector('#sni-get-subcol .sni-size').innerHTML = so.f.displayTotal() + ' total';
  },

  displayExclusions:false, 

  toggleExclusions: function(){
    
     if ( !so.f.displayExclusions ){
        so.f.displayExclusions = true;
        $CQ('#CQ #sni-selection .sni-label-single').hide();
        $CQ('#CQ #sni-selection .sni-label-top').show();
        $CQ('#CQ #sni-selection .sni-wrapper-x').show();
        $CQ('#sni-selection .sni-tab').html('remove exclusions -');
     }else{
        so.f.displayExclusions = false;
        $CQ('#CQ #sni-selection .sni-label-single').show();
        $CQ('#CQ #sni-selection .sni-label-top').hide();
        $CQ('#CQ #sni-selection .sni-wrapper-x').hide();
        $CQ('#sni-selection .sni-tab').html('add exclusions +');
        $CQ('#sni-selection input[name=sni-selection-radio][value=i]').attr('checked', 'checked');
     }
     so.f.fixTopMargin();
  },

  //runs when user switches expressions between inclusions and exclusions using drag and drop
  switchList: function(ui, senderID){
    
    var e = ui.item[0];
    var s = so.f.queryID(senderID); //sender list
    var f = e.id.replace('-select', '');
    var x = so.g.currentExpressions[f];
    if (s.id === 'sni-inclusions'){
      x.negated = true;
    }else{
      x.negated = false;
    }
    so.f.redoExpressions();
  },

  //runs when user sort expressions in the same list using drag and drop
  switchExpression: function(ui){
    
    var e = ui.item[0];
    var f = e.id.replace('-select', '');
    so.f.redoExpressions();
  },


  //**********  WEB SERVICE RESPONSE TRANSLATORS ******************

  transformMap: function( m ){

      var i, l=m.length, x, a = [];
      for (i=0; i<l; i++){
          x = m[i];
          a.push( {value:x.label, rawValue:x.value, count:x.count} );
      }
      return a;
  },

  transformComboMap: function( m ){

      var i, l=m.length, x, a = [];
      for (i=0; i<l; i++){
        x = m[i];
          a.push( [ x.value, x.label+' ('+x.count+')' ] );
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
  fixTopMargin:function(){
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

  isRangeExpression: function(field){
    return so.g.currentExpressions[field].type === 'TermRangeExpression';
  },

  getExpressionValue: function(f){
    return (f.valueList && f.valueList.join(',')) || (f.lowerBound && f.lowerBound + ', '+f.upperBound) || f.value;
  },

  format2Thousand: function(v){
    return v >= 1000 ? Math.round(v/1000) + 'K' : v;
  },

    //total assets
  getTotal:function(){
    var f = so.f.getExpressions(so.g.currentExpressions);
    return f.length ? f[f.length-1].count : 0;
  },

  //total of matched assets
  displayTotal:function(){
    return so.f.format2Thousand(so.f.getTotal());
  },

  selectFilterType: function(config){
    var f=config.field, v=config.values, t=config.type, x={};
    if (t === 'range'){
        x[f] = {
          "type":"TermRangeExpression",
          "field":f,
          "lowerBound":v[0],
          "upperBound":v[1],
          "negated":so.f.isExclusion()
        };
        return x;
    }
    if (v.length > 1){
        x[f] = {
          "type":"TermMultiValueExpression",
          "field":f,
          "valueList":v,
          "negated":so.f.isExclusion()
        };
        return x;
    }
    x[f] = {
      "type":"TermExpression",
      "field":f,
      "value":v.join(''),
      "operator":"LIKE",
      "negated":so.f.isExclusion()                  
    };
    return x;
  }
};