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

  addClass: function(c, e){
            
      if (c){
          var x = e.getAttribute('class');
          e.setAttribute('class', x + ' ' + c);
      }
  },

  removeClass: function(c, e){

      var x = e.getAttribute('class');
      x = so.f.trim(x.replace(c, ''));
      e.setAttribute('class', x);
  },

  hasClass: function(c, e){
      var x = e.getAttribute('class');
      var re = new RegExp(c, "i");
      return re.test(x);
  },

  addStyle: function(s, e){

      if (s){
          for (var x in s){
              e.style[x] = s[x];
          }

      }
  },

  //************* MISCELLANEOUS HELPERS *****************

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

  //fix sectionsince sni-selection is fixed position
  fixTopMargin:function(){
    document.getElementById('sni-global').style.marginTop = document.getElementById('sni-selection').offsetHeight + 'px';
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

  format2Thousand: function(v){
    return v >= 1000 ? Math.round(v/1000) + 'K' : v;
  },

    //total assets
  getTotal:function(){
    var f = so.expressions.get(so.g.currentExpressions);
    return f.length ? f[f.length-1].count : 0;
  },

  //total of matched assets
  displayTotal:function(){
    return so.f.format2Thousand(so.f.getTotal());
  },

  isExclusion: function(){
    var v = $CQ('#sni-selection input[name=sni-selection-radio]:checked').val();
    return v === 'e' || false;
  },

  getLabels: function( v ){
    v = !v ? [] : [].concat(v); //normalize
    var l = v.length, i, x;
    var b = [];
      for(i=0; i<l; i++){
        x = v[i].split('/');
        b.push(x[x.length-1]);
      }
    return b;
  },

  getLabel: function( v ){
    return so.f.getLabels( v ).join(',');
  }
};