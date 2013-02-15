<%@page session="false" import="javax.jcr.Session, com.day.crx.CRXSession" %><%@ taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %><sling:defineObjects /><%
//new security using acl groups.
CRXSession session = (CRXSession) resourceResolver.adaptTo( Session.class );
String userID = session.getUserID().toLowerCase();
if (  !"admin".equals( userID ) ){
  java.util.Iterator groups = session.getUserManager().getAuthorizable( session.getUserID() ).memberOf();
  while( groups.hasNext() ){
    org.apache.jackrabbit.api.security.user.Group group = (org.apache.jackrabbit.api.security.user.Group) groups.next();
    if ( "site-optimizer-noaccess".equals( group.getID() ) ){
      response.sendRedirect("sni-site-optimizer.validation.html");
    };
  }  
}

//deprecated securtity using CQ permissions. problem with this is we need a path.
//Session session = slingRequest.getResourceResolver().adaptTo(Session.class);
//boolean isReader = session.hasPermission("/content/sni-site-optimizer", "read");
//if ( !isReader ){
//  response.sendRedirect("sni-site-optimizer.validation.html");  
//}

%><!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Site Optimizer Results</title>
<!-- CQ styles -->
<link type="text/css" rel="stylesheet" href="/libs/cq/ui/widgets/themes/default.css">
<!-- site optimizer styles -->
<link rel="stylesheet" type="text/css" href="/apps/sni-site-optimizer/clientlib/css/result.css">
<link rel="stylesheet" type="text/css" href="/apps/sni-site-optimizer/clientlib/css/result-dark.css">
<!-- CQ libs -->
<script src="/etc/clientlibs/foundation/jquery.js" type="text/javascript"></script>
<script src="/etc/clientlibs/foundation/shared.js" type="text/javascript"></script>
<script src="/libs/cq/ui/widgets.js" type="text/javascript"></script>
<script src="/etc/clientlibs/foundation/jquery-ui.js" type="text/javascript"></script>
<!-- site optimizer libs -->
<script type="text/javascript">
var so = {
  g: parent.so
};
</script>
<script src="/apps/sni-site-optimizer/clientlib/js/so.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/grid.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/selection.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/rest.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/result.js" type="text/javascript"></script>
<%-- <script src="/apps/sni-site-optimizer/clientlib/js/form.js" type="text/javascript"></script> -->
<!-- <script src="/apps/sni-site-optimizer/clientlib/js/history.js" type="text/javascript"></script> -->
<!-- <script src="/apps/wcm/core/content/sni-site-optimizer.maf.js" type="text/javascript"></script> -->
<!-- <script src="/apps/sni-site-optimizer/clientlib/js/detail.js" type="text/javascript"></script> --%>
<script>
        CQ.Ext.onReady(function(){
            
            var q ={}, f = "title", o="DESC";

            //load data if querystring is provided otherwise will load later.
            if (location.search){
              q = location.search.substring(1);
              q = JSON.parse(decodeURI(q));
              so.g.currentExpressions = q.currentExpressions;
            }

            so.result.sortField = q.sort ? q.sort.field : 'title';
            so.result.sortOrder = q.sort ? q.sort.order : 'DESC';
            so.result.pageNum   = q.page ? q.page.num : 1;
            so.result.startRow  = q.page ? q.page.startRow : 1;
            so.result.endRow    = so.result.startRow + so.result.pageSize - 1;

            so.rest.requestAssets({startRow:so.result.startRow, endRow:so.result.endRow, sort:{"type":"sorting", "field":so.result.sortField, "order":so.result.sortOrder}}, so.rest.handleResults );
            
        }); //end onReady
</script>
</head>
<body><div id="sni-loading" style="background:#eee url(/apps/sni-site-optimizer/clientlib/css/loader.gif) no-repeat fixed center 100px; position:absolute; opacity:0.7; filter: alpha(opacity=70); width:680%; height:100%; z-index:9010"></div></body>
</html>