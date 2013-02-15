<%@page session="false" import="javax.jcr.Session" %><%@ taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %><sling:defineObjects /><%
Session session = slingRequest.getResourceResolver().adaptTo(Session.class);
%><!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Site Optimizer Validation</title>
<style>
body {
font-family: Lucida Grande, verdana, geneva, helvetica, arial, sans-serif;
margin: 0;
background-color: #eee;
text-align:center;
color:#999;
}
a{
	color:blue;
}
</style>
</head>
<body>
	<h1>You do not have access to site optimizer.</h1>
	<p>Please contact support desk.</p>
	<p>To go back to CQ main menu <a href="/" target="top">click here</a></p>
</body>
</html>