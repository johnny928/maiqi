
/* Setup general page controller */
MetronicApp.controller('OrderModalCtrl', ['$rootScope', '$scope', '$uibModal', 'settings', '$log', '$compile', '$document', '$state', 'maiqi',
	function($rootScope, $scope, $uibModal, settings,  $log, $compile, $document, $state, maiqi) {
	
	var _date = new Date();
	var _dateE = new Date();
	_dateE.setDate(_dateE.getDate() + 1);
	
	if (jQuery().datepicker && MaiQi) {
		MaiQi.init();
		$('.portlet a.maiqi-search-collapse').trigger('click');
    }
	
	$scope.queryCond = {
		orderTimeS: _date.toISOString().substr(0,10),
		orderTimeE: _dateE.toISOString().substr(0,10),
		clientName: '',
		salespersonName: ''
	};
	
	$scope.openGoods = function(orderId){
		
    	var modalInstance = $uibModal.open({
	      templateUrl: 'myModalContent.html',
	      controller: 'OrderModalInstanceCtrl',
	      windowClass: 'orderdetail-modal',
	      keyboard: true,
	      resolve: {
	        _orderId: function () {
	          return orderId;
	        }
	      }
	    });
    	modalInstance.result.then(function(){},function(){});
    	modalInstance.opened.then(function(){});
    	modalInstance.rendered.then(function(){
    		$('.orderdetail-modal').find('.modal-dialog').css({
    			top: $('#orders_table').parents('.portlet').offset().top-30
    		});
    	});
    };
    
    let handleConfirm = function(){
		$('.del-order').confirmation({
			title: '确认删除此订单？',
			btnOkLabel: '确认',
			btnCancelLabel: '取消',
			onConfirm: function(event,el){
				event.preventDefault();
				let orderId = el.attr('data-orderId');
				$scope.delOrder(orderId);
			}
		})
    };
    
    $scope.orderEdit = function(event,_orderId){
    	event.preventDefault();
    	$state.go('orderEditer',{orderId: _orderId})
    };
    
    $scope.delOrder = function(_orderId){
    	maiqi.post({url:'views/orders/delOrder',
			data:{orderId:_orderId},
			errMsg:'删除商品失败！',container:'#orderPanel'})
			.then(function(response){
	        	let res = response.data;
	        	if(res.isSuccess){
	        		if($scope.orderList){
	        			$scope.orderList.getDataTable().ajax.reload();
	        		}
	        		Metronic.unblockUI("#orderPanel");
		        	Metronic.alert({
	                    type: 'success',
	                    icon: 'check',
	                    message: '删除成功！',
	                    container: '#orderPanel',
	                    closeInSeconds: 3, 
	                    place: 'prepend'
	                });
	        	}	        
			})
			.finally(function(){
				Metronic.unblockUI("#orderPanel");
			})
    };
    
    $scope.newOrder = function(){
    	Metronic.blockUI({
            target: "#orderPanel",
            animate: true,
            overlayColor: 'none'
        });
		
		maiqi.post({url:'views/orders/createOrder',data:{},errMsg:'保存出错！',container:'#orderPanel'})
			.then(function(response) {
	        	let res = response.data;
	        	if(res.isSuccess && res.data && res.data.order && res.data.order.orderId){
	        		Metronic.unblockUI("#orderPanel");
	        		$state.go('orderEditer',{orderId: res.data.order.orderId});
	        	}		        	
	        })
	        .finally(function(){
	        	Metronic.unblockUI("#orderPanel");
	        });
    };
	
	var initTable = function () {
		var oTable = new Datatable();
		oTable.setAjaxParam('queryCond',JSON.stringify($scope.queryCond));
		oTable.init({
			src: $("#orders_table"),
			dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 
				"scrollY": "300",
				"ordering": false,
				"processing": true,
				"serverSide": true, //启用服务器端分页
				"paginate": true,
				"deferRender": true,
				"searching": false, //禁用原生搜索
				"bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                "ajax": {
                    "url": "views/orders/getOrders" // ajax source
                },
                "columns": [
                    {
                    	"data": "orderNumber"
                    },
                    {
                    	"data": "clientName"
                    },
                    {	
                    	"data": "totalPrice"
                    },
                    {	
                    	"data": null,
                    	
                    },
                    {	
                    	"data": "salesperson"
                    },
                    {	
                    	"data": "clientSource"
                    },
                    {	
                    	"data": null
                    }
                ],
               "columnDefs": [
	               {
	            	   'defaultContent':'',
	            	   'targets': [0,1,2,3,4,5,6]
	               },
	               {
	            	   'targets': [3],
	                	"createdCell": function(td, cellData, rowData, row, col){
	                		var html = '<button class="btn default" data-toggle="modal" ng-click="openGoods(\''+rowData.orderId+'\')" > '+rowData.goodsCnt+' </button>';
	                		$(td).append($compile(html)($scope));
	                	}
	               },
	               {
	            	   'targets': [6],
	                	"createdCell": function(td, cellData, rowData, row, col){
	                		let eles = ['<div><button class="btn btn-xs btn-success" ng-click="orderEdit($event,\''+rowData.orderId+'\')" >修改</button>',
	         		            '<p></p>',
	         		            '<button class="btn btn-xs green-stripe del-order" data-toggle="confirmation" data-placement="top" data-orderId="'+rowData.orderId+'">删除</button>',
	     		            '</div>'];
	                		let html = eles.join('\n');
	                		$(td).append($compile(html)($scope));
	                	}
	               }
               ]
            },
            onError: function (grid) {
            }
		});
		$scope.orderList = oTable;
		
		$("#orders_table").on('preXhr.dt xhr.dt',function(e, settings, data){
			$log.log('on xhr');
			Metronic.blockUI({
                target: "#orders_table",
                animate: true,
                overlayColor: 'none'
            });
		}).on('init.dt draw.dt',function (e, settings, data){
			$log.log('on draw');
			handleConfirm();
			Metronic.unblockUI("#orders_table");
		});
		
		$('#searchBtn, #tools-reload').on('click',function(e){
			e.preventDefault();
			$log.log('JSON.stringify($scope.queryCond)=',JSON.stringify($scope.queryCond))
			oTable.setAjaxParam('queryCond',JSON.stringify($scope.queryCond));
			oTable.getDataTable().ajax.reload();
//			oTable.clearAjaxParams();
		});
		
    };
    initTable();
    
}]);


MetronicApp.controller('OrderModalInstanceCtrl', ['$rootScope', '$scope', 'settings','$uibModal', '$uibModalInstance', '$log', '_orderId',
   function($rootScope, $scope, settings, $uibModal, $uibModalInstance, $log, _orderId) {
	$scope.orderId = _orderId;
	$uibModalInstance.rendered.then(function(){
		var initDetailsTable = function () {
			var oTable = new Datatable();
			oTable.setAjaxParam('orderId',_orderId);
			oTable.init({
				src: $("#"+_orderId),
				dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 
					"dom": "<'table-scrollable't><'row'<'col-md-8 col-sm-12'pl><'col-md-4 col-sm-12'>>",
					//"scrollY": "300",
					"ordering": true,
					"serverSide": false,
					"processing": true,
					"order": [],
					"deferRender": true,
					"bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
					"paging": false,
	                "ajax": {
	                    "url": "views/orders/getOrderDetails" // ajax source
	                },
	                "columns": [
	                    {
	                    	"data": "goodsName"
	                    },
	                    {
	                    	"data": "orgPrice"
	                    },
	                    {	
	                    	"data": "price"
	                    },
	                    {	
	                    	"data": "discount",
	                    	
	                    },
	                    {	
	                    	"data": "quantity"
	                    },
	                    {	
	                    	"data": "totalPrice"
	                    }
	                ],
	               "columnDefs": [
		               {
		            	   'defaultContent':'',
		            	   'orderable': true,
		            	   'targets': [0,1,2,3,4,5]
		               }
	               ]
	            },
	            onSuccess: function (grid, res) {
	            	var _data = res.data;
	                if(res.isSuccess != 1 || !_data){
	                	res.data = [];
	                }else{
	                	res.data = _data.detailList;
	                	$scope.orderNumber = _data.order ? _data.order.orderNumber : '';
	                }
	                $log.log(_data);
	            },
	            onError: function (grid) {
	                // execute some code on network or other general error  
	            }
			});
			
			$("#"+_orderId).on('preXhr.dt xhr.dt',function(e, settings, data){
				Metronic.blockUI({
	                target: "#"+_orderId,
	                animate: true,
	                overlayColor: 'none'
	            });
			}).on('init.dt draw.dt',function (e, settings, data){
				Metronic.unblockUI("#"+_orderId);
			});
			
	    };
	    initDetailsTable();
	});
	
}]);

