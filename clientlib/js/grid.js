so.style = {
    headerColor:'#9ea3ac'
};

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
                                                        class     : 'sni-first-col',
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
                                                        styleData    : {textAlign:'left'} //only applies to data rows
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
                                                            },
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
                                                            },
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
                                                                width    : 75, 
                                                                dataIndex: 'hub_type'
                                                            },
                                                            //{
                                                            //    label   : 'hub id', 
                                                            //    width    : 75, 
                                                            //    dataIndex: 'change'
                                                            //},
                                                            {
                                                                label   : 'hub sponsor', 
                                                                width    : 75, 
                                                                dataIndex: 'hub_sponsor'
                                                            }
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
                                    },{
                                            id:'sni-panel-10',
                                            label:'monthly page views',
                                            style:so.style.headerColor,
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
                                            style:so.style.headerColor,
                                            table:[
                                                {
                                                    id:'sni-previousyear-col',
                                                    label:'monthly page views',
                                                    columns:[]
                                                }
                                            ]
                                    },{
                                            id:'sni-panel-12',
                                            label:'quarterly page views',
                                            style:so.style.headerColor,
                                            table:[
                                                {
                                                    id:'sni-quarterly-col',
                                                    label:'quarterly page views',
                                                    columns:[]
                                                }
                                            ]
                                    }
                        ]
};

//initialize calendar part of the grid
(function(){
    
    var months = ['december', 'november', 'october', 'september', 'august', 'july', 'june', 'may', 'april', 'march', 'february', 'january'];
    var Qs     = ['Q4', 'Q4', 'Q4', 'Q3', 'Q3', 'Q3', 'Q2', 'Q2', 'Q2', 'Q1', 'Q1', 'Q1'];
    var d      = new Date();
    var y, m;
    
    function doYear(y, m, panel, fields){
        var table, cols, i, x;
        panel.label = y+' '+panel.label;
        table = panel.table[0];
        table.label = y+' '+table.label;
        cols = table.columns;
        for (i=m; i<12; i++){
            x = months[i]+'_'+y;
            cols.push({
                label    : months[i], 
                width    : 75,
                dataIndex: x
            });
            fields.push({ name: x });
        }
    }

    function doQs(y, m, panel, fields){
        var cols, i, x;
        cols = panel.table[0].columns;
        for (i=m; i<12; i+=3){
            x = Qs[i]+'_'+y;
            cols.push({
                label    : Qs[i]+' '+y, 
                width    : 75,
                dataIndex: x
            })
            fields.push({ name: x });
        }
    }

    //current year
    y = d.getFullYear();
    m = 11 - d.getMonth();
    doYear(y, m, so.grid.panel[9], so.grid.fields);

    //previous year
    y = y - 1;
    m = 0;
    doYear(y, m, so.grid.panel[10], so.grid.fields);

    //Qs current year
    y = d.getFullYear();
    m = 11 - d.getMonth();
    doQs(y, m, so.grid.panel[11], so.grid.fields);

    //Qs previous year
    y = y - 1;
    m = 0;
    doQs(y, m, so.grid.panel[11], so.grid.fields);
    

})()