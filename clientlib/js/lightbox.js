so.lightbox = {
  win:null,
  title:'',
  field:'', //field name this lightbox belongs to
  data:[], 
  listeners:{
    show:function(){
      
      //get form field
      var n = so.lightbox.field;
      var c = CQ.Ext.getCmp(n);
      var v = c.getValue();
      v = so.f.trim(v);

      //if we have values then select them in lightbox
      if (v){
        var s = '#'+so.lightbox.win.id+' input[type=checkbox]';
        var k = $CQ( s );
        var a = v.split(','), i, x;
        for ( i=0; i<a.length; i+=1 ){
            x = a[i];
            x = so.f.trim( x );
            $CQ.each(k, function(i, e){
                var v = $CQ(e).attr('data-label');
                if ( v === x ){
                  e.checked = true;
                }
            });
        }
      }

      this.el.dom.style.zIndex=10003; //fix to render properly since "your selection" area is fixed
      document.body.style.overflow = 'hidden'; //we need this to not scroll body in background of lightbox when user scrolls popup
    },

    hide:function(){
      document.body.style.overflow = 'auto';
    }

  },

  cancel:function(){
      so.lightbox.win.close();
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

  setNorth: function( title ){
    return {
                            region:'north',
                            border:false,
                            bodyStyle:{
                              //backgroundColor:'blue',
                              padding:'10px',
                            },
                            html:[
                            '<div class="sni-pick-title">'+title+'</div>',
                            '<div class="sni-pick-wrapper">',
                            'goto:',
                            '<ul class="sni-pick">',
                            '<li><a data-anchor="a">a</a></li>',
                            '<li><a data-anchor="b">b</a></li>',
                            '<li><a data-anchor="c">c</a></li>',
                            '<li><a data-anchor="d">d</a></li>',
                            '<li><a data-anchor="e">e</a></li>',
                            '<li><a data-anchor="f">f</a></li>',
                            '<li><a data-anchor="g">g</a></li>',
                            '<li><a data-anchor="h">h</a></li>',
                            '<li><a data-anchor="i">i</a></li>',
                            '<li><a data-anchor="j">j</a></li>',
                            '<li><a data-anchor="k">k</a></li>',
                            '<li><a data-anchor="l">l</a></li>',
                            '<li><a data-anchor="m">m</a></li>',
                            '<li><a data-anchor="n">n</a></li>',
                            '<li><a data-anchor="o">o</a></li>',
                            '<li><a data-anchor="p">p</a></li>',
                            '<li><a data-anchor="q">q</a></li>',
                            '<li><a data-anchor="r">r</a></li>',
                            '<li><a data-anchor="s">s</a></li>',
                            '<li><a data-anchor="t">t</a></li>',
                            '<li><a data-anchor="u">u</a></li>',
                            '<li><a data-anchor="v">v</a></li>',
                            '<li><a data-anchor="w">w</a></li>',
                            '<li><a data-anchor="x">x</a></li>',
                            '<li><a data-anchor="y">y</a></li>',
                            '<li><a data-anchor="z">z</a></li>',
                            '</ul>',
                            '</div>'
                            ].join(''),
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

  setGroup : function(a, group){
    a = a.toLowerCase();
    var i, content = [];
    var id = so.lightbox.getID();
    if ( !so.lightbox.isSetHeader ){
      content.push('<h1><a name="'+a+'">'+a+'</a></h1>');
      so.lightbox.isSetHeader =  true;
    }
    content.push('<ul class="sni-options">');
    for(i=0; i < group.length; i++){
      content.push('<li><input type="checkbox" data-label="'+group[i].value+'" value="'+group[i].rawValue+'" name="'+id+'_'+ so.lightbox.fieldCounter++ +'" data-count="'+group[i].count+'">&nbsp&nbsp;'+group[i].value+' ('+group[i].count+')</li>');
    }
    content.push('</ul>');
    return content.join('');
  },

  getContent : function( data ){
    var i, l, group = [], content = [];
    if ( data.length > 0 ){
        if (!so.lightbox.currentHeader){
          so.lightbox.currentHeader = data[0].value.slice(0,1);
        }
        for( i=0; i<data.length; i++ ){
          l = data[i].value.slice(0,1);
          if (l == so.lightbox.currentHeader){
            group.push(data[i]);
          }else{
            content.push(so.lightbox.setGroup(so.lightbox.currentHeader, group));
            group = [];
            so.lightbox.currentHeader = l;
            so.lightbox.isSetHeader = false;
            group.push(data[i]);
          }
        }
        content.push(so.lightbox.setGroup(so.lightbox.currentHeader, group));
    }
    return content;
  },

  setColumn : function( data ){
    return {
              columnWidth:.25,
              border:false,
              bodyStyle:{
                //backgroundColor:'red',
                paddingRight:'20px'
              },
              html: so.lightbox.getContent( data ).join('')
    }
  },

  setCenter : function( data ){
    
    var min = 10;
    var numEntries = Math.ceil(data.length / 4), content = [];
    if ( numEntries < min ){
        numEntries = Math.ceil(data.length / 3);
        if ( numEntries < min ){
            numEntries = Math.ceil(data.length / 2);
            if ( numEntries < min  ){
                content.push(so.lightbox.setColumn( data ));
                content.push(so.lightbox.setColumn( [] ));
                content.push(so.lightbox.setColumn( [] ));
                content.push(so.lightbox.setColumn( [] ));
            }else{
                content.push(so.lightbox.setColumn(data.slice(0, numEntries)));
                content.push(so.lightbox.setColumn(data.slice(numEntries, numEntries*2)));
                content.push(so.lightbox.setColumn( [] ));
                content.push(so.lightbox.setColumn( [] ));
            }
        }else{
                content.push(so.lightbox.setColumn(data.slice(0, numEntries)));
                content.push(so.lightbox.setColumn(data.slice(numEntries, numEntries*2)));
                content.push(so.lightbox.setColumn(data.slice(numEntries*2, numEntries*3)));
                content.push(so.lightbox.setColumn( [] ));
        }
    }else{
                content.push(so.lightbox.setColumn(data.slice(0, numEntries)));
                content.push(so.lightbox.setColumn(data.slice(numEntries, numEntries*2)));
                content.push(so.lightbox.setColumn(data.slice(numEntries*2, numEntries*3)));      
                content.push(so.lightbox.setColumn(data.slice(numEntries*3, numEntries*4)));      
    }
   
    return {
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

  setSouth: function(){
      return {
              region:'south',
              border:false,
              height:'2.3em',
              bodyStyle:{
                textAlign:'right'
              },
              //html:'<div style="margin-right:1em; display:inline-block; width:20em; height:2em; border-radius:.5em; background-color:#D0D0D0;">add selected values</div>'
              items:[{
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

  open: function( config ){
        
        so.f.mix( config, so.lightbox );
        so.lightbox.fieldCounter = 0;
        if (so.lightbox.win){
                  so.lightbox.win.destroy();
        }
        var scrollBar = $CQ(document.body).scrollTop(); //in pixels
        so.lightbox.win = new CQ.Ext.Window({
            id: 'sni_win_'+so.lightbox.getID(),
            layout:'border',
            cls:'sni-lightbox',
            width:750,
            height:500,
            y:scrollBar+100, //makes sure the popup is always 100 px from the top of the viewport regardless of the scroll bar position.
            closeAction:'hide',
            plain: true,
            items: [
              so.lightbox.setNorth( so.lightbox.title ), 
              so.lightbox.setCenter( so.lightbox.data ),
              so.lightbox.setSouth()
            ],
            listeners:so.lightbox.listeners
        });
        so.lightbox.win.show( this );
  },

  getValues: function(){

        var s = '#'+so.lightbox.win.id+' input[type=checkbox]:checked';
        var a = $CQ( s ), k=[], v=[];

        //get user selections
        $CQ.each(a, function(i, e){
            var x = $CQ(e).val();
            var c = e.getAttribute('data-count');
            k.push( c );
            v.push( x );
        });

        return v;
  },

  select: function(){ //fires when button "add selected values" is clicked

        //so.rest.getFilter({field:n, values:v, counts:k}, so.rest.handleLightbox);

        so.rest.handleLightbox(so.lightbox.field, so.lightbox);
        so.lightbox.win.close();
  }

};