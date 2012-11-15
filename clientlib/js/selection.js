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

  //add entries to selection area
  doEntry: function( o ){
    return [
                  '<li class="sni-select-entry" id="'+o.id+'">',
                  '<span class="sni-select-value">'+o.value+'</span>',
                  '<span class="sni-select-size">'+so.f.format2Thousand( o.size )+'</span>',
                  //'<span class="sni-select-x" onClick="so.f.removeExpression(\''+o.id+'\')">X</span>', onClick="so.expressions.remove(\''+o.id+'\')"
                  '<img class="sni-select-x" src="/apps/sni-site-optimizer/clientlib/css/close2.png">',
                  '</li>',
    ].join('');
  }
}