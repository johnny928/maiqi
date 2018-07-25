/* Setup general page controller */
MetronicApp.controller('ClientEditCtrl', ['$rootScope', '$scope', 'settings','$modal', '$log', 
 '$state', '$stateParams','$http', '$filter','$compile','maiqi','$q',
function($rootScope, $scope, settings, $modal, $log, $state, $stateParams, $http, $filter, $compile, maiqi,$q) {

	let clientId = $stateParams.clientId;
	
	let initSelect2 = function(_client){
		if(_client){
//			$('#client-level').val(_client.level).trigger('change');
			$('#client-level').val(_client.level||'').select2();
		}
	};
	
	let initTags = function(_client){
		if (!jQuery().tagsInput) {
            return;
        }
		if(!$('.client_label').data('isTagsInputObj')){
			$('.client_label').tagsInput({
	            width: 'auto',
	            defaultText: '添加标签',
	            'onAddTag': function () {
	                //alert(1);
	            }
	        });
	        $('.client_label').data('isTagsInputObj',true);
		}
    	$('.client_label').val('');
    	$('.client_label').removeTag('');
    	$('.client_label').tagsInput.importTags('.client_label', (_client && _client.label)||'');
	};
	
	let initDatePick = function(){
		$scope.open = function($event) {
	    	$event.preventDefault();
	    	$event.stopPropagation();

	    	$scope.opened = true;
	  	};
	  	
	  	$scope.dateOptions = {
				language: 'zh-CN',
	        autoclose: true,
	        todayHighlight: true,
	        showWeeks: false,
	    	startingDay: 1
	  	};
	}
	
	let initTable = function(){
		Metronic.blockUI({
            target: "#clientEditPanel",
            animate: true,
            overlayColor: 'none'
        });
		maiqi.post({url:'getOperators',errMsg:'获取操作员数据失败！',container:'#clientEditPanel'})
			.then(function(response) {
	        	let res = response.data;
	        	if(res.isSuccess && res.data && res.data.allOperators){
	        		$scope.operators = res.data.allOperators || [];
	        		$scope.author = res.data.author || {};
	        	}
	        })
	        .then(function(){
	        	maiqi.post({url:'views/clients/getClientById',data:{clientId: clientId},errMsg:'获取客户数据失败！',container:'#clientEditPanel'})
					.then(function(response) {
			        	let res = response.data;
			        	$log.log(res);
			        	if(res.isSuccess){
			        		$scope.client = res.data.client || {};
			        		initSelect2( $scope.client || null);
			        		initTags($scope.client);
			        	}
			        })
			        .then(function(){
			        	initClientSource();
			        })
	        })
	        .finally(function(){
	        	Metronic.unblockUI("#clientEditPanel");
	        });
		
		$('.date-picker').each(function(index,el){
//	    	console.log($(el).attr('data-date'));
	    })
	};
	
	let getClientData = function(){
		if(typeof $scope.client.birthday != 'string'){
			$scope.client.birthday = $filter('date')($scope.client.birthday,'yyyy-MM-dd');
		}
		$scope.client.label = $('.client_label').val();
		$scope.client.clientSource = ($scope.clientSource.selected && $scope.clientSource.selected.userId) || '';
	};
	
	$scope.saveClient = function(){
		getClientData();
		Metronic.blockUI({
            target: "#clientEditPanel",
            animate: true,
            overlayColor: 'none'
        });
		
		maiqi.post({url:'views/clients/saveClient',data:{client:$scope.client},errMsg:'保存出错！',container:'#clientEditPanel'})
			.then(function(response) {
				let res = response.data;
				Object.assign($scope.client,res.data.client);
				maiqi.toastr.success('保存成功！');
	        })
	        .finally(function(){
	        	Metronic.unblockUI("#clientEditPanel");
	        });
	};
	
	let initClientSource = function(){
		$scope.clientSource = {};
		let initS = $scope.client.clientSource;
		if( initS ){
			let sel = $scope.operators.filter(function(node,index){
				return node.userId == initS;
			});
			if(sel && sel.length>0){
				$scope.clientSource.selected = sel[0];
			}
		}
		$scope.clearClientSource = function($event,$select){
			console.log('here');
			$event.preventDefault();
			$event.stopPropagation(); 
			$scope.clientSource.selected = undefined;
			$scope.clientSource.search = undefined;
		}
	};
	
	initSelect2();
	initTags();
	initDatePick();
	initTable();
}]);