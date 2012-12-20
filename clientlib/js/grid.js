(function(so){

    var headerColor = '#9ea3ac';

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
                                       {name: 'cookware_and_gagets'},
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
                                                            width     : 75,
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
                                                            label    : 'URL',
                                                            width    : 75,
                                                            dataIndex: 'url',
                                                            styleData: {textAlign:'left'} //only applies to data rows
                                                        },
                                                        {
                                                            label    : 'title',
                                                            width    : 75,
                                                            dataIndex: 'title',
                                                            styleData    : {textAlign:'left'}
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
                                                                    width    : 75,
                                                                    dataIndex: 'status'
                                                                }
                                                        ] 
                                                    },
                                                    {
                                                        id:'sni-format-col',
                                                        label:'format',
                                                        columns:[
                                                                {
                                                                    label   : 'asset type', 
                                                                    width    : 75,
                                                                    dataIndex: 'asset_type'
                                                                },
                                                                {
                                                                    label   : 'has image', 
                                                                    width    : 75, 
                                                                    dataIndex: 'has_image'
                                                                }
                                                        ]
                                                    }
                                                   ,{
                                                        id:'sni-classification-col',
                                                        label:'asset classification',
                                                        columns:[
                                                                {
                                                                    label   : 'category', 
                                                                    width    : 75, 
                                                                    dataIndex: 'category'
                                                                },
                                                                {
                                                                    label   : 'section', 
                                                                    width    : 75, 
                                                                    dataIndex: 'section'
                                                                },
                                                                {
                                                                    label   : 'source', 
                                                                    width    : 75, 
                                                                    dataIndex: 'source'
                                                                },
                                                                {
                                                                    label   : 'general<br>subject', 
                                                                    width    : 75, 
                                                                    dataIndex: 'general_subjects'
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
                                                                    label   : 'sponsorship', 
                                                                    width    : 75,
                                                                    dataIndex: 'sponsorship'
                                                                }
                                                        ]
                                                    },{
                                                        id:'sni-preferred-terms-col',
                                                        label:'preferred terms',
                                                        columns:[
                                                                {
                                                                    label   : 'preferred<br>term', 
                                                                    width    : 75,
                                                                    dataIndex: 'preferred_term'
                                                                },
                                                                {
                                                                    label   : 'alternate<br>term', 
                                                                    width    : 75, 
                                                                    dataIndex: 'alternate_term'
                                                                },
                                                                {
                                                                    label   : 'sub term', 
                                                                    width    : 75, 
                                                                    dataIndex: 'sub_term'
                                                                }
                                                        ]
                                                    },{
                                                        id:'sni-hubs-col',
                                                        label:'hub groupings',
                                                        columns:[
                                                                {
                                                                    label   : 'hub type', 
                                                                    width    : 110, 
                                                                    dataIndex: 'hub_type'
                                                                }
                                                                //{
                                                                //    label   : 'hub id', 
                                                                //    width    : 75, 
                                                                //    dataIndex: 'change'
                                                                //},
                                                                //{
                                                                //    label   : 'hub sponsor', 
                                                                //    width    : 75, 
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
                                                                    label   : 'Content Tag 1', 
                                                                    width    : 75,
                                                                    dataIndex: 'content_tag1'
                                                                },
                                                                 {
                                                                    label   : 'Content Tag 2', 
                                                                    width    : 75,
                                                                    dataIndex: 'content_tag2'
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
                                                                    label   : 'occasions', 
                                                                    width    : 75,
                                                                    dataIndex: 'occasions'
                                                                },
                                                                {
                                                                    label   : 'seasons', 
                                                                    width    : 75,
                                                                    dataIndex: 'season'
                                                                },
                                                                {
                                                                    label   : "who's dining", 
                                                                    width    : 75,
                                                                    dataIndex: 'who_s_dining'
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
                                                                    label   : 'meal part', 
                                                                    width    : 75,
                                                                    dataIndex: 'meal_part'
                                                                },
                                                                {
                                                                    label   : 'meal type', 
                                                                    width    : 75,
                                                                    dataIndex: 'meal_type'
                                                                },
                                                                {
                                                                    label   : "main ingredient", 
                                                                    width    : 75,
                                                                    dataIndex: 'main_ingredient'
                                                                },
                                                                {
                                                                    label   : "dish", 
                                                                    width    : 75,
                                                                    dataIndex: 'dish'
                                                                },
                                                                {
                                                                    label   : "drinks", 
                                                                    width    : 75,
                                                                    dataIndex: 'drinks'
                                                                },
                                                                {
                                                                    label   : "herbs & spicies", 
                                                                    width    : 75,
                                                                    dataIndex: 'herbs_and_spices'
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
                                                                    label   : 'cuisine', 
                                                                    width    : 75,
                                                                    dataIndex: 'cuisine'
                                                                },
                                                                {
                                                                    label   : 'cooking styles', 
                                                                    width    : 75,
                                                                    dataIndex: 'cooking_styles'
                                                                },
                                                                {
                                                                    label   : 'nutrition', 
                                                                    width    : 75,
                                                                    dataIndex: 'nutrition'
                                                                },
                                                                {
                                                                    label   : 'taste', 
                                                                    width    : 75,
                                                                    dataIndex: 'taste'
                                                                },
                                                                {
                                                                    label   : 'technique', 
                                                                    width    : 75,
                                                                    dataIndex: 'technique'
                                                                },
                                                                {
                                                                    label   : 'cookware & gadgets', 
                                                                    width    : 75,
                                                                    dataIndex: 'cookware_and_gagets'
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
                                                                    label   : 'show title', 
                                                                    width    : 75,
                                                                    dataIndex: 'show_title'
                                                                },
                                                                {
                                                                    label   : 'abbreviation', 
                                                                    width    : 75,
                                                                    dataIndex: 'show_abbr'
                                                                },
                                                                {
                                                                    label   : 'talent', 
                                                                    width    : 75,
                                                                    dataIndex: 'talent'
                                                                }
                                                        ]
                                                    }
                                                ]
                                        }
                                        /*{
                                                id:'sni-panel-10',
                                                label:'monthly page views',
                                                style:headerColor,
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
                                                style:headerColor,
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
                                                style:headerColor,
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
                                                style:headerColor,
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

    function createPanel( year, index, label, columns ){
        index++;
        return {
            id:'sni-panel-'+index,
            label: year + ' ' +label,
            style:headerColor,
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
        var cols = [], fields = so.grid.fields, i, f;
        for ( i=start; i < end ; i++ ){
            f = months[i]+'_'+year;
            cols.push({
                label    : months[i], 
                width    : 75,
                dataIndex: f
            });
            fields.push({ name: f });
        }
        so.grid.panel.push( createPanel( year, index, 'monthly page views', cols ) );
    }

    function doQs( year, start, end, panel ){
        var cols = panel.table[0].columns, 
            fields = so.grid.fields, 
            i, f;
        for ( i=start; i<end; i+=3 ){
            f = Qs[i]+'_'+year;
            cols.push({
                label    : Qs[i]+' '+year, 
                width    : 75,
                dataIndex: f
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
    qPanel =  createPanel( '', index, 'quarterly page views', [] );
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