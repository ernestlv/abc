(function(so){
so.selection = {

  display: function(){
     return [
                '<div class="sni-outter-wrapper">',
                '<div class="sni-main">',

                '<div class="sni-wrapper">',
                '<div class="sni-left">',
                '<div class="sni-label-single">your<br>selections:</div>',
                '<div class="sni-label-top">inclusions: <input type="radio" name="sni-selection-radio" value="i" checked></div>',
                '</div>',
                '<div class="sni-right">',
                '<ul id="sni-inclusions" class="sni-selection-list"></ul>',
                '</div>',
                '</div>',

                '<div style="clear:both"></div>',

                '<div class="sni-wrapper-x">',
                '<div class="sni-left">',
                '<div class="sni-label-bottom">exclusions: <input type="radio" name="sni-selection-radio" value="e"></div>',
                '</div>',
                '<div class="sni-right">',
                '<ul id="sni-exclusions" class="sni-selection-list"></ul>',
                '</div>',
                '</div>',

                '<div style="clear:both"></div>',

                '</div>',
                '<div class="sni-tab">add exclusions +</div>',
                '<div class="sni-tab-left"></div>',
                '</div>'
              ].join(''); 
  },
  
  doButton: function(){
      return [
                '<div class="sni-get-assets">',
                '<a href="#">',
                '<ul class="sni-button">',
                '<li class="sni-label">get assets</li>',
                '<li class="sni-size">0 total</li>',
                '</ul>',
                '</a>',
                '</div>'
              ].join('');
  },

  //add filters to your selections area
  //when a filter is just added by a user the count is undefined in this case the filter is initially hidden.
  //however needs to be part of "your selections" area so is acounted for when redo updates all the filter counts
  doFilter: function( f ){
    var v = f.field+' = ' + ( f.field === 'filterURL' ? f.value : so.getLabel( f.value ) );
    return [
                  '<li class="sni-select-filter'+( f.count === undefined ? ' sni-select-new' : '' )+'" id="'+f.id+'">',
                  '<span class="sni-select-value">'+v+'</span>',
                  '<span class="sni-select-size">'+so.format2Thousand( f.count )+'</span>',
                  '<img class="sni-select-x" src="/apps/sni-site-optimizer/clientlib/css/close2.png">',
                  '</li>'
    ].join('');
  },

  displayExclusions:false, 

  toggle: function(){
    
     if ( !so.selection.displayExclusions ){
        so.selection.displayExclusions = true;
        $CQ('#CQ #sni-selection .sni-label-single').hide();
        $CQ('#CQ #sni-selection .sni-label-top').show();
        $CQ('#CQ #sni-selection .sni-wrapper-x').show();
        $CQ('#sni-selection .sni-tab').html('remove exclusions -');
     }else{
        so.selection.displayExclusions = false;
        $CQ('#CQ #sni-selection .sni-label-single').show();
        $CQ('#CQ #sni-selection .sni-label-top').hide();
        $CQ('#CQ #sni-selection .sni-wrapper-x').hide();
        $CQ('#sni-selection .sni-tab').html('add exclusions +');
        $CQ('#sni-selection input[name=sni-selection-radio][value=i]').attr('checked', 'checked');
     }
     so.fixTopMargin();
  },

  /////////////////////////// expressions //////////////////////////////////

  getInclusions: function(){
      var b = [];
      var dashboard = so.g.getDashboard(); //when call from result screen we need to point to dashboard
        dashboard = dashboard ? dashboard.contentWindow : null;
      if (dashboard){
          var x = dashboard.$CQ('#sni-inclusions li'), i, l = x.length;
          for (i=0; i<l; i++){
              b.push(x[i].id.replace('-select', ''));
          }
      }
      return b;
  },

  getExclusions: function(){
      var b = [];
      var dashboard = so.g.getDashboard(); //when call from result screen we need to point to dashboard
        dashboard = dashboard ? dashboard.contentWindow : null;
      if (dashboard){
          var x = dashboard.$CQ('#sni-exclusions li'), i, l = x.length;
          for (i=0; i<l; i++){
              b.push(x[i].id.replace('-select', ''));
          }
      }
      return b;
  },

  //sort expressions using array
  sort:function(filters, expressions){
      var l = filters.length;
      var i, x, b = [];
      for (i=0; i<l; i++){
        x = expressions[filters[i]];
        x && b.push(x);
      }
      return b;
  },

//return expressions sorted using the visual index in "Your selections"
  get: function( expressions ){

        var b = [], f, e, i;
        f = so.selection.getInclusions(); //are there any filters in "your selections"?
        if (f.length){
          e = so.selection.sort(f, expressions); //sort expressions based on filters visual index
          b = e.length ? b.concat(e) : b;
        }
        f = so.selection.getExclusions();
        if (f.length){
          e = so.selection.sort(f, expressions);
          b = e.length ? b.concat(e) : b;
        }
        if ( !b.length ){ //first time we add an expression there will be no inclusion nor exclusion filters but there will be expressions. this will be true if we dont use "redo()"
          for(i in expressions){
              b.push(expressions[i]);
          }
        }
        return b;
  },

  isRange: function(field){

    return so.g.currentExpressions[field].type === 'TermRangeExpression';
  },

  //returns the value of an expression as an array
  getValue: function(f){

    if (f.valueList){
      return f.valueList;
    }
    if (f.lowerBound){
      return [f.lowerBound, f.upperBound];
    }
    if (typeof f.value === 'string'){
      return [f.value];
    }
    return f.value; 
  },

  displaySize: function( z ){
    document.querySelector('#sni-get-subcol .sni-size').innerHTML = z + ' total';
  },

  //add new "filter" to "your selections" and becomes a current expression. May be call thru "do" or "redo"
  add: function( f ){

    var id, e, s;

    so.g.currentExpressions[f.field] = f; //here f becomes a current expression

    //remove old version from "your selections" area
    id = f.field+'-select';
    e = document.getElementById( id );
    if ( e ) {
      $CQ( e ).remove();
    }

    //add new version to "your selections" area
    s = f.negated ? '.sni-wrapper-x .sni-selection-list' : '.sni-wrapper .sni-selection-list';
    document.querySelector(s).innerHTML += so.selection.doFilter({
        id:id, 
        field:f.field, 
        value:so.selection.getValue(f), 
        count:f.count, 
        negated:f.negated
    }); //here f becomes a filter

    so.fixTopMargin();
    
  },

  //process expressiones returned by an ajax request.
  do: function( data ){
          
        var e = data.expressions;  //this is coming from REST service.
        for (var i=0; i< e.length; i+=1){
            so.selection.add( e[i] );
        }
        //total in get assets button
        so.selection.displaySize( so.selection.displayTotal() );
  },

  //redo expressions after user removes, switches or drags filters also when user adds a new selection
  redo: function( newSelection ){

    if ( newSelection ){ //this is true only when a new selection is added.
      var isEmpty = so.selection.doEmpty( newSelection );
      if ( isEmpty ){ //this is true when a user manually clears a field value.
          return;
      }
      var newExpression = so.selection.getExpressionType( newSelection ); //here the selection becomes an expression
      var newFilter = newExpression[ newSelection.field ]; //picks the filter portion of the expression 
      so.selection.add( newFilter ); // adds filter to "your selections" area. So it is accounted for in requestFilter().
    }
    so.g.addedExpressions = so.g.currentExpressions;
    so.g.currentExpressions = {};
    so.rest.requestFilter( so.selection.do );
  },

  //this function is called when a user deletes a filter from "your selections"
  remove: function( evt ){

    var id = evt;
    if (evt.target){ //if true this is called from a click event otherwise is called programatically and evt contains id
      var t = evt.target;
      if (!so.hasClass('sni-select-x', t)){ //we did not click remove button
        return;
      }
      id = t.parentNode.id; //target is the img we need the parent li#id
    }
    var e = document.getElementById( id );
    var f = id.replace('-select', '');
    if ( so.selection.isRange( f ) ){
      so.reset(f+'_min');
      so.reset(f+'_max');
    }else{
      so.reset(f);
    }
    $CQ( e ).remove();
    so.fixTopMargin();
    delete so.g.currentExpressions[f];
    so.selection.redo(); //we need to re-query the selections for whatever filters we have left.
  },

   //runs when user switches filters between inclusions and exclusions using drag and drop
  move: function( ui, senderID ){
    
    var e = ui.item[0];
    var s = document.getElementById( senderID ); //sender list
    var f = e.id.replace('-select', '');
    var x = so.g.currentExpressions[f];
    x.negated = s.id === 'sni-inclusions';
    so.selection.redo();
  },

  //runs when user sort filters in the same list using drag and drop
  drag: function(ui){
    
    so.selection.redo();
  },

  //total assets
  getTotal:function(){
    var f = so.selection.get(so.g.currentExpressions);
    return f.length ? f[f.length-1].count : 0;
  },

  //total of matched assets
  displayTotal:function(){
    return so.format2Thousand(so.selection.getTotal());
  },

  isExclusion: function(){
    var v = $CQ('#sni-selection input[name=sni-selection-radio]:checked').val();
    return v === 'e' || false;
  },

  getExpressionType: function(selection){
    var f=selection.field, v=selection.values, t=selection.type, x={};
    if (t === 'range'){
        x[f] = {
          "type":"TermRangeExpression",
          "field":f,
          "lowerBound":v[0],
          "upperBound":v[1],
          "negated":so.selection.isExclusion()
        };
        return x;
    }
    if (t === 'filter'){
        x[f] = {
          "type":"TermExpression",
          "field":f,
          "value":v.join(''),
          "operator":"TEXTSEARCH",
          "negated":so.selection.isExclusion()                  
        };
        return x;
    }
    if (v.length > 1){
        x[f] = {
          "type":"TermMultiValueExpression",
          "field":f,
          "valueList":v,
          "negated":so.selection.isExclusion()
        };
        return x;
    }
    x[f] = {
      "type":"TermExpression",
      "field":f,
      "value":v.join(''),
      "operator":"LIKE",
      "negated":so.selection.isExclusion()                  
    };
    return x;
  },

  //if user manually clears a checkbox, the code determines if the selection value is empty,
  //then removes the filter from your selections area. The caller should abort the transaction.
  doEmpty:function( selection ){
    var value = selection.values.join('');
    if (!value){ //user cleared a field
        so.selection.remove( selection.field+'-select' );
        return true;
    }
    return false;
  }
};
})(so);