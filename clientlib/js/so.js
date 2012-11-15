(function(){
	if (!so.g){ //this will be true only if so is created outside the context of an iframe
		so.g = {
		    addedExpressions:{},
		    currentExpressions:{},
		    getDashboard:function(){
		      //if true we r in result page then dashboard is null.
		      //otherwise we return contentWindow to access window like an iframe
		      //since other functions assume they are running inside iframe
		      return so.whenDisplay ? null : { contentWindow:window };
		    },
		    getResult:function(){
		      //if true we r in result page. we return contentWindow to access window like an iframe
		      //since other functions assume they are running inside iframe
		      return so.whenDisplay ? { contentWindow:window } : null;
		    },
		    showResult:function(){
		      location = 'sni-site-optimizer.result.html?'+encodeURI(JSON.stringify(so.g.currentExpressions));      
		    },
		    showDashboard:function(){
		      location = 'sni-site-optimizer.dashboard.html?'+encodeURI(JSON.stringify(so.g.currentExpressions));
		    },
		    newDashboard:function(){
		       location = '/apps/wcm/core/content/sni-site-optimizer.dashboard.html';
		    }
	  	};
	}
})();