<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Site Optimizer Results</title>

<link type="text/css" rel="stylesheet" href="/libs/cq/ui/widgets/themes/default.css">
<link rel="stylesheet" type="text/css" href="/apps/sni-site-optimizer/clientlib/css/result.css">
<link rel="stylesheet" type="text/css" href="/apps/sni-site-optimizer/clientlib/css/result-blue.css">

<script src="/etc/clientlibs/foundation/jquery.js" type="text/javascript"></script>
<script src="/etc/clientlibs/foundation/shared.js" type="text/javascript"></script>
<script src="/libs/cq/ui/widgets.js" type="text/javascript"></script>
<script src="/etc/clientlibs/foundation/jquery-ui.js" type="text/javascript"></script>
<script type="text/javascript">
var so = {
  g: parent.so,

  whenDisplay: function(){

      var e = so.result.getSelectionEntries();
      document.querySelector('.sni-selections-list').innerHTML = e.join('');
      so.rest.getAssets({page:1, sort:{"type":"sorting", "field":"title", "order":"DESC"}}, so.rest.handleResultPage);
  },

  whenHide: function(){
      
      so.result.cleanGrid();
      so.result.cleanAttributePanel();
  }

};
</script>
<script src="/apps/sni-site-optimizer/clientlib/js/so.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/grid.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/f.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/expressions.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/form.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/rest.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/result.js" type="text/javascript"></script>
<script>
        CQ.Ext.onReady(function(){

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

            //fix headers to work with doExpandable.
            so.result.fixHeaderTitle();

            //makes headers expandable
            $CQ('.sni-grid .sni-expandable').each(function(){
                  so.result.doExpandable( this );
            });

            //connect buttons
            $CQ('#sni-modify-search-button').click( so.g.showDashboard );
            $CQ('#sni-new-search-button').click( so.g.newDashboard );

            //load data if querystring is provided otherwise will load later.
            if (location.search){
              var q = location.search.substring(1);
              so.g.currentExpressions = JSON.parse(decodeURI(q));
              so.whenDisplay();
            }
            
        }); //end onReady
</script>
</head>
<body></body>
</html>