so.db = {
//*****  FUNCTIONS TO SETUP LAYOUT ***********

  setSection: function(t){

    var x = {    
              layout:'column',
              border:false
    };
    return so.f.mix(t, x);
  },

  //set column

  setColumn: function(t){

    var x = {
        layout:'column',
        columnWidth:1.0,
        style:{
          margin:'10px 10px'
        },
        bodyCssClass:'sni-column',
        bodyStyle:{
          //border: '10px solid #094ea1',
          //backgroundColor: '#094ea1',
          borderTop: '0px',
          borderBottomRightRadius: '.5em',
          borderBottomLeftRadius: '.5em'
        }         
    };
    return so.f.mix(t, x);
  },

  //set column
  setSubColumn: function(i){

    var x = {
        columnWidth:1.0,
        border:false,
        cls:'sni-subcol'   
    };
    return so.f.mix(i, x);
  },

  setFieldset: function(t, i){

      var x = {
              xtype:'fieldset',
              cls:'sni-fieldset',
              layout:'form',
              items:i,
              style:{
                margin: '0px',
                padding: '0px'
              },
              bodyStyle:{
                marginTop: '30px'
              }
            };

      if (typeof t === 'string'){
        x.title = t;
        x.border = x.title ? true : false;
      }else{
        x = so.f.mix(t, x);
      }
      return x;
  },

  setTab: function(t){

        var x = {
            layout:'form',
            border:false
        };
        return so.f.mix(t, x);
  }

};