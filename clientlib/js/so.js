(function(so){

		//******* CORE UTILITIES **************

		  so.trim = function(v){
		    return v.replace(/^\s*/,'').replace(/\s*$/,'');
		  };

		  so.mix = function(s, t){
		    var p;
		    for (p in s){
	          if (s.hasOwnProperty(p)){
	              t[p] = s[p];
	          }
		    }
		    return t;
		  };

		  so.isEmpty = function(o){
		    for(var k in o){
		      if(o.hasOwnProperty(k)){
		        return false;
		      }
		    }
		    return true;
		  };

		  so.each = function( o, handler){
		  	var b = [], f;
	        for (f in o){
	            b.push(handler( o[f] )); 
	        }
	        return b;
	      };

	      so.hasClass = function(c, e){
		      var x = e.getAttribute('class');
		      var re = new RegExp(c, "i");
		      return re.test(x);
		  };

		  so.addClass = function(c, e){ 
		  	  if (c){
				  var x = e.getAttribute('class');
		          e.setAttribute('class', x + ' ' + c);
		  	  }
		  };

		  so.removeClass = function(c, e){
		      var x = e.getAttribute('class');
		      x = so.trim(x.replace(c, ''));
		      e.setAttribute('class', x);
		  };

		  so.addStyle = function(s, e){
		      if (s){
		          for (var x in s){
		              e.style[x] = s[x];
		          }

		      }
		  };

		  //************* MISCELLANEOUS HELPERS *****************

		  so.isReset = false;

		  so.reset = function( field ){
		    var o = CQ.Ext.getCmp(field);
		    //extjs will fire a check event several times for checkboxes, since a checkbox may be multi-value.
		    //site optimizer will fire an ajax transaction everytime a check event is fired.
		    //we need the so.isReset flag to advice SO if extjs is resetting a checkbox in which case the ajax transaction is aborted.
		    so.isReset = true;
		    o.reset();
		    so.isReset = false;
		  };

		  //fix sectionsince sni-selection is fixed position
		  so.fixTopMargin = function(){
		    //document.getElementById('sni-global').style.marginTop = document.getElementById('sni-selection').offsetHeight + 'px';
		  };

		  so.getSelectedRatings = function(){
		    var a = CQ.Ext.getCmp('rating').getValue();
		    var b = [];
		    $CQ.each(a, function(i, e){
		      b.push( e.boxLabel );
		    });
		    return b;
		  };

		  //originally used for review count and cook time.
		  so.getSelectedRange = function( field, cmp ){
		    var cmpMin = CQ.Ext.getCmp(field+'_min');
		    var cmpMax = CQ.Ext.getCmp(field+'_max');
		    var v1 = cmpMin.getValue().split('||')[0];
		    var v2 = cmpMax.getValue().split('||')[0];
		    if ( !v1 ){ return [v2, v2]; }
		    if ( !v2 ){ return [v1, v1]; }
		    return [v1,v2];
		  };

		  so.format = function( data ){
		    return data >= 1000000 ? Math.round( data/1000000 ) + 'mm' : data >= 1000 ? Math.round( data/1000 ) + 'k' : data;
		  };

		  so.filter = function( data ){
       		 //then returns <text> after last / or :
        	return data && data.match( /[^\/\:]+$/ )+"" || '';
    	  };

		  so.getLabel = function( data ){
		  	data = !data ? [] : [].concat( data ); //normalize
		    var i, b = [];
		    for( i=0; i<data.length; i++ ){
		        b.push( so.filter( data[i] ) );
		    }
		    return b.join(',');
		  };

		  so.isIE8 = function(){
		  	return $CQ.browser.msie && parseInt( $CQ.browser.version, 10 ) < 9;
		  };
  
    
    //////////// GLOBAL FUNCTIONS ( SHARED BETWEEN DASHBOARD AND RESULT IFRAMES ) ////////////////////////////

	if (!so.g){ //this will be true only if so is created outside the context of an iframe
		so.g = {
		    addedExpressions:{},
		    currentExpressions:{},
		    getDashboard:function(){
		      //if true we r in result page then dashboard is null.
		      //otherwise we r in dashboard page then we return contentWindow to access window like an iframe
		      //since other functions assume they are running inside iframe
		      return so.result ? null : { contentWindow:window };
		    },
		    getResult:function(){
		      //if true we r in result page then we return contentWindow to access window like an iframe
		      //since other functions assume they are running inside iframe
		      //otherwise we r in dashboard page and result is null
		      return so.result ? { contentWindow:window } : null;
		    },
		    showResult:function(){
		    	if (!so.isEmpty(so.g.currentExpressions)){
		    		location = 'sni-site-optimizer.result.html?'+encodeURI(JSON.stringify( {"currentExpressions":so.g.currentExpressions}));      
		    	}else{
		    		location = 'sni-site-optimizer.result.html';
		    	}
		    },
		    showDashboard:function(){
		    	if (!so.isEmpty(so.g.currentExpressions)){
		      		location = 'sni-site-optimizer.dashboard.html?'+encodeURI(JSON.stringify({"currentExpressions":so.g.currentExpressions}));
		      	}else{
		      		location = 'sni-site-optimizer.dashboard.html';
		      	}
		    },
		    newDashboard:function(){
		       location = '/apps/wcm/core/content/sni-site-optimizer.dashboard.html';
		    }
	  	};
	}

	///////////// DATE FORMATTER ///////////////////////////////
    // http://www.codeproject.com/Articles/11011/JavaScript-Date-Format
	function dth(d){
		if ( d === 1 ) return '1st';
		if ( d === 21 ) return '21st';
		if ( d === 31 ) return '31st';
		if ( d === 2 ) return '2nd';
		if ( d === 22 ) return '22nd';
		return d+'th';
	}

	// a global month names array
	var gsMonthNames = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
	];

	// a global day names array
	var gsDayNames = [
	'Sun',
	'Mon',
	'Tue',
	'Wed',
	'Thu',
	'Fri',
	'Sat'
	];

	// VB-like string replicator 
	String.prototype.times = function(n)
	{
		var s = '';
		for (var i = 0; i < n; i++)
			s += this;

		return s;
	};

	// Zero-Padding
	String.prototype.zf = function(n) { return '0'.times(n - this.length) + this; };

	// string functions that we want to apply directly to numbers...
	Number.prototype.zf = function(n) { return this.toString().zf(n); };

	// the date format prototype
	Date.prototype.format = function(f)
	{
	    if (!this.valueOf())
	        return '&nbsp;';

	    var d = this;

	    return f.replace(/(yyyy|mmmm|mmm|mm|dddd|ddd|dd|dth|hh|nn|ss|a\/p)/gi,
	        function($1)
	        {
                var h;
	            switch ($1.toLowerCase())
	            {
	            case 'yyyy': return d.getFullYear();
	            case 'mmmm': return gsMonthNames[d.getMonth()];
	            case 'mmm':  return gsMonthNames[d.getMonth()].substr(0, 3);
	            case 'mm':   return (d.getMonth() + 1).zf(2);
	            case 'dddd': return gsDayNames[d.getDay()];
	            case 'ddd':  return gsDayNames[d.getDay()].substr(0, 3);
	            case 'dth':  return dth(d.getDate());
	            case 'dd':   return d.getDate().zf(2);
	            case 'hh':   return ((h = d.getHours() % 12) ? h : 12).zf(2);
	            case 'nn':   return d.getMinutes().zf(2);
	            case 'ss':   return d.getSeconds().zf(2);
	            case 'a/p':  return d.getHours() < 12 ? 'am' : 'pm';
	            }
	        }
	    );
	}
})(so);