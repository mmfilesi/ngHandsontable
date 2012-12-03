/**
 * Below module declaration is used in ui.html
 */
angular.module('uiApp', ['ui', 'uiHandsontable']);

/**
 * Below controller declaration is used in ui.html and split-screen.html
 */
function MyCtrl($scope, $filter) {
  var products = [
    {
      "Description": "Big Mac",
      "Options": [
        {"Description": "Big Mac", "Image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/hamburger.png", Pick$: null},
        {"Description": "Big Mac & Co", "Image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/hamburger.png", Pick$: null}
      ]
    },
    {
      "Description": "Fried Potatoes",
      "Options": [
        {"Description": "Fried Potatoes", "Image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png", Pick$: null},
        {"Description": "Fried Onions", "Image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png", Pick$: null}
      ]
    }
  ];

  var firstNames = ["Ted", "John", "Macy", "Rob", "Gwen", "Fiona", "Mario", "Ben", "Kate", "Kevin", "Thomas", "Frank"];
  var lastNames = ["Tired", "Johnson", "Moore", "Rocket", "Goodman", "Farewell", "Manson", "Bentley", "Kowalski", "Schmidt", "Tucker", "Fancy"];
  var address = ["Turkey", "Japan", "Michigan", "Russia", "Greece", "France", "USA", "Germany", "Sweden", "Denmark", "Poland", "Belgium"];

  $scope.items = [];
  for (var i = 0; i < 10000; i++) {
    $scope.items.push(
      {
        id: i + 1,
        name: {
          first: firstNames[Math.floor(Math.random() * firstNames.length)],
          last: lastNames[Math.floor(Math.random() * lastNames.length)]
        },
        address: Math.floor(Math.random() * 100000) + ' ' + address[Math.floor(Math.random() * address.length)],
        isActive: 'Yes',
        Product: $.extend({}, products[Math.floor(Math.random() * products.length)])
      }
    );
  }

  $scope.dumpItems = function () {
    console.log("dump items", $scope.items);
  };

  $scope.grayedOut = {
    renderer: function (instance, td, row, col, prop, value, cellProperties) {
      Handsontable.TextCell.renderer.apply(this, arguments);
      td.style.color = '#777';
    }
  };

  /**
   * Filter
   */

  $scope.$watch('query', function (newVal, oldVal) {
    $scope.filteredItems = $filter('filter')($scope.items, $scope.query);
  });
  $scope.filteredItems = $scope.items;

  /**
   * Selection
   */

  $scope.currentSelection = "None";

  $scope.$on('datagridSelection', function (scope, $container, r, p, r2, p2) {
    var ht = $container.data('handsontable');
    var str = "row '" + r + "' col '" + ht.propToCol(p) + "' (prop '" + p + "')";
    if (r !== r2 && p !== p2) {
      str = "From " + str + " to row '" + r2 + "' col '" + ht.propToCol(p2) + "' (prop '" + p2 + "')";
    }
    $scope.$apply(function () {
      $scope.currentSelection = str;
    });
  });
}