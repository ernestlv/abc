/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
CQ.Ext.ns('CQ.Ext.ux.form');

/**
 * @class CQ.Ext.ux.form.SpinnerField
 * @extends CQ.Ext.form.NumberField
 * Creates a field utilizing CQ.Ext.ux.Spinner
 * @xtype spinnerfield
 */
CQ.Ext.ux.form.SpinnerField = CQ.Ext.extend(CQ.Ext.form.NumberField, {
    actionMode: 'wrap',
    deferHeight: true,
    autoSize: CQ.Ext.emptyFn,
    onBlur: CQ.Ext.emptyFn,
    adjustSize: CQ.Ext.BoxComponent.prototype.adjustSize,

    constructor: function(config) {
        var spinnerConfig = CQ.Ext.copyTo({}, config, 'incrementValue,alternateIncrementValue,accelerate,defaultValue,triggerClass,splitterClass');

        var spl = this.spinner = new CQ.Ext.ux.Spinner(spinnerConfig);

        var plugins = config.plugins
            ? (CQ.Ext.isArray(config.plugins)
                ? config.plugins.push(spl)
                : [config.plugins, spl])
            : spl;

        CQ.Ext.ux.form.SpinnerField.superclass.constructor.call(this, CQ.Ext.apply(config, {plugins: plugins}));
    },

    // private
    getResizeEl: function(){
        return this.wrap;
    },

    // private
    getPositionEl: function(){
        return this.wrap;
    },

    // private
    alignErrorIcon: function(){
        if (this.wrap) {
            this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
        }
    },

    validateBlur: function(){
        return true;
    }
});

CQ.Ext.reg('spinnerfield', CQ.Ext.ux.form.SpinnerField);

//backwards compat
CQ.Ext.form.SpinnerField = CQ.Ext.ux.form.SpinnerField;
