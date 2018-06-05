/* Setup general page controller */
MetronicApp.controller('OrderEditCtrl', ['$rootScope', '$scope', 'settings','$modal', '$log', 
                                         '$state', '$stateParams','$http', '$filter',
	function($rootScope, $scope, settings, $modal, $log, $state, $stateParams, $http, $filter) {
		$scope.tabClick = function(tabName){
			$(tabName).addClass('active in');
		}
		
		let orderId = $stateParams.orderId;
		
		let initData = function(){
			Metronic.blockUI({
                target: "#orderEditPanel",
                animate: true,
                overlayColor: 'none'
            });
			if(orderId){
				//修改
				$http.post(
		            'views/orders/getOrderInfo',
		            {orderId:orderId}
		        ).then(function(response) {
		        	let res = response.data;
		        	$log.log(res);
		        	if(res.isSuccess){
		        		$scope.orderInfo = res.data.orderInfo;
		        		$scope.orderNumber = res.data.orderInfo.order.orderNumber;
		        		initSelect2( ($scope.orderInfo && $scope.orderInfo.client) || null);
		        		initTags($scope.orderInfo);
		        	}
		        	Metronic.unblockUI("#orderEditPanel");
		        },function(){
		        	Metronic.unblockUI("#orderEditPanel");
		        	Metronic.alert({
                        type: 'danger',
                        icon: 'warning',
                        message: '获取订单数据失败',
                        container: '#orderEditPanel',
                        place: 'prepend'
                    });
		        });
			}else{
				//新增
				$http.post(
		            'views/orders/getOrderNumber'
		        ).then(function(response) {
		        	let res = response.data;
		        	if(res.isSuccess){
		        		$scope.orderNumber = res.data.orderNumber;
		        	}else{
		        		Metronic.alert({
	                        type: 'danger',
	                        icon: 'warning',
	                        message: '获取订单号失败',
	                        container: '#orderEditPanel',
	                        place: 'prepend'
	                    });
		        	}
		        	Metronic.unblockUI("#orderEditPanel");
		        },function(){
		        	Metronic.unblockUI("#orderEditPanel");
		        	Metronic.alert({
                        type: 'danger',
                        icon: 'warning',
                        message: '获取订单号失败',
                        container: '#orderEditPanel',
                        place: 'prepend'
                    });
		        });
			}
			$('.date-picker').each(function(index,el){
		    	console.log($(el).attr('data-date'));
		    })
		};
		
		let initSelect2 = function(_client){
			if(_client && _client.level){
//				$('#client-level').val(_client.level).trigger('change');
				$('#client-level').val(_client.level).select2();
			}
		};
		
		let initTags = function(_orderInfo){
			if (!jQuery().tagsInput) {
	            return;
	        }
	        $('#client_label').tagsInput({
	            width: 'auto',
	            defaultText: '添加标签',
	            'onAddTag': function () {
	                //alert(1);
	            },
	            'onChange': function(){
	            	_orderInfo.client.label = $('#client_label').val();
	            }
	        });
	        if(_orderInfo && _orderInfo.client){
	        	$('#client_label').tagsInput.importTags('#client_label',_orderInfo.client.label);
	        }
	        
		};
		
		initData();
		
		let getClientData = function(){
			if($scope.orderInfo && $scope.orderInfo.client){
				if(typeof $scope.orderInfo.client.birthday != 'string'){
					$scope.orderInfo.client.birthday = $filter('date')($scope.orderInfo.client.birthday,'yyyy-MM-dd');
				}
			}
		};
		
		$scope.saveOrder = function(){
			getClientData();
			$log.log($scope.orderInfo);
		};
		
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
}]);