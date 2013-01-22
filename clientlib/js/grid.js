(function(so){

    function expand( event ){
        //find elemenets
        var tgt = event.currentTarget, title, id, col, org, w, max;
        if ( so.hasClass('sni-resizable', tgt) ){ //click column body
            title = $CQ('[data-col-id='+tgt.id+']').parent().children('.sni-col-title')[0]; //get header
            col = tgt;
        }else{ //click header
            title = tgt;
            id = $CQ('.sni-drag', title.parentNode ).attr('data-col-id'); // get column body
            col = $CQ( '#' + id )[0];
        }
        //calculate width
        org = $CQ( title ).attr('data-sni-width') - 0;
        w = $CQ( title ).width();
        if ( w > org ){ //collapse column
           max = org;
           so.removeClass('sni-column-expanded', col);
           so.removeClass('sni-header-expanded', title);
        }else{ //expand column
           max = ( org > 110 ? 110 : org )*10;
           so.addClass('sni-column-expanded', col);
           so.addClass('sni-header-expanded', title);
        }
        //expand
        title.style.width = max + 'px';
        col.style.width = max + 15 + 'px';
    };

    function sort ( event ){ 

        if ( event.metaKey ){
            expand( event );
            return;
        }
        
        var title = event.target;
        var f = $CQ( title ).attr('data-sni-dataIndex');
        var o = 'DESC';
        if ( f === so.result.sortField ){
           o = so.result.sortOrder === 'DESC' ? 'ASC' : 'DESC'; 
        }
            
        so.result.sort( f, o );
    };

    var HEADERCOLOR = '#9ea3ac';
    
    so.grid = {
                            fields: [
                                       {name: 'url'},
                                       {name: 'title'},
                                       {name: 'status'},
                                       {name: 'asset_type'},
                                       {name: 'has_image'},
                                       {name: 'category'},
                                       {name: 'section'},
                                       {name: 'source'},
                                       {name: 'general_subjects'},
                                       {name: 'sponsorship'},
                                       {name: 'preferred_term'},
                                       {name: 'alternate_term'},
                                       {name: 'sub_term'},
                                       {name: 'hub_type'},
                                       {name: 'hub_sponsor'},
                                       {name: 'content_tag1'},
                                       {name: 'content_tag2'},
                                       {name: 'occasions'},
                                       {name: 'season'},
                                       {name: 'who_s_dining'},
                                       {name: 'meal_part'},
                                       {name: 'meal_type'},
                                       {name: 'main_ingredient'},
                                       {name: 'dish'},
                                       {name: 'drinks'},
                                       {name: 'herbs_and_spices'},
                                       {name: 'cuisine'},
                                       {name: 'cooking_styles'},
                                       {name: 'nutrition'},
                                       {name: 'taste'},
                                       {name: 'technique'},
                                       {name: 'cookware_and_gadgets'},
                                       {name: 'show_title'},
                                       {name: 'show_abbr'},
                                       {name: 'talent'}
                            ],
                            panel:[
                                        {
                                            id:'sni-panel-1',
                                            label:'&nbsp;',
                                            split:false,
                                            table:[
                                                {
                                                    id:'sni-asset-col',
                                                    label:'&nbsp;',
                                                    columns:[
                                                        {
                                                            classHead : 'sni-first-col', //apply to the header rows
                                                            classData : 'sni-first-col', //apllies only to data rows
                                                            label     : '&nbsp;modify<br>&nbsp;asset',
                                                            width     : 90,
                                                            dataIndex : function(r, e){
                                                                e.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;'+r;
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            id:'sni-panel-2',
                                            label:'&nbsp',
                                            split:false,
                                            table:[
                                                {
                                                    id:'sni-url-col',
                                                    label:'&nbsp;',
                                                    columns:[
                                                        {
                                                            label     : 'title',
                                                            width     : 300,
                                                            dataIndex : 'title',
                                                            tooltip   : 'TITLE:\n',
                                                            styleData : {textAlign:'left'},
                                                            click     : sort,
                                                            clickData : expand
                                                        },
                                                        {
                                                            label    : 'URL',
                                                            width    : 110,
                                                            dataIndex: 'url',
                                                            tooltip  : 'URL:\n',
                                                            styleData: {textAlign:'left'}, //only applies to data rows
                                                            click    : sort,
                                                            clickData : expand
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                                id:'sni-panel-3',
                                                label:'status & format',
                                                table:[
                                                {
                                                        id:'sni-status-col',
                                                        label:'&nbsp;',
                                                        columns:[
                                                                {
                                                                    label   : 'status', 
                                                                    width    : 110,
                                                                    dataIndex: 'status',
                                                                    tooltip  : 'STATUS:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                }
                                                        ] 
                                                    },
                                                    {
                                                        id:'sni-format-col',
                                                        label:'format',
                                                        columns:[
                                                                {
                                                                    label    : 'asset type', 
                                                                    width    : 90,
                                                                    dataIndex: 'asset_type',
                                                                    tooltip  : 'ASSET TYPE:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : 'has image', 
                                                                    width    : 90, 
                                                                    dataIndex: 'has_image',
                                                                    tooltip  : 'HAS IMAGE:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                }
                                                        ]
                                                    }
                                                   ,{
                                                        id:'sni-classification-col',
                                                        label:'asset classification',
                                                        columns:[
                                                                {
                                                                    label    : 'category', 
                                                                    width    : 90, 
                                                                    dataIndex: 'category',
                                                                    tooltip  : 'CATEGORY:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : 'section', 
                                                                    width    : 90, 
                                                                    dataIndex: 'section',
                                                                    tooltip  : 'SECTION:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : 'source', 
                                                                    width    : 90, 
                                                                    dataIndex: 'source',
                                                                    tooltip  : 'SOURCE:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : 'general<br>subject', 
                                                                    width    : 150, 
                                                                    dataIndex: 'general_subjects',
                                                                    tooltip  : 'GENERAL SUBJECT:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                }
                                                        ]
                                                    }
                                                ]
                                        },
                                        {
                                                id:'sni-panel-4',
                                                label:'advertising tags',
                                                table:[
                                                {
                                                        id:'sni-sponsorship-col',
                                                        label:'codes',
                                                        columns:[
                                                                {
                                                                    label     : 'sponsorship', 
                                                                    width     : 190,
                                                                    dataIndex : 'sponsorship',
                                                                    tooltip   : 'SPONSORSHIP:\n',
                                                                    filter    : so.filter,
                                                                    click     : sort,
                                                                    clickData : expand
                                                                }
                                                        ]
                                                    },{
                                                        id:'sni-preferred-terms-col',
                                                        label:'preferred terms',
                                                        columns:[
                                                                {
                                                                    label    : 'preferred<br>term', 
                                                                    width    : 150,
                                                                    dataIndex: 'preferred_term',
                                                                    tooltip  : 'PREFERRED TERM:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : 'alternate<br>term', 
                                                                    width    : 150, 
                                                                    dataIndex: 'alternate_term',
                                                                    tooltip  : 'ALTERNATE TERM:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : 'sub term', 
                                                                    width    : 150, 
                                                                    dataIndex: 'sub_term',
                                                                    tooltip  : 'SUB TERM:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                }
                                                        ]
                                                    },{
                                                        id:'sni-hubs-col',
                                                        label:'hub groupings',
                                                        columns:[
                                                                {
                                                                    label   : 'hub type', 
                                                                    width    : 150, 
                                                                    dataIndex: 'hub_type',
                                                                    tooltip  : 'HUB TYPE:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                }
                                                                //{
                                                                //    label   : 'hub id', 
                                                                //    width    : 90, 
                                                                //    dataIndex: 'change'
                                                                //},
                                                                //{
                                                                //    label   : 'hub sponsor', 
                                                                //    width    : 90, 
                                                                //    dataIndex: 'hub_sponsor'
                                                                //}
                                                        ]
                                                    }
                                                ]
                                        },{
                                                id:'sni-panel-5',
                                                label:'global filters',
                                                table:[
                                                {
                                                        id:'sni-content-tag-col',
                                                        label:'Content Tags',
                                                        columns:[
                                                                {
                                                                    label    : 'Content Tag 1', 
                                                                    width    : 150,
                                                                    dataIndex: 'content_tag1',
                                                                    tooltip  : 'CONTENT TAG 1:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                 {
                                                                    label    : 'Content Tag 2', 
                                                                    width    : 150,
                                                                    dataIndex: 'content_tag2',
                                                                    tooltip  : 'CONTENT TAG 2:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                }
                                                        ]
                                                }
                                                ]
                                        },{
                                                id:'sni-panel-6',
                                                label:'events',
                                                table:[
                                                {
                                                        id:'sni-events-col',
                                                        label:'&nbsp;',
                                                        columns:[
                                                                {
                                                                    label    : 'occasions', 
                                                                    width    : 110,
                                                                    dataIndex: 'occasions',
                                                                    tooltip  : 'OCCASIONS:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : 'seasons', 
                                                                    width    : 110,
                                                                    dataIndex: 'season',
                                                                    tooltip  : 'SEASONS:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : "who's dining", 
                                                                    width    : 110,
                                                                    dataIndex: 'who_s_dining',
                                                                    tooltip  : 'WHO IS DINING:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                }
                                                        ]
                                                    }
                                                ]
                                        },{
                                                id:'sni-panel-7',
                                                label:'core cooking content',
                                                table:[
                                                {
                                                        id:'sni-cooking-col',
                                                        label:'&nbsp;',
                                                        columns:[
                                                                {
                                                                    label    : 'meal part', 
                                                                    width    : 90,
                                                                    dataIndex: 'meal_part',
                                                                    tooltip  : 'MEAL PART:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : 'meal type', 
                                                                    width    : 90,
                                                                    dataIndex: 'meal_type',
                                                                    tooltip  : 'MEAL TYPE:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : "main ingredient", 
                                                                    width    : 150,
                                                                    dataIndex: 'main_ingredient',
                                                                    tooltip  : 'MAIN INGREDIENT:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : "dish", 
                                                                    width    : 90,
                                                                    dataIndex: 'dish',
                                                                    tooltip  : 'DISH:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : "drinks", 
                                                                    width    : 90,
                                                                    dataIndex: 'drinks',
                                                                    tooltip  : 'DRINKS:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : "herbs & spicies", 
                                                                    width    : 150,
                                                                    dataIndex: 'herbs_and_spices',
                                                                    tooltip  : 'HERBS & SPICIES:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                }
                                                        ]
                                                    }
                                                ]
                                        },{
                                                id:'sni-panel-8',
                                                label:'techniques & styles',
                                                table:[
                                                {
                                                        id:'sni-techniques-col',
                                                        label:'&nbsp;',
                                                        columns:[
                                                                {
                                                                    label    : 'cuisine', 
                                                                    width    : 110,
                                                                    dataIndex: 'cuisine',
                                                                    tooltip  : 'CUISINE:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : 'cooking styles', 
                                                                    width    : 110,
                                                                    dataIndex: 'cooking_styles',
                                                                    tooltip  : 'COOKING STYLES:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : 'nutrition', 
                                                                    width    : 90,
                                                                    dataIndex: 'nutrition',
                                                                    tooltip  : 'NUTRITION:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : 'taste', 
                                                                    width    : 90,
                                                                    dataIndex: 'taste',
                                                                    tooltip  : 'TASTE:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : 'technique', 
                                                                    width    : 90,
                                                                    dataIndex: 'technique',
                                                                    tooltip  : 'TECHNIQUE:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label    : 'cookware & gadgets', 
                                                                    width    : 150,
                                                                    dataIndex: 'cookware_and_gagets',
                                                                    tooltip  : 'COOKWARE & GADGETS:\n',
                                                                    click    : sort,
                                                                    clickData : expand
                                                                }
                                                        ]
                                                    }
                                                ]
                                        },{
                                                id:'sni-panel-9',
                                                label:'events',
                                                table:[
                                                    {
                                                        id:'sni-contentsources-col',
                                                        label:'&nbsp;',
                                                        columns:[
                                                                {
                                                                    label     : 'show title', 
                                                                    width     : 300,
                                                                    dataIndex : 'show_title',
                                                                    tooltip   : 'SHOW TITLE:\n',
                                                                    styleData : {textAlign:'left'},
                                                                    click    : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label     : 'abbreviation', 
                                                                    width     : 90,
                                                                    dataIndex : 'show_abbr',
                                                                    tooltip   : 'ABBREVIATION:\n',
                                                                    styleData : {textAlign:'left'},
                                                                    click     : sort,
                                                                    clickData : expand
                                                                },
                                                                {
                                                                    label     : 'talent', 
                                                                    width     : 200,
                                                                    dataIndex : 'talent',
                                                                    tooltip   : 'TALENT:\n',
                                                                    styleData : {textAlign:'left'},
                                                                    click     : sort,
                                                                    clickData : expand
                                                                }
                                                        ]
                                                    }
                                                ]
                                        }
                                        /*{
                                                id:'sni-panel-10',
                                                label:'monthly page views',
                                                style:HEADERCOLOR,
                                                table:[
                                                    {
                                                        id:'sni-currentyear-col',
                                                        label:'monthly page views',
                                                        columns:[]
                                                    }
                                                ]
                                        },{
                                                id:'sni-panel-11',
                                                label:'monthly page views',
                                                style:HEADERCOLOR,
                                                table:[
                                                    {
                                                        id:'sni-previousyear-col',
                                                        label:'monthly page views',
                                                        columns:[]
                                                    }
                                                ]
                                        },{
                                                id:'sni-panel-12',
                                                label:'monthly page views',
                                                style:HEADERCOLOR,
                                                table:[
                                                    {
                                                        id:'sni-previousyear-col',
                                                        label:'monthly page views',
                                                        columns:[]
                                                    }
                                                ]
                                        },{
                                                id:'sni-panel-13',
                                                label:'quarterly page views',
                                                style:HEADERCOLOR,
                                                table:[
                                                    {
                                                        id:'sni-quarterly-col',
                                                        label:'quarterly page views',
                                                        columns:[]
                                                    }
                                                ]
                                        } */
                            ]
    };

    //******* INITIALIZATION code for calendar part of the grid
    var months = ['december', 'november', 'october', 'september', 'august', 'july', 'june', 'may', 'april', 'march', 'february', 'january'];
    var Qs     = ['Q4', 'Q4', 'Q4', 'Q3', 'Q3', 'Q3', 'Q2', 'Q2', 'Q2', 'Q1', 'Q1', 'Q1'];
    var today  = new Date();
    var year, start, end, left, index, delta, qPanel;

    function createPanel( year, index, label, columns, isShortYear ){
        index++;
        return {
            id:'sni-panel-'+index,
            label: year + label,
            isShortYear: isShortYear,
            year: year,
            style:HEADERCOLOR,
            table:[
                {
                    id:'sni-col-'+year,
                    label:'',
                    columns:columns
                }
            ]
        }
    }
    
    function doYear( year, index, start, end ){
        var cols = [], fields = so.grid.fields, i, l, f, t;
        for ( i=start; i < end ; i++ ){
            l = months[i];
            f = l+'_'+year;
            t = l.toUpperCase() + ':\n';
            cols.push({
                label    : l, 
                width    : 90,
                dataIndex: f,
                tooltip  : t,
                click    : sort,
                clickData : expand
            });
            fields.push({ name: f });
        }
        so.grid.panel.push( createPanel( year, index, ' monthly page views', cols, cols.length < 3 ) );
    }

    function doQs( year, start, end, panel ){
        var cols = panel.table[0].columns, fields = so.grid.fields, i, l, f, t;
        for ( i=start; i<end; i+=3 ){
            l = Qs[i];
            f = l+'_'+year;
            l = l+' '+year;
            t = l.toUpperCase() + ':\n';
            cols.push({
                label    : l, 
                width    : 90,
                dataIndex: f,
                tooltip  : t,
                click    : sort,
                clickData : expand
            });
            fields.push({ name: f });
        }
    }

    //current year
    left = 16;                     // # months to process
    year = today.getFullYear();    // current year to process
    start = 11 - today.getMonth(); // start in this index
    end = 12;                      // stop in this index
    index = 9;                     // panel index

    //previous years
    do
    {
        doYear( year, index, start, end );
        //calculate previous year
        delta = end - start;         // # of months processed
        left  = left - delta;         // # of months left
        end   = left > 12 ? 12 : left; // update last index
        start = 0;                   // update start index
        year--;                   // update year
        index++;                  // update panel index
    }while( left );
    

    //Qs current year
    left = 16;
    year = today.getFullYear();
    start = 11 - today.getMonth();
    end = 12;
    qPanel =  createPanel( '', index, ' quarterly page views', [] );
    do{
        doQs( year, start, end, qPanel );
        //calculate Qs previous year
        delta = end - start; 
        left  = left - delta;  
        end   = left > 12 ? 12 : left; 
        start = 0; 
        year--;
    }while( left );
    so.grid.panel.push( qPanel );

})(so);