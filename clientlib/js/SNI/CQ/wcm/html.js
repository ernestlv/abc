so.html = {

  getSelection: function(){
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
  
  getAssetsButton: function(){
      return [
                '<div class="sni-get-assets">',
                '<a href="#">',
                '<ul class="sni-button">',
                '<li class="sni-label">get assets</li>',
                '<li class="sni-size">10K total</li>',
                '</ul>',
                '</a>',
                '</div>'
              ].join('');
  },

  //add entries to selection area
  getSelectionEntry: function( o ){
    var z = o.size >= 1000 ? Math.round(o.size/1000) + 'K' : o.size;
    return [
                  '<li class="sni-select-entry" id="'+o.id+'">',
                  '<span class="sni-select-field">'+o.value+'</span>',
                  '<span class="sni-select-size">'+z+'</span>',
                  '<span class="sni-select-x" onClick="so.removeExpression(\''+o.id+'\')">X</span>',
                  '</li>',
    ].join('');
  }
}