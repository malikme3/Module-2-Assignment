(function() {
    'use strict';

    angular.module('ShoppingListApp', [])
        .controller('BuyController', ToBuyController)
        .controller('BoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyController = this;
        toBuyController.items = ShoppingListCheckOffService.getToBuyItems();
        toBuyController.checkOut = function() {
            ShoppingListCheckOffService.checkOut();
        };

        toBuyController.checkOff = function(index, name, quantity) {
            ShoppingListCheckOffService.checkOff(index, name, quantity);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBoughtController = this;
        alreadyBoughtController.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var boughtItems = [];
        var toBuyItems =

            [{
                    name: "laptop",
                    quantity: "10",
                    checkedFlag: false,
                    itemMessage: "Please click to buy Item"

                },
                {
                    name: "Cell Phone",
                    quantity: "10",
                    checkedFlag: false,
                    itemMessage: "Please click to buy Item"
                },
                {
                    name: "Ipad",
                    quantity: "5",
                    checkedFlag: false,
                    itemMessage: "Please click to buy Item"
                },
                {
                    name: "Tablet",
                    quantity: "20",
                    checkedFlag: false,
                    itemMessage: "Please click to buy Item"
                },
                {
                    name: "Ipode",
                    quantity: "15",
                    checkedFlag: false,
                    itemMessage: "Please click to buy Item"
                },
                {
                    name: "Kindle",
                    quantity: "2",
                    checkedFlag: false,
                    itemMessage: "Please click to buy Item"
                }
            ];

        service.getToBuyItems = function() {
            return toBuyItems;
        };

        service.getBoughtItems = function() {
            return boughtItems;
        };

        service.checkOff = function(index, name, quantity) {
          
            var obj = {
                name: name,
                quantity: quantity,
                checkedFlag: true,
                itemMessage: "Item is Checked"
            };
            toBuyItems.splice(index, 1, obj);
        };

        service.checkOut = function() {

            angular.forEach(toBuyItems, function(item) {
                if (item.checkedFlag) {

                    var index = toBuyItems.findIndex(x => x.name == item.name);
                    if(toBuyItems[index].name !=''){
                    boughtItems.push(toBuyItems[index]);
                  }
                    //indexArray.push(index);
                    var obj2 = {
                        name: "",
                        quantity: "",
                        checkedFlag: true,
                        itemMessage: "Item is Checked out"
                    };
                    toBuyItems.splice(index, 1, obj2);

                }
            });
        };
    }

})();
