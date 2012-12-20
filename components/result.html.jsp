<%@page session="false"%><%@page import="javax.jcr.Session" %><%@ taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %><sling:defineObjects /><%
Session session = slingRequest.getResourceResolver().adaptTo(Session.class);
%><!DOCTYPE html>
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

      so.rest.requestAssets({page:1, sort:{"type":"sorting", "field":"title", "order":"DESC"}}, so.rest.handleResultPage);
  },

  whenHide: function(){
      
      //so.result.cleanGrid();
      //so.result.cleanAttributePanel();
  }

};
</script>
<script src="/apps/sni-site-optimizer/clientlib/js/so.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/grid.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/selection.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/rest.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/result.js" type="text/javascript"></script>
<!-- <script src="/apps/sni-site-optimizer/clientlib/js/form.js" type="text/javascript"></script> -->
<!-- <script src="/apps/sni-site-optimizer/clientlib/js/history.js" type="text/javascript"></script> -->
<!-- <script src="/apps/sni-site-optimizer/clientlib/js/maf.js" type="text/javascript"></script> -->
<!-- <script src="/apps/sni-site-optimizer/clientlib/js/detail.js" type="text/javascript"></script> -->
<script>
        CQ.Ext.onReady(function(){

            //load data if querystring is provided otherwise will load later.
            if (location.search){
              var q = location.search.substring(1);
              so.g.currentExpressions = JSON.parse(decodeURI(q));
            }

            so.g.userid = '<%=session.getUserID()%>';

            so.whenDisplay();
            
        }); //end onReady
</script>
</head>
<body></body>
</html>