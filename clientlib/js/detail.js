(function(so){  
so.detail = {

  win:null,
  highest:{},
  higher:{},
  high:{},
  listeners:{
                //show:function(){ //fires when popup window is shown
                //  this.el.dom.style.zIndex=10003; //fix to render properly since "your selection" area is fixed
                //  document.body.style.overflow = 'hidden'; //we need this to not scroll body in background of detail when user scrolls popup
                //},

                //hide:function(){ //fires when popup window is hidden
                //  document.body.style.overflow = 'auto';
                //},
                
                afterrender:function(){
                    
                    var y, n;
                    for ( y in so.detail.highest ){
                        if ( so.detail.highest[y].count > -1 ){
                            n = document.querySelectorAll( '#sni-detail-'+y+' .sni-detail-m'+so.detail.highest[y].index );
                            so.addClass('sni-detail-highest', n[0]);
                            so.addClass('sni-detail-highest', n[1]);
                        }
                        if ( so.detail.higher[y].count > -1 ){
                            n = document.querySelectorAll( '#sni-detail-'+y+' .sni-detail-m'+so.detail.higher[y].index );
                            so.addClass('sni-detail-higher', n[0]);
                            so.addClass('sni-detail-higher', n[1]);
                        }
                        if ( so.detail.high[y].count > -1 ){
                            n = document.querySelectorAll( '#sni-detail-'+y+' .sni-detail-m'+so.detail.high[y].index );
                            so.addClass('sni-detail-high', n[0]);
                            so.addClass('sni-detail-high', n[1]);
                        }
                    }
                },

                move:function( window, x, y ){
    
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

  doYear: function( year, q, m, highest, higher, high ){
    var t = [
            '<div class="sni-detail-wrapper-inner">',
            '<table border=1 id="sni-detail-{yyyy}">',
            '<tr><th colspan=12>{yyyy} page view summary</th></tr>',
            '<tr><td colspan=3>Q1</td><td colspan=3>Q2</td><td colspan=3>Q3</td><td colspan=3>Q4</td></tr>',
            '<tr><td class="sni-detail-q1" colspan=3>{q1}</td><td class="sni-detail-q2" colspan=3>{q2}</td><td class="sni-detail-q3" colspan=3>{q3}</td><td class="sni-detail-q4" colspan=3>{q4}</td></tr>',
            '<tr><td class="sni-detail-m1">january</td><td class="sni-detail-m2">february</td><td class="sni-detail-m3">march</td><td class="sni-detail-m4">april</td><td class="sni-detail-m5">may</td><td class="sni-detail-m6">june</td><td class="sni-detail-m7">july</td><td class="sni-detail-m8">august</td><td class="sni-detail-m9">september</td><td class="sni-detail-m10">october</td><td class="sni-detail-m11">november</td><td class="sni-detail-m12">december</td></tr>',
            '<tr><td class="sni-detail-m1">{m1}</td><td class="sni-detail-m2">{m2}</td><td class="sni-detail-m3">{m3}</td><td class="sni-detail-m4">{m4}</td><td class="sni-detail-m5">{m5}</td><td class="sni-detail-m6">{m6}</td><td class="sni-detail-m7">{m7}</td><td class="sni-detail-m8">{m8}</td><td class="sni-detail-m9">{m9}</td><td class="sni-detail-m10">{m10}</td><td class="sni-detail-m11">{m11}</td><td class="sni-detail-m12">{m12}</td></tr>',
            '</table>',
            '</div>'
    ].join('');
    t = t.replace(/{yyyy}/g, year || '-');
    t = t.replace(/{q1}/, q[1] || '-');
    t = t.replace(/{q2}/, q[2] || '-');
    t = t.replace(/{q3}/, q[3] || '-');
    t = t.replace(/{q4}/, q[4] || '-');
    t = t.replace(/{m1}/, m[1] || '-');
    t = t.replace(/{m2}/, m[2] || '-');
    t = t.replace(/{m3}/, m[3] || '-');
    t = t.replace(/{m4}/, m[4] || '-');
    t = t.replace(/{m5}/, m[5] || '-');
    t = t.replace(/{m6}/, m[6] || '-');
    t = t.replace(/{m7}/, m[7] || '-');
    t = t.replace(/{m8}/, m[8] || '-');
    t = t.replace(/{m9}/, m[9] || '-');
    t = t.replace(/{m10}/, m[10] || '-');
    t = t.replace(/{m11}/, m[11] || '-');
    t = t.replace(/{m12}/, m[12] || '-');
    return t;
  },

  doRows: function( data ){

    function initHighest( year ){

        so.detail.highest[year] = {};
        so.detail.higher[year] = {};
        so.detail.high[year] = {};
        so.detail.highest[year].count = -1;
        so.detail.higher[year].count = -1;
        so.detail.high[year].count = -1;
    }

    function doHighest( year, index, count ){
        
        if ( count > so.detail.highest[year].count ){
            so.detail.high[year].count = so.detail.higher[year].count;
            so.detail.high[year].index = so.detail.higher[year].index;
            so.detail.higher[year].count = so.detail.highest[year].count;
            so.detail.higher[year].index = so.detail.highest[year].index;
            so.detail.highest[year].count = count;
            so.detail.highest[year].index = index;
        }else if ( count > so.detail.higher[year].count ){
            so.detail.high[year].count = so.detail.higher[year].count;
            so.detail.high[year].index = so.detail.higher[year].index;
            so.detail.higher[year].count = count;
            so.detail.higher[year].index = index;
        }else if ( count > so.detail.high[year].count ){
            so.detail.high[year].count = count;
            so.detail.high[year].index = index;
        }
    }
    
    var b = [];
    var qr = data.quarterReport, q=[];
    var mr = data.monthReport, m;
    var year = qr[0] ? qr[0].year : '-', i, j;
    initHighest( year );
    for ( i=0; i<qr.length; i++ ){
        if ( qr[i].year === year ){
           q[qr[i].quarter] = so.format( qr[i].count ); 
        }else{
            m=[];
            for ( j=0; j<mr.length; j++){
                if ( mr[j].year === year ){
                    doHighest( year, mr[j].month, mr[j].count );
                    m[mr[j].month] = so.format( mr[j].count );
                }
            }
            b.push( so.detail.doYear(year, q, m, 3, 1, 12) );
            b.push( '<br>' );
            year = qr[i].year;
            initHighest( year );
            q = [];
            q[qr[i].quarter] = so.format( qr[i].count ); 
        }
    }
    m=[];
    for ( j=0; j<mr.length; j++){
        if ( mr[j].year === year ){
            doHighest( year, mr[j].month, mr[j].count );
            m[mr[j].month] = so.format( mr[j].count );
        }
    }
    b.push( so.detail.doYear(year, q, m, 5, 7, 3) );
    return b.join('');
  },

	open: function( data ){

        var v = so.format( so.result.pageViews.totalPageViews );
        
        if (so.detail.win){
                  so.detail.win.destroy();
        }
        var scrollBar = $CQ(document.body).scrollTop(); //in pixels
        so.detail.win = new CQ.Ext.Window({
        	id:'sni-detail-pop-',
            cls:'sni-detail',
            width:750,
            //height:470,
            bodyStyle:{
                maxHeight:'470px'
            },
            y:scrollBar+100, //makes sure the popup is always 100 px from the top of the viewport regardless of the scroll bar position.
            closeAction:'close',
            plain: true,
            resizable: false,
            autoScroll: true,
            html:[
            '<div class="sni-detail-wrapper">',
            '<h1>Page View Summary <span class="sni-detail-total">total page views = '+v+'</span></h1>',
            '<div class="sni-detail-wrapper-outter">',
            so.detail.doRows( data ),
            '</div>',
            '</div>'
            ].join(''),
            listeners:so.detail.listeners
        });
        so.detail.win.show( this );
  }
};
})(so);