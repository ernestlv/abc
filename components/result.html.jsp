<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Site Optimizer Results</title>

<link rel="stylesheet" type="text/css" href="/apps/sni-site-optimizer/clientlib/css/result.css">

<script src="/etc/clientlibs/foundation/jquery.js" type="text/javascript"></script>
<script src="/etc/clientlibs/foundation/shared.js" type="text/javascript"></script>
<script src="/libs/cq/ui/widgets.js" type="text/javascript"></script>
<script src="/etc/clientlibs/foundation/jquery-ui.js" type="text/javascript"></script>
<script type="text/javascript">
var so = parent.so;
</script>
<script src="/apps/sni-site-optimizer/clientlib/js/result.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/grid.js" type="text/javascript"></script>
<script>
        CQ.Ext.onReady(function(){

            var l = so.result.doSplitSearch();
            var s = so.result.doSearch();

            //do a gap between atts & grid
            var x = document.createElement('div');
            x.setAttribute('class', 'sni-gap');

            //grid wrapper
            var w = document.createElement('div');
            w.setAttribute('class', 'sni-grid-wrapper');

            var b = so.result.doTopBar();
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

            so.result.fixHeaderTitle();

            so.result.loadGrid();     

            so.result.adjustAttributePanel(l, s, w);
            //debugger;
            console.log(JSON.stringify(so.currentExpressions));
            $CQ('.sni-grid .sni-expandable').each(function(){
                  so.result.doExpandable( this );
            });
            
        }); //end onReady
</script>
</head>
<body>
</body>
</html>