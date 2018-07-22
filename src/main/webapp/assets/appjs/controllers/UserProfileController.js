'use strict';

MetronicApp.controller('UserProfileController', function($rootScope, $scope,
		$http, $timeout, $log, maiqi) {
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
			$rootScope.userData = result.data.userData;
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
	
	$scope.uploadIcon = function(){
		var form = new FormData();
        var file = $('#user_icon')[0].files[0];
        form.append('icon', file);
        maiqi.post({url:'views/profile/uploadIcon',
			data:form,
			headers:{'Content-Type':undefined},
			transformRequest: angular.identity,
			errMsg:'上传头像失败！',container:'#accountPanel'})
			.then(function(response){
	        	let res = response.data;
	        	if(res.isSuccess && res.data.userImgVersion){
	        		$scope.$applyAsync(function(){
	        			$rootScope.userData.userImgVersion = res.data.userImgVersion;
	        		});
		        	Metronic.alert({
	                    type: 'success',
	                    icon: 'check',
	                    message: '上传头像成功！',
	                    container: '#accountPanel',
	                    closeInSeconds: 3, 
	                    place: 'prepend'
	                });
	        	}	        
			})
			.finally(function(){
				Metronic.unblockUI("#accountPanel");
			})
	};
	
	$scope.changePassword = function(){
		if(!$('#orgPass').val()){
			Metronic.alert({
                type: 'danger',
                icon: 'warning',
                message: '请录入原密码！',
                container: '#accountPanel',
                closeInSeconds: 3, 
                place: 'prepend'
            });
		}
		if(!$('#newPass').val() || !$('#rePass').val() || $('#newPass').val()!=$('#rePass').val()){
			Metronic.alert({
                type: 'danger',
                icon: 'warning',
                message: '请输入新密码，并且两次输入要一致！',
                container: '#accountPanel',
                closeInSeconds: 3, 
                place: 'prepend'
            });
		}
		maiqi.post({url:'views/profile/changePassword',
			data:{ orgPass: $('#orgPass').val(), newPass: $('#newPass').val() },
			container:'#accountPanel'})
			.then(function(response){
	        	let res = response.data;
	        	if(res.isSuccess ){
	        		$('#orgPass').val('');
	        		$('#newPass').val('');
	        		$('#rePass').val('');
		        	Metronic.alert({
	                    type: 'success',
	                    icon: 'check',
	                    message: '密码修改成功！',
	                    container: '#accountPanel',
	                    closeInSeconds: 3, 
	                    place: 'prepend'
	                });
	        	}	        
			})
			.finally(function(){
				Metronic.unblockUI("#accountPanel");
			})
	};
});
