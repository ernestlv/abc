<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Site Optimizer Dashboard</title>

<!-- <link type="text/css" rel="stylesheet" href="/libs/cq/cloudserviceconfigs/widgets.css"> -->
<link type="text/css" rel="stylesheet" href="/libs/cq/ui/widgets/themes/default.css">
<link type="text/css" rel="stylesheet" href="/etc/clientlibs/foundation/jquery-ui/themes/default.css">
<!--<link type="text/css" rel="stylesheet" href="/libs/cq/searchpromote/widgets/themes/default.css">
<link type="text/css" rel="stylesheet" href="/etc/clientlibs/foundation/searchpromote/themes/default.css">
<link type="text/css" rel="stylesheet" href="/libs/cq/analytics/widgets/themes/default.css">
<link type="text/css" rel="stylesheet" href="/libs/cq/security/widgets/themes/default.css">
<link type="text/css" rel="stylesheet" href="/libs/cq/tagging/widgets/themes/default.css"> -->

<link rel="stylesheet" type="text/css" href="/apps/sni-site-optimizer/clientlib/css/dashboard.css">
<link rel="stylesheet" type="text/css" href="/apps/sni-site-optimizer/clientlib/css/dashboard-blue.css">

<script src="/etc/clientlibs/foundation/jquery.js" type="text/javascript"></script>
<script src="/etc/clientlibs/foundation/shared.js" type="text/javascript"></script>
<script src="/libs/cq/ui/widgets.js" type="text/javascript"></script>
<script src="/etc/clientlibs/foundation/jquery-ui.js" type="text/javascript"></script>
<!--<script src="/libs/cq/searchpromote/widgets.js" type="text/javascript"></script>
<script src="/libs/cq/cloudserviceconfigs/widgets.js" type="text/javascript"></script>
<script src="/libs/cq/analytics/widgets.js" type="text/javascript"></script>
<script src="/apps/wcm/clientlib.js" type="text/javascript"></script>
<script src="/libs/cq/security/widgets.js" type="text/javascript"></script>
<script src="/libs/cq/tagging/widgets.js" type="text/javascript"></script>

<script src="/libs/cq/ui/widgets/themes/default.js" type="text/javascript"></script>
<script src="/libs/cq/security/widgets/themes/default.js" type="text/javascript"></script>
<script src="/libs/cq/tagging/widgets/themes/default.js" type="text/javascript"></script> -->

<script type="text/javascript">
var so = {
  g: parent.so
};
</script>
<script src="/apps/sni-site-optimizer/clientlib/js/so.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/f.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/expressions.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/db.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/form.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/rest.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/selection.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/lightbox.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/fields.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/set.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/column.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/section.js" type="text/javascript"></script>

<!-- Extensions -->
<!-- <link type="text/css" rel="stylesheet" href="/apps/sni-site-optimizer/extensions/spinner.css">
<script src="/apps/sni-site-optimizer/extensions/spinner.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/extensions/spinnerfield.js" type="text/javascript"></script> -->

<script type="text/javascript">
        
        CQ.Ext.onReady(function(){

        	//layout screen
            var c = new CQ.Ext.Container({
                  id:'sni-siteoptimizer-wrapper',
                  items:  [ 
                        so.section.selection,
                        so.section.global, 
                        so.section.status,
                        so.section.eventsCoreTech,
                        so.section.source                                                             
                  ],
                  renderTo: CQ.Ext.getBody()
            });

            //load data if querystring is provided otherwise will load later.
            if (location.search){
              var query = location.search.substring(1);
              so.g.currentExpressions = JSON.parse(decodeURI(query));
              so.expressions.redo();
            }

        }); //end onReady
</script>
</head>
<body></body>
</html>