/* Setup general page controller */
MetronicApp.controller('OrderEditCtrl', ['$rootScope', '$scope', 'settings','$modal', '$log', 
	function($rootScope, $scope, settings, $modal, $log) {
		$scope.tabClick = function(tabName){
			$(tabName).addClass('active in');
		}
}]);