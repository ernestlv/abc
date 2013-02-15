(function(so){
stringify = function( obj ){
        var s = JSON.stringify( obj );
        //filters
        s = s.replace(/"&oslash;"|"null"/gi, null); //cooking-5318
        //s = s.replace(/"field":"url"/gi, '"field":"current_url"');
        return s;
};

so.rest = {

        requestField: function( field, handler ){
                
                var requestObj = {
                   "currentFilters":{
                      "type":"filters",
                      "expressions":so.selection.get( so.g.currentExpressions )
                   },

                   "filterFieldName":field
                };
                                
                var data= stringify(requestObj);

                console.log('ajax request /imp/report/field: '+data);
 
                $CQ.ajax({
                        url:'/imp/report/field',
                        dataType: 'json', 
                        cache:false,
                        data: data,
                        success: handler,
                        error: function(){
                          //handler({"type":"choices","title":"content_tag1","nameValueMap":[{"type":"choice","label":"adobo","value":"cook-tags:dish/adobo","count":1},{"type":"choice","label":"african","value":"cook-tags:cuisine/african","count":1},{"type":"choice","label":"american","value":"cook-tags:cuisine/american","count":5},{"type":"choice","label":"anchovy","value":"cook-tags:main-ingredient/fish/anchovy","count":1},{"type":"choice","label":"andouille","value":"cook-tags:main-ingredient/sausage/andouille","count":1},{"type":"choice","label":"anise","value":"cook-tags:herbs-spices/anise","count":1},{"type":"choice","label":"appetizer","value":"cook-tags:meal-part/appetizer","count":2},{"type":"choice","label":"apple","value":"cook-tags:main-ingredient/fruit/apple","count":2},{"type":"choice","label":"apricot","value":"cook-tags:main-ingredient/fruit/apricot","count":1},{"type":"choice","label":"argentinean","value":"cook-tags:cuisine/latin-american/argentinean","count":1},{"type":"choice","label":"artichoke","value":"cook-tags:main-ingredient/vegetables/artichoke","count":1},{"type":"choice","label":"arugula","value":"cook-tags:main-ingredient/vegetables/arugula","count":1},{"type":"choice","label":"asian","value":"cook-tags:cuisine/asian","count":2},{"type":"choice","label":"asparagus","value":"cook-tags:main-ingredient/vegetables/asparagus","count":1},{"type":"choice","label":"avocado","value":"cook-tags:main-ingredient/vegetables/avocado","count":1},{"type":"choice","label":"bacon","value":"cook-tags:main-ingredient/meat/bacon","count":1},{"type":"choice","label":"baked","value":"cook-tags:technique/baked","count":1},{"type":"choice","label":"baked-beans","value":"cook-tags:dish/baked-beans","count":1},{"type":"choice","label":"baking","value":"cook-tags:technique/baking","count":3},{"type":"choice","label":"banana","value":"cook-tags:main-ingredient/fruit/banana","count":1},{"type":"choice","label":"barbecue","value":"cook-tags:dish/barbecue","count":4},{"type":"choice","label":"barbecuing","value":"cook-tags:technique/barbecuing","count":2},{"type":"choice","label":"basil","value":"cook-tags:herbs-spices/basil","count":1},{"type":"choice","label":"bass","value":"cook-tags:main-ingredient/fish/bass","count":1},{"type":"choice","label":"beans-and-legumes","value":"cook-tags:main-ingredient/beans-and-legumes","count":1},{"type":"choice","label":"beef","value":"cook-tags:main-ingredient/meat/beef","count":2},{"type":"choice","label":"beer","value":"cook-tags:main-ingredient/alcohol/beer","count":2},{"type":"choice","label":"beets","value":"cook-tags:main-ingredient/vegetables/beets","count":1},{"type":"choice","label":"bell-pepper","value":"cook-tags:main-ingredient/vegetables/bell-pepper","count":1},{"type":"choice","label":"berries","value":"cook-tags:main-ingredient/fruit/berries","count":1},{"type":"choice","label":"birthday-party","value":"cook-tags:occasions/party/birthday-party","count":1},{"type":"choice","label":"biscuit","value":"cook-tags:dish/biscuit","count":1},{"type":"choice","label":"black-bean","value":"cook-tags:main-ingredient/beans-and-legumes/black-bean","count":1},{"type":"choice","label":"black-eyed-pea","value":"cook-tags:main-ingredient/beans-and-legumes/black-eyed-pea","count":1},{"type":"choice","label":"blackberry","value":"cook-tags:main-ingredient/fruit/blackberry","count":1},{"type":"choice","label":"blanching","value":"cook-tags:technique/blanching","count":1},{"type":"choice","label":"blue-cheese","value":"cook-tags:main-ingredient/cheese/blue-cheese","count":1},{"type":"choice","label":"blueberry","value":"cook-tags:main-ingredient/fruit/blueberry","count":1},{"type":"choice","label":"braising","value":"cook-tags:technique/braising","count":2},{"type":"choice","label":"brandy","value":"cook-tags:main-ingredient/alcohol/brandy","count":1},{"type":"choice","label":"brazilian","value":"cook-tags:cuisine/latin-american/brazilian","count":1},{"type":"choice","label":"bread","value":"cook-tags:main-ingredient/bread","count":1},{"type":"choice","label":"bread-dishes","value":"cook-tags:dish/bread-dishes","count":1},{"type":"choice","label":"bread-pudding","value":"cook-tags:dish/bread-pudding","count":1},{"type":"choice","label":"breakfast","value":"cook-tags:meal-type/breakfast","count":1},{"type":"choice","label":"brie","value":"cook-tags:main-ingredient/cheese/brie","count":1},{"type":"choice","label":"brisket","value":"cook-tags:dish/brisket","count":1},{"type":"choice","label":"british","value":"cook-tags:cuisine/european/british","count":2},{"type":"choice","label":"broccoli","value":"cook-tags:main-ingredient/vegetables/broccoli","count":1},{"type":"choice","label":"broiling","value":"cook-tags:technique/broiling","count":1},{"type":"choice","label":"brownie","value":"cook-tags:dish/brownie","count":1},{"type":"choice","label":"brunch","value":"cook-tags:meal-type/brunch","count":3},{"type":"choice","label":"bruschetta","value":"cook-tags:dish/bruschetta","count":1},{"type":"choice","label":"brussels-sprout","value":"cook-tags:main-ingredient/vegetables/brussels-sprout","count":1},{"type":"choice","label":"buckwheat","value":"cook-tags:main-ingredient/flour/buckwheat","count":1},{"type":"choice","label":"budget-friendly","value":"cook-tags:cooking-styles/budget-friendly","count":1},{"type":"choice","label":"burgers","value":"cook-tags:dish/burgers","count":4},{"type":"choice","label":"buttermilk","value":"cook-tags:main-ingredient/dairy/buttermilk","count":1},{"type":"choice","label":"butternut-squash","value":"cook-tags:main-ingredient/vegetables/butternut-squash","count":2},{"type":"choice","label":"cabbage","value":"cook-tags:main-ingredient/vegetables/cabbage","count":1},{"type":"choice","label":"cajun","value":"cook-tags:cuisine/american/cajun","count":1},{"type":"choice","label":"cake","value":"cook-tags:dish/cake","count":2},{"type":"choice","label":"candy","value":"cook-tags:dish/candy","count":1},{"type":"choice","label":"cantaloupe","value":"cook-tags:main-ingredient/fruit/cantaloupe","count":1},{"type":"choice","label":"caramelizing","value":"cook-tags:technique/caramelizing","count":1},{"type":"choice","label":"caribbean","value":"cook-tags:cuisine/caribbean","count":1},{"type":"choice","label":"carrot","value":"cook-tags:main-ingredient/vegetables/carrot","count":1},{"type":"choice","label":"casserole","value":"cook-tags:dish/casserole","count":1},{"type":"choice","label":"cast-iron","value":"cook-tags:cookware-cooking-gadgets/cast-iron","count":1},{"type":"choice","label":"catfish","value":"cook-tags:main-ingredient/fish/catfish","count":1},{"type":"choice","label":"cauliflower","value":"cook-tags:main-ingredient/vegetables/cauliflower","count":1},{"type":"choice","label":"caviar","value":"cook-tags:main-ingredient/fish/caviar","count":1},{"type":"choice","label":"celery","value":"cook-tags:main-ingredient/vegetables/celery","count":1},{"type":"choice","label":"central-american","value":"cook-tags:cuisine/latin-american/central-american","count":1},{"type":"choice","label":"cheddar","value":"cook-tags:main-ingredient/cheese/cheddar","count":1},{"type":"choice","label":"cheese","value":"cook-tags:main-ingredient/cheese","count":1},{"type":"choice","label":"cheesecake","value":"cook-tags:dish/cheesecake","count":2},{"type":"choice","label":"cherry","value":"cook-tags:main-ingredient/fruit/cherry","count":1},{"type":"choice","label":"chicken","value":"cook-tags:main-ingredient/poultry/chicken","count":6},{"type":"choice","label":"chickpea","value":"cook-tags:main-ingredient/beans-and-legumes/chickpea","count":1},{"type":"choice","label":"chile-pepper","value":"cook-tags:main-ingredient/vegetables/chile-pepper","count":2},{"type":"choice","label":"chili","value":"cook-tags:dish/chili","count":1},{"type":"choice","label":"chinese","value":"cook-tags:cuisine/asian/chinese","count":2},{"type":"choice","label":"chipotle","value":"cook-tags:herbs-spices/chipotle","count":1},{"type":"choice","label":"chips","value":"cook-tags:dish/chips","count":1},{"type":"choice","label":"chives","value":"cook-tags:herbs-spices/chives","count":1},{"type":"choice","label":"chocolate","value":"cook-tags:main-ingredient/chocolate","count":3},{"type":"choice","label":"chorizo","value":"cook-tags:main-ingredient/sausage/chorizo","count":1},{"type":"choice","label":"chowder","value":"cook-tags:dish/chowder","count":1},{"type":"choice","label":"christmas","value":"cook-tags:occasions/holiday/christmas","count":7},{"type":"choice","label":"cilantro","value":"cook-tags:herbs-spices/cilantro","count":1},{"type":"choice","label":"cinco-de-mayo","value":"cook-tags:occasions/holiday/cinco-de-mayo","count":1},{"type":"choice","label":"cinnamon","value":"cook-tags:herbs-spices/cinnamon","count":1},{"type":"choice","label":"clam","value":"cook-tags:main-ingredient/shellfish/clam","count":1},{"type":"choice","label":"cobbler","value":"cook-tags:dish/cobbler","count":1},{"type":"choice","label":"cocktail-party","value":"cook-tags:occasions/party/cocktail-party","count":1},{"type":"choice","label":"coconut","value":"cook-tags:main-ingredient/fruit/coconut","count":1},{"type":"choice","label":"cod","value":"cook-tags:main-ingredient/fish/cod","count":1},{"type":"choice","label":"coffee-drinks","value":"cook-tags:drinks/coffee-drinks","count":2},{"type":"choice","label":"collard-greens","value":"cook-tags:main-ingredient/vegetables/collard-greens","count":1},{"type":"choice","label":"comfort-food","value":"cook-tags:cooking-styles/comfort-food","count":7},{"type":"choice","label":"content-tag1","value":"content-tag1","count":1},{"type":"choice","label":"content-tag1","value":"cook-tags:test/content-tag1","count":1},{"type":"choice","label":"cookie","value":"cook-tags:dish/cookie","count":11},{"type":"choice","label":"corn","value":"cook-tags:main-ingredient/vegetables/corn","count":1},{"type":"choice","label":"cornbread","value":"cook-tags:dish/cornbread","count":1},{"type":"choice","label":"cornmeal","value":"cook-tags:main-ingredient/grains/cornmeal","count":1},{"type":"choice","label":"couscous","value":"cook-tags:main-ingredient/pasta/couscous","count":1},{"type":"choice","label":"crab","value":"cook-tags:main-ingredient/shellfish/crab","count":1},{"type":"choice","label":"crab-cake","value":"cook-tags:dish/crab-cake","count":1},{"type":"choice","label":"cranberry","value":"cook-tags:main-ingredient/fruit/cranberry","count":2},{"type":"choice","label":"crawfish","value":"cook-tags:main-ingredient/shellfish/crawfish","count":1},{"type":"choice","label":"cream-cheese","value":"cook-tags:main-ingredient/cheese/cream-cheese","count":1},{"type":"choice","label":"cream-pie","value":"cook-tags:dish/cream-pie","count":1},{"type":"choice","label":"crepe","value":"cook-tags:dish/crepe","count":1},{"type":"choice","label":"crispy","value":"cook-tags:taste/crispy","count":1},{"type":"choice","label":"cuban","value":"cook-tags:cuisine/caribbean/cuban","count":1},{"type":"choice","label":"cucumber","value":"cook-tags:main-ingredient/vegetables/cucumber","count":2},{"type":"choice","label":"cupcake","value":"cook-tags:dish/cupcake","count":2},{"type":"choice","label":"custard","value":"cook-tags:dish/custard","count":2},{"type":"choice","label":"dairy","value":"cook-tags:main-ingredient/dairy","count":2},{"type":"choice","label":"dessert","value":"cook-tags:meal-part/dessert","count":8},{"type":"choice","label":"diabetic","value":"cook-tags:nutrition/diabetic","count":1},{"type":"choice","label":"dill","value":"cook-tags:herbs-spices/dill","count":1},{"type":"choice","label":"dinner","value":"cook-tags:meal-type/dinner","count":2},{"type":"choice","label":"dinner-party","value":"cook-tags:occasions/party/dinner-party","count":1},{"type":"choice","label":"dip","value":"cook-tags:dish/dip","count":2},{"type":"choice","label":"doughnuts","value":"cook-tags:dish/doughnuts","count":1},{"type":"choice","label":"dried-fruit","value":"cook-tags:main-ingredient/fruit/dried-fruit","count":1},{"type":"choice","label":"drinks","value":"cook-tags:drinks","count":6},{"type":"choice","label":"duck","value":"cook-tags:main-ingredient/poultry/duck","count":1},{"type":"choice","label":"dumpling","value":"cook-tags:dish/dumpling","count":1},{"type":"choice","label":"dutch-oven","value":"cook-tags:cookware-cooking-gadgets/dutch-oven","count":1},{"type":"choice","label":"easter","value":"cook-tags:occasions/holiday/easter","count":4},{"type":"choice","label":"edamame","value":"cook-tags:main-ingredient/beans-and-legumes/edamame","count":1},{"type":"choice","label":"eggplant","value":"cook-tags:main-ingredient/vegetables/eggplant","count":1},{"type":"choice","label":"eggs","value":"cook-tags:main-ingredient/eggs","count":9},{"type":"choice","label":"enchilada","value":"cook-tags:dish/enchilada","count":1},{"type":"choice","label":"european","value":"cook-tags:cuisine/european","count":2},{"type":"choice","label":"fall","value":"cook-tags:season/fall","count":4},{"type":"choice","label":"fathers-day","value":"cook-tags:occasions/holiday/fathers-day","count":1},{"type":"choice","label":"fennel","value":"cook-tags:main-ingredient/vegetables/fennel","count":1},{"type":"choice","label":"feta","value":"cook-tags:main-ingredient/cheese/feta","count":1},{"type":"choice","label":"fig","value":"cook-tags:main-ingredient/fruit/fig","count":1},{"type":"choice","label":"fish","value":"cook-tags:main-ingredient/fish","count":2},{"type":"choice","label":"flour","value":"cook-tags:main-ingredient/flour","count":2},{"type":"choice","label":"focaccia","value":"cook-tags:dish/focaccia","count":1},{"type":"choice","label":"fondue","value":"cook-tags:dish/fondue","count":1},{"type":"choice","label":"food-processor","value":"cook-tags:cookware-cooking-gadgets/food-processor","count":1},{"type":"choice","label":"for-a-crowd","value":"cook-tags:whos-dining/for-a-crowd","count":2},{"type":"choice","label":"for-a-family","value":"cook-tags:whos-dining/for-a-family","count":1},{"type":"choice","label":"for-kids","value":"cook-tags:whos-dining/for-kids","count":1},{"type":"choice","label":"for-one","value":"cook-tags:whos-dining/for-one","count":1},{"type":"choice","label":"for-two","value":"cook-tags:whos-dining/for-two","count":1},{"type":"choice","label":"french","value":"cook-tags:cuisine/european/french","count":4},{"type":"choice","label":"french-toast","value":"cook-tags:dish/french-toast","count":1},{"type":"choice","label":"fries","value":"cook-tags:dish/fries","count":1},{"type":"choice","label":"frittata","value":"cook-tags:dish/frittata","count":1},{"type":"choice","label":"frosting","value":"cook-tags:dish/frosting","count":1},{"type":"choice","label":"frozen-drinks","value":"cook-tags:drinks/frozen-drinks","count":1},{"type":"choice","label":"fruit","value":"cook-tags:main-ingredient/fruit","count":2},{"type":"choice","label":"fruity","value":"cook-tags:taste/fruity","count":1},{"type":"choice","label":"frying","value":"cook-tags:technique/frying","count":2},{"type":"choice","label":"fudge","value":"cook-tags:dish/fudge","count":1},{"type":"choice","label":"game","value":"cook-tags:main-ingredient/game","count":1},{"type":"choice","label":"garlic","value":"cook-tags:herbs-spices/garlic","count":2},{"type":"choice","label":"german","value":"cook-tags:cuisine/european/german","count":2},{"type":"choice","label":"gift","value":"cook-tags:general-subjects/gift","count":1},{"type":"choice","label":"gin","value":"cook-tags:main-ingredient/alcohol/gin","count":1},{"type":"choice","label":"ginger","value":"cook-tags:herbs-spices/ginger","count":1},{"type":"choice","label":"gnocchi","value":"cook-tags:dish/gnocchi","count":1},{"type":"choice","label":"goose","value":"cook-tags:main-ingredient/poultry/goose","count":1},{"type":"choice","label":"gouda","value":"cook-tags:main-ingredient/cheese/gouda","count":1},{"type":"choice","label":"grains","value":"cook-tags:main-ingredient/grains","count":1},{"type":"choice","label":"grapefruit","value":"cook-tags:main-ingredient/fruit/grapefruit","count":1},{"type":"choice","label":"grapes","value":"cook-tags:main-ingredient/fruit/grapes","count":1},{"type":"choice","label":"gratin","value":"cook-tags:dish/gratin","count":1},{"type":"choice","label":"greek","value":"cook-tags:cuisine/middle-eastern/greek","count":1},{"type":"choice","label":"green-bean","value":"cook-tags:main-ingredient/beans-and-legumes/green-bean","count":2},{"type":"choice","label":"grilling","value":"cook-tags:technique/grilling","count":10},{"type":"choice","label":"grits","value":"cook-tags:main-ingredient/grains/grits","count":1},{"type":"choice","label":"ground-beef","value":"cook-tags:main-ingredient/meat/ground-beef","count":1},{"type":"choice","label":"grouper","value":"cook-tags:main-ingredient/fish/grouper","count":1},{"type":"choice","label":"gruyere","value":"cook-tags:main-ingredient/cheese/gruyere","count":1},{"type":"choice","label":"guacamole","value":"cook-tags:dish/guacamole","count":1},{"type":"choice","label":"guava","value":"cook-tags:main-ingredient/fruit/guava","count":1},{"type":"choice","label":"guide","value":"cook-tags:general-subjects/guide","count":22},{"type":"choice","label":"gumbo","value":"cook-tags:dish/gumbo","count":1},{"type":"choice","label":"halibut","value":"cook-tags:main-ingredient/fish/halibut","count":1},{"type":"choice","label":"halloween","value":"cook-tags:occasions/holiday/halloween","count":11},{"type":"choice","label":"ham","value":"cook-tags:main-ingredient/meat/ham","count":1},{"type":"choice","label":"hanukkah","value":"cook-tags:occasions/holiday/hanukkah","count":3},{"type":"choice","label":"hawaiian","value":"cook-tags:cuisine/american/hawaiian","count":1},{"type":"choice","label":"healthy","value":"cook-tags:cooking-styles/healthy","count":20},{"type":"choice","label":"heart-healthy","value":"cook-tags:nutrition/heart-healthy","count":1},{"type":"choice","label":"herbs-and-spices","value":"cook-tags:herbs-and-spices","count":7},{"type":"choice","label":"holiday","value":"cook-tags:occasions/holiday","count":7},{"type":"choice","label":"homemade-ice-cream","value":"cook-tags:dish/homemade-ice-cream","count":1},{"type":"choice","label":"honeydew","value":"cook-tags:main-ingredient/fruit/honeydew","count":1},{"type":"choice","label":"horseradish","value":"cook-tags:herbs-spices/horseradish","count":1},{"type":"choice","label":"hot-dog","value":"cook-tags:dish/hot-dog","count":1},{"type":"choice","label":"ice-cream","value":"cook-tags:main-ingredient/dairy/ice-cream","count":2},{"type":"choice","label":"indian","value":"cook-tags:cuisine/asian/indian","count":1},{"type":"choice","label":"irish","value":"cook-tags:cuisine/european/irish","count":2},{"type":"choice","label":"italian","value":"cook-tags:cuisine/european/italian","count":12},{"type":"choice","label":"jalapeno","value":"cook-tags:main-ingredient/vegetables/jalapeno","count":1},{"type":"choice","label":"jambalaya","value":"cook-tags:dish/jambalaya","count":1},{"type":"choice","label":"japanese","value":"cook-tags:cuisine/asian/japanese","count":1},{"type":"choice","label":"jicama","value":"cook-tags:main-ingredient/vegetables/jicama","count":1},{"type":"choice","label":"kabob","value":"cook-tags:dish/kabob","count":1},{"type":"choice","label":"kielbasa","value":"cook-tags:main-ingredient/sausage/kielbasa","count":1},{"type":"choice","label":"kiwi","value":"cook-tags:main-ingredient/fruit/kiwi","count":1},{"type":"choice","label":"knife","value":"cook-tags:cookware-cooking-gadgets/knife","count":3},{"type":"choice","label":"korean","value":"cook-tags:cuisine/asian/korean","count":2},{"type":"choice","label":"kwanzaa","value":"cook-tags:occasions/holiday/kwanzaa","count":1},{"type":"choice","label":"labor-day","value":"cook-tags:occasions/holiday/labor-day","count":1},{"type":"choice","label":"lamb","value":"cook-tags:main-ingredient/meat/lamb","count":1},{"type":"choice","label":"lasagna","value":"cook-tags:dish/lasagna","count":1},{"type":"choice","label":"latin-american","value":"cook-tags:cuisine/latin-american","count":2},{"type":"choice","label":"leek","value":"cook-tags:main-ingredient/vegetables/leek","count":2},{"type":"choice","label":"lemon","value":"cook-tags:main-ingredient/fruit/lemon","count":1},{"type":"choice","label":"lemonade","value":"cook-tags:drinks/lemonade","count":1},{"type":"choice","label":"lemongrass","value":"cook-tags:herbs-spices/lemongrass","count":1},{"type":"choice","label":"lentil","value":"cook-tags:main-ingredient/beans-and-legumes/lentil","count":1},{"type":"choice","label":"lettuce","value":"cook-tags:main-ingredient/vegetables/lettuce","count":1},{"type":"choice","label":"lima-bean","value":"cook-tags:main-ingredient/beans-and-legumes/lima-bean","count":1},{"type":"choice","label":"lime","value":"cook-tags:main-ingredient/fruit/lime","count":2},{"type":"choice","label":"liqueur","value":"cook-tags:main-ingredient/alcohol/liqueur","count":1},{"type":"choice","label":"liquor","value":"cook-tags:main-ingredient/alcohol/liquor","count":1},{"type":"choice","label":"lobster","value":"cook-tags:main-ingredient/shellfish/lobster","count":3},{"type":"choice","label":"low-calorie","value":"cook-tags:nutrition/low-calorie","count":3},{"type":"choice","label":"low-cholesterol","value":"cook-tags:nutrition/low-cholesterol","count":1},{"type":"choice","label":"low-fat","value":"cook-tags:nutrition/low-fat","count":1},{"type":"choice","label":"lunch","value":"cook-tags:meal-type/lunch","count":2},{"type":"choice","label":"macaroni-and-cheese","value":"cook-tags:dish/macaroni-and-cheese","count":2},{"type":"choice","label":"mahi-mahi","value":"cook-tags:main-ingredient/fish/mahi-mahi","count":1},{"type":"choice","label":"main-dish","value":"cook-tags:meal-part/main-dish","count":3},{"type":"choice","label":"make-ahead","value":"cook-tags:cooking-styles/make-ahead","count":2},{"type":"choice","label":"mango","value":"cook-tags:main-ingredient/fruit/mango","count":1},{"type":"choice","label":"mardi-gras","value":"cook-tags:occasions/holiday/mardi-gras","count":1},{"type":"choice","label":"margarita","value":"cook-tags:drinks/mixed-drinks/margarita","count":2},{"type":"choice","label":"marinade","value":"cook-tags:dish/marinade","count":1},{"type":"choice","label":"marinating","value":"cook-tags:technique/marinating","count":1},{"type":"choice","label":"martini","value":"cook-tags:drinks/mixed-drinks/martini","count":1},{"type":"choice","label":"meat","value":"cook-tags:main-ingredient/meat","count":3},{"type":"choice","label":"meatballs","value":"cook-tags:dish/meatballs","count":1},{"type":"choice","label":"meatloaf","value":"cook-tags:dish/meatloaf","count":1},{"type":"choice","label":"melon","value":"cook-tags:main-ingredient/fruit/melon","count":1},{"type":"choice","label":"memorial-day","value":"cook-tags:occasions/holiday/memorial-day","count":1},{"type":"choice","label":"mexican","value":"cook-tags:cuisine/latin-american/mexican","count":11},{"type":"choice","label":"middle-eastern","value":"cook-tags:cuisine/middle-eastern","count":1},{"type":"choice","label":"mint","value":"cook-tags:herbs-spices/mint","count":1},{"type":"choice","label":"mixed-drinks","value":"cook-tags:drinks/mixed-drinks","count":2},{"type":"choice","label":"mixer","value":"cook-tags:cookware-cooking-gadgets/mixer","count":2},{"type":"choice","label":"mojito","value":"cook-tags:drinks/mixed-drinks/mojito","count":1},{"type":"choice","label":"monterey-jack","value":"cook-tags:main-ingredient/cheese/monterey-jack","count":1},{"type":"choice","label":"mothers-day","value":"cook-tags:occasions/holiday/mothers-day","count":1},{"type":"choice","label":"mozzarella","value":"cook-tags:main-ingredient/cheese/mozzarella","count":1},{"type":"choice","label":"muffin","value":"cook-tags:dish/muffin","count":1},{"type":"choice","label":"mushroom","value":"cook-tags:main-ingredient/vegetables/mushroom","count":1},{"type":"choice","label":"mussel","value":"cook-tags:main-ingredient/shellfish/mussel","count":1},{"type":"choice","label":"new-year","value":"cook-tags:occasions/holiday/new-year","count":1},{"type":"choice","label":"no-cook","value":"cook-tags:cooking-styles/no-cook","count":1},{"type":"choice","label":"noodles","value":"cook-tags:main-ingredient/noodles","count":1},{"type":"choice","label":"northeastern","value":"cook-tags:cuisine/american/northeastern","count":1},{"type":"choice","label":"nuts","value":"cook-tags:main-ingredient/nuts","count":2},{"type":"choice","label":"oats","value":"cook-tags:main-ingredient/grains/oats","count":1},{"type":"choice","label":"okra","value":"cook-tags:main-ingredient/vegetables/okra","count":1},{"type":"choice","label":"olive","value":"cook-tags:main-ingredient/vegetables/olive","count":1},{"type":"choice","label":"omelet","value":"cook-tags:dish/omelet","count":1},{"type":"choice","label":"one-pot-meal","value":"cook-tags:cooking-styles/one-pot-meal","count":1},{"type":"choice","label":"onion","value":"cook-tags:main-ingredient/vegetables/onion","count":2},{"type":"choice","label":"oranges","value":"cook-tags:main-ingredient/fruit/oranges","count":1},{"type":"choice","label":"oregano","value":"cook-tags:herbs-spices/oregano","count":1},{"type":"choice","label":"outdoor-party","value":"cook-tags:occasions/party/outdoor-party","count":2},{"type":"choice","label":"oyster","value":"cook-tags:main-ingredient/shellfish/oyster","count":1},{"type":"choice","label":"paella","value":"cook-tags:dish/paella","count":1},{"type":"choice","label":"pancake","value":"cook-tags:dish/pancake","count":1},{"type":"choice","label":"papaya","value":"cook-tags:main-ingredient/fruit/papaya","count":1},{"type":"choice","label":"paprika","value":"cook-tags:herbs-spices/paprika","count":1},{"type":"choice","label":"parmesan-cheese","value":"cook-tags:main-ingredient/cheese/parmesan-cheese","count":1},{"type":"choice","label":"parsley","value":"cook-tags:herbs-spices/parsley","count":1},{"type":"choice","label":"party","value":"cook-tags:occasions/party","count":3},{"type":"choice","label":"passover","value":"cook-tags:occasions/holiday/passover","count":2},{"type":"choice","label":"pasta","value":"cook-tags:main-ingredient/pasta","count":1},{"type":"choice","label":"pastry","value":"cook-tags:dish/pastry","count":1},{"type":"choice","label":"peach","value":"cook-tags:main-ingredient/fruit/peach","count":1},{"type":"choice","label":"peanut-butter","value":"cook-tags:main-ingredient/peanut-butter","count":1},{"type":"choice","label":"pear","value":"cook-tags:main-ingredient/fruit/pear","count":1},{"type":"choice","label":"peas","value":"cook-tags:main-ingredient/beans-and-legumes/peas","count":1},{"type":"choice","label":"peruvian","value":"cook-tags:cuisine/latin-american/peruvian","count":1},{"type":"choice","label":"pesto","value":"cook-tags:dish/pesto","count":1},{"type":"choice","label":"pheasant","value":"cook-tags:main-ingredient/game/pheasant","count":1},{"type":"choice","label":"pickles","value":"cook-tags:dish/pickles","count":1},{"type":"choice","label":"picnic-salad","value":"cook-tags:dish/picnic-salad","count":2},{"type":"choice","label":"pie","value":"cook-tags:dish/pie","count":2},{"type":"choice","label":"pineapples","value":"cook-tags:main-ingredient/fruit/pineapples","count":1},{"type":"choice","label":"pizza","value":"cook-tags:dish/pizza","count":3},{"type":"choice","label":"pizza-dough","value":"cook-tags:dish/pizza-dough","count":1},{"type":"choice","label":"plantain","value":"cook-tags:main-ingredient/fruit/plantain","count":1},{"type":"choice","label":"plum","value":"cook-tags:main-ingredient/fruit/plum","count":1},{"type":"choice","label":"poaching","value":"cook-tags:technique/poaching","count":1},{"type":"choice","label":"polenta","value":"cook-tags:dish/polenta","count":1},{"type":"choice","label":"polish","value":"cook-tags:cuisine/european/polish","count":1},{"type":"choice","label":"pomegranate","value":"cook-tags:main-ingredient/fruit/pomegranate","count":1},{"type":"choice","label":"pork","value":"cook-tags:main-ingredient/meat/pork","count":3},{"type":"choice","label":"pork-chop","value":"cook-tags:dish/pork-chop","count":1},{"type":"choice","label":"portuguese","value":"cook-tags:cuisine/european/portuguese","count":1},{"type":"choice","label":"pot-pie","value":"cook-tags:dish/pot-pie","count":1},{"type":"choice","label":"potato","value":"cook-tags:main-ingredient/vegetables/potato","count":3},{"type":"choice","label":"poultry","value":"cook-tags:main-ingredient/poultry","count":1},{"type":"choice","label":"prosciutto","value":"cook-tags:main-ingredient/meat/prosciutto","count":1},{"type":"choice","label":"provolone","value":"cook-tags:main-ingredient/cheese/provolone","count":1},{"type":"choice","label":"pudding","value":"cook-tags:dish/pudding","count":1},{"type":"choice","label":"puerto-rican","value":"cook-tags:cuisine/caribbean/puerto-rican","count":1},{"type":"choice","label":"pumpkin","value":"cook-tags:main-ingredient/vegetables/pumpkin","count":1},{"type":"choice","label":"puree","value":"cook-tags:technique/puree","count":1},{"type":"choice","label":"quail","value":"cook-tags:main-ingredient/game/quail","count":1},{"type":"choice","label":"quesadilla","value":"cook-tags:dish/quesadilla","count":1},{"type":"choice","label":"queso","value":"cook-tags:main-ingredient/cheese/queso","count":1},{"type":"choice","label":"quinoa","value":"cook-tags:main-ingredient/grains/quinoa","count":1},{"type":"choice","label":"radish","value":"cook-tags:main-ingredient/vegetables/radish","count":1},{"type":"choice","label":"raisins","value":"cook-tags:main-ingredient/fruit/raisins","count":1},{"type":"choice","label":"raspberry","value":"cook-tags:main-ingredient/fruit/raspberry","count":1},{"type":"choice","label":"red-potato","value":"cook-tags:main-ingredient/vegetables/red-potato","count":1},{"type":"choice","label":"ribs","value":"cook-tags:dish/ribs","count":1},{"type":"choice","label":"rice","value":"cook-tags:main-ingredient/rice","count":1},{"type":"choice","label":"ricotta","value":"cook-tags:main-ingredient/cheese/ricotta","count":1},{"type":"choice","label":"risotto","value":"cook-tags:dish/risotto","count":1},{"type":"choice","label":"roast","value":"cook-tags:dish/roast","count":1},{"type":"choice","label":"roasting","value":"cook-tags:technique/roasting","count":1},{"type":"choice","label":"rosemary","value":"cook-tags:herbs-spices/rosemary","count":1},{"type":"choice","label":"rum","value":"cook-tags:main-ingredient/alcohol/rum","count":1},{"type":"choice","label":"rye-flour","value":"cook-tags:main-ingredient/flour/rye-flour","count":1},{"type":"choice","label":"saffron","value":"cook-tags:herbs-spices/saffron","count":1},{"type":"choice","label":"sage","value":"cook-tags:herbs-spices/sage","count":1},{"type":"choice","label":"salad","value":"cook-tags:dish/salad","count":3},{"type":"choice","label":"salad-dressing","value":"cook-tags:dish/salad-dressing","count":1},{"type":"choice","label":"salmon","value":"cook-tags:main-ingredient/fish/salmon","count":1},{"type":"choice","label":"salsa","value":"cook-tags:dish/salsa","count":1},{"type":"choice","label":"sandwich","value":"cook-tags:dish/sandwich","count":2},{"type":"choice","label":"sangria","value":"cook-tags:drinks/mixed-drinks/sangria","count":1},{"type":"choice","label":"sauce","value":"cook-tags:dish/sauce","count":3},{"type":"choice","label":"saucepan","value":"cook-tags:cookware-cooking-gadgets/saucepan","count":1},{"type":"choice","label":"sausage","value":"cook-tags:main-ingredient/sausage","count":1},{"type":"choice","label":"sauteing","value":"cook-tags:technique/sauteing","count":2},{"type":"choice","label":"scallop","value":"cook-tags:main-ingredient/shellfish/scallop","count":1},{"type":"choice","label":"scandinavian","value":"cook-tags:cuisine/european/scandinavian","count":1},{"type":"choice","label":"searing","value":"cook-tags:technique/searing","count":1},{"type":"choice","label":"shallot","value":"cook-tags:main-ingredient/vegetables/shallot","count":1},{"type":"choice","label":"shellfish","value":"cook-tags:main-ingredient/shellfish","count":1},{"type":"choice","label":"shower","value":"cook-tags:occasions/party/shower","count":1},{"type":"choice","label":"shrimp","value":"cook-tags:main-ingredient/shellfish/shrimp","count":1},{"type":"choice","label":"side-dish","value":"cook-tags:meal-part/side-dish","count":1},{"type":"choice","label":"simmer","value":"cook-tags:technique/simmer","count":1},{"type":"choice","label":"skillet","value":"cook-tags:cookware-cooking-gadgets/skillet","count":1},{"type":"choice","label":"slaw","value":"cook-tags:dish/slaw","count":1},{"type":"choice","label":"slow-cooker","value":"cook-tags:technique/slow-cooker","count":1},{"type":"choice","label":"smoothie","value":"cook-tags:drinks/smoothie","count":2},{"type":"choice","label":"snack","value":"cook-tags:meal-type/snack","count":1},{"type":"choice","label":"snapper","value":"cook-tags:main-ingredient/fish/snapper","count":1},{"type":"choice","label":"sorbet","value":"cook-tags:dish/sorbet","count":1},{"type":"choice","label":"soup","value":"cook-tags:dish/soup","count":1},{"type":"choice","label":"southern","value":"cook-tags:cuisine/american/southern","count":3},{"type":"choice","label":"southwestern","value":"cook-tags:cuisine/american/southwestern","count":1},{"type":"choice","label":"spanish","value":"cook-tags:cuisine/european/spanish","count":3},{"type":"choice","label":"sparkling-wine","value":"cook-tags:main-ingredient/alcohol/sparkling-wine","count":1},{"type":"choice","label":"spicy","value":"cook-tags:taste/spicy","count":2},{"type":"choice","label":"spinach","value":"cook-tags:main-ingredient/vegetables/spinach","count":1},{"type":"choice","label":"spring","value":"cook-tags:season/spring","count":2},{"type":"choice","label":"squash","value":"cook-tags:main-ingredient/vegetables/squash","count":1},{"type":"choice","label":"squid","value":"cook-tags:main-ingredient/shellfish/squid","count":1},{"type":"choice","label":"st-patricks-day","value":"cook-tags:occasions/holiday/st-patricks-day","count":3},{"type":"choice","label":"steak","value":"cook-tags:dish/steak","count":1},{"type":"choice","label":"steamer","value":"cook-tags:cookware-cooking-gadgets/steamer","count":1},{"type":"choice","label":"stew","value":"cook-tags:dish/stew","count":1},{"type":"choice","label":"stir-frying","value":"cook-tags:technique/stir-frying","count":2},{"type":"choice","label":"stock","value":"cook-tags:dish/stock","count":1},{"type":"choice","label":"strawberry","value":"cook-tags:main-ingredient/fruit/strawberry","count":1},{"type":"choice","label":"stuffed-mushrooms","value":"cook-tags:dish/stuffed-mushrooms","count":1},{"type":"choice","label":"stuffing-and-dressing","value":"cook-tags:dish/stuffing-and-dressing","count":1},{"type":"choice","label":"sugar","value":"cook-tags:main-ingredient/sweetener/sugar","count":1},{"type":"choice","label":"summer","value":"cook-tags:season/summer","count":12},{"type":"choice","label":"super-bowl","value":"cook-tags:occasions/party/super-bowl","count":8},{"type":"choice","label":"sweet","value":"cook-tags:taste/sweet","count":2},{"type":"choice","label":"sweet-potato","value":"cook-tags:main-ingredient/vegetables/sweet-potato","count":1},{"type":"choice","label":"swiss-cheese","value":"cook-tags:main-ingredient/cheese/swiss-cheese","count":1},{"type":"choice","label":"swordfish","value":"cook-tags:main-ingredient/fish/swordfish","count":1},{"type":"choice","label":"taco","value":"cook-tags:dish/taco","count":1},{"type":"choice","label":"tailgate-party","value":"cook-tags:occasions/party/tailgate-party","count":1},{"type":"choice","label":"tangerine","value":"cook-tags:main-ingredient/fruit/tangerine","count":1},{"type":"choice","label":"tea","value":"cook-tags:drinks/tea","count":1},{"type":"choice","label":"technique","value":"cook-tags:technique","count":1},{"type":"choice","label":"tequila","value":"cook-tags:main-ingredient/alcohol/tequila","count":1},{"type":"choice","label":"thai","value":"cook-tags:cuisine/asian/thai","count":2},{"type":"choice","label":"thanksgiving","value":"cook-tags:occasions/holiday/thanksgiving","count":31},{"type":"choice","label":"thyme","value":"cook-tags:herbs-spices/thyme","count":1},{"type":"choice","label":"tilapia","value":"cook-tags:main-ingredient/fish/tilapia","count":1},{"type":"choice","label":"toasting","value":"cook-tags:technique/toasting","count":1},{"type":"choice","label":"tofu","value":"cook-tags:main-ingredient/tofu","count":1},{"type":"choice","label":"tomatillos","value":"cook-tags:main-ingredient/vegetables/tomatillos","count":1},{"type":"choice","label":"tomato","value":"cook-tags:main-ingredient/vegetables/tomato","count":1},{"type":"choice","label":"trout","value":"cook-tags:main-ingredient/fish/trout","count":1},{"type":"choice","label":"tuna","value":"cook-tags:main-ingredient/fish/tuna","count":1},{"type":"choice","label":"turkey","value":"cook-tags:main-ingredient/poultry/turkey","count":1},{"type":"choice","label":"turnip","value":"cook-tags:main-ingredient/vegetables/turnip","count":1},{"type":"choice","label":"unknown","value":"unknown","count":20302},{"type":"choice","label":"valentines-day","value":"cook-tags:occasions/holiday/valentines-day","count":2},{"type":"choice","label":"vanilla","value":"cook-tags:herbs-spices/vanilla","count":1},{"type":"choice","label":"veal","value":"cook-tags:main-ingredient/meat/veal","count":1},{"type":"choice","label":"vegetables","value":"cook-tags:main-ingredient/vegetables","count":3},{"type":"choice","label":"vegetarian","value":"cook-tags:cooking-styles/vegetarian","count":2},{"type":"choice","label":"vietnamese","value":"cook-tags:cuisine/asian/vietnamese","count":3},{"type":"choice","label":"vodka","value":"cook-tags:main-ingredient/alcohol/vodka","count":1},{"type":"choice","label":"waffle","value":"cook-tags:dish/waffle","count":1},{"type":"choice","label":"water-chestnut","value":"cook-tags:main-ingredient/vegetables/water-chestnut","count":1},{"type":"choice","label":"watermelon","value":"cook-tags:main-ingredient/fruit/watermelon","count":1},{"type":"choice","label":"whisky","value":"cook-tags:main-ingredient/alcohol/whisky","count":1},{"type":"choice","label":"white-bean","value":"cook-tags:main-ingredient/beans-and-legumes/white-bean","count":1},{"type":"choice","label":"whole-wheat","value":"cook-tags:main-ingredient/flour/whole-wheat","count":1},{"type":"choice","label":"wine","value":"cook-tags:main-ingredient/alcohol/wine","count":1},{"type":"choice","label":"winter","value":"cook-tags:season/winter","count":1},{"type":"choice","label":"wok","value":"cook-tags:cookware-cooking-gadgets/wok","count":1},{"type":"choice","label":"yam","value":"cook-tags:main-ingredient/vegetables/yam","count":1},{"type":"choice","label":"yogurt","value":"cook-tags:main-ingredient/dairy/yogurt","count":1},{"type":"choice","label":"yuca","value":"cook-tags:main-ingredient/vegetables/yuca","count":1},{"type":"choice","label":"zucchini","value":"cook-tags:main-ingredient/vegetables/zucchini","count":1}]});
                          alert('IMP server is not responding.');
                        }
                });
        },

        //call the service to evaluate filters
        //IMPORTANT: The order filters are evaluated are based on your visual index inclusions first exclusions second.
        requestFilter: function( handler ){

                //this is true when we remove the very last filter and inclusion and exclusion lists are empty
                if ( so.isEmpty( so.g.addedExpressions ) ){
                  so.selection.displaySize( 0 );
                  return;
                }

                //compose filters based on visual index.
                var currentFilters = {
                        "type":"filters",
                        "expressions":[]
                };
                
                var addedFilters = {
                        "type":"filters",
                        "expressions":so.selection.get( so.g.addedExpressions )                     
                };

                var requestObj = {
                     "currentFilters": currentFilters,
                     "filtersAdded": addedFilters
                };

                var data = stringify(requestObj);

                console.log('ajax request /imp/report/filters: '+data);

                $CQ.ajax({
                  url:'/imp/report/filters',
                  dataType: 'json', 
                  cache:false,
                  data: data,
                  success: handler,
                  error:function(){
                    //handler({"type":"filters","expressions":[{"type":"TermExpression","negated":false,"operator":"LIKE","field":"content_tag1","value":"cook-tags:cuisine/american","valueLabel":"american","count":5}]});
                    alert('IMP server is not responding.');
                  }
                });
        },

        requestAssets: function(request, handler){

            var requestObj = {
               "currentFilters":{
                    "type":"filters",
                    "expressions":so.selection.get( so.g.currentExpressions )
                },
               "startRow":request.startRow,
               "endRow":request.endRow,
               "sortingObject":request.sort
            };

            var data = stringify(requestObj);

            console.log((new Date())+' ajax request /imp/report/assetlist: '+data);
        
            $CQ.ajax({
                url:'/imp/report/assetlist',
                dataType: 'json',
                cache:false,
                data: data,
                success: handler,
                error:function(){
                  handler({"type":"assetlist","assetInfoList":[]});
                  alert('IMP server is not responding.');
                }
            });
        },

        requestExport: function(){
            var requestObj = {
               "currentFilters":{
                    "type":"filters",
                    "expressions":so.selection.get( so.g.currentExpressions )
                },
               "sortingObject":{"type":"sorting", "field":so.result.sortField, "order":so.result.sortOrder}
            };
            var data = stringify(requestObj);

            console.log((new Date())+' ajax request /imp/report/assetlist: '+data);
            location = '/imp/report/assetlist.csv?'+data
        },

        requestPageViews: function(request, handler){

            var requestObj = {
                   "filters":{
                        "type":"filters",
                        "expressions": so.selection.get( so.g.currentExpressions )
                    }
            };

            var data = stringify(requestObj);

            //console.log('ajax request /imp/report/pageviews: '+data);
        
            $CQ.ajax({
                url:'/imp/report/pageviews',
                dataType: 'json', 
                cache:false,
                data: data,
                success: handler,
                error: function(){
                  handler({"type":"pageviews","monthReport":[],"totalPageViews":-1});
                }
            });
        },

        requestResource: function( resource, handler ){
                
                $CQ.ajax({
                        url:'/imp/resource/'+resource,
                        dataType: 'json',
                        cache:false,
                        success: handler,
                        error:function(){
                          alert('IMP server is not responding.');
                        }
                });
        },

        requestHistory: function( uri, handler ){
                var requestObj = {
                 "uri":uri
                };

                // test kickoff  
                var data= stringify(requestObj); //make into data package

                $CQ.ajax({
                  url:'/imp/report/changehistory',
                  dataType: 'json', 
                  cache:false,
                  data: data,
                  success: handler,
                  error: function(){
                    alert('IMP server is not responding.');
                  } 
                });
        },

        requestRange: function( field, handler ){
                
                var requestObj = {
                   "currentFilters":{
                      "type":"filters",
                      "expressions":[]
                   },

                   "filterFieldName":field
                };
                                
                var data= stringify(requestObj);

                console.log('ajax request /imp/report/field: '+data);
 
                $CQ.ajax({
                        url:'/imp/report/field',
                        dataType: 'json',
                        cache:false, 
                        data: data,
                        success: handler,
                        error: function(){
                          //handler({"type":"choices","title":"content_tag1","nameValueMap":[{"type":"choice","label":"adobo","value":"cook-tags:dish/adobo","count":1},{"type":"choice","label":"african","value":"cook-tags:cuisine/african","count":1},{"type":"choice","label":"american","value":"cook-tags:cuisine/american","count":5},{"type":"choice","label":"anchovy","value":"cook-tags:main-ingredient/fish/anchovy","count":1},{"type":"choice","label":"andouille","value":"cook-tags:main-ingredient/sausage/andouille","count":1},{"type":"choice","label":"anise","value":"cook-tags:herbs-spices/anise","count":1},{"type":"choice","label":"appetizer","value":"cook-tags:meal-part/appetizer","count":2},{"type":"choice","label":"apple","value":"cook-tags:main-ingredient/fruit/apple","count":2},{"type":"choice","label":"apricot","value":"cook-tags:main-ingredient/fruit/apricot","count":1},{"type":"choice","label":"argentinean","value":"cook-tags:cuisine/latin-american/argentinean","count":1},{"type":"choice","label":"artichoke","value":"cook-tags:main-ingredient/vegetables/artichoke","count":1},{"type":"choice","label":"arugula","value":"cook-tags:main-ingredient/vegetables/arugula","count":1},{"type":"choice","label":"asian","value":"cook-tags:cuisine/asian","count":2},{"type":"choice","label":"asparagus","value":"cook-tags:main-ingredient/vegetables/asparagus","count":1},{"type":"choice","label":"avocado","value":"cook-tags:main-ingredient/vegetables/avocado","count":1},{"type":"choice","label":"bacon","value":"cook-tags:main-ingredient/meat/bacon","count":1},{"type":"choice","label":"baked","value":"cook-tags:technique/baked","count":1},{"type":"choice","label":"baked-beans","value":"cook-tags:dish/baked-beans","count":1},{"type":"choice","label":"baking","value":"cook-tags:technique/baking","count":3},{"type":"choice","label":"banana","value":"cook-tags:main-ingredient/fruit/banana","count":1},{"type":"choice","label":"barbecue","value":"cook-tags:dish/barbecue","count":4},{"type":"choice","label":"barbecuing","value":"cook-tags:technique/barbecuing","count":2},{"type":"choice","label":"basil","value":"cook-tags:herbs-spices/basil","count":1},{"type":"choice","label":"bass","value":"cook-tags:main-ingredient/fish/bass","count":1},{"type":"choice","label":"beans-and-legumes","value":"cook-tags:main-ingredient/beans-and-legumes","count":1},{"type":"choice","label":"beef","value":"cook-tags:main-ingredient/meat/beef","count":2},{"type":"choice","label":"beer","value":"cook-tags:main-ingredient/alcohol/beer","count":2},{"type":"choice","label":"beets","value":"cook-tags:main-ingredient/vegetables/beets","count":1},{"type":"choice","label":"bell-pepper","value":"cook-tags:main-ingredient/vegetables/bell-pepper","count":1},{"type":"choice","label":"berries","value":"cook-tags:main-ingredient/fruit/berries","count":1},{"type":"choice","label":"birthday-party","value":"cook-tags:occasions/party/birthday-party","count":1},{"type":"choice","label":"biscuit","value":"cook-tags:dish/biscuit","count":1},{"type":"choice","label":"black-bean","value":"cook-tags:main-ingredient/beans-and-legumes/black-bean","count":1},{"type":"choice","label":"black-eyed-pea","value":"cook-tags:main-ingredient/beans-and-legumes/black-eyed-pea","count":1},{"type":"choice","label":"blackberry","value":"cook-tags:main-ingredient/fruit/blackberry","count":1},{"type":"choice","label":"blanching","value":"cook-tags:technique/blanching","count":1},{"type":"choice","label":"blue-cheese","value":"cook-tags:main-ingredient/cheese/blue-cheese","count":1},{"type":"choice","label":"blueberry","value":"cook-tags:main-ingredient/fruit/blueberry","count":1},{"type":"choice","label":"braising","value":"cook-tags:technique/braising","count":2},{"type":"choice","label":"brandy","value":"cook-tags:main-ingredient/alcohol/brandy","count":1},{"type":"choice","label":"brazilian","value":"cook-tags:cuisine/latin-american/brazilian","count":1},{"type":"choice","label":"bread","value":"cook-tags:main-ingredient/bread","count":1},{"type":"choice","label":"bread-dishes","value":"cook-tags:dish/bread-dishes","count":1},{"type":"choice","label":"bread-pudding","value":"cook-tags:dish/bread-pudding","count":1},{"type":"choice","label":"breakfast","value":"cook-tags:meal-type/breakfast","count":1},{"type":"choice","label":"brie","value":"cook-tags:main-ingredient/cheese/brie","count":1},{"type":"choice","label":"brisket","value":"cook-tags:dish/brisket","count":1},{"type":"choice","label":"british","value":"cook-tags:cuisine/european/british","count":2},{"type":"choice","label":"broccoli","value":"cook-tags:main-ingredient/vegetables/broccoli","count":1},{"type":"choice","label":"broiling","value":"cook-tags:technique/broiling","count":1},{"type":"choice","label":"brownie","value":"cook-tags:dish/brownie","count":1},{"type":"choice","label":"brunch","value":"cook-tags:meal-type/brunch","count":3},{"type":"choice","label":"bruschetta","value":"cook-tags:dish/bruschetta","count":1},{"type":"choice","label":"brussels-sprout","value":"cook-tags:main-ingredient/vegetables/brussels-sprout","count":1},{"type":"choice","label":"buckwheat","value":"cook-tags:main-ingredient/flour/buckwheat","count":1},{"type":"choice","label":"budget-friendly","value":"cook-tags:cooking-styles/budget-friendly","count":1},{"type":"choice","label":"burgers","value":"cook-tags:dish/burgers","count":4},{"type":"choice","label":"buttermilk","value":"cook-tags:main-ingredient/dairy/buttermilk","count":1},{"type":"choice","label":"butternut-squash","value":"cook-tags:main-ingredient/vegetables/butternut-squash","count":2},{"type":"choice","label":"cabbage","value":"cook-tags:main-ingredient/vegetables/cabbage","count":1},{"type":"choice","label":"cajun","value":"cook-tags:cuisine/american/cajun","count":1},{"type":"choice","label":"cake","value":"cook-tags:dish/cake","count":2},{"type":"choice","label":"candy","value":"cook-tags:dish/candy","count":1},{"type":"choice","label":"cantaloupe","value":"cook-tags:main-ingredient/fruit/cantaloupe","count":1},{"type":"choice","label":"caramelizing","value":"cook-tags:technique/caramelizing","count":1},{"type":"choice","label":"caribbean","value":"cook-tags:cuisine/caribbean","count":1},{"type":"choice","label":"carrot","value":"cook-tags:main-ingredient/vegetables/carrot","count":1},{"type":"choice","label":"casserole","value":"cook-tags:dish/casserole","count":1},{"type":"choice","label":"cast-iron","value":"cook-tags:cookware-cooking-gadgets/cast-iron","count":1},{"type":"choice","label":"catfish","value":"cook-tags:main-ingredient/fish/catfish","count":1},{"type":"choice","label":"cauliflower","value":"cook-tags:main-ingredient/vegetables/cauliflower","count":1},{"type":"choice","label":"caviar","value":"cook-tags:main-ingredient/fish/caviar","count":1},{"type":"choice","label":"celery","value":"cook-tags:main-ingredient/vegetables/celery","count":1},{"type":"choice","label":"central-american","value":"cook-tags:cuisine/latin-american/central-american","count":1},{"type":"choice","label":"cheddar","value":"cook-tags:main-ingredient/cheese/cheddar","count":1},{"type":"choice","label":"cheese","value":"cook-tags:main-ingredient/cheese","count":1},{"type":"choice","label":"cheesecake","value":"cook-tags:dish/cheesecake","count":2},{"type":"choice","label":"cherry","value":"cook-tags:main-ingredient/fruit/cherry","count":1},{"type":"choice","label":"chicken","value":"cook-tags:main-ingredient/poultry/chicken","count":6},{"type":"choice","label":"chickpea","value":"cook-tags:main-ingredient/beans-and-legumes/chickpea","count":1},{"type":"choice","label":"chile-pepper","value":"cook-tags:main-ingredient/vegetables/chile-pepper","count":2},{"type":"choice","label":"chili","value":"cook-tags:dish/chili","count":1},{"type":"choice","label":"chinese","value":"cook-tags:cuisine/asian/chinese","count":2},{"type":"choice","label":"chipotle","value":"cook-tags:herbs-spices/chipotle","count":1},{"type":"choice","label":"chips","value":"cook-tags:dish/chips","count":1},{"type":"choice","label":"chives","value":"cook-tags:herbs-spices/chives","count":1},{"type":"choice","label":"chocolate","value":"cook-tags:main-ingredient/chocolate","count":3},{"type":"choice","label":"chorizo","value":"cook-tags:main-ingredient/sausage/chorizo","count":1},{"type":"choice","label":"chowder","value":"cook-tags:dish/chowder","count":1},{"type":"choice","label":"christmas","value":"cook-tags:occasions/holiday/christmas","count":7},{"type":"choice","label":"cilantro","value":"cook-tags:herbs-spices/cilantro","count":1},{"type":"choice","label":"cinco-de-mayo","value":"cook-tags:occasions/holiday/cinco-de-mayo","count":1},{"type":"choice","label":"cinnamon","value":"cook-tags:herbs-spices/cinnamon","count":1},{"type":"choice","label":"clam","value":"cook-tags:main-ingredient/shellfish/clam","count":1},{"type":"choice","label":"cobbler","value":"cook-tags:dish/cobbler","count":1},{"type":"choice","label":"cocktail-party","value":"cook-tags:occasions/party/cocktail-party","count":1},{"type":"choice","label":"coconut","value":"cook-tags:main-ingredient/fruit/coconut","count":1},{"type":"choice","label":"cod","value":"cook-tags:main-ingredient/fish/cod","count":1},{"type":"choice","label":"coffee-drinks","value":"cook-tags:drinks/coffee-drinks","count":2},{"type":"choice","label":"collard-greens","value":"cook-tags:main-ingredient/vegetables/collard-greens","count":1},{"type":"choice","label":"comfort-food","value":"cook-tags:cooking-styles/comfort-food","count":7},{"type":"choice","label":"content-tag1","value":"content-tag1","count":1},{"type":"choice","label":"content-tag1","value":"cook-tags:test/content-tag1","count":1},{"type":"choice","label":"cookie","value":"cook-tags:dish/cookie","count":11},{"type":"choice","label":"corn","value":"cook-tags:main-ingredient/vegetables/corn","count":1},{"type":"choice","label":"cornbread","value":"cook-tags:dish/cornbread","count":1},{"type":"choice","label":"cornmeal","value":"cook-tags:main-ingredient/grains/cornmeal","count":1},{"type":"choice","label":"couscous","value":"cook-tags:main-ingredient/pasta/couscous","count":1},{"type":"choice","label":"crab","value":"cook-tags:main-ingredient/shellfish/crab","count":1},{"type":"choice","label":"crab-cake","value":"cook-tags:dish/crab-cake","count":1},{"type":"choice","label":"cranberry","value":"cook-tags:main-ingredient/fruit/cranberry","count":2},{"type":"choice","label":"crawfish","value":"cook-tags:main-ingredient/shellfish/crawfish","count":1},{"type":"choice","label":"cream-cheese","value":"cook-tags:main-ingredient/cheese/cream-cheese","count":1},{"type":"choice","label":"cream-pie","value":"cook-tags:dish/cream-pie","count":1},{"type":"choice","label":"crepe","value":"cook-tags:dish/crepe","count":1},{"type":"choice","label":"crispy","value":"cook-tags:taste/crispy","count":1},{"type":"choice","label":"cuban","value":"cook-tags:cuisine/caribbean/cuban","count":1},{"type":"choice","label":"cucumber","value":"cook-tags:main-ingredient/vegetables/cucumber","count":2},{"type":"choice","label":"cupcake","value":"cook-tags:dish/cupcake","count":2},{"type":"choice","label":"custard","value":"cook-tags:dish/custard","count":2},{"type":"choice","label":"dairy","value":"cook-tags:main-ingredient/dairy","count":2},{"type":"choice","label":"dessert","value":"cook-tags:meal-part/dessert","count":8},{"type":"choice","label":"diabetic","value":"cook-tags:nutrition/diabetic","count":1},{"type":"choice","label":"dill","value":"cook-tags:herbs-spices/dill","count":1},{"type":"choice","label":"dinner","value":"cook-tags:meal-type/dinner","count":2},{"type":"choice","label":"dinner-party","value":"cook-tags:occasions/party/dinner-party","count":1},{"type":"choice","label":"dip","value":"cook-tags:dish/dip","count":2},{"type":"choice","label":"doughnuts","value":"cook-tags:dish/doughnuts","count":1},{"type":"choice","label":"dried-fruit","value":"cook-tags:main-ingredient/fruit/dried-fruit","count":1},{"type":"choice","label":"drinks","value":"cook-tags:drinks","count":6},{"type":"choice","label":"duck","value":"cook-tags:main-ingredient/poultry/duck","count":1},{"type":"choice","label":"dumpling","value":"cook-tags:dish/dumpling","count":1},{"type":"choice","label":"dutch-oven","value":"cook-tags:cookware-cooking-gadgets/dutch-oven","count":1},{"type":"choice","label":"easter","value":"cook-tags:occasions/holiday/easter","count":4},{"type":"choice","label":"edamame","value":"cook-tags:main-ingredient/beans-and-legumes/edamame","count":1},{"type":"choice","label":"eggplant","value":"cook-tags:main-ingredient/vegetables/eggplant","count":1},{"type":"choice","label":"eggs","value":"cook-tags:main-ingredient/eggs","count":9},{"type":"choice","label":"enchilada","value":"cook-tags:dish/enchilada","count":1},{"type":"choice","label":"european","value":"cook-tags:cuisine/european","count":2},{"type":"choice","label":"fall","value":"cook-tags:season/fall","count":4},{"type":"choice","label":"fathers-day","value":"cook-tags:occasions/holiday/fathers-day","count":1},{"type":"choice","label":"fennel","value":"cook-tags:main-ingredient/vegetables/fennel","count":1},{"type":"choice","label":"feta","value":"cook-tags:main-ingredient/cheese/feta","count":1},{"type":"choice","label":"fig","value":"cook-tags:main-ingredient/fruit/fig","count":1},{"type":"choice","label":"fish","value":"cook-tags:main-ingredient/fish","count":2},{"type":"choice","label":"flour","value":"cook-tags:main-ingredient/flour","count":2},{"type":"choice","label":"focaccia","value":"cook-tags:dish/focaccia","count":1},{"type":"choice","label":"fondue","value":"cook-tags:dish/fondue","count":1},{"type":"choice","label":"food-processor","value":"cook-tags:cookware-cooking-gadgets/food-processor","count":1},{"type":"choice","label":"for-a-crowd","value":"cook-tags:whos-dining/for-a-crowd","count":2},{"type":"choice","label":"for-a-family","value":"cook-tags:whos-dining/for-a-family","count":1},{"type":"choice","label":"for-kids","value":"cook-tags:whos-dining/for-kids","count":1},{"type":"choice","label":"for-one","value":"cook-tags:whos-dining/for-one","count":1},{"type":"choice","label":"for-two","value":"cook-tags:whos-dining/for-two","count":1},{"type":"choice","label":"french","value":"cook-tags:cuisine/european/french","count":4},{"type":"choice","label":"french-toast","value":"cook-tags:dish/french-toast","count":1},{"type":"choice","label":"fries","value":"cook-tags:dish/fries","count":1},{"type":"choice","label":"frittata","value":"cook-tags:dish/frittata","count":1},{"type":"choice","label":"frosting","value":"cook-tags:dish/frosting","count":1},{"type":"choice","label":"frozen-drinks","value":"cook-tags:drinks/frozen-drinks","count":1},{"type":"choice","label":"fruit","value":"cook-tags:main-ingredient/fruit","count":2},{"type":"choice","label":"fruity","value":"cook-tags:taste/fruity","count":1},{"type":"choice","label":"frying","value":"cook-tags:technique/frying","count":2},{"type":"choice","label":"fudge","value":"cook-tags:dish/fudge","count":1},{"type":"choice","label":"game","value":"cook-tags:main-ingredient/game","count":1},{"type":"choice","label":"garlic","value":"cook-tags:herbs-spices/garlic","count":2},{"type":"choice","label":"german","value":"cook-tags:cuisine/european/german","count":2},{"type":"choice","label":"gift","value":"cook-tags:general-subjects/gift","count":1},{"type":"choice","label":"gin","value":"cook-tags:main-ingredient/alcohol/gin","count":1},{"type":"choice","label":"ginger","value":"cook-tags:herbs-spices/ginger","count":1},{"type":"choice","label":"gnocchi","value":"cook-tags:dish/gnocchi","count":1},{"type":"choice","label":"goose","value":"cook-tags:main-ingredient/poultry/goose","count":1},{"type":"choice","label":"gouda","value":"cook-tags:main-ingredient/cheese/gouda","count":1},{"type":"choice","label":"grains","value":"cook-tags:main-ingredient/grains","count":1},{"type":"choice","label":"grapefruit","value":"cook-tags:main-ingredient/fruit/grapefruit","count":1},{"type":"choice","label":"grapes","value":"cook-tags:main-ingredient/fruit/grapes","count":1},{"type":"choice","label":"gratin","value":"cook-tags:dish/gratin","count":1},{"type":"choice","label":"greek","value":"cook-tags:cuisine/middle-eastern/greek","count":1},{"type":"choice","label":"green-bean","value":"cook-tags:main-ingredient/beans-and-legumes/green-bean","count":2},{"type":"choice","label":"grilling","value":"cook-tags:technique/grilling","count":10},{"type":"choice","label":"grits","value":"cook-tags:main-ingredient/grains/grits","count":1},{"type":"choice","label":"ground-beef","value":"cook-tags:main-ingredient/meat/ground-beef","count":1},{"type":"choice","label":"grouper","value":"cook-tags:main-ingredient/fish/grouper","count":1},{"type":"choice","label":"gruyere","value":"cook-tags:main-ingredient/cheese/gruyere","count":1},{"type":"choice","label":"guacamole","value":"cook-tags:dish/guacamole","count":1},{"type":"choice","label":"guava","value":"cook-tags:main-ingredient/fruit/guava","count":1},{"type":"choice","label":"guide","value":"cook-tags:general-subjects/guide","count":22},{"type":"choice","label":"gumbo","value":"cook-tags:dish/gumbo","count":1},{"type":"choice","label":"halibut","value":"cook-tags:main-ingredient/fish/halibut","count":1},{"type":"choice","label":"halloween","value":"cook-tags:occasions/holiday/halloween","count":11},{"type":"choice","label":"ham","value":"cook-tags:main-ingredient/meat/ham","count":1},{"type":"choice","label":"hanukkah","value":"cook-tags:occasions/holiday/hanukkah","count":3},{"type":"choice","label":"hawaiian","value":"cook-tags:cuisine/american/hawaiian","count":1},{"type":"choice","label":"healthy","value":"cook-tags:cooking-styles/healthy","count":20},{"type":"choice","label":"heart-healthy","value":"cook-tags:nutrition/heart-healthy","count":1},{"type":"choice","label":"herbs-and-spices","value":"cook-tags:herbs-and-spices","count":7},{"type":"choice","label":"holiday","value":"cook-tags:occasions/holiday","count":7},{"type":"choice","label":"homemade-ice-cream","value":"cook-tags:dish/homemade-ice-cream","count":1},{"type":"choice","label":"honeydew","value":"cook-tags:main-ingredient/fruit/honeydew","count":1},{"type":"choice","label":"horseradish","value":"cook-tags:herbs-spices/horseradish","count":1},{"type":"choice","label":"hot-dog","value":"cook-tags:dish/hot-dog","count":1},{"type":"choice","label":"ice-cream","value":"cook-tags:main-ingredient/dairy/ice-cream","count":2},{"type":"choice","label":"indian","value":"cook-tags:cuisine/asian/indian","count":1},{"type":"choice","label":"irish","value":"cook-tags:cuisine/european/irish","count":2},{"type":"choice","label":"italian","value":"cook-tags:cuisine/european/italian","count":12},{"type":"choice","label":"jalapeno","value":"cook-tags:main-ingredient/vegetables/jalapeno","count":1},{"type":"choice","label":"jambalaya","value":"cook-tags:dish/jambalaya","count":1},{"type":"choice","label":"japanese","value":"cook-tags:cuisine/asian/japanese","count":1},{"type":"choice","label":"jicama","value":"cook-tags:main-ingredient/vegetables/jicama","count":1},{"type":"choice","label":"kabob","value":"cook-tags:dish/kabob","count":1},{"type":"choice","label":"kielbasa","value":"cook-tags:main-ingredient/sausage/kielbasa","count":1},{"type":"choice","label":"kiwi","value":"cook-tags:main-ingredient/fruit/kiwi","count":1},{"type":"choice","label":"knife","value":"cook-tags:cookware-cooking-gadgets/knife","count":3},{"type":"choice","label":"korean","value":"cook-tags:cuisine/asian/korean","count":2},{"type":"choice","label":"kwanzaa","value":"cook-tags:occasions/holiday/kwanzaa","count":1},{"type":"choice","label":"labor-day","value":"cook-tags:occasions/holiday/labor-day","count":1},{"type":"choice","label":"lamb","value":"cook-tags:main-ingredient/meat/lamb","count":1},{"type":"choice","label":"lasagna","value":"cook-tags:dish/lasagna","count":1},{"type":"choice","label":"latin-american","value":"cook-tags:cuisine/latin-american","count":2},{"type":"choice","label":"leek","value":"cook-tags:main-ingredient/vegetables/leek","count":2},{"type":"choice","label":"lemon","value":"cook-tags:main-ingredient/fruit/lemon","count":1},{"type":"choice","label":"lemonade","value":"cook-tags:drinks/lemonade","count":1},{"type":"choice","label":"lemongrass","value":"cook-tags:herbs-spices/lemongrass","count":1},{"type":"choice","label":"lentil","value":"cook-tags:main-ingredient/beans-and-legumes/lentil","count":1},{"type":"choice","label":"lettuce","value":"cook-tags:main-ingredient/vegetables/lettuce","count":1},{"type":"choice","label":"lima-bean","value":"cook-tags:main-ingredient/beans-and-legumes/lima-bean","count":1},{"type":"choice","label":"lime","value":"cook-tags:main-ingredient/fruit/lime","count":2},{"type":"choice","label":"liqueur","value":"cook-tags:main-ingredient/alcohol/liqueur","count":1},{"type":"choice","label":"liquor","value":"cook-tags:main-ingredient/alcohol/liquor","count":1},{"type":"choice","label":"lobster","value":"cook-tags:main-ingredient/shellfish/lobster","count":3},{"type":"choice","label":"low-calorie","value":"cook-tags:nutrition/low-calorie","count":3},{"type":"choice","label":"low-cholesterol","value":"cook-tags:nutrition/low-cholesterol","count":1},{"type":"choice","label":"low-fat","value":"cook-tags:nutrition/low-fat","count":1},{"type":"choice","label":"lunch","value":"cook-tags:meal-type/lunch","count":2},{"type":"choice","label":"macaroni-and-cheese","value":"cook-tags:dish/macaroni-and-cheese","count":2},{"type":"choice","label":"mahi-mahi","value":"cook-tags:main-ingredient/fish/mahi-mahi","count":1},{"type":"choice","label":"main-dish","value":"cook-tags:meal-part/main-dish","count":3},{"type":"choice","label":"make-ahead","value":"cook-tags:cooking-styles/make-ahead","count":2},{"type":"choice","label":"mango","value":"cook-tags:main-ingredient/fruit/mango","count":1},{"type":"choice","label":"mardi-gras","value":"cook-tags:occasions/holiday/mardi-gras","count":1},{"type":"choice","label":"margarita","value":"cook-tags:drinks/mixed-drinks/margarita","count":2},{"type":"choice","label":"marinade","value":"cook-tags:dish/marinade","count":1},{"type":"choice","label":"marinating","value":"cook-tags:technique/marinating","count":1},{"type":"choice","label":"martini","value":"cook-tags:drinks/mixed-drinks/martini","count":1},{"type":"choice","label":"meat","value":"cook-tags:main-ingredient/meat","count":3},{"type":"choice","label":"meatballs","value":"cook-tags:dish/meatballs","count":1},{"type":"choice","label":"meatloaf","value":"cook-tags:dish/meatloaf","count":1},{"type":"choice","label":"melon","value":"cook-tags:main-ingredient/fruit/melon","count":1},{"type":"choice","label":"memorial-day","value":"cook-tags:occasions/holiday/memorial-day","count":1},{"type":"choice","label":"mexican","value":"cook-tags:cuisine/latin-american/mexican","count":11},{"type":"choice","label":"middle-eastern","value":"cook-tags:cuisine/middle-eastern","count":1},{"type":"choice","label":"mint","value":"cook-tags:herbs-spices/mint","count":1},{"type":"choice","label":"mixed-drinks","value":"cook-tags:drinks/mixed-drinks","count":2},{"type":"choice","label":"mixer","value":"cook-tags:cookware-cooking-gadgets/mixer","count":2},{"type":"choice","label":"mojito","value":"cook-tags:drinks/mixed-drinks/mojito","count":1},{"type":"choice","label":"monterey-jack","value":"cook-tags:main-ingredient/cheese/monterey-jack","count":1},{"type":"choice","label":"mothers-day","value":"cook-tags:occasions/holiday/mothers-day","count":1},{"type":"choice","label":"mozzarella","value":"cook-tags:main-ingredient/cheese/mozzarella","count":1},{"type":"choice","label":"muffin","value":"cook-tags:dish/muffin","count":1},{"type":"choice","label":"mushroom","value":"cook-tags:main-ingredient/vegetables/mushroom","count":1},{"type":"choice","label":"mussel","value":"cook-tags:main-ingredient/shellfish/mussel","count":1},{"type":"choice","label":"new-year","value":"cook-tags:occasions/holiday/new-year","count":1},{"type":"choice","label":"no-cook","value":"cook-tags:cooking-styles/no-cook","count":1},{"type":"choice","label":"noodles","value":"cook-tags:main-ingredient/noodles","count":1},{"type":"choice","label":"northeastern","value":"cook-tags:cuisine/american/northeastern","count":1},{"type":"choice","label":"nuts","value":"cook-tags:main-ingredient/nuts","count":2},{"type":"choice","label":"oats","value":"cook-tags:main-ingredient/grains/oats","count":1},{"type":"choice","label":"okra","value":"cook-tags:main-ingredient/vegetables/okra","count":1},{"type":"choice","label":"olive","value":"cook-tags:main-ingredient/vegetables/olive","count":1},{"type":"choice","label":"omelet","value":"cook-tags:dish/omelet","count":1},{"type":"choice","label":"one-pot-meal","value":"cook-tags:cooking-styles/one-pot-meal","count":1},{"type":"choice","label":"onion","value":"cook-tags:main-ingredient/vegetables/onion","count":2},{"type":"choice","label":"oranges","value":"cook-tags:main-ingredient/fruit/oranges","count":1},{"type":"choice","label":"oregano","value":"cook-tags:herbs-spices/oregano","count":1},{"type":"choice","label":"outdoor-party","value":"cook-tags:occasions/party/outdoor-party","count":2},{"type":"choice","label":"oyster","value":"cook-tags:main-ingredient/shellfish/oyster","count":1},{"type":"choice","label":"paella","value":"cook-tags:dish/paella","count":1},{"type":"choice","label":"pancake","value":"cook-tags:dish/pancake","count":1},{"type":"choice","label":"papaya","value":"cook-tags:main-ingredient/fruit/papaya","count":1},{"type":"choice","label":"paprika","value":"cook-tags:herbs-spices/paprika","count":1},{"type":"choice","label":"parmesan-cheese","value":"cook-tags:main-ingredient/cheese/parmesan-cheese","count":1},{"type":"choice","label":"parsley","value":"cook-tags:herbs-spices/parsley","count":1},{"type":"choice","label":"party","value":"cook-tags:occasions/party","count":3},{"type":"choice","label":"passover","value":"cook-tags:occasions/holiday/passover","count":2},{"type":"choice","label":"pasta","value":"cook-tags:main-ingredient/pasta","count":1},{"type":"choice","label":"pastry","value":"cook-tags:dish/pastry","count":1},{"type":"choice","label":"peach","value":"cook-tags:main-ingredient/fruit/peach","count":1},{"type":"choice","label":"peanut-butter","value":"cook-tags:main-ingredient/peanut-butter","count":1},{"type":"choice","label":"pear","value":"cook-tags:main-ingredient/fruit/pear","count":1},{"type":"choice","label":"peas","value":"cook-tags:main-ingredient/beans-and-legumes/peas","count":1},{"type":"choice","label":"peruvian","value":"cook-tags:cuisine/latin-american/peruvian","count":1},{"type":"choice","label":"pesto","value":"cook-tags:dish/pesto","count":1},{"type":"choice","label":"pheasant","value":"cook-tags:main-ingredient/game/pheasant","count":1},{"type":"choice","label":"pickles","value":"cook-tags:dish/pickles","count":1},{"type":"choice","label":"picnic-salad","value":"cook-tags:dish/picnic-salad","count":2},{"type":"choice","label":"pie","value":"cook-tags:dish/pie","count":2},{"type":"choice","label":"pineapples","value":"cook-tags:main-ingredient/fruit/pineapples","count":1},{"type":"choice","label":"pizza","value":"cook-tags:dish/pizza","count":3},{"type":"choice","label":"pizza-dough","value":"cook-tags:dish/pizza-dough","count":1},{"type":"choice","label":"plantain","value":"cook-tags:main-ingredient/fruit/plantain","count":1},{"type":"choice","label":"plum","value":"cook-tags:main-ingredient/fruit/plum","count":1},{"type":"choice","label":"poaching","value":"cook-tags:technique/poaching","count":1},{"type":"choice","label":"polenta","value":"cook-tags:dish/polenta","count":1},{"type":"choice","label":"polish","value":"cook-tags:cuisine/european/polish","count":1},{"type":"choice","label":"pomegranate","value":"cook-tags:main-ingredient/fruit/pomegranate","count":1},{"type":"choice","label":"pork","value":"cook-tags:main-ingredient/meat/pork","count":3},{"type":"choice","label":"pork-chop","value":"cook-tags:dish/pork-chop","count":1},{"type":"choice","label":"portuguese","value":"cook-tags:cuisine/european/portuguese","count":1},{"type":"choice","label":"pot-pie","value":"cook-tags:dish/pot-pie","count":1},{"type":"choice","label":"potato","value":"cook-tags:main-ingredient/vegetables/potato","count":3},{"type":"choice","label":"poultry","value":"cook-tags:main-ingredient/poultry","count":1},{"type":"choice","label":"prosciutto","value":"cook-tags:main-ingredient/meat/prosciutto","count":1},{"type":"choice","label":"provolone","value":"cook-tags:main-ingredient/cheese/provolone","count":1},{"type":"choice","label":"pudding","value":"cook-tags:dish/pudding","count":1},{"type":"choice","label":"puerto-rican","value":"cook-tags:cuisine/caribbean/puerto-rican","count":1},{"type":"choice","label":"pumpkin","value":"cook-tags:main-ingredient/vegetables/pumpkin","count":1},{"type":"choice","label":"puree","value":"cook-tags:technique/puree","count":1},{"type":"choice","label":"quail","value":"cook-tags:main-ingredient/game/quail","count":1},{"type":"choice","label":"quesadilla","value":"cook-tags:dish/quesadilla","count":1},{"type":"choice","label":"queso","value":"cook-tags:main-ingredient/cheese/queso","count":1},{"type":"choice","label":"quinoa","value":"cook-tags:main-ingredient/grains/quinoa","count":1},{"type":"choice","label":"radish","value":"cook-tags:main-ingredient/vegetables/radish","count":1},{"type":"choice","label":"raisins","value":"cook-tags:main-ingredient/fruit/raisins","count":1},{"type":"choice","label":"raspberry","value":"cook-tags:main-ingredient/fruit/raspberry","count":1},{"type":"choice","label":"red-potato","value":"cook-tags:main-ingredient/vegetables/red-potato","count":1},{"type":"choice","label":"ribs","value":"cook-tags:dish/ribs","count":1},{"type":"choice","label":"rice","value":"cook-tags:main-ingredient/rice","count":1},{"type":"choice","label":"ricotta","value":"cook-tags:main-ingredient/cheese/ricotta","count":1},{"type":"choice","label":"risotto","value":"cook-tags:dish/risotto","count":1},{"type":"choice","label":"roast","value":"cook-tags:dish/roast","count":1},{"type":"choice","label":"roasting","value":"cook-tags:technique/roasting","count":1},{"type":"choice","label":"rosemary","value":"cook-tags:herbs-spices/rosemary","count":1},{"type":"choice","label":"rum","value":"cook-tags:main-ingredient/alcohol/rum","count":1},{"type":"choice","label":"rye-flour","value":"cook-tags:main-ingredient/flour/rye-flour","count":1},{"type":"choice","label":"saffron","value":"cook-tags:herbs-spices/saffron","count":1},{"type":"choice","label":"sage","value":"cook-tags:herbs-spices/sage","count":1},{"type":"choice","label":"salad","value":"cook-tags:dish/salad","count":3},{"type":"choice","label":"salad-dressing","value":"cook-tags:dish/salad-dressing","count":1},{"type":"choice","label":"salmon","value":"cook-tags:main-ingredient/fish/salmon","count":1},{"type":"choice","label":"salsa","value":"cook-tags:dish/salsa","count":1},{"type":"choice","label":"sandwich","value":"cook-tags:dish/sandwich","count":2},{"type":"choice","label":"sangria","value":"cook-tags:drinks/mixed-drinks/sangria","count":1},{"type":"choice","label":"sauce","value":"cook-tags:dish/sauce","count":3},{"type":"choice","label":"saucepan","value":"cook-tags:cookware-cooking-gadgets/saucepan","count":1},{"type":"choice","label":"sausage","value":"cook-tags:main-ingredient/sausage","count":1},{"type":"choice","label":"sauteing","value":"cook-tags:technique/sauteing","count":2},{"type":"choice","label":"scallop","value":"cook-tags:main-ingredient/shellfish/scallop","count":1},{"type":"choice","label":"scandinavian","value":"cook-tags:cuisine/european/scandinavian","count":1},{"type":"choice","label":"searing","value":"cook-tags:technique/searing","count":1},{"type":"choice","label":"shallot","value":"cook-tags:main-ingredient/vegetables/shallot","count":1},{"type":"choice","label":"shellfish","value":"cook-tags:main-ingredient/shellfish","count":1},{"type":"choice","label":"shower","value":"cook-tags:occasions/party/shower","count":1},{"type":"choice","label":"shrimp","value":"cook-tags:main-ingredient/shellfish/shrimp","count":1},{"type":"choice","label":"side-dish","value":"cook-tags:meal-part/side-dish","count":1},{"type":"choice","label":"simmer","value":"cook-tags:technique/simmer","count":1},{"type":"choice","label":"skillet","value":"cook-tags:cookware-cooking-gadgets/skillet","count":1},{"type":"choice","label":"slaw","value":"cook-tags:dish/slaw","count":1},{"type":"choice","label":"slow-cooker","value":"cook-tags:technique/slow-cooker","count":1},{"type":"choice","label":"smoothie","value":"cook-tags:drinks/smoothie","count":2},{"type":"choice","label":"snack","value":"cook-tags:meal-type/snack","count":1},{"type":"choice","label":"snapper","value":"cook-tags:main-ingredient/fish/snapper","count":1},{"type":"choice","label":"sorbet","value":"cook-tags:dish/sorbet","count":1},{"type":"choice","label":"soup","value":"cook-tags:dish/soup","count":1},{"type":"choice","label":"southern","value":"cook-tags:cuisine/american/southern","count":3},{"type":"choice","label":"southwestern","value":"cook-tags:cuisine/american/southwestern","count":1},{"type":"choice","label":"spanish","value":"cook-tags:cuisine/european/spanish","count":3},{"type":"choice","label":"sparkling-wine","value":"cook-tags:main-ingredient/alcohol/sparkling-wine","count":1},{"type":"choice","label":"spicy","value":"cook-tags:taste/spicy","count":2},{"type":"choice","label":"spinach","value":"cook-tags:main-ingredient/vegetables/spinach","count":1},{"type":"choice","label":"spring","value":"cook-tags:season/spring","count":2},{"type":"choice","label":"squash","value":"cook-tags:main-ingredient/vegetables/squash","count":1},{"type":"choice","label":"squid","value":"cook-tags:main-ingredient/shellfish/squid","count":1},{"type":"choice","label":"st-patricks-day","value":"cook-tags:occasions/holiday/st-patricks-day","count":3},{"type":"choice","label":"steak","value":"cook-tags:dish/steak","count":1},{"type":"choice","label":"steamer","value":"cook-tags:cookware-cooking-gadgets/steamer","count":1},{"type":"choice","label":"stew","value":"cook-tags:dish/stew","count":1},{"type":"choice","label":"stir-frying","value":"cook-tags:technique/stir-frying","count":2},{"type":"choice","label":"stock","value":"cook-tags:dish/stock","count":1},{"type":"choice","label":"strawberry","value":"cook-tags:main-ingredient/fruit/strawberry","count":1},{"type":"choice","label":"stuffed-mushrooms","value":"cook-tags:dish/stuffed-mushrooms","count":1},{"type":"choice","label":"stuffing-and-dressing","value":"cook-tags:dish/stuffing-and-dressing","count":1},{"type":"choice","label":"sugar","value":"cook-tags:main-ingredient/sweetener/sugar","count":1},{"type":"choice","label":"summer","value":"cook-tags:season/summer","count":12},{"type":"choice","label":"super-bowl","value":"cook-tags:occasions/party/super-bowl","count":8},{"type":"choice","label":"sweet","value":"cook-tags:taste/sweet","count":2},{"type":"choice","label":"sweet-potato","value":"cook-tags:main-ingredient/vegetables/sweet-potato","count":1},{"type":"choice","label":"swiss-cheese","value":"cook-tags:main-ingredient/cheese/swiss-cheese","count":1},{"type":"choice","label":"swordfish","value":"cook-tags:main-ingredient/fish/swordfish","count":1},{"type":"choice","label":"taco","value":"cook-tags:dish/taco","count":1},{"type":"choice","label":"tailgate-party","value":"cook-tags:occasions/party/tailgate-party","count":1},{"type":"choice","label":"tangerine","value":"cook-tags:main-ingredient/fruit/tangerine","count":1},{"type":"choice","label":"tea","value":"cook-tags:drinks/tea","count":1},{"type":"choice","label":"technique","value":"cook-tags:technique","count":1},{"type":"choice","label":"tequila","value":"cook-tags:main-ingredient/alcohol/tequila","count":1},{"type":"choice","label":"thai","value":"cook-tags:cuisine/asian/thai","count":2},{"type":"choice","label":"thanksgiving","value":"cook-tags:occasions/holiday/thanksgiving","count":31},{"type":"choice","label":"thyme","value":"cook-tags:herbs-spices/thyme","count":1},{"type":"choice","label":"tilapia","value":"cook-tags:main-ingredient/fish/tilapia","count":1},{"type":"choice","label":"toasting","value":"cook-tags:technique/toasting","count":1},{"type":"choice","label":"tofu","value":"cook-tags:main-ingredient/tofu","count":1},{"type":"choice","label":"tomatillos","value":"cook-tags:main-ingredient/vegetables/tomatillos","count":1},{"type":"choice","label":"tomato","value":"cook-tags:main-ingredient/vegetables/tomato","count":1},{"type":"choice","label":"trout","value":"cook-tags:main-ingredient/fish/trout","count":1},{"type":"choice","label":"tuna","value":"cook-tags:main-ingredient/fish/tuna","count":1},{"type":"choice","label":"turkey","value":"cook-tags:main-ingredient/poultry/turkey","count":1},{"type":"choice","label":"turnip","value":"cook-tags:main-ingredient/vegetables/turnip","count":1},{"type":"choice","label":"unknown","value":"unknown","count":20302},{"type":"choice","label":"valentines-day","value":"cook-tags:occasions/holiday/valentines-day","count":2},{"type":"choice","label":"vanilla","value":"cook-tags:herbs-spices/vanilla","count":1},{"type":"choice","label":"veal","value":"cook-tags:main-ingredient/meat/veal","count":1},{"type":"choice","label":"vegetables","value":"cook-tags:main-ingredient/vegetables","count":3},{"type":"choice","label":"vegetarian","value":"cook-tags:cooking-styles/vegetarian","count":2},{"type":"choice","label":"vietnamese","value":"cook-tags:cuisine/asian/vietnamese","count":3},{"type":"choice","label":"vodka","value":"cook-tags:main-ingredient/alcohol/vodka","count":1},{"type":"choice","label":"waffle","value":"cook-tags:dish/waffle","count":1},{"type":"choice","label":"water-chestnut","value":"cook-tags:main-ingredient/vegetables/water-chestnut","count":1},{"type":"choice","label":"watermelon","value":"cook-tags:main-ingredient/fruit/watermelon","count":1},{"type":"choice","label":"whisky","value":"cook-tags:main-ingredient/alcohol/whisky","count":1},{"type":"choice","label":"white-bean","value":"cook-tags:main-ingredient/beans-and-legumes/white-bean","count":1},{"type":"choice","label":"whole-wheat","value":"cook-tags:main-ingredient/flour/whole-wheat","count":1},{"type":"choice","label":"wine","value":"cook-tags:main-ingredient/alcohol/wine","count":1},{"type":"choice","label":"winter","value":"cook-tags:season/winter","count":1},{"type":"choice","label":"wok","value":"cook-tags:cookware-cooking-gadgets/wok","count":1},{"type":"choice","label":"yam","value":"cook-tags:main-ingredient/vegetables/yam","count":1},{"type":"choice","label":"yogurt","value":"cook-tags:main-ingredient/dairy/yogurt","count":1},{"type":"choice","label":"yuca","value":"cook-tags:main-ingredient/vegetables/yuca","count":1},{"type":"choice","label":"zucchini","value":"cook-tags:main-ingredient/vegetables/zucchini","count":1}]});
                          alert('IMP server is not responding.');
                        }
                });
        },

/////////////// REST HANDLERS FOR FIELD SERVICE /////////////////////////
        getLightbox: function( config ){

                if ( config.ctrlKey &&  so.lightbox.win && config.field === so.lightbox.field ){ //caching
                    so.lightbox.win.show( this );
                }else{
                    so.rest.requestField(config.field, function( data ){ 

                        var map = so.rest.transformMap( data.nameValueMap ); 
                        so.lightbox.open({
                                field: config.field, 
                                title: config.title,
                                sni_multi: config.sni_multi || so.lightbox.isMultiValue( config.field ),
                                menuOff: config.menuOff,
                                data:map
                        });
                        so.lightbox.restData = data;
                    });
                }
        },

        getCombo: function( field, combo ){

                so.rest.requestField( field, function( data ){
                  var store = combo.getStore();
                  var map = so.rest.transformCombo( data.nameValueMap );
                  store.loadData( map );
                  combo.restData = data;
                });
        },

        getRange: function( field, combo ){

                so.rest.requestRange( field, function( data ){
                  var store = combo.getStore();
                  var map = so.rest.transformCombo( data.nameValueMap );
                  store.loadData( map );
                });
        },

        getResource: function( field, combo ){

                so.rest.requestResource(field, function( data ){
                        
                        var map = so.rest.transformResource( data );  
                        var store = combo.getStore();
                        store.loadData( map );
                        combo.restData = data;
                });
        },

        getSlider: function( field, slider ){

                so.rest.requestField(field, function( data ){

                        var map = so.rest.transformSlider( data.nameValueMap );
                        var min = map[0].value, max = map[0].value;
                        for (var i=1; i<map.length; i+=1){
                          min = map[i].value < min ? map[i].value : min;
                          max = map[i].value > max ? map[i].value : max;
                        }
                        slider.setMinValue( min );
                        slider.setMaxValue( max );
                        if (config.multi){
                          slider.setValue(0, min);
                          slider.setValue(1, max);
                        }else{
                          slider.setValue( min );
                        }
                        slider.restData = data;
                });
        },

        getSpinner: function( field, spinner ){

                so.rest.requestField(field, function( data ){

                        var map = so.rest.transformSlider( data.nameValueMap );
                        var min = map[0].value, max = map[0].value;
                        for (var i=1; i<map.length; i+=1){
                          min = map[i].value < min ? map[i].value : min;
                          max = map[i].value > max ? map[i].value : max;
                        }
                        spinner.minValue = min;
                        spinner.maxValue = max;
                        spinner.restData = data;
                });
        },

        getHistory: function( evt ){
                var pageOffset = ( ( so.result.pageNum - 1 ) * so.result.pageSize ) //introduced after pagination
                var row = $CQ( evt.target ).attr( 'data-sni-row' ) - pageOffset - 1;
                var url =  so.result.getValue( row, 'current_url');
                so.rest.requestHistory(url, function( data ){

                        so.history.open( row, data );
                        so.history.restData = data;
                });
        },

/////////////// REST HANDLERS FOR FILTER SERVICE /////////////////////////
//IMPORTANT NOTE: there is two ways to handle a selection:
//one is calling requestFilter() directly and discriminate between current filters in your selection area and the added filter. 
//however this approach is buggy for certain combination of inclusions then exclusions then inclusions and does not provide the right count.
//the second way is to "re-do" all the filtes in your selection area. this way does not matter what combination of inclusion and exclusion you pick,
//every filter is correctly evaluated every time. The order filters are evaluated are based on your visual index inclusions first exclusions second.

        handleFilter: function( filter ){

              var c = CQ.Ext.getCmp( filter );
              var v = c.getValue();
              c.el.dom.style.background = "#FFE799";
              //so.rest.requestFilter({field:filter, values:[v], type:'filter'}, so.selection.do);
              so.selection.redo( {field:filter, values:[v], type:'filter'} );
        },

        handleLightbox: function(filter, lightbox){
                
                var v = lightbox.getValues();
                var l = so.getLabel( v );
                 //update field in form
                var c = CQ.Ext.getCmp( filter );
                c.sni_rawValues = v;
                c.setValue( l );
                c.el.dom.style.background = "#FFE799";
                //so.rest.requestFilter({field:filter, values:v, type:'lightbox' }, so.selection.do);
                so.selection.redo( {field:filter, values:v, type:'lightbox' } );
        },

        handleCombo:  function (filter, combo, f){
                
                 combo.el.dom.style.background = "#FFE799";   
                var v = typeof f === 'function' ?  f( filter, combo ) : [combo.getValue()];
                //so.rest.requestFilter( { field:filter, values:v, type:'combo' }, so.selection.do);
                so.selection.redo( { field:filter, values:v, type:'combo' } );
        },

        handleRange:  function (filter, combo, f){
                      
                var v = typeof f === 'function' ?  f( filter, combo ) : [combo.getValue()];
                //so.rest.requestFilter( { field:filter, values:v, type:'range' }, so.selection.do);
                so.selection.redo( { field:filter, values:v, type:'range' } );
        },

        handleRadio:  function (filter, radio, f){

                //when a radio switches values extjs fires a check event to check the new value and
                //then fires a check event again to uncheck the old value.
                //in the second case we do not want to call ajax.
                //code below checks if the radio value is uncheck then ajax call is aborted.
                if ( !radio.getValue() ){
                  return;
                }

                var v = typeof f === 'function' ?  f( filter, radio ) : ( radio.getValue() ? [radio.boxLabel] : [] );
                            
                //so.rest.requestFilter({field:filter, values:v, type:'radio'}, so.selection.do);
                so.selection.redo( { field:filter, values:v, type:'radio' } );
        },

        handleCheck:  function (filter, checkbox, f){ //special case since a checkbox has multi-values
                
                //the code checks if extjs called the function using a reset event and abort the transaction.
                //note: when extjs resets a set of checkboxes; extjs will fire the check event to uncheck them several times
                //then we need to abort the ajax call. The so.selection.remove function will call ajax in the right moment.
                if ( so.isReset ){
                  return;
                }

                var v = typeof f === 'function' ?  f( filter, checkbox ) : ( checkbox.getValue() ? [checkbox.boxLabel] : [] );
                            
                //so.rest.requestFilter({field:filter, values:v, type:'check'}, so.selection.do);
                so.selection.redo( { field:filter, values:v, type:'check' } );
        },

        handleSlider: function(filter, slider){

                var v = slider.getValues();
                //so.rest.requestFilter({field:filter, values:v, type:'slider' }, so.selection.do);
                so.selection.redo( { field:filter, values:v, type:'slider' } );
        },

        handleSpinner: function(filter, spinner){
                
                var v = spinner.getValue();
                //so.rest.requestFilter({field:filter, values:v, type:'spinner' }, so.selection.do);
                so.selection.redo( { field:filter, values:v, type:'spinner' } );
        },

        handleResults: function( assets ){
                so.result.load( assets );
                $CQ('.sni-main-wrapper').animate({opacity:1}, 150, function(){
                          $CQ('#sni-loading').height(0); //hide loading icon
                });
        },

        handleReload: function( assets ){
                $CQ('.sni-main-wrapper').remove();
                $CQ('.sni-main-wrapper').remove( true );
                so.result.load( assets );
                $CQ('.sni-main-wrapper').css({opacity:1}); //this is coming from animate
                $CQ('#sni-loading').height(0); //hide loading icon
        },

        handlePageViews:function( data ){
                  var v = so.format( data.totalPageViews );
                  document.querySelector('#sni-total-page-views .count').innerHTML = v;
                  so.result.pageViews = data;
        },

        handleModifyAssets:function(data){
        
                  so.result.reload();
        },

//**********  WEB SERVICE RESPONSE TRANSFORMATIONS ******************

  transformMap: function( m ){

      var i, l=m.length, x, a = [];
      for (i=0; i<l; i++){
          x = m[i];
          a.push( {value:x.label, rawValue:x.value, count:x.count} );
      }
      return a;
  },

  transformCombo: function( m ){

      var i, l=m.length, x, a = [];
      if ( l ===0 ){
        return [['','']];
      }
      for (i=0; i<l; i++){
        x = m[i];
          a.push( [ x.value, x.label+' ('+x.count+')' ] );
      }
      return a;
  },

  transformResource: function( m ){

      var i, l=m.length, x, a = [];
      for (i=0; i<l; i++){
        x = m[i];
          a.push( [ x.value, x.valueLabel ] );
      }
      return a;
  },

  transformSlider: function( m ){

      var x, a = [];
      for (x in m){
        if (m.hasOwnProperty(x)){
          a.push( {value:x-0, count:m[x]-0} );
        }
      }
      return a;
  },

  transformAssets: function( data ){
    
      function loadValues( data ){
        
        var f = so.grid.fields, l = f.length, i, w, x=[];
        for (i=0; i<l; i++){
          w = data[f[i].name];
          x.push( w ? w.valueLabel : '' );
        }
        return x;
      }

      var a = data.assetInfoList, l = a.length, i, r, b=[];
      for (i=0; i<l; i++){
          r = a[i].report;
          b.push(loadValues(r));
      }
      return b;
  }

}; 
})(so);
