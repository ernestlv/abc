(function(so){
so.result = {

        //********* GRID FUNCTIONS ***********************

        fixSplit: function (){

            $CQ('.sni-split').each(function(){
                var e = document.getElementById(this.id+'-wrapper');
                //var t = so.result.getTotal();
                var h = e.offsetHeight;
                //var p = t > 3 ? 100 : 0;
                //this.style.height = h-p + 'px';
                this.style.height = h + 'px';
                //this.style.paddingTop = p + 'px'
            });
        },

        getMaxSplit: function (grid, id){

            var p = grid.panel, z = p.length, i;
            for(i=0; i<z; i++){
                if ( p[i].contentID === id ){
                    return p[i].size;
                }
            }
            return 0;
        },

        setMaxSplit: function (grid, id, width){

            var p = grid.panel, z = p.length, i;
            for(i=0; i<z; i++){
                if ( p[i].contentID === id ){
                    p[i].size = width;
                }
            }
        },

        clickSplit: function ( e ){

                        var x = e.target, i;
                        if (x.className === 'sni-split-label'){
                            i = x.firstChild;
                            x = x.parentNode;
                        }else if (x.className === 'sni-split-icon'){
                            i = x;
                            x = x.parentNode.parentNode;
                        }else{
                            i = x.firstChild.firstChild;
                        }
                        var id = x.id + '-wrapper';
                        var c = document.getElementById(id);
                        var max = so.result.getMaxSplit(so.grid, id);
                        if (c.offsetWidth === 1){ //because border is 1px solid #fff
                            c.style.width = max;
                            c.style.borderRight = '0px';
                            i.innerHTML = '-';
                        }else{
                            so.result.setMaxSplit(so.grid, id, c.style.width);
                            c.style.width = 0;
                            c.style.borderRight = '1px solid #fff';
                            i.innerHTML = '+';

                        }
        },

        doRows: function ( p, tbl, w ){

            //header above tables
            var h = document.createElement('div');
            h.setAttribute('id', tbl.id);
            h.setAttribute('class', 'sni-t-header');
            so.addClass(tbl.classHead, h);
            so.addStyle(tbl.style, h);
            h.innerHTML = '<div class="sni-title-collapsible">'+tbl.label+'</div>';
            w.appendChild(h);

            //do table rows
            var header = document.createElement('tr');
            var data = document.createElement('tr');
            var count = 0;
            CQ.Ext.each(tbl.columns, function(c, i, a){
                var colID = tbl.id+'-'+count++;
                
                //headers row
                var th = document.createElement('th');
                th.setAttribute('class', 'sni-col sni-expandable');

                //border wrapper
                var div = document.createElement('div');
                div.setAttribute('class', 'sni-col-border');
                div.setAttribute('title', c.label.toUpperCase());
                so.addClass(c.classHead, div);
                so.addStyle(c.style, div);

                //title element
                var s1 = document.createElement('span');
                s1.setAttribute('class', 'sni-col-title');
                s1.style.width = c.width + 'px';
                s1.setAttribute('data-sni-width', c.width); //save original width see grid.js clickHeader()
                s1.setAttribute('data-sni-dataIndex', c.dataIndex);
                //fix label
                if ( so.result.sortField === c.dataIndex ){
                    c.isSorted = true;
                    so.addClass('sni-sorted-'+so.result.sortOrder, div);
                    if ( (/<br>/i).test( c.label ) ){
                        c.label = c.label.replace(/<br>/i, ' *&nbsp;&nbsp;&nbsp;<br>') + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                    }else{ //single line label
                        c.label = c.label + ' *&nbsp;&nbsp;&nbsp;';
                    }
                }
                s1.innerHTML = c.label;
                div.appendChild(s1);
                so.result.setTooltip( c, '', div );
                //add events
                c.click && $CQ(s1).click( c.click ); //performance: we dont want a closure here.

                //dragging element
                var s2 = document.createElement('span');
                s2.setAttribute('class', 'sni-drag');
                s2.setAttribute('data-col-id', colID);
                s2.innerHTML = '&nbsp;';
                div.appendChild(s2);

                th.appendChild(div);
                header.appendChild(th);

                //data row
                var td = document.createElement('td');
                td.setAttribute('class', 'sni-col');

                //resizable wrapper
                var div2 = document.createElement('div');
                div2.id = colID;
                div2.setAttribute('class', 'sni-resizable');
                div2.setAttribute('style', 'width:'+(c.width+15)+'px'); // accounts for 10px of margins + 3 px of dragging cmp + 2 px border
                so.addClass(c.classData, div2);
                so.addStyle(c.styleData, div2);

                td.appendChild(div2);
                data.appendChild(td);

                //add events
                c.clickData && $CQ(div2).click( c.clickData );
            });
            
            //header table
            var t = document.createElement('table');
            t.setAttribute('class', 'sni-table sni-header');
            t.setAttribute('border', '0');
            t.setAttribute('cellpadding', '0');
            t.setAttribute('cellspacing', '0');
            t.appendChild(header);
            w.appendChild(t);

            //$CQ(header).on( 'click', 'span.sni-col-title', function(){ alert('hello: ') } );

            //data table
            t = document.createElement('table');
            t.setAttribute('class', 'sni-table sni-data');
            t.setAttribute('border', '0');
            t.setAttribute('cellpadding', '0');
            t.setAttribute('cellspacing', '0');
            t.appendChild(data);
            w.appendChild(t);
        },

        doTable: function (p, w){

            //var i, j, h, col, width;
            var e = document.createElement('div');
            e.setAttribute('class', 'sni-p-table');

            CQ.Ext.each(p.table, function(t, i, a){
                    var x = document.createElement('div');
                    x.setAttribute('class', 'sni-t-wrapper');
                    so.result.doRows(p, t, x);
                    e.appendChild(x);
            });

            w.appendChild(e);
        },

        doContent: function (p, w){

                        //create the panel element
                        var e = document.createElement('div');
                        e.setAttribute('id', p.contentID);
                        e.setAttribute('class', 'sni-p-content');

                        //create panel main header
                        var h = document.createElement('div');
                        h.setAttribute('class', 'sni-p-header');
                        so.addClass(p.classHead, h);
                        so.addStyle(p.style, h);
                        h.innerHTML = '<div class="sni-title-collapsible">'+ ( p.isShortYear ? p.year : p.label ) +'</div>'; //isShortYear applies only to the monthly page views labels is undefined everywhere else
                        e.appendChild(h);
                        so.result.doTable(p, e);
                        w.appendChild(e);
                        return e;
        },

        doSplit: function (p, w){

                        //create the splitter element
                        var e = document.createElement('div');
                        e.setAttribute('id', p.splitID);
                        e.setAttribute('class', 'sni-split');
                        e.setAttribute('title', p.label);
                        e.innerHTML = [
                                        '<span class="sni-split-label">',
                                        '<span class="sni-split-icon">-</span> ',
                                        so.isIE8() ? '' : p.label,
                                        '</span>'
                        ].join('');
                        $CQ(e).click(so.result.clickSplit);
                        w.appendChild(e);
                        return e;              
        },

        doPanel: function (p, w){
            
                        p.contentID = p.splitID + '-wrapper';

                        if (p.split !== false){
                            var s = so.result.doSplit(p, w);
                        }
                        var c = so.result.doContent(p, w);
        },

        doGrid: function ( grid ){
                
                var count = 0;
                //main wrapper
                var w = document.createElement('div');
                w.setAttribute('class', 'sni-grid');  

                //process a single panel in the grid
                CQ.Ext.each(grid.panel, function(p, i, a){
                    p.splitID = p.id;
                    so.result.doPanel(p, w);
                });

                return w;
        },

        setTooltip: function( column, data, element ){
            if ( !data ) return;
            var t = column.label;
            if ( column.isSorted ){
                t = t.replace(/\s\*|&nbsp;+/gi, '');
            }
            t = t.replace(/<br>/i, ' ') 
               
        },

        loadGrid: function ( data ){

                    // create the data store
                    var store= new CQ.Ext.data.ArrayStore({
                        fields: so.grid.fields
                    });

                    // manually load local data
                    store.loadData( data );

                    var gcol = 0; //global col counter
                    CQ.Ext.each(so.grid.panel, function(p, i, a){

                        CQ.Ext.each(p.table, function(h, i, a){

                            var col = 0;
                            CQ.Ext.each(h.columns, function(c, i, a){

                                        var x = document.getElementById(h.id+'-'+col++);
                                        var row = 0;
                                        gcol++;
                                        store.each(function(r){
                                
                                            var isODD = row++ % 2;
                                            var d = document.createElement('div');
                                                d.setAttribute('class', isODD ? 'sni-cell-odd' : 'sni-cell-even');
                                                d.setAttribute('data-sni-row', row );
                                                d.setAttribute('data-sni-col', col );
                                                d.setAttribute('data-sni-global-col', gcol );
                                                if ( typeof c.dataIndex === 'string'){
                                                    var data = r.data[c.dataIndex];
                                                    if ( c.filter ){
                                                        data = c.filter( data ); 
                                                    }
                                                    if ( data ){
                                                        d.innerHTML = data;
                                                        d.setAttribute('title', c.tooltip+data);
                                                    }
                                                }else{
                                                    c.dataIndex(row, d);
                                                }
                                                x.appendChild(d);
                                        });
                            });                        
                        });
                    });
        },

//deprecated: don't have to clean it 'cause i reload it every time
        //cleanGrid: function ( data ){
//
//                    CQ.Ext.each(so.grid.panel, function(p, i, a){
//
//                        CQ.Ext.each(p.table, function(h, i, a){
//
//                            var col = 0;
//                            CQ.Ext.each(h.columns, function(c, i, a){
//
//                                var x = document.getElementById(h.id+'-'+col++);
//                                $CQ('div', x).remove();
//                            });                        
//                        });
//                    });
//        },

    //******* SEARCH ATTRIBUTES FUNCTIONS ***********************

    doSplitSearch: function (){

        var d = document.createElement('div');
        d.setAttribute('id', 'sni-search');
        d.setAttribute('class', 'sni-split');
        d.setAttribute('title', 'current search attributes');
        d.innerHTML = [
                        '<span class="sni-split-label">',
                        '<span class="sni-split-icon">-</span>',
                        so.isIE8() ? '' : ' current search attributes',
                        '</span>'
        ].join('');
        $CQ(d).click( so.result.clickSplitSearch );
        return d;
    },

    doSearch: function (){

        var t = document.createElement('p');
        t.setAttribute('class', 'sni-atts-title');
        t.innerHTML = 'search attributes';

        var b = document.createElement('ul');
        b.setAttribute('class', 'sni-atts-buttons');
        b.innerHTML = [
                '<li><a id="sni-modify-search-button" href="#" >modify search</a></li>',
                '<li><a id="sni-new-search-button" href="javascript: void 0" target="_top">new search</a></li>'
        ].join('');

        var x = so.result.doSelections();

        var w = document.createElement('div');
        w.setAttribute('class', 'sni-atts-wrapper');
        w.appendChild(t);
        w.appendChild(x);
        w.appendChild(b);

         var s = document.createElement('div');
        s.setAttribute('id', 'sni-search-wrapper');
        s.appendChild(w);
        return s;
    },

    getSelectionEntries: function(){

        var e = so.selection.get( so.g.currentExpressions ), l=e.length, i, x, v, c, b = [];
        for ( i = 0; i<l; i++ ){
            x = e[i];
            c = i % 2 ? 'sni-s-even' : 'sni-s-odd';
            c += x.negated ? ' sni-s-exclusion' : ' sni-s-inclusion';
            v = so.selection.getValue(x);
            v = x.field === 'filterURL' ? v : so.getLabel(v);
            b.push('<li class="'+c+'">'+x.field+' = '+ v +' <span class="sni-selections-size">'+so.format( x.count )+'</span></li>');
        }
        return b;
    },

    doSelectionsList:function(){

        var b = document.createElement('ul');
        b.setAttribute('class', 'sni-selections-list');

        var e = so.result.getSelectionEntries();
        b.innerHTML = e.join('');

        return b;
    },

    doSelections: function (){

        var t = document.createElement('p');
        t.setAttribute('class', 'sni-selections-title');
        t.innerHTML = 'your selections:';

        var b = so.result.doSelectionsList();

        var w = document.createElement('div');
        w.setAttribute('class', 'sni-selections-wrapper');
        w.appendChild(t);
        w.appendChild(b);
        return w;
    },

    doToolBar: function (){

        var t = document.createElement('span');
        t.setAttribute('class', 'sni-topbar-title');
        t.innerHTML = 'search results';

        //buttons
        var b = document.createElement('ul');
        b.setAttribute('class', 'sni-topbar-buttons');
        b.innerHTML = [
            '<li id="sni-total-page-views"> total page views: <span class="count"></span></li>',
            '<li class="sni-detail-button"><a href="javascript: void 0"> see details</a></li>',
            '<li id="sni-matching-assets"> matching assets: <span class="count"></span></li>',
            '<li id="sni-loaded-assets"> loaded assets: <span class="count"></span></li>',
            //'<li class="sni-load-button"> load more</li>',
            '<li class="sni-export-button">export</li>'
        ].join('');

        var w = document.createElement('div');
        w.setAttribute('class', 'sni-topbar');
        w.appendChild(t);
        w.appendChild(b);
        return w;

    },

    clickSplitSearch: function  ( e ){
            
        var x = e.target, i;
        if (x.className === 'sni-split-label'){
            i = x.firstChild;
            x = x.parentNode;
        }else if (x.className === 'sni-split-icon'){
            i = x;
            x = x.parentNode.parentNode;
        }else{
            i = x.firstChild.firstChild;
        }
        var id = x.id + '-wrapper';
        var c = document.getElementById(id);
        var max = '300px';
        if (c.offsetWidth === 0){
            c.style.width = max;
            i.innerHTML = '-';
        }else{
            c.style.width = 0;
            i.innerHTML = '+';

        }
    },

    fixAttributePanel: function(){

            var l = document.getElementById('sni-search'),
                s = document.getElementById('sni-search-wrapper'),
                w = document.querySelector('.sni-grid-wrapper');
            //gets default height
            var s_h = s.offsetHeight,
            w_h = w.offsetHeight;
            //fix height
            if ( w_h > s_h ){
               l.style.height = w_h + 'px';
               s.style.height = w_h + 'px';
            }
    },

    cleanAttributePanel: function(){
            //clean the height set by fixAttributePanel
            //we donot need to reset height for split since fixSplit will fix it.
            var s = document.getElementById('sni-search-wrapper');
            s.style.height = 'auto';
            $CQ('.sni-selections-list li').remove();
    },

    //help to center title and make it hidden when columns r collapsed using drag
    doHeaderDraggable: function(){
        $CQ('.sni-title-collapsible').each(function(i, e){
            var offset = ~(e.offsetWidth / 2) + 1;
            e.style.width = '1px';
            e.style.left = offset + 'px';
        });
    },

    doColumnDraggable: function ( c ){

            var t = c.querySelector('.sni-col-title');
            var org = parseInt(t.style.width, 10);
            var min = 5;
            var max = parseInt(org*10, 10);
            var col, w, h;
            $CQ('.sni-drag', c).draggable({
                axis: 'x',
                start:function( e ){
                     this.style.visibility = 'hidden';
                     w = parseInt( t.style.width, 10 );
                     col = document.getElementById( this.getAttribute( 'data-col-id' ) );
                },

                drag: function( e, ui ){

                    var l = parseInt(this.style.left, 10);
                    var n = w+l;
                    if (n<min){
                        n=min;
                    }else if(n>max){
                        n=max;
                    }
                    t.style.width = n + 'px';
                    col.style.width = n + 15 + 'px'; // accounts for 10px of margins + 3 px of dragging cmp + 2 px borders
                },

                stop:function( e ){
                    this.style.visibility = 'visible';
                    this.style.left=0;
                }
            });
    },

    getTotal:function(){

        var r = so.result.restData;
        return r ? r.assetInfoList.length : 0;
    },

    displayTotal:function(){

        return so.format( so.result.getTotal() );
    },

    getValue: function( index, field ){

        var data = so.result.restData;
        if ( data ){
             return data.assetInfoList[index].report[field].value;
        }
        return '';
    },

    layoutScreen: function(){
        //layout screen
            var l = so.result.doSplitSearch();
            var s = so.result.doSearch();

            //do a gap between atts & grid
            var x = document.createElement('div');
            x.setAttribute('class', 'sni-gap');

            //grid wrapper
            var w = document.createElement('div');
            w.setAttribute('class', 'sni-grid-wrapper');

            var b = so.result.doToolBar();
            w.appendChild(b);  

            var g = so.result.doGrid( so.grid ); 
            w.appendChild(g);

            //do main wrapper and fill it
            var m = document.createElement('div');
            m.setAttribute('class', 'sni-main-wrapper');
            m.appendChild(l);
            m.appendChild(s);
            m.appendChild(x);
            m.appendChild(w);

            document.body.appendChild(m);

            if ( !so.isIE8() ){
            
                //fix headers to work with doColumnDraggable.
                so.result.doHeaderDraggable();

                //this col wont be draggable ( modify assets )
                so.removeClass( 'sni-drag', document.querySelector('.sni-first-col .sni-drag') );

                $CQ('.sni-grid .sni-expandable').each(function(){
                  so.result.doColumnDraggable( this );
                });
            }

            //actions
            $CQ('#sni-modify-search-button').click( so.g.showDashboard );
            $CQ('#sni-new-search-button').click( so.g.newDashboard );
            $CQ('.sni-data .sni-first-col').click( so.result.clickHistory );
            $CQ('.sni-first-col .sni-col-title').click( so.result.clickMAF ); //modify assets
            $CQ('.sni-detail-button a').click( so.result.clickDetail );

            var e = so.result.getSelectionEntries();
            document.querySelector('.sni-selections-list').innerHTML = e.join('');
    },

    clickHistory: function( evt ){

        if ( !so.history ){
              $CQ.getScript('/apps/sni-site-optimizer/clientlib/js/history.js', function(){
                so.rest.getHistory( evt );
              });
        }else{
            so.rest.getHistory( evt );
        }
    },

    clickMAF: function(){
        if (!so.maf){
            $CQ.getScript('/apps/sni-site-optimizer/clientlib/js/form.js');
            $CQ.getScript('/apps/sni-site-optimizer/clientlib/js/maf.js');
            var intX = setInterval(function(){
                if (so.form && so.maf){ //wait for it
                    clearInterval( intX );
                    so.maf.open();
                }
            }, 10);
        }else{
            so.maf.open();
        }
    },

    clickDetail: function(){
        if (!so.detail){
              $CQ.getScript('/apps/sni-site-optimizer/clientlib/js/detail.js', function(){
                so.detail.open( so.result.pageViews ); // restDataPageViews was loaded prev in rest.handleResultPage
              });
        }else{
            so.detail.open( so.result.pageViews );
        }
    },

    sort: function(field, order){
        var dashboard = so.g.getDashboard();
        dashboard && (dashboard.style.display = "block"); //display loading animation
        location = 'sni-site-optimizer.result.html?'+encodeURI(JSON.stringify({"sort":{"field":field, "order":order}, "currentExpressions":so.g.currentExpressions}));
    },

    scrollToColumn: function( col_name, offset ){
        if ( !col_name ) return;
        offset = !offset ? 0 : offset;
        offset = $CQ('[data-sni-dataindex='+col_name+']').position().left + offset;
        $CQ(window).scrollLeft( offset );
    }

};  
})(so);
