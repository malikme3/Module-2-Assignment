(function() {
    'use strict'
    angular.module("ShoppingListCheckOff", [])
        .controller("ToBuyController", buyController)
        .controller("ALreadyBoughtController", boughtController)
        .service("ShoppingListCheckOffService", checkOffService);

    buyController.$inject = ['$scope', 'ShoppingListCheckOffService'];

    function buyController($scope, ShoppingListCheckOffService) {

        var buyCtrl = this;

        buyCtrl.name = "Ahmad";
        buyCtrl.message = "Please click here to buy ITEM";
        buyCtrl.boughtFlag = false;
        var index = "";
        var name = "";
        var quantity = "";
        buyCtrl.buyList = [];
        buyCtrl.isEveryThingBought = false;
        buyCtrl.checked = function(index, name, quantity) {
            ShoppingListCheckOffService.addBoughtItem(index, name, quantity);
            buyCtrl.boughtFlag = true;
            ShoppingListCheckOffService.removedCheckedItem(index);
            if (buyCtrl.buyList.length > 0) {
                buyCtrl.isEveryThingBought = false;
            } else {
                buyCtrl.isEveryThingBought = true;
            };

        }

        buyCtrl.buyList = ShoppingListCheckOffService.getAvailableItems();
    };

    boughtController.$inject = ['ShoppingListCheckOffService'];

    function boughtController(ShoppingListCheckOffService) {
        var boughtCtrl = this;

        boughtCtrl.boughtList = ShoppingListCheckOffService.getBoughtItem();

    };

    function checkOffService() {
        var checkServ = this;
        var availAbleItems = [{
                name: "laptop",
                quantity: "10",
                price: "5000",
            },
            {
                name: "Cell Phone",
                quantity: "10",
                price: "500",
            },
            {
                name: "Ipad",
                quantity: "5",
                price: "250",
            },
            {
                name: "Tablet",
                quantity: "20",
                price: "5000",
            },
            {
                name: "Ipode",
                quantity: "15",
                price: "255.0",
            },
            {
                name: "Kindle",
                quantity: "2",
                price: "1000",
            }
        ];

        var boughtItems = [];


        checkServ.getAvailableItems = function() {

            return availAbleItems;
        };
        checkServ.removedCheckedItem = function(index) {
            availAbleItems.splice(index, 1);

        };

        checkServ.addBoughtItem = function(index, name, quantity) {

            if (name || quantity) {
                boughtItems.push({
                    name: name,
                    quantity: quantity
                })
            }

        };


        checkServ.getBoughtItem = function() {
            console.table(boughtItems);
            return boughtItems;
        };

    };



})();
