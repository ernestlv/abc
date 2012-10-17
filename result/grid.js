result.stylelabel = {
        color: '#9ea3ac'
};

result.grid = {
                        fields: [
                                   {name: 'company'},
                                   {name: 'price',      type: 'float'},
                                   {name: 'change',     type: 'float'},
                                   {name: 'pctChange',  type: 'float'},
                                   {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
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
                                                        class   : 'sni-first-col',
                                                        label  : 'modify<br>asset',
                                                        width   : 75,
                                                        dataIndex: function(r, e){
                                                            e.innerHTML = '[ + ] &nbsp;&nbsp;'+r;
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
                                                        label   : 'URL',
                                                        width    : 75,
                                                        dataIndex: 'company'
                                                    },
                                                    {
                                                        label   : 'title',
                                                        width    : 75,
                                                        dataIndex: 'price'
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
                                                                dataIndex: 'company'
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
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'has image', 
                                                                width    : 75, 
                                                                dataIndex: 'change'
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
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'section', 
                                                                width    : 75, 
                                                                dataIndex: 'change'
                                                            },
                                                            {
                                                                label   : 'source', 
                                                                width    : 75, 
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'general<br>subject', 
                                                                width    : 75, 
                                                                dataIndex: 'change'
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
                                                                dataIndex: 'price'
                                                            }
                                                    ]
                                                },{
                                                    id:'sni-preferred-terms-col',
                                                    label:'preferred terms',
                                                    columns:[
                                                            {
                                                                label   : 'preferred<br>term', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'alternate<br>term', 
                                                                width    : 75, 
                                                                dataIndex: 'change'
                                                            },
                                                            {
                                                                label   : 'sub term', 
                                                                width    : 75, 
                                                                dataIndex: 'change'
                                                            }
                                                    ]
                                                },{
                                                    id:'sni-hubs-col',
                                                    label:'hub groupings',
                                                    columns:[
                                                            {
                                                                label   : 'hub type', 
                                                                width    : 75, 
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'hub id', 
                                                                width    : 75, 
                                                                dataIndex: 'change'
                                                            },
                                                            {
                                                                label   : 'hub sponsor', 
                                                                width    : 75, 
                                                                dataIndex: 'price'
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
                                                                dataIndex: 'price'
                                                            },
                                                             {
                                                                label   : 'Content Tag 2', 
                                                                width    : 75,
                                                                dataIndex: 'price'
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
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'seasons', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : "who's dining", 
                                                                width    : 75,
                                                                dataIndex: 'price'
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
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'meal type', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : "main ingredient", 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : "dish", 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : "drinks", 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : "herbs & spicies", 
                                                                width    : 75,
                                                                dataIndex: 'price'
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
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'cooking styles', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'nutrition', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'taste', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'technique', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'cookware & gadgets', 
                                                                width    : 75,
                                                                dataIndex: 'price'
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
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'abbreviation', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'talent', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            }
                                                    ]
                                                }
                                            ]
                                    },{
                                            id:'sni-panel-10',
                                            label:'2012 monthly page views',
                                            style:result.stylelabel,
                                            table:[
                                                {
                                                    id:'sni-currentyear-col',
                                                    label:'2012 monthly page views',
                                                    columns:[
                                                            {
                                                                label   : 'june', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'may', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'april', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'march', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'february', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'january', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            }
                                                    ]
                                                }
                                            ]
                                    },{
                                            id:'sni-panel-11',
                                            label:'2011 monthly page views',
                                            style:result.stylelabel,
                                            table:[
                                                {
                                                    id:'sni-previousyear-col',
                                                    label:'2011 monthly page views',
                                                    columns:[
                                                            {
                                                                label   : 'december', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'november', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'october', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'september', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'august', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },{
                                                                label   : 'july', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'june', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'may', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'april', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'march', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'february', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'january', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            }
                                                    ]
                                                }
                                            ]
                                    },{
                                            id:'sni-panel-12',
                                            label:'quarterly page views',
                                            style:result.stylelabel,
                                            table:[
                                            {
                                                    id:'sni-quarterly-col',
                                                    label:'quarterly page views',
                                                    columns:[
                                                            {
                                                                label   : 'Q2 2012', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'Q1 2012', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'Q4 2011', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'Q3 2011', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'Q2 2011', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            },
                                                            {
                                                                label   : 'Q1 2011', 
                                                                width    : 75,
                                                                dataIndex: 'price'
                                                            }
                                                    ]
                                                }
                                            ]
                                    }
                        ]
};