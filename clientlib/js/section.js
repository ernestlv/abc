so.section = {

      selection:so.db.setSection({
        id:'sni-selection-section',
        items:[  
              so.column.selection                                                                
        ]
      }),

      global : so.db.setSection({
        id:'sni-global-section',
        items:[  
              so.column.global                                                                
        ]
      }),

      status : so.db.setSection({
        id:'sni-status-section',
        items:[  
              so.column.status,
              so.column.advertising                                                                       
        ]
      }),

      eventsCoreTech : so.db.setSection({
        id:'sni-event-section',
        items:[
              so.column.events,
              so.column.core,
              so.column.tech
        ]
      }),

       source : so.db.setSection({
        id:'sni-source-section',
        items:[
              so.column.source
        ]
      })        

};

//main            
so.components = [ 
        so.section.selection,
        so.section.global, 
        so.section.status,
        so.section.eventsCoreTech,
        so.section.source                                                             
];