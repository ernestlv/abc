<%@page session="false" contentType="application/javascript" import="javax.jcr.Session, com.day.crx.CRXSession" %><%@ taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %><sling:defineObjects /><%
//new security using acl groups.
CRXSession session = (CRXSession) resourceResolver.adaptTo( Session.class );
boolean isFullEditor = false;
String userID = session.getUserID().toLowerCase();
if (  !"admin".equals( userID ) ){
  java.util.Iterator groups = session.getUserManager().getAuthorizable( session.getUserID() ).memberOf();
  while( groups.hasNext() ){
    org.apache.jackrabbit.api.security.user.Group group = (org.apache.jackrabbit.api.security.user.Group) groups.next();
    if ( "site-optimizer-noaccess".equals( group.getID() ) ){
      response.sendRedirect("sni-site-optimizer.blank.js");
    };
    if ( "site-optimizer-fulledit".equals( group.getID() ) ){
        isFullEditor = true;
    }
  }  
}else{
    isFullEditor = true;
}

//deprecated securtity using CQ permissions. problem with this is we need a path.
//Session session = slingRequest.getResourceResolver().adaptTo(Session.class);
//boolean isReader = session.hasPermission("/content/sni-site-optimizer", "read");
//if ( !isReader ){
//  response.sendRedirect("sni-site-optimizer.validation.html");  
//}

%>(function(so){

so.maf = {

    doForm:function( fields ){

        function doSection(c){

            return [
                '<div class="sni-maf-wrapper" id="sni-maf-'+c.id+'">',
                '<div class="sni-maf-title"><span class="sni-maf-close"></span> '+c.sni_title+'</div>',
                '<div class="sni-maf-body">',
                '<h3>modify '+c.sni_title+'</h3>',
                '<div class="sni-maf-field" id="sni-maf-field-'+c.id+'"></div>',
                '<div class="sni-maf-bottom">',
                '<div class="sni-maf-button">modify selected terms</div>',
                '</div>',
                '<div class="sni-maf-all">',
                '<h3 class="sni-maf-all-title">experts only</h3>',
                '<div class="sni-maf-all-body">',
                '<div class="sni-maf-all-link">unlock modify all button</div>',
                '<div class="sni-maf-all-button">modify all terms</div>',
                '</div>',
                '</div>',
                '</div>',
                '</div>'
            ].join('');
        }

        return [
            '<td class="sni-maf-form">',
            '<div id="CQ" class="sni-CQ-wrapper">',
            '<h2>modify assets</h2>',
            doSection( fields.preferred_term ),
            doSection( fields.alternate_term ),
            doSection( fields.sponsorship ),
            doSection( fields.sub_term ),
            doSection( fields.package ),
            '</div>',
            '</td>'
        ].join('');
    },

    doChecks:function(){

        var r = document.querySelectorAll('.sni-data .sni-first-col div');
        var i, l = r.length, b=[], c;
        for (i=0; i<l; i++){
            c = i%2 ? 'sni-cell-odd' : 'sni-cell-even';
            b.push('<div class="sni-maf-check '+c+'"><input type="checkbox" id="sni-modify-asset-'+(i+1)+'" value="'+i+'"></div>');
        }
        return '<td class="sni-maf-checks">'+b.join('')+'</td>';
    },

    getSection:function( id ){
        return document.querySelector('#sni-maf-'+id);
    },

    collapseSection:function( e ){
        var i = e.querySelector('.sni-maf-title .sni-maf-close');
        var x = e.querySelector('.sni-maf-body');
        i.innerHTML = '+';
        so.removeClass('show', x);
        if (!so.hasClass('hide', x)){
            so.addClass('hide', x);
        }
    },

    expandSection:function( e ){
        var i = e.querySelector('.sni-maf-title .sni-maf-close');
        var x = e.querySelector('.sni-maf-body');
        i.innerHTML = '-';
        so.removeClass('hide', x);
        if (!so.hasClass('show', x)){
            so.addClass('show', x);
        }
    },

    toggleSection:function( e ){
        
        var x = e.querySelector('.sni-maf-body');
        if ( so.hasClass( 'hide', x ) ){
            so.maf.expandSection( e );
        }else{
            so.maf.collapseSection( e );
        }
    },

    enableAllButton:function( link, button ){
        so.addClass('enabled', button);
        link.innerHTML = 'lock modify all button';
    },

    disableAllButton:function( link, button ){
        so.removeClass('enabled', button);
        link.innerHTML = 'unlock modify all button';
    },

    
    toggleAllButton:function( link, section ){

        var b = section.querySelector('.sni-maf-all-button');
        var isEnable = so.hasClass( 'enabled', b );
        if (!isEnable){
            so.maf.enableAllButton( link, b );
        }else{
            so.maf.disableAllButton( link, b );
        }
    },

    
    resetSection:function( field ){
        
        //reset EXTJS field
        CQ.Ext.getCmp( field.id ).reset();

        //disable experts only part
        var s = so.maf.getSection( field.id );
        var l = s.querySelector( '.sni-maf-all-link' );
        var b = s.querySelector( '.sni-maf-all-button' );
        so.maf.disableAllButton( l, b );
        so.maf.collapseSection( s );
    },

    request: function( field, handler ){
            var value = CQ.Ext.getCmp( field.id ).getValue();
            value = (!value) ? null : value; //cooking-4937

            var expressions;
            if ( field.sni_all ){
                expressions = so.selection.get( so.g.currentExpressions );
                if (!expressions.length){ //no filters = no records to update;
                    alert('You need to create at least 1 filter to be able to modify.');
                    return;
                }
            }else{
                var urls = [];
                $CQ('.sni-maf-checks input[type=checkbox]:checked').each(function(){
                    var i = $CQ( this ).val();
                    urls.push( so.result.restData.assetInfoList[i].report.current_url );
                });

                if ( !urls.length ){ //no selected rows.
                    alert('There are no selected rows to modify.');
                    return;
                }
                expressions = [
                    {
                      "type": "TermMultiValueExpression",
                      "negated": false,
                      "field": "current_url",
                      "valueList": urls
                    }
                ];
            }

            var x = confirm( 'Are you sure you want to modify the assets?' );
            if ( !x ){
              return;
            }

            var requestObj = {
                    "changeList":[
                        {
                            "user": '<%=session.getUserID()%>',
                            "attribute": field.id,
                            "value": value,
                            "currentFilters": {
                                "type": "filters",
                                "expressions": expressions
                            }
                        }
                    ]
            };

            var data = JSON.stringify(requestObj);

            console.log('ajax request /imp/assets: '+data);
        
            $CQ.ajax({
                url:'/imp/assets',
                dataType: 'json',
                cache:false, 
                data: data,
                success: handler,
                error: function(){}
            });
        },
    
    doSection:function( f ){
            
            //insert EXTJS component
            so.form.createCombo( f.id ); //this requies the namespace so.fields to work

            var e = so.maf.getSection( f.id );
            //enable modify button
            $CQ('.sni-maf-button', e).click(function(){
                
                f.sni_all = false;
                so.maf.request( f, so.rest.handleModifyAssets );
            });

            //enable experts only button
            $CQ('.sni-maf-all-link', e).click(function(){
                
                so.maf.toggleAllButton( this, e );
            });

            //exec experts only button
            $CQ('.sni-maf-all-button', e).click(function(){
                var isEnable = so.hasClass( 'enabled', this );
                if ( isEnable ){

                    f.sni_all = true;
                    so.maf.request( f, so.rest.handleModifyAssets );
                }
            });

            //title collapse/expand
            if ( f.sni_show ){
                so.maf.expandSection( e );
            }else{
                so.maf.collapseSection( e );
            }
            $CQ('.sni-maf-title', e).click(function(){
                
                //collapse all sections
                so.each( so.fields, function( field ){

                    so.maf.resetSection( field );
                    
                });
                so.maf.toggleSection( e );
            });
    },

    show:function(){

            so.fields = so.maf.loadFields(); //we need this here so extjs does not throw an error when creating fields after toggling the form
            var chks = so.maf.doChecks(); //html for checkboxes
            var form = so.maf.doForm( so.fields ); //html to layout form and fields
            $CQ('.sni-p-content:first-child .sni-data td').before(form, chks); //inserts form & checkboxes in first column in grid

            //fix header
            var e = document.querySelector('.sni-first-col .sni-col-title');
            so.addClass('sni-maf-expanded', e.parentNode);

            //create extjs combos and setup events
            so.each(so.fields, so.maf.doSection);

            //DO NOT CHANGE: ie8 needs this line to resize the result table properly
            so.isIE8() && $CQ('.sni-p-content:first-child').width('auto');

            //scroll the maf form along with the page.
            //ie8 will report the scrollTop position as zero when inside an iframe.
            $CQ( window ).scroll(function(){
                if ( so.result.restData.assetInfoList.length > 10 ){
                    var offset = $CQ( this ).scrollTop();
                    //offset < 10130 && $CQ('.sni-maf-form #CQ').css({top:offset});
                    offset = offset > 65 ? offset-65 : offset;
                    offset = offset < 0 ? 0 : offset;
                    $CQ('.sni-maf-form #CQ').css({top:offset});
                }
            });
            $CQ('.sni-maf-form, .sni-maf-checks').animate({opacity:1},300);
            so.maf.doIt = so.maf.hide;

    },

    hide:function(){
        $CQ('.sni-maf-form, .sni-maf-checks').css({opacity:0});
        //destroy extjs cmps
        CQ.Ext.getCmp( 'preferred_term' ).destroy();
        CQ.Ext.getCmp( 'alternate_term' ).destroy();
        CQ.Ext.getCmp( 'sub_term' ).destroy();
        CQ.Ext.getCmp( 'sponsorship' ).destroy();
        
        //destroy Nodes
        $CQ('.sni-maf-form').remove();
        $CQ('.sni-maf-checks').remove();

        var e = document.querySelector('.sni-first-col .sni-col-title');
        so.removeClass('sni-maf-expanded', e.parentNode);

        //DO NOT CHANGE: ie8 needs this line to resize the result table properly
        so.isIE8() && $CQ('.sni-p-content:first-child').width('');

        so.maf.doIt = so.maf.show; 
    },

    open:function(){
        
        if ( <%= !isFullEditor %> ){
            alert('you must have full editor rights to modify assets!');
            return;
        }

        var t = so.result.getTotal();
        if (!t){ //if no assets loaded we abort.
            console.log('result set total is zero!');
            return;
        }

        if ( so.maf.doIt  === undefined ){ //true the first time i click maf button
            so.maf.show();
        }else{
            so.maf.doIt();
        }        
    },

    loadFields: function(){
        var setCombo = function(f){
            f = so.mix(f, {
                  renderTo: 'sni-maf-field-' + f.id,
                  width: 200,
                  listeners:{
                    select: function(){}, //we need to call nothing when selection is made.
                    expand: function( combo ){ //runs when combo is clicked.
                   
                        so.rest.getResource( f.sni_resource, combo );
                    }
                  }
            });
            return so.form.setCombo( f ); 
        };

        //define fields
        return {

            package: setCombo({
                id:'package',
                sni_resource:'package', //we use this in the /imp/resource service
                sni_title:'package name',
                sni_show:false
            }),

            sponsorship: setCombo({
                id:'sponsorship',
                sni_resource:'sponsorships', //we use this in the /imp/resource service
                sni_title:'sponsorship',
                sni_show:false
            }),

            alternate_term: setCombo({
                id:'alternate_term',
                sni_resource: 'alternate_terms',
                sni_title:'alternate term',
                sni_show:false
            }),

            sub_term: setCombo({
                id:'sub_term',
                sni_resource:'sub_terms',
                sni_title:'sub term',
                sni_show:false
            }),

            preferred_term: setCombo({
                  id: 'preferred_term',
                  sni_resource: 'preferred_terms',
                  sni_title: 'preferred term',
                  sni_show: true
            })

        };
    }
};
})(so);