(function(so){
so.lightbox = {
  win:null,
  title:'',
  field:'', //field name this lightbox belongs to
  data:[], 
  listeners:{

    show: function(){ //fires when popup window is shown
      debugger
      //get form field
      var c = CQ.Ext.getCmp( so.lightbox.field );

      //if we have selected values then select them in lightbox
      if ( c.sni_rawValues ){
        var a = c.sni_rawValues, i;
        for ( i=0; i<a.length; i+=1 ){
            $CQ(".sni-lightbox input[value='"+a[i]+"']").attr('checked', 'checked');
        }
      }

      //scroll to first selected value
      try{
        var v = c.getValue().split(',');
        $CQ('.sni-lightbox-body').scrollTop( $CQ(".sni-lightbox [data-label^='"+v[0]+"']").position().top );
      }catch( e ){}
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

  typeAhead: function( evt ){
      
      console.log( 'pressed '+evt.which );
  },

  cancel:function(){ //fires when cancel button is clicked
      so.lightbox.win.hide();
  },

  select: function(){ //fires when button "add selected values" is clicked

        so.rest.handleLightbox(so.lightbox.field, so.lightbox);
        so.lightbox.win.hide();
  },

  swap: function(){ //switched between single-value and multivalue mode.
        so.lightbox.open({sni_multi: !so.lightbox.sni_multi});
  },

  getID: function(){
    return so.lightbox.field.replace(/[\s]/g, "_").toLowerCase();
  },

  //scrolls lightbox to the selected header
  scrollTo: function(e){
    var t = $CQ(e.target).attr('data-anchor');
    var a = $CQ('a[name='+t+']').position().top; //anchor position
    $CQ('.sni-lightbox-body').scrollTop(a);
  },

  setMenu: function( title ){
    var menu;
    if ( so.lightbox.menuOff ){
      menu = [ '<div class="sni-pick-title">'+title+'</div>' ].join('');
    }else{
      menu = [
                            '<div class="sni-pick-title">'+title+'</div>',
                            '<div class="sni-pick-wrapper">',
                            '<ul class="sni-pick">',
                            '<li><a title="goto: A" data-anchor="a">a</a></li>',
                            '<li><a title="goto: B" data-anchor="b">b</a></li>',
                            '<li><a title="goto: C" data-anchor="c">c</a></li>',
                            '<li><a title="goto: D" data-anchor="d">d</a></li>',
                            '<li><a title="goto: E" data-anchor="e">e</a></li>',
                            '<li><a title="goto: F" data-anchor="f">f</a></li>',
                            '<li><a title="goto: G" data-anchor="g">g</a></li>',
                            '<li><a title="goto: H" data-anchor="h">h</a></li>',
                            '<li><a title="goto: I" data-anchor="i">i</a></li>',
                            '<li><a title="goto: G" data-anchor="j">j</a></li>',
                            '<li><a title="goto: K" data-anchor="k">k</a></li>',
                            '<li><a title="goto: L" data-anchor="l">l</a></li>',
                            '<li><a title="goto: M" data-anchor="m">m</a></li>',
                            '<li><a title="goto: N" data-anchor="n">n</a></li>',
                            '<li><a title="goto: O" data-anchor="o">o</a></li>',
                            '<li><a title="goto: P" data-anchor="p">p</a></li>',
                            '<li><a title="goto: Q" data-anchor="q">q</a></li>',
                            '<li><a title="goto: R" data-anchor="r">r</a></li>',
                            '<li><a title="goto: S" data-anchor="s">s</a></li>',
                            '<li><a title="goto: T" data-anchor="t">t</a></li>',
                            '<li><a title="goto: U" data-anchor="u">u</a></li>',
                            '<li><a title="goto: V" data-anchor="v">v</a></li>',
                            '<li><a title="goto: W" data-anchor="w">w</a></li>',
                            '<li><a title="goto: X" data-anchor="x">x</a></li>',
                            '<li><a title="goto: Y" data-anchor="y">y</a></li>',
                            '<li><a title="goto: Z" data-anchor="z">z</a></li>',
                            '</ul>',
                            '</div>'
                            ].join('');
    }
    return {
                            region:'north',
                            border:false,
                            bodyStyle:{
                              //backgroundColor:'blue',
                              padding:'10px'
                            },
                            html:menu,
                            listeners:{
                              afterrender:function(){
                                $CQ('ul.sni-pick').click(so.lightbox.scrollTo)
                              }
                            }
    };
  },

  isSetHeader : false,
  currentHeader : null,
  fieldCounter : 0,

  setGroup : function( group, header ){

    var i, content = [];
    var id = so.lightbox.getID();
    if ( header ){
      header = header.toLowerCase();
      if ( !so.lightbox.isSetHeader ){
        content.push('<h1><a name="'+ header +'">'+ header +'</a></h1>');
        so.lightbox.isSetHeader =  true;
      }
    }
    content.push('<ul class="sni-options">');
    for(i=0; i < group.length; i++){
      if ( so.lightbox.sni_multi ){
        content.push('<li><input type="checkbox" data-label="'+group[i].value+'" value="'+group[i].rawValue+'" name="'+id+'_'+ so.lightbox.fieldCounter++ +'" id="'+id+'_'+ so.lightbox.fieldCounter++ +'" data-count="'+group[i].count+'">&nbsp&nbsp;'+group[i].value+' ('+group[i].count+')</li>');        
      }else{
        content.push('<li><input type="radio" data-label="'+group[i].value+'" value="'+group[i].rawValue+'" name="'+id+'_X" id="'+id+'_'+ so.lightbox.fieldCounter++ +'" data-count="'+group[i].count+'">&nbsp&nbsp;'+group[i].value+' ('+group[i].count+')</li>');
      }
      
    }
    content.push('</ul>');
    return content.join('');
  },

  getContent : function( data, noHeader ){
    var i, l, group = [], content = [];
    if ( data.length > 0 ){
      if ( noHeader ){
        for( i=0; i<data.length; i++ ){
            group.push( data[i] );
        }
        content.push( so.lightbox.setGroup( group ) );
      }else{ //i want headers
        if ( !so.lightbox.currentHeader ){
          so.lightbox.currentHeader = so.trim( data[0].value ).toLowerCase().slice(0,1);
        }
        for( i=0; i<data.length; i++ ){
          l = so.trim( data[i].value ).toLowerCase().slice(0,1);
          if ( l === so.lightbox.currentHeader ){
            group.push( data[i] );
          }else{
            content.push( so.lightbox.setGroup( group, so.lightbox.currentHeader ) );
            group = [];
            so.lightbox.currentHeader = l;
            so.lightbox.isSetHeader = false;
            group.push( data[i] );
          }
        }
        content.push( so.lightbox.setGroup( group, so.lightbox.currentHeader ) );
      }
    }
    return content;
  },

  setColumn : function( data, width, noHeader ){
    return {
              columnWidth: width,
              border: false,
              bodyStyle: {
                //backgroundColor:'red',
                paddingRight:'20px'
              },
              html: so.lightbox.getContent( data, noHeader ).join('')
    }
  },

  setContent : function( data, config ){
  
    var numEntries = so.lightbox.numEntries, numCols = so.lightbox.numCols, content = [];

    if ( numCols === 4 ){
        content.push(so.lightbox.setColumn(data.slice(0, numEntries), 0.25 ));
        content.push(so.lightbox.setColumn(data.slice(numEntries, numEntries*2), 0.25 ));
        content.push(so.lightbox.setColumn(data.slice(numEntries*2, numEntries*3), 0.25 ));      
        content.push(so.lightbox.setColumn(data.slice(numEntries*3, numEntries*4), 0.25 ));
    }else if ( numCols === 3 ){
        content.push(so.lightbox.setColumn(data.slice(0, numEntries), 0.33 ));
        content.push(so.lightbox.setColumn(data.slice(numEntries, numEntries*2), 0.34 ));
        content.push(so.lightbox.setColumn(data.slice(numEntries*2, numEntries*3), 0.33 ));
    }else if ( numCols === 2 ){
        content.push(so.lightbox.setColumn(data.slice(0, numEntries), 0.5 ));
        content.push(so.lightbox.setColumn(data.slice(numEntries, numEntries*2), 0.5 ));
    }else{
        content.push(so.lightbox.setColumn( data, 1.0, true ));
    }
    return {
              id: so.lightbox.getID() + '_sni-lightbox-content',
              cls:'sni-lightbox-content',
              bodyCssClass:'sni-lightbox-body', //we need this part to scroll the body
              region:'center',
              border:false,
              autoScroll:true,
              bodyStyle: {
                padding:'10px 10px 10px 20px'
              },
              layout:'column',
              items:content
    }
  },

  setActions: function(){
      return {
              region:'south',
              border:false,
              height:'2.3em',
              bodyStyle:{
                textAlign:'right'
              },
              //html:'<div style="margin-right:1em; display:inline-block; width:20em; height:2em; border-radius:.5em; background-color:#D0D0D0;">add selected values</div>'
              items:[{
                layout:'form',
                style:{
                  display:'inline-block',
                  verticalAlign:'bottom',
                  marginRight:'0.5em'
                },
                labelWidth:65,
                border:false,
                items:{
                  id:'sni-lightbox-slider',
                  xtype:'slider',
                  width: 30,
                  value: so.lightbox.sni_multi ? 1 : 0,
                  minValue: 0,
                  maxValue: 1,
                  fieldLabel:'Multiselect:',
                  listeners:{
                    changecomplete:function(slider, value){
                      so.lightbox.swap();
                    }
                  },
                  plugins: new CQ.Ext.slider.Tip({
                    getText: function(thumb){
                      return thumb.value ? 'ON' : 'OFF';
                    }
                  })
                }
              },{
                xtype:'button',
                text:' add selected values ',
                style:{
                  display:'inline-block',
                  margin:'.7em .5em .5em .5em'
                },
                handler:so.lightbox.select ? so.lightbox.select : null
              },{
                xtype:'button',
                text:' cancel ',
                style:{
                  display:'inline-block',
                  margin:'.7em 1.5em .5em .5em'
                },
                handler:so.lightbox.cancel
              }]    
      }
  },

  isMultiValue: function( field ){
    
      if ( !field ) return false;
      var c = CQ.Ext.getCmp( field );
      return c.sni_rawValues && c.sni_rawValues.length > 1;
  },

  init : function( config ){

        so.mix( config, so.lightbox );
        //minimum # of entries per column 10
        var data = so.lightbox.data, min = 10, numCols = 4, numEntries = Math.ceil(data.length / 4);
        if ( numEntries < min ){
            numCols = 3;
            numEntries = Math.ceil(data.length / 3);
            if ( numEntries < min ){
                numCols = 2;
                numEntries = Math.ceil(data.length / 2);
                if ( numEntries < min  ){
                    numCols = 1;
                    numEntries = data.length;
                }
            }
        }
        so.lightbox.numCols = numCols;
        so.lightbox.numEntries = numEntries;
        so.lightbox.columnWidth = Math.ceil( 750 * numCols / 4 );
        so.lightbox.menuOff = ( numCols === 1 );
        so.lightbox.scrollBar = $CQ(document.body).scrollTop()+100; //makes sure the popup is always 100 px from the top of the viewport.
        so.lightbox.fieldCounter = 0;
  },

  open: function( config ){
        
        if (so.lightbox.win){
                  so.lightbox.win.destroy();
        }
        so.lightbox.init( config );
        so.lightbox.win = new CQ.Ext.Window({
            id: 'sni_win_'+so.lightbox.getID(),
            layout: 'border',
            cls: 'sni-lightbox',
            width: so.lightbox.columnWidth,
            height: 500,
            y: so.lightbox.scrollBar,
            closeAction: 'hide',
            plain: true,
            items: [ 
              so.lightbox.setMenu( so.lightbox.title ), 
              so.lightbox.setContent( so.lightbox.data ),
              so.lightbox.setActions()
            ],
            listeners: so.lightbox.listeners
        });
        so.lightbox.win.show( this );
  },

  getValues: function(){
        
        var v=[], 
            a = $CQ('.sni-lightbox input:checked');
        //get user selections
        $CQ.each(a, function( index, element ){

            var x = $CQ( element ).val();
            v.push( x );
        });
       return v;
  }

};
})(so);
