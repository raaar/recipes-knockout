function IngredientsViewModel() {
	var self = this;

	this.ingredientList = ko.observableArray([]);
    this.itemToAdd = ko.observable("");

    this.showFavourites = ko.observable(false);
    this.showSearch = ko.observable(true);

    this.showSearchResults = ko.observable(true);
    self.showSingle = ko.observable(false);

    self.showSearchBar = ko.observable(true);

    self.singleHeartIcon = ko.observable(true);
    self.singleCheckIcon = ko.observable(false);


    self.favouriteList = ko.observable(true);
    self.singleFavourite = ko.observable(false);




	this.searchTags = function() {
		var terms = $('.ingredientTags').val();	
		//var yummlyJson = 'http://api.yummly.com/v1/api/recipes?_app_id=3d201ae5&_app_key=9da85e4d69408c34a30d4afa7ce7c549&callback=&' + terms + '&callback=?';
		var yummlyJson = 'http://api.yummly.com/v1/api/recipes?_app_id=3d201ae5&_app_key=9da85e4d69408c34a30d4afa7ce7c549&q='+ terms +'&callback=?';
		
		$.getJSON( yummlyJson , function(data) {
    		//console.log(data);	
    		self.firstName(data.matches);
		});	
	}

	this.search = function() {
		var list = this.ingredientList();
		var str = "";
		
		if (list.length == 0) {
			return null;
		} else if (list.length == 1) {
			str = list.toString();
		} else {
			for(i = 0 ; i < list.length ; i++) {
				str += list[i] + "+";	
			}
		}
		this.getData(str); 
	} 


	
	self.firstName = ko.observable("");

	this.getData = function(theData) {
		var terms = theData;		
		//var yummlyJson = 'http://api.yummly.com/v1/api/recipes?_app_id=3d201ae5&_app_key=9da85e4d69408c34a30d4afa7ce7c549&callback=&' + terms + '&callback=?';
		var yummlyJson = 'http://api.yummly.com/v1/api/recipes?_app_id=3d201ae5&_app_key=9da85e4d69408c34a30d4afa7ce7c549&q='+ terms +'&callback=?';
		
		$.getJSON( yummlyJson , function(data) {

    		//console.log(data);
    		
    		self.firstName(data.matches);

		});		
	}


	self.fullRecipe = ko.observable("");

	self.fullRecipeName = ko.observable("");
	self.fullRecipeIngredients = ko.observable("");
	self.fullRecipeUrl = ko.observableArray("");
	this.goToRecipe = function(x) {
		self.showSearchResults(false);
		self.showSingle(true);

		self.showSearchBar(false);
		console.log("hello")

		var selectedRecipeId = x.id;
		//self.rcName(x.recipeName);
		//self.rcIngredients(x.ingredients);
		var getRecipeCall = "http://api.yummly.com/v1/api/recipe/" + selectedRecipeId + "?_app_id=3d201ae5&_app_key=9da85e4d69408c34a30d4afa7ce7c549&callback=?";
		$.getJSON( getRecipeCall, function(data){
			console.log(data);
			self.fullRecipe(data);
			self.fullRecipeName(data.name);
			self.fullRecipeIngredients(data.ingredientLines);
			self.fullRecipeUrl(data.source.sourceRecipeUrl);
		})
	}


	console.log("you have " + (localStorage.length) +  " recipes saved");

	this.saveRecipe = function(theObject , y, z) {
		localStorage.setItem( self.favourites(), JSON.stringify(theObject));

		console.log("mutated");
		//self.favourites.valueHasMutated();
		//self.favouriteItem.valueHasMutated();
		//self.favouriteList.valueHasMutated();
	}

	this.clearStorage = function() {
		localStorage.clear();
	}

	self.favourites = ko.observableArray();
	self.favouriteItem = ko.observable();
	this.listFavourites = function() {
		this.showFavourites(true);
		this.showSearch(false);

		console.log('localStorage items, favourites items: ' + self.favourites().length);
		console.log(this.favourites());
	}


	for (var i in localStorage) {
		self.favouriteItem = JSON.parse(localStorage[i]);
		this.favourites.push(this.favouriteItem);
		//this.favourites.push(localStorage[i]);
	}

	self.favouriteWholeRecipe = ko.observable('');
	self.favouriteName = ko.observable('');
	self.favouriteUrl = ko.observable('');
	self.favouriteIngredients = ko.observable('');
	this.openFavourite = function(data, a, b) {
		console.log(data);
		self.favouriteWholeRecipe(data)
		self.favouriteName(data.name);
		self.favouriteIngredients(data.ingredientLines);
		self.favouriteUrl(data.source.sourceRecipeUrl);

		self.favouriteList(false);
		self.singleFavourite(true);
	}

	this.deleteFavourite = function() {
		console.log(self.favourites());
	}


	this.openSearch = function() {
		this.showFavourites(false);
		this.showSearch(true);		
	}

	ko.bindingHandlers.fadeVisible = {
    	init: function(element, valueAccessor) {
        	var shouldDisplay = valueAccessor();
        	$(element).toggle(shouldDisplay);
    	},
    	update: function(element, valueAccessor) {
        	// On update, fade in/out
        	var shouldDisplay = valueAccessor();
        	shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
    	}
	};

	$(".ingredientTags").tagsInput();


	$('.navigation-button').click(function(){
		$('.navigation-button').removeClass('current');
		$(this).addClass('current');
	});
	
    $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();


};

var vm = new IngredientsViewModel();
ko.applyBindings(vm);