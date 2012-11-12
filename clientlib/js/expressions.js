so.expressions = {

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

  //sort expressions using array
  sort:function(filters, expressions){
      var f = filters, l = f.length;
      var i, x, b = [];
      for (i=0; i<l; i++){
        x = expressions[f[i]];
        x && b.push(x);
      }
      return b;
  },

  //return expressions sorted using the visual index in "Your selections"
  get: function( expressions ){

        var b = [], f, e, i;
        var dashboard = so.g.getDashboard(); //when call from result screen we need to point to dahsboard
        dashboard = dashboard ? dashboard.contentWindow : null;
        f = so.expressions.getFilters(dashboard, 'inclusions'); //is there filters in "your selections"?
        if (f.length){
          e = so.expressions.sort(f, expressions); //is there expressions for current filters?
          b = e.length ? b.concat(e) : b;
        }
        f = so.expressions.getFilters(dashboard, 'exclusions');
        if (f.length){
          e = so.expressions.sort(f, expressions);
          b = e.length ? b.concat(e) : b;
        }
        if ( !b.length ){ //first time we add an expression there will be no inclusion nor exclusion filters but there will be expressions.
          for(i in expressions){
              b.push(expressions[i])
          }
        }
        return b;
  },

  delete: function(field){
    delete so.g.currentExpressions[field]
  },

  redo: function(){

    var e, l, ae = {}, i, x;
    //we dont know the original order of the expressions so everything should be considered an added expression
    //and do the query again
    e = so.expressions.get(so.g.currentExpressions); //returns expressions sorted using the visual index in "your selections"
    l = e.length;
    for(i=0; i<l; i++){
      x = e[i];
      ae[x.field] = x;
    }

    so.g.currentExpressions = {};
    so.g.addedExpressions = ae;
    so.rest.getFilter( so.expressions.do );
  },

  isRange: function(field){
    return so.g.currentExpressions[field].type === 'TermRangeExpression';
  },

   //this function is called when a user deletes a filter from "your selections"
  remove: function( v ){
    
    var e = so.f.queryID( v );
    var f = e.id.replace('-select', '');
    if ( so.expressions.isRange( f ) ){
      so.f.reset(f+'_min');
      so.f.reset(f+'_max');
    }else{
      so.f.reset(f);
    }
    $CQ( e ).remove();
    so.f.fixTopMargin();
    so.expressions.delete( f );
    so.expressions.redo(); //we need to re-query the selections for whatever filters we have left.
  },

  //return a css selector for the inclusion or exclusion lists
  getYourSelections: function( negated ){
    
    return negated ? '.sni-wrapper-x .sni-selection-list' : '.sni-wrapper .sni-selection-list';
  },

  //returns the value of an expression
  getValue: function(f){
    return (f.valueList && f.valueList.join(',')) || (f.lowerBound && f.lowerBound + ', '+f.upperBound) || f.value;
  },

    add: function(f, o){
    
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
    v = so.expressions.getValue(f);
    s = so.expressions.getYourSelections(f.negated);
    o = {
          id: id,
          value: f.field+' = '+v,
          size:  f.count
    }
    document.querySelector(s).innerHTML += so.selection.doEntry( o );
    so.f.fixTopMargin();
  },

  //process expressiones returned by an ajax request.
  do: function( data ){
          
        var e = data.expressions;  //this is coming from REST service.
        for (var i=0; i< e.length; i+=1){
            so.expressions.add( e[i] );
        }
        //total in get assets button
        document.querySelector('#sni-get-subcol .sni-size').innerHTML = so.f.displayTotal() + ' total';
  },

   //runs when user switches expressions between inclusions and exclusions using drag and drop
  switch: function(ui, senderID){
    
    var e = ui.item[0];
    var s = so.f.queryID(senderID); //sender list
    var f = e.id.replace('-select', '');
    var x = so.g.currentExpressions[f];
    if (s.id === 'sni-inclusions'){
      x.negated = true;
    }else{
      x.negated = false;
    }
    so.expressions.redo();
  },

  //runs when user sort expressions in the same list using drag and drop
  drag: function(ui){
    
    var e = ui.item[0];
    var f = e.id.replace('-select', '');
    so.expressions.redo();
  },

  selectType: function(config){
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

}