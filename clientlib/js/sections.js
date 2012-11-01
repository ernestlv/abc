so.section = {

      selection:so.f.setSection({
        id:'sni-selection-section',
        items:[  
              so.col.selection                                                                
        ]
      }),

      global : so.f.setSection({
        id:'sni-global-section',
        items:[  
              so.col.global                                                                
        ]
      }),

      status : so.f.setSection({
        id:'sni-status-section',
        items:[  
              so.col.status,
              so.col.advertising                                                                       
        ]
      }),

      eventsCoreTech : so.f.setSection({
        id:'sni-event-section',
        items:[
              so.col.events,
              so.col.core,
              so.col.tech
        ]
      }),

       source : so.f.setSection({
        id:'sni-source-section',
        items:[
              so.col.source
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