(function(){
	if (!so.g){ //this will be true only if so is created outside the context of an iframe
		so.g = {
		    addedExpressions:{},
		    currentExpressions:{},
		    getDashboard:function(){
		      return null;
		    },
		    getResult:function(){
		      return null;
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