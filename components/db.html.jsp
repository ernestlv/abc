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
<title>Inventory Management Program.</title>

<!-- CQ Styles -->
<%-- <link type="text/css" rel="stylesheet" href="/libs/cq/cloudserviceconfigs/widgets.css"> --%>
<link type="text/css" rel="stylesheet" href="/libs/cq/ui/widgets/themes/default.css">
<link type="text/css" rel="stylesheet" href="/etc/clientlibs/foundation/jquery-ui/themes/default.css">
<%--<link type="text/css" rel="stylesheet" href="/libs/cq/searchpromote/widgets/themes/default.css">
<link type="text/css" rel="stylesheet" href="/etc/clientlibs/foundation/searchpromote/themes/default.css">
<link type="text/css" rel="stylesheet" href="/libs/cq/analytics/widgets/themes/default.css">
<link type="text/css" rel="stylesheet" href="/libs/cq/security/widgets/themes/default.css">
<link type="text/css" rel="stylesheet" href="/libs/cq/tagging/widgets/themes/default.css"> --%>

<!-- Site Optimizer css -->
<link rel="stylesheet" type="text/css" href="/apps/sni-site-optimizer/clientlib/css/dashboard.css">
<link rel="stylesheet" type="text/css" href="/apps/sni-site-optimizer/clientlib/css/dashboard-dark.css">

<!-- CQ Libs -->
<script src="/etc/clientlibs/foundation/jquery.js" type="text/javascript"></script>
<script src="/etc/clientlibs/foundation/shared.js" type="text/javascript"></script>
<script src="/libs/cq/ui/widgets.js" type="text/javascript"></script>
<script src="/etc/clientlibs/foundation/jquery-ui.js" type="text/javascript"></script>
<%--<script src="/libs/cq/searchpromote/widgets.js" type="text/javascript"></script>
<script src="/libs/cq/cloudserviceconfigs/widgets.js" type="text/javascript"></script>
<script src="/libs/cq/analytics/widgets.js" type="text/javascript"></script>
<script src="/apps/wcm/clientlib.js" type="text/javascript"></script>
<script src="/libs/cq/security/widgets.js" type="text/javascript"></script>
<script src="/libs/cq/tagging/widgets.js" type="text/javascript"></script>

<script src="/libs/cq/ui/widgets/themes/default.js" type="text/javascript"></script>
<script src="/libs/cq/security/widgets/themes/default.js" type="text/javascript"></script>
<script src="/libs/cq/tagging/widgets/themes/default.js" type="text/javascript"></script> --%>

<!-- Site Optimizer libs -->
<script type="text/javascript">
var so = {
  g: parent.so
};
</script>
<script src="/apps/sni-site-optimizer/clientlib/js/so.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/selection.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/db.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/form.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/rest.js" type="text/javascript"></script>
<%-- <script src="/apps/sni-site-optimizer/clientlib/js/lightbox.js" type="text/javascript"></script>  --%>
<script src="/apps/sni-site-optimizer/clientlib/js/fields.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/set.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/column.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/clientlib/js/section.js" type="text/javascript"></script>

<%-- Extensions -->
<!-- <link type="text/css" rel="stylesheet" href="/apps/sni-site-optimizer/extensions/spinner.css">
<script src="/apps/sni-site-optimizer/extensions/spinner.js" type="text/javascript"></script>
<script src="/apps/sni-site-optimizer/extensions/spinnerfield.js" type="text/javascript"></script> --%>

<script type="text/javascript">
        
        CQ.Ext.onReady(function(){
            //parent && (parent.document.getElementById( 'sni-loading-parent' ).style.height = '0px'); //we need to hide loader icon
        	  //layout screen
            var c = new CQ.Ext.Container({
                  id:'sni-siteoptimizer-wrapper',
                  style:{
                    opacity:0 //used for animate
                  },
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
              var q = location.search.substring(1);
              q = JSON.parse(decodeURI(q));
              so.g.currentExpressions = q.currentExpressions;
              so.selection.redo();
            }
            
            $CQ('#sni-siteoptimizer-wrapper').animate({opacity:1}, 150, function(){
              $CQ('#sni-loading').height(0); //we need to hide loader icon
            });

        }); //end onReady
</script>
</head>
<!-- page was designed for 1222px -->
<body style="width:1222px"><div id="sni-loading" style="background:#eee url(/apps/sni-site-optimizer/clientlib/css/loader.gif) no-repeat fixed center 100px; position:absolute; opacity:0.7; filter: alpha(opacity=70); width:1222px; height:100%; z-index:9010"></div></body>
</html>