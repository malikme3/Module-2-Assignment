(function() {
    'use strict';

    angular.module('ShoppingListApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .controller('BoughtListController', BoughtListController)
        .provider('ShoppingListService', ShoppingListServiceProvider)
        .config(Config);

    Config.$inject = ['ShoppingListServiceProvider'];

    function Config(ShoppingListServiceProvider) {
        // Save Yaakov from himself
        ShoppingListServiceProvider.defaults.maxItems = 2;
    }


    ShoppingListController.$inject = ['ShoppingListService'];

    function ShoppingListController(ShoppingListService) {
        var list = this;
        list.isAllBoughtFlag = false

        list.items = ShoppingListService.getItems();

        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function() {
            try {
                ShoppingListService.addItem(list.itemName, list.itemQuantity);
            } catch (error) {
                list.errorMessage = error.message;
            }
        };

        list.removeItem = function(itemIndex, itemQuantity, itemName) {
            ShoppingListService.removeItem(itemIndex, itemQuantity, itemName);
        };

        list.isAllBought = function() {
            var isAllBought = ShoppingListService.isEveryThingBought();
            if(isAllBought){
              list.isAllBoughtFlag = true;
            } else {
              list.isAllBoughtFlag = false;
            }
        };
    };

    BoughtListController.$inject = ['ShoppingListService'];

    function BoughtListController(ShoppingListService) {
        var Boughtlist = this;
        Boughtlist.nothingBought = true;

        Boughtlist.items = ShoppingListService.getBoughtItems();

Boughtlist.boughtCheck = function (){
  if (Boughtlist.items.length >1) {
    Boughtlist.nothingBought = true;
  } else {
    Boughtlist.nothingBought = true;
  }
};
    };

    function ShoppingListService(maxItems) {
        var service = this;
        var boughtItems = [];
        var  isAllBought = false;

        var items = [{
                itemName: "laptop",
                itemQuantity: "10",
                checkedFlag: false,
                itemMessage: "Please click to buy Item"

            },
            {
                itemName: "Cell Phone",
                itemQuantity: "10",
                checkedFlag: false,
                itemMessage: "Please click to buy Item"
            },
            {
                itemName: "Ipad",
                itemQuantity: "5",
                checkedFlag: false,
                itemMessage: "Please click to buy Item"
            },
            {
                itemName: "Tablet",
                itemQuantity: "20",
                checkedFlag: false,
                itemMessage: "Please click to buy Item"
            },
            {
                itemName: "Ipode",
                itemQuantity: "15",
                checkedFlag: false,
                itemMessage: "Please click to buy Item"
            },
            {
                itemName: "Kindle",
                itemQuantity: "2",
                checkedFlag: false,
                itemMessage: "Please click to buy Item"
            }
        ];
        var boughtItems = [{
            itemName: "",
            itemQuantity: "",
            boughtFlag: false,
        }];

        service.addBoughtItems = function(itemName, quantity) {
            if ((maxItems === undefined) ||
                (maxItems !== undefined) || (items.length < maxItems)) {
                var item = {
                    itemName: itemName,
                    itemQuantity: quantity,
                    boughtFlag: true
                };
                boughtItems.push(item);
            } else {
                throw new Error("Max items (" + maxItems + ") reached.");
            }
        };


        service.getItems = function() {

            return items;
        };

        service.isEveryThingBought = function() {

            angular.forEach(items, function(item) {
                if (item.itemMessage == 'Please click to buy Item') {
                    isAllBought = false;
                } else {
                    isAllBought = true;
                };

            });
            return isAllBought;
        };

        service.getBoughtItems = function() {
            return boughtItems;
        };

        service.removeItem = function(itemIndex, itemQuantity, itemName) {
            service.addBoughtItems(itemQuantity, itemName);
            var obj = {
                itemName: itemName,
                itemQuantity: itemQuantity,
                checkedFlag: true,
                itemMessage: "Item is Checked"
            };
            items.splice(itemIndex, 1, obj);
        };

    }


    function ShoppingListServiceProvider() {
        var provider = this;

        provider.defaults = {
            maxItems: 10
        };

        provider.$get = function() {
            var shoppingList = new ShoppingListService(provider.defaults.maxItems);

            return shoppingList;
        };
    }

})();
