(function(myApp){

	function ProductsViewModel() {
		var self = this;

		self.selectedProduct = ko.observable();

		self.selectedProduct = ko.observable();

		self.productCollection = ko.observableArray([]);
	}

	myApp.ProductsViewModel = ProductsViewModel;

	self.addNewProduct = function() {
		var p = new myApp.Product();
		self.selectedProduct(p);
	};

	self.doneEditingProduct = function() {
		var p = self.selectedProduct();

		if(!p) {
			return;
		}

		if(self.productCollection.indexOf(p) > -1) {
			return;
		}


		self.productCollection.push(p);

		self.selectedProduct(null);
	}



}(window.myApp));