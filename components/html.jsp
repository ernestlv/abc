<%--
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
--%><%
%><%@page session="false"%><%
%><%@page import="com.day.cq.widget.HtmlLibraryManager,
            org.apache.sling.api.resource.Resource,
            org.apache.sling.api.request.RequestParameterMap,
            org.apache.sling.api.resource.ValueMap,
            com.day.cq.widget.WidgetExtensionProvider,
            javax.jcr.Session,javax.jcr.Node,javax.jcr.NodeIterator,javax.jcr.Property,javax.jcr.PropertyIterator,
            java.util.List, java.util.ArrayList,java.util.Arrays,
            com.day.cq.security.Authorizable" %>
<%
%><%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0"%><%
%><sling:defineObjects /><%

    ValueMap properties = resource.adaptTo(ValueMap.class);
    String title = properties.get("title", properties.get("jcr:title", currentNode.getName()));
    RequestParameterMap params = slingRequest.getRequestParameterMap();
    int debug = params.getValue("debug") == null
            ? 0
            : Integer.valueOf(params.getValue("debug").getString());
    
    String xtype = properties.get("xtype", "");
    Session session = slingRequest.getResourceResolver().adaptTo(Session.class);

    WidgetExtensionProvider extensionProvider = sling.getService(WidgetExtensionProvider.class);
    String extensionString = extensionProvider.getJsonString(xtype, session);

    List<String> jsLibs = new ArrayList<String>();
    jsLibs.addAll(Arrays.asList(properties.get("jsLibs", String[].class)));
    
    List<Resource> extensions = extensionProvider.getExtensions(xtype, session);
    for (Resource extension : extensions) {
        ValueMap extensionProps = extension.adaptTo(ValueMap.class);
        if (extensionProps != null) {
            String[] extensionJsLibs = extensionProps.get("jsLibs", String[].class);
            if (extensionJsLibs != null) {
                for (String extensionJsLib : extensionJsLibs) {
                    if (!jsLibs.contains(extensionJsLib)) {
                        jsLibs.add(extensionJsLib);
                    }
                }
            }
        }
    }
    HtmlLibraryManager manager = sling.getService(HtmlLibraryManager.class);

    //******* USERID *******
    //Authorizable auth = slingRequest.getResourceResolver().adaptTo(Authorizable.class);
    //String sni_userid = auth == null ? null : auth.getName();
    //if ( sni_userid == null ) {
        // workaround if user manager service is not ready yet.
        //sni_userid = session.getUserID();
    //}

%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <title><%= title %></title><%
            String[] jsLibsArray = jsLibs.toArray(new String[jsLibs.size()]);
            manager.writeIncludes(slingRequest, out, jsLibsArray);

            try {
                // render additional tags, e.g favicon, rss links
                NodeIterator tags = currentNode.getNode("tags").getNodes();
                while (tags.hasNext()) {
                    Node tag = tags.nextNode();
                    if (!tag.hasProperty("tagName")) {
                        continue;
                    }
                    String tagName = tag.getProperty("tagName").getString();
                    String innerHTML = tag.hasProperty("innerHTML") ? tag.getProperty("innerHTML").getString() : "";
                    String attr = "";

                    PropertyIterator props = tag.getProperties();
                    while (props.hasNext()) {
                        Property prop = props.nextProperty();
                        String name = prop.getName();
                        if (name.equals("tagName") || name.equals("innerHTML") || name.equals("jcr:primaryType")) {
                            continue;
                        }
                        attr += " " + name + "=\"" + prop.getString() + "\"";
                    }

                    String end = ">";
                    if (tagName.toLowerCase().equals("script") || !innerHTML.equals("")) {
                        end += innerHTML + "</" + tagName + ">";
                    }
                    String html = "<" + tagName + attr + end + "\n";
                    %><%= html %><%
                }
            }
            catch (Exception e) {
            }
        %>
        <script type="text/javascript">
            if( !CQ.I18n ) {
                //not implemented
                var cq_welcome_redirect = function() {
                    //redirect to context path ( = welcome screen) if something is loaded and not implemented
                    var to = CQ.shared.HTTP.getContextPath() || "/";
                    var href = window.location.href;
                    var cfIndex = href.indexOf("/cf#");
                    if( cfIndex != -1) {
                        //content finder case, try a redirect to page path
                        to = CQ.shared.HTTP.getPath(href.substring(cfIndex + 5)) + ".html";
                    }
                    CQ.shared.Util.load(to);
                };
                cq_welcome_redirect();
            }
            CQ.I18n.init({ "locale": "<%= request.getLocale() %>" });

            CQ.Ext.onReady(function() {
                var debug = <%= debug %>;
                var extensionString = <%= extensionString %>;
                var fct = function() {
                    CQ.Util.build("<%= slingRequest.getContextPath() %><%= currentNode.getPath() %>.infinity.json", null, null, debug, extensionString);
                };
                window.setTimeout(fct, 1);
            });
        </script>

        <script type="text/javascript">
        so = {
            //userid: '<%-- sni_userid --%>',
            main:true, //flag to know the html.jsp was loaded
            addedExpressions:{},
            currentExpressions:{},
            getDashboard: function(){

                return document.querySelector('iframe#sni-dashboard');
            },
            getResult: function(){

                return document.querySelector('iframe#sni-result');
            },
            showResult:function(){
                
                //show loading icon. Result iframe will be shown in ajax callback
                var dashboard = so.getDashboard();
                var dom = dashboard.contentWindow.document;
                dom.getElementById('sni-loading').style.display='block';
                dom.getElementById('CQ').style.display='none';
                var result = so.getResult();
                result.src = 'sni-site-optimizer.result.html';  //replace whenDisplay()
            },
            showDashboard:function(){

                //show dashboard iframe. we need to hide loading icon previously displayed in showResult()
                var dashboard = so.getDashboard();
                var dom = dashboard.contentWindow.document;
                dom.getElementById('sni-loading').style.display='none';
                dom.getElementById('CQ').style.display='block';
                var result = so.getResult();
                dashboard.style.display = 'block';
                result.style.display = 'none';
                result.contentWindow.so.whenHide();
            },
            newDashboard:function(){
                
                location = '/apps/wcm/core/content/sni-site-optimizer.html';
            }
        };
        </script>
        
        <!-- client libs -->
        <!-- <link type="text/css" rel="stylesheet" href="/apps/sni-site-optimizer/clientlib.css"> -->
        <script src="/apps/sni-site-optimizer/clientlib.js" type="text/javascript"></script>
    </head>
    <body style="margin:0;"><div id="CQ"></div></body>
</html>