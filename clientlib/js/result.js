so.result = {

        //********* GRID FUNCTIONS ***********************

        addClass: function(a, e){
            
            if (a.class){
                var c = e.getAttribute('class');
                e.setAttribute('class', c + ' ' + a.class);
            }
        },

        addStyle: function(a, e){

            var s = a.style;
            if (s){
                for (var x in s){
                    e.style[x] = s[x];
                }

            }
        },

        adaptSplit: function (){

            $CQ('.sni-split').each(function(){
                var e = document.getElementById(this.id+'-wrapper');
                this.style.height = e.offsetHeight + 'px';
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
                        if (c.offsetWidth === 0){
                            c.style.width = max;
                            i.innerHTML = '-';
                        }else{
                            so.result.setMaxSplit(so.grid, id, c.style.width);
                            c.style.width = 0;
                            i.innerHTML = '+';

                        }
        },

        doRows: function ( p, tbl, w ){

            //header above tables
            var h = document.createElement('div');
            h.setAttribute('id', tbl.id);
            h.setAttribute('class', 'sni-t-header');
            so.result.addClass(tbl, h);
            so.result.addStyle(tbl, h);
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
                so.result.addClass(c, div);
                so.result.addStyle(c, div);

                //title element
                var s1 = document.createElement('span');
                s1.setAttribute('class', 'sni-col-title');
                s1.style.width = c.width + 'px';
                s1.innerHTML = c.label;
                div.appendChild(s1);

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
                so.result.addClass(c, div2);

                td.appendChild(div2);
                data.appendChild(td);
            });
            
            //header table
            var t = document.createElement('table');
            t.setAttribute('class', 'sni-table sni-header');
            t.setAttribute('border', '0');
            t.setAttribute('cellpadding', '0');
            t.setAttribute('cellspacing', '0');
            t.appendChild(header);
            w.appendChild(t);

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

            var i, j, h, col, width;
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
                        so.result.addClass(p, h);
                        so.result.addStyle(p, h);
                        h.innerHTML = '<div class="sni-title-collapsible">'+p.label+'</div>';
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
                        e.innerHTML = [
                                        '<span class="sni-split-label">',
                                        '<span class="sni-split-icon">-</span> ',
                                        p.label,
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

		loadGrid: function (){

                    // create the data store
                    var store= new CQ.Ext.data.ArrayStore({
                        fields: so.grid.fields
                    });

		            // manually load local data
		            store.loadData(so.result.get());

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
		                                        d.setAttribute('data-sni-xyl', gcol +'-'+row +'-'+col);
                                                if ( typeof c.dataIndex === 'string'){
                                                    d.innerHTML = r.data[c.dataIndex];    
                                                }else{
                                                    c.dataIndex(row, d);
                                                }
		                                        x.appendChild(d);
		                                });
		                    });                        
		                });
		            });

		            so.result.adaptSplit();
		},

        get: function (){

            return [
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am']
                           /* ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'],
                            ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                            ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                            ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                            ['American Express<br> Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                            ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                            ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                            ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                            ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                            ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                            ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                            ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                            ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                            ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                            ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                            ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                            ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                            ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                            ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                            ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                            ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                            ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                            ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                            ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                            ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                            ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                            ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                            ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                            ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],            
                            ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am'] */

            ];
    },

    //******* SEARCH AREA FUNCTIONS ***********************

    doSplitSearch: function (){

        var d = document.createElement('div');
        d.setAttribute('id', 'sni-search');
        d.setAttribute('class', 'sni-split');
        d.innerHTML = [
                        '<span class="sni-split-label">',
                        '<span class="sni-split-icon">-</span>',
                        ' current search attributes',
                        '</span>'
        ].join('');
        return d;
    },

    doSearch: function (){

        var t = document.createElement('p');
        t.setAttribute('class', 'sni-atts-title');
        t.innerHTML = 'search attributes';

        var b = document.createElement('ul');
        b.setAttribute('class', 'sni-atts-buttons');
        b.innerHTML = [
                '<li> -> modify search</li>',
                '<li> -> new search</li>'
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
        debugger;
        var x=so.currentExpressions, o = so.ordinality, l = o.length, i, e, b = [], c;
        for (i=0; i<l; i++){
            e = x[o[i]];
            c = i % 2 ? 'sni-s-even' : 'sni-s-odd';
            b.push('<li class="'+c+'">'+e.field+' = '+so.getExpressionValue(e)+' <span class="sni-selections-size">'+so.format2Thousand(e.count)+'</span></li>');
        }
        return b;
    },

    doSelections: function (){

        var t = document.createElement('p');
        t.setAttribute('class', 'sni-selections-title');
        t.innerHTML = 'your selections:';

        var b = document.createElement('ul');
        b.setAttribute('class', 'sni-selections-list');

        //b.innerHTML = [
        //        '<li class="sni-s-odd">has image = yes <span class="sni-selections-size">40K</span></li>',
        //        '<li class="sni-s-even">asset type = recipe <span class="sni-selections-size">26K</span></li>',
        //        '<li class="sni-s-odd">rating = 5 <span class="sni-selections-size">10K</span></li>'
        //].join('');
        var e = so.result.getSelectionEntries();
        b.innerHTML = e.join('');

        var w = document.createElement('div');
        w.setAttribute('class', 'sni-selections-wrapper');
        w.appendChild(t);
        w.appendChild(b);
        return w;
    },

    doTopBar: function (){

        var t = document.createElement('span');
        t.setAttribute('class', 'sni-topbar-title');
        t.innerHTML = 'search results';

        //buttons
        var b = document.createElement('ul');
        b.setAttribute('class', 'sni-topbar-buttons');
        b.innerHTML = [
            '<li> total page views ###</li>',
            '<li class="sni-detail-button"> see details</li>',
            '<li> matching assets</li>',
            '<li> loaded assets</li>',
            '<li class="sni-load-button"> load more</li>',
            '<li class="sni-export-button"> -> export</li>'
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

    adjustAttributePanel: function(l, s, w){
            
            l.style.height = w.offsetHeight + 'px';
            $CQ(l).click( so.result.clickSplitSearch );
            s.style.height = w.offsetHeight + 'px';
    },

    //help to center title and make it hidden when columns r collapsed using drag
    fixHeaderTitle: function(){
        $CQ('.sni-title-collapsible').each(function(i, e){
            var offset = ~(e.offsetWidth / 2) + 1;
            e.style.width = '1px';
            e.style.left = offset + 'px';
        });
    },

    doExpandable: function ( c ){

            var t = c.querySelector('.sni-col-title');
            var org = parseInt(t.style.width, 10);
            var min = 5;
            var max = parseInt(org*5, 10);
            var col, w, h;
            $CQ('.sni-drag', c).draggable({
                axis: 'x',
                start:function(){

                     w = parseInt( t.style.width, 10 );
                     col = document.getElementById( this.getAttribute( 'data-col-id' ) );
                },

                drag: function(e, ui){

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

                stop:function(){

                    this.style.left=0;
                }
            });
        }

};