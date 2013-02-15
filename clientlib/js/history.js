(function(so){
so.history = {

  win:null,
  listeners:{
                //show:function(){ //fires when popup window is shown
                //  this.el.dom.style.zIndex=10003; //fix to render properly since "your selection" area is fixed
                //  document.body.style.overflow = 'hidden'; //we need this to not scroll body in background of history when user scrolls popup
                //},

                //hide:function(){ //fires when popup window is hidden
                //  document.body.style.overflow = 'auto';
                //}

                move:function( window, x, y ){
                  //x and r help me to keep window within view port. user cannot drag it outside the screen.  
                  var z = window.getSize().width;
                  var r = x + z; //right side
                  if ( x<0 || r>1220 || y<0 ){

                      y = ( y < 0 ) ? 0 : y;
                      x = ( x < 0 ) ? 0 : x;
                      x = ( r > 1220 ) ? 1220 - z : x;
                      window.setPagePosition(x , y);
                }
    }

    },

    doRows: function( data ){

        var i, x, fromValue, toValue, d, b = [];
        for (i=0; i<data.length; i++){
            x = data[i];
            d = new Date( x.changeDate ).format('mmm dth, yyyy hh:mm a/p'); //format() is defined in so.js
            b.push('<tr><td class="sni-date">'+d+'</td><td class="sni-user">'+x.user+'</td><td class="sni-attribute">'+x.attribute+'</td><td class="sni-from-value">'+so.getLabel( x.fromValue )+'</td><td class="sni-to-value">'+so.getLabel( x.toValue )+'</td></tr>');
        }
        
        return b.join('');
    },

	open: function( index, data ){
        
        if (so.history.win){
                  so.history.win.destroy();
        }
        var scrollBar = $CQ(document.body).scrollTop(); //in pixels
        so.history.win = new CQ.Ext.Window({
        	id:'sni-history-pop-'+index,
            cls:'sni-history',
            //width:750,
            //height:330,
            bodyStyle:{
                maxHeight:'400px'
            },
            y:scrollBar+100, //makes sure the popup is always 100 px from the top of the viewport regardless of the scroll bar position.
            closeAction:'close',
            plain: true,
            resizable: false,
            autoScroll: true,
            html:[
            '<div class="sni-history-wrapper">',
            '<h1>'+data.title+'</h1>',
            '<h4>URL = <a href="'+data.uri+'.html" target="TOP">'+data.uri+'.html</a></h4>',
            '<div class="sni-history-wrapper-outter">',
            '<div class="sni-history-wrapper-inner">',
            '<table border=0 cellspacing=0 cellpadding=0>',
            '<tr><th>when</th><th>user</th><th>attribute</th><th>from</th><th>to</th></tr>',
            so.history.doRows( data.report ),
            '</table>',
            '</div>',
            '</div>',
            '</div>'
            ].join(''),
            listeners:so.history.listeners
        });
        so.history.win.show( this );
  }
};
})(so);