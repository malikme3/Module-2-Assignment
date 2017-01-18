(function() {
    'use strict';

    angular.module('ShoppingListApp', [])
        .controller('ToBuyListController', ToBuyListController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListService', ShoppingListService);


    ToBuyListController.$inject = ['ShoppingListService'];

    function ToBuyListController(ShoppingListService) {
        var ToBuyListController = this;
        ToBuyListController.items = ShoppingListService.getToBuyItems();

        ToBuyListController.checkOff = function(index) {
            ShoppingListService.checkOff(index);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListService'];

    function AlreadyBoughtController(ShoppingListService) {
        var alreadyBoughtCtrl = this;
        alreadyBoughtCtrl.items = ShoppingListService.getBoughtItems();
    }

    function ShoppingListService() {
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

        service.checkOff = function(index) {
            boughtItems.push(toBuyItems[index]);
            toBuyItems.splice(index, 1);
        };
    }

})();
