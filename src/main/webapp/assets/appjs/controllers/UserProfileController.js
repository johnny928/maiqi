'use strict';

MetronicApp.controller('UserProfileController', function($rootScope, $scope,
		$http, $timeout, $log) {
	$scope.$on('$viewContentLoaded',
			function() {
				Metronic.initAjax(); // initialize core components
				Layout.setSidebarMenuActiveLink('set',
						$('#sidebar_menu_link_profile')); // set profile link
															// active in sidebar
															// menu
			});

	// set sidebar closed and body solid layout mode
	$rootScope.settings.layout.pageBodySolid = false;
	$rootScope.settings.layout.pageSidebarClosed = false;

	var orgAuthorData = {};
	
	$http({
		method : 'POST',
		url : 'views/profile/getAuthor',
		data: {}
	}).then(function successCallback(response) {
		var result = response.data;
		if(result.isSuccess == 1){
			$scope.author = result.data.author;
			orgAuthorData = jQuery.extend(orgAuthorData, $scope.author, {});
		}
	}, function errorCallback(response) {
		// 请求失败执行代码
	});

	$scope.accountSave = function(isValid) {
		if(isValid){
			Metronic.blockUI({
				target : 'body',
				animate : true
			});
			$http({
				method : 'POST',
				url : 'views/profile/saveAuthor',
				data: {'userName':$scope.author.userName,
					'loginName':$scope.author.loginName,
					'userDesc':$scope.author.userDesc}
			}).then(function successCallback(response) {
				var result = response.data, msg = result.message;
				Metronic.unblockUI('body');
				if(result.isSuccess == 1){
					Metronic.alert({
		                container: '', // alerts parent container(by default placed after the page breadcrumbs)
		                place: 'append', // append or prepent in container 
		                type: 'success',  // alert's type
		                message: '保存成功！',  // alert's message
		                close: true, // make alert closable
		                reset: true, // close all previouse alerts first
		                focus: true, // auto scroll to the alert after shown
		                closeInSeconds: 1, // auto close after defined seconds
		                icon: 'check' // put icon before the message
		            });
				}else{
					Metronic.alert({
		                container: '', // alerts parent container(by default placed after the page breadcrumbs)
		                place: 'append', // append or prepent in container 
		                type: 'danger',  // alert's type
		                message: '保存失败！发现异常：'+msg,  // alert's message
		                close: true, // make alert closable
		                reset: true, // close all previouse alerts first
		                focus: true, // auto scroll to the alert after shown
		                closeInSeconds: 5, // auto close after defined seconds
		                icon: 'warning' // put icon before the message
		            });
				}
				
			}, function errorCallback(response) {
				Metronic.unblockUI('body');
				Metronic.alert({
	                container: '', // alerts parent container(by default placed after the page breadcrumbs)
	                place: 'append', // append or prepent in container 
	                type: 'danger',  // alert's type
	                message: '调用后台接口失败！',  // alert's message
	                close: true, // make alert closable
	                reset: true, // close all previouse alerts first
	                focus: true, // auto scroll to the alert after shown
	                closeInSeconds: 5, // auto close after defined seconds
	                icon: 'warning' // put icon before the message
	            });
			});
		}
	};

	$scope.accountCancel = function() {
		$scope.author = jQuery.extend({}, orgAuthorData, {});
	};
});
