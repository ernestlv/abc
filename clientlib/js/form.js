(function(so){

so.form = {
   //********** EXTJS CONSTRUCTORS *****************

  createComposite: function(f, x){

    var o = {
        xtype:'compositefield',
        items:so.fields[f]
    };

    return so.mix(x, o);
  },

  //set comobox
  createCombo: function(f){

    var o = so.fields[f];
    o.store = new CQ.Ext.data.ArrayStore(o.store);
   return new CQ.Ext.form.ComboBox(o);
  },

  //set checkbox
  createCheckBox: function(f){
    var o = so.fields[f];
   return new CQ.Ext.form.CheckboxGroup(o);
  },

  //set checkbox
  createRadio: function(f){
    var o = so.fields[f];
   return new CQ.Ext.form.RadioGroup(o);
  },

  //set Slider
  createSlider: function(f){
    var o = so.fields[f];
    return new CQ.Ext.Slider(o);
  },

  createSpinner: function(f){
    var o = so.fields[f];
    return new CQ.Ext.ux.form.SpinnerField(o);
  },

  //********** EXTJS CONFIGS *****************

  setFilter: function(f, a){

    var x = { //field properties
      xtype:'textfield',
       width:100
    };

    var b = { //button properties
      xtype:'button',
      text:'add',
      handler: function(){
      
        so.rest.handleFilter(f.id);
      }
    };

    return [so.mix(f, x), so.mix(a, b)];
  },

  setLightbox: function( f, a ){

    var x = { //field properties
      xtype:'textfield',
      width:100
    };

    var b = { //button properties
      xtype: 'button',
      text: 'all >',
      handler: function(){
          
          so.rest.getLightbox({ 
              field: f.id, //id must match DB name
              title: f.fieldLabel.replace(':',''),
              sni_multi: f.sni_multi,
              menuOff: f.menuOff
          });
      }
    };

    return [ so.mix( f, x ), so.mix( a, b ) ];
  },

  //set combo configuration
  setCombo: function(f){

   return so.mix(f, { 
          width:100,
          store:{
             fields: ['value', 'label'],
             data : [['','']]
          },
          valueField:'value',
          displayField:'label',
          mode: 'local',
          emptyText:'Select ...',
          listeners:{
                    select:function (combo, record, index){//runs when value is selected
                   
                      so.rest.handleCombo( f.id, combo );
                    },
                    expand:function( combo ){//runs when combo is clicked
                      console.log('clicked ...');
                      so.rest.getCombo( f.id, combo );
                    }
          }
      });
  },

  setCheckBox: function(f){

    return so.mix(f, {
          // Put all controls in a single column with width 100%
          columns: 1
    });
  },

  setRadio: function(f){

    return so.mix(f, {
          // Put all controls in a single column with width 100%
          columns: 1
    });
  },

  setSlider: function(f){

    if (!f.tooltip){
      f.tooltip = function(thumb){
          var c = thumb.slider.restData.nameValueMap[thumb.value] ? thumb.slider.restData.nameValueMap[thumb.value] : 0;
          return String.format('<b>{0} ({1})</b>', thumb.value, c);
      };
    }
    return so.mix(f, {
          width: 100,
          value: 1,
          increment: 1,
          minValue: 1,
          maxValue: 5,

          listeners:{
            render:function( slider ){
              so.rest.getSlider({
                field:f.id,
                slider:slider
              });
            },

            dragend: function( slider ){
              so.rest.handleSlider(f.id, slider);
            }
          },
          plugins : new CQ.Ext.slider.Tip({
                    getText: f.tooltip
            })
    });
  },

  setSpinner: function(f){

    return so.mix(f, {
          minValue: 0,
          maxValue: 1000000,
          incrementValue: 1
    });
  }
};
})(so);
