so.maf = { //modify assets fields

    preferred_term:{
        id:'preferred_term',
        title:'preferred term',
        show:true
    },
    alternate_term:{
        id:'alternate_term',
        title:'alternate term',
        show:false
    },
    sub_term:{
        id:'sub_term',
        title:'sub term',
        show:false
    },

    toggle:function(){
        
        if (so.maf.show){
            $CQ('.sni-maf-checks').show();
            $CQ('.sni-maf-form').show();
            // fix header
            var e = document.querySelector('.sni-first-col .sni-col-title');
            so.f.addClass('sni-maf-expanded', e);
            so.maf.show = false;
        }else{
            $CQ('.sni-maf-checks').hide();
            $CQ('.sni-maf-form').hide();
            // fix header
            var e = document.querySelector('.sni-first-col .sni-col-title');
            so.f.removeClass('sni-maf-expanded', e);
            so.maf.show = true;
        }
    },

    doSection:function(c){

        return [
            '<div class="sni-maf-wrapper" id="sni-maf-'+c.id+'">',
            '<div class="sni-maf-title"><span class="sni-maf-close"></span> '+c.title+'</div>',
            '<div class="sni-maf-body">',
            '<h3>modify '+c.title+'</h3>',
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
    },

    doSections:function(){

        var l = so.result.getTotal();
        var h = l * 42 - 50; //wrapper height. 42 is 32 height of each column row plus 5px for top and 5px for bottom padding, minus 50px of the sni-modify-assets-wrapper top padding.
        return [
            '<td class="sni-maf-form">',
            '<div id="CQ" class="sni-CQ-wrapper">',
            '<h2>modify assets</h2>',
            so.maf.doSection( so.maf.preferred_term ), 
            so.maf.doSection( so.maf.alternate_term ), 
            so.maf.doSection( so.maf.sub_term ),
            '</div>',
            '</td>'
        ].join('');
    },

    doChecks:function(){

        var r = document.querySelectorAll('.sni-data .sni-first-col div');
        var i, l = r.length, b=[], c;
        for (i=0; i<l; i++){
            c = i%2 ? 'sni-cell-odd' : 'sni-cell-even'
            b.push('<div class="sni-maf-check '+c+'"><input type="checkbox" id="sni-modify-asset-'+(i+1)+'" value="'+i+'"></div>');
        }
        return '<td class="sni-maf-checks">'+b.join('')+'</td>';
    },

    toggleSection:function(show, e){

         var i = e.querySelector('.sni-maf-title .sni-maf-close');
         var x = e.querySelector('.sni-maf-body');
        if (show){
                i.innerHTML = '-';
                so.f.removeClass('hide', x);
                so.f.addClass('show', x)
                return false;
            }else{
                i.innerHTML = '+';
                so.f.removeClass('show', x);
                so.f.addClass('hide', x);
                return true;
            }
    },

    displaySection:function(f){
            
            //insert EXTJS component
            so.fields[f.id].renderTo = 'sni-maf-field-'+f.id;
            delete so.fields[f.id].listeners.select;
            so.form.createCombo(f.id);

            //set up accordion
            var e = document.querySelector('#sni-maf-'+f.id);
            var show = so.maf.toggleSection(f.show, e);
            $CQ('.sni-maf-title', e).click(function(){

                show = so.maf.toggleSection(show, e);
            });

            //enable modify button
            $CQ('.sni-maf-button', e).click(function(){
                
                so.rest.getModifyAssets(f.id, so.rest.handleModifyAssets);
            });

            //enable experts only button
            var isEnable = false;
            $CQ('.sni-maf-all-link', e).click(function(){
                
                var b = e.querySelector('.sni-maf-all-button');
                if (!isEnable){
                    so.f.addClass('enabled', b);
                    this.innerHTML = 'lock modify all button';
                    isEnable = true;
                }else{
                    so.f.removeClass('enabled', b);
                    this.innerHTML = 'unlock modify all button';
                    isEnable = false;
                }
                
            });

            //exec experts only button
            $CQ('.sni-maf-all-button', e).click(function(){

                if (isEnable){
                    so.rest.getModifyAssets(f.id, so.rest.handleModifyAssets, true);
                }
            });
    },

    disableAllButton:function(e){

        var b = e.querySelector('.sni-maf-all-button');
        if (so.f.hasClass('enabled',b)){
            $CQ('.sni-maf-all-link', e).click();
        }
    },

    resetSection:function( f ){

        //reset EXTJS field
        CQ.Ext.getCmp( f.id ).reset();
        //disable experts only part
        var e = document.querySelector( '#sni-maf-'+f.id );
        so.maf.disableAllButton( e );
        //expand/collapse section
        var c = !f.show ?  'show' : 'hide';
        var b = e.querySelector('.sni-maf-body');
        if (so.f.hasClass( c, b )){
            $CQ('.sni-maf-title', e).click();
        }
    },

    redo:function(){
        
        var chks = so.maf.doChecks();
        $CQ('.sni-p-content:first-child .sni-data .sni-maf-form').after(chks);
        $CQ('.sni-maf-form').show();

        // fix header
        var e = document.querySelector('.sni-first-col .sni-col-title');
        so.f.addClass('sni-maf-expanded', e);

        //reset field sections
        so.maf.resetSection( so.maf.preferred_term );
        so.maf.resetSection( so.maf.alternate_term );
        so.maf.resetSection( so.maf.sub_term );
        so.maf.show = false;
    },

    do:function(){

            var chks = so.maf.doChecks();
            var form = so.maf.doSections();
            //select first column in grid and inserts form & checkboxes
            $CQ('.sni-p-content:first-child .sni-data td').before(form, chks);

            //fix header
            var e = document.querySelector('.sni-first-col .sni-col-title');
            so.f.addClass('sni-maf-expanded', e);

            so.maf.displaySection( so.maf.preferred_term );
            so.maf.displaySection( so.maf.alternate_term );
            so.maf.displaySection( so.maf.sub_term );
            so.maf.show = false;
    },

    hide:function(){

        //make it false to force hide
        so.maf.show = false; 
        so.maf.toggle();
        //destroy Nodes
        $CQ('.sni-maf-checks').remove();
        //destroy Flags
        delete so.maf.show;     
    },

    display:function(){
        
        var t = so.result.getTotal();
        if (!t){ //if no assets loaded we abort.
            return;
        }
        if (so.fields){
            if (so.maf.show  === undefined){ //true when i switch between dashboard and result screens using the iframes see destroyModifyAssets()
                so.maf.redo();
            }else{ 
                so.maf.toggle();
            }
            return;
        }
        $CQ.getScript('/apps/sni-site-optimizer/clientlib/js/fields.js', function(){

            so.maf.do();
        });
    }
};
