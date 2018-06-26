/* Setup general page controller */
MetronicApp.controller('OrderEditCtrl', ['$rootScope', '$scope', 'settings','$modal', '$log', 
                                         '$state', '$stateParams','$http', '$filter','$compile',
	function($rootScope, $scope, settings, $modal, $log, $state, $stateParams, $http, $filter, $compile) {
		$scope.tabClick = function(tabName){
			$(tabName).addClass('active in');
		}
		
		let orderId = $stateParams.orderId;
		$scope.salesperson = {};
		$scope.orderInfo = {client:{},order:{}};
		
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
	        if(_orderInfo && _orderInfo.client){
	        	$('.client_label').val('');
	        	$('.client_label').removeTag('');
	        	$('.client_label').tagsInput.importTags('.client_label',_orderInfo.client.label);
	        }
		};
		
		let onShowTab1 = function(){
			
		};
		
		let onShowTab2 = function(){
			if($.fn.DataTable.isDataTable("#goods-list")){
				return ;
			}
			var oTable = new Datatable();
			oTable.setAjaxParam('goodsListQueryCond',JSON.stringify($scope.goodsListQueryCond));
			oTable.init({
				src: $("#goods-list"),
				dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 
					"scrollY": "300",
					"ordering": false,
					"serverSide": true, //启用服务器端分页
					"paginate": true,
					"deferRender": true,
					"searching": false, //禁用原生搜索
					"bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
	                "ajax": {
	                    "url": "views/orders/getGoodsList" // ajax source
	                },
	                "columns": [
	                    {
	                    	"data": "goodsName"
	                    },
	                    {
	                    	"data": "label"
	                    },
	                    {	
	                    	"data": "orgPrice"
	                    },
	                    {	
	                    	"data": "goodsDesc",
	                    	
	                    },
	                    {	
	                    	"data": null
	                    },
	                    {	
	                    	"data": null
	                    }
	                ],
	               "columnDefs": [
		               {
		            	   'defaultContent':'',
		            	   'targets': [0,1,2,3,4,5]
		               },
		               {
		            	   'targets': [4],
		                	"createdCell": function(td, cellData, rowData, row, col){
		                		let eles = ['<div class="input-inline input-medium ">',
		                		          	'<input type="text" value="'+(rowData.quantity||'0')+'" name="demo1" class="form-control maiqi-spin-quantity" maxlength="6">',
		                		          '</div>'];
		                		let html = eles.join('\n');
		                		$(td).append($compile(html)($scope));
		                	}
		               },
		               {
		            	   'targets': [5],
		                	"createdCell": function(td, cellData, rowData, row, col){
		                		let eles ;
		                		if(rowData.cnt == 0){
		                			eles = ['<div>',
			                		            '<button class="btn btn-xs purple" ng-click="addGoods(\''+row+'\')">添加商品 </button>',
			                		            '<p></p>',
		                		            '</div>'];
		                		}else{
		                			eles = ['<div><button class="btn btn-xs btn-success" ng-click="saveGoods(\''+rowData.goodsId+'\')">保存修改 </button>',
			                		            '<p></p>',
			                		            '<button class="btn btn-xs green-stripe cancel-goods" data-toggle="confirmation" data-placement="top" data-goodsId="'+rowData.goodsId+'">取消选择</button>',
			            		            '</div>'];
		                		}      
		                		let html = eles.join('\n');
		                		$(td).append($compile(html)($scope));
		                	}
		               }
	               ]
	            },
	            onError: function (grid) {
	            }
			});
			$scope.tab2 = {goodsList: oTable};
			
			$("#goods-list").on('init.dt draw.dt',function (e, settings, data){
				handleBootstrapTouchSpin();
				handleConfirm();
			});
			
			$('#goods-search').on('click',function(e){
				e.preventDefault();
				if($scope.goodsListQueryCond.searchFlag=='商品名'){
					$scope.goodsListQueryCond.labels = '';
					$scope.goodsListQueryCond.goodsName = $scope.goodsListQueryCond.searchText;
				}else{
					$scope.goodsListQueryCond.goodsName = '';
					$scope.goodsListQueryCond.labels = $scope.goodsListQueryCond.searchText? $scope.goodsListQueryCond.searchText.split(',') : null;
				}
				$log.log($scope.goodsListQueryCond);
				oTable.setAjaxParam('goodsListQueryCond',JSON.stringify($scope.goodsListQueryCond));
				oTable.getDataTable().ajax.reload();
//				oTable.clearAjaxParams();
			});
		};
		
		let onShowTab3 = function(){
			$log.log('showTab3');
			if($.fn.DataTable.isDataTable("#details-edit")){
				return ;
			}
			var oTable = new Datatable();
			oTable.setAjaxParam('detailsEditQueryCond',JSON.stringify($scope.detailsEditQueryCond));
			oTable.init({
				src: $("#details-edit"),
				dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 
					"scrollY": "300",
					"ordering": false,
					"serverSide": true, //启用服务器端分页
					"paginate": true,
					"deferRender": true,
					"searching": false, //禁用原生搜索
					"bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
	                "ajax": {
	                    "url": "views/orders/getDetailsEditList" // ajax source
	                },
	                "columns": [
	                    {
	                    	"data": "goodsName"
	                    },
	                    {
	                    	"data": "label"
	                    },
	                    {	
	                    	"data": "orgPrice"
	                    },
	                    {	
	                    	"data": "goodsDesc",
	                    	
	                    },
	                    {	
	                    	"data": null
	                    },
	                    {	
	                    	"data": null
	                    },
	                    {	
	                    	"data": "totalPrice"
	                    },
	                    {	
	                    	"data": null
	                    }
	                ],
	               "columnDefs": [
		               {
		            	   'defaultContent':'',
		            	   'targets': [0,1,2,3,4,5,6,7]
		               },
		               {
		            	   'targets': [4],
		                	"createdCell": function(td, cellData, rowData, row, col){
		                		let eles = ['<div class="input-inline input-medium ">',
		                		          	'<input type="text" value="'+(rowData.quantity||'0')+'" name="demo1" class="form-control maiqi-spin-quantity" maxlength="6">',
		                		          '</div>'];
		                		let html = eles.join('\n');
		                		$(td).append($compile(html)($scope));
		                	}
		               },
		               {
		            	   'targets': [5],
		                	"createdCell": function(td, cellData, rowData, row, col){
		                		let eles = ['<div class="input-inline input-medium ">',
		                		            '<input type="text" value="'+(rowData.discount||'0')+'" name="demo1" class="form-control maiqi-spin-discount" maxlength="3">',
		                		          '</div>'];
		                		let html = eles.join('\n');
		                		$(td).append($compile(html)($scope));
		                	}
		               },
		               {
		            	   'targets': [7],
		                	"createdCell": function(td, cellData, rowData, row, col){
		                		let eles = ['<div><button class="btn btn-xs btn-success" ng-click="saveDetail(\''+rowData.goodsId+'\')">保存修改 </button>',
			                		            '<p></p>',
			                		            '<button class="btn btn-xs green-stripe" ng-click="cancelDetail(\''+rowData.goodsId+'\')">取消选择 </button>',
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
			
			$("#details-edit").on('init.dt draw.dt',function (e, settings, data){
				handleBootstrapTouchSpin();
			});
		};
		
		let onShowTab4 = function(){
		};
		
		let initOperator = function(){
			if($scope.orderInfo && $scope.orderInfo.order && $scope.orderInfo.order.salespersonId){
    			let sel = $scope.operators.filter(function(node,index){
    				return node.userId == $scope.orderInfo.order.salespersonId;
    			});
    			if(sel && sel.length>0){
    				$scope.salesperson.selected = sel[0];
    			}
    		}else{
    			let sel = $scope.operators.filter(function(node,index){
    				return node.userId == $scope.author.userId;
    			});
    			if(sel && sel.length>0){
    				$scope.salesperson.selected = sel[0];
    			}
    		}
		};
		
		let loadTab1 = function(){
			Metronic.blockUI({
                target: "#orderEditPanel",
                animate: true,
                overlayColor: 'none'
            });
			$http.post(
	            'getOperators'
	        ).then(function(response) {
	        	let res = response.data;
	        	if(res.isSuccess && res.data && res.data.allOperators){
	        		$scope.operators = res.data.allOperators;
	        		$scope.author = res.data.author;
	        	}
	        },function(){
	        	Metronic.unblockUI("#orderEditPanel");
	        	Metronic.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: '获取订单数据失败',
                    container: '#orderEditPanel',
                    place: 'prepend'
                });
	        }).then(function(_res){
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
			        }).then(function(){
			        	initOperator();
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
			        }).then(function(){
			        	initOperator();
			        });
				}
	        });
			
			$('.date-picker').each(function(index,el){
		    	console.log($(el).attr('data-date'));
		    })
		};
		
		let loadTab2 = function(){
			$scope.goodsListQueryCond = {orderId:orderId,searchFlag:'商品名'};
		};
		
		let loadTab3 = function(){
			$scope.detailsEditQueryCond = {orderId:orderId};
		};
		
		let loadTab4 = function(){

		};
		
		let handleBootstrapTouchSpin = function() {
	        $(".maiqi-spin-quantity").TouchSpin({          
	            buttondown_class: 'btn green',
	            buttonup_class: 'btn green',
	            min: 0,
	            max: 999999,
	            stepinterval: 0,
	            maxboostedstep: 999999,
	            prefix: ''
	        }); 
	        
	        $(".maiqi-spin-discount").TouchSpin({          
	            buttondown_class: 'btn green',
	            buttonup_class: 'btn green',
	            min: 1,
	            max: 10,
	            decimals:1,
	            step:0.5,
	            stepinterval: 50,
	            maxboostedstep: 10,
	            postfix: '折'
	        });
	    };
	    
	    let handleConfirm = function(){
			$('.cancel-goods').confirmation({
				title: '确认从已购列表中剔除此项商品？',
				onConfirm: function(event,el){
					let goodsId = el.attr('data-goodsid');
					$scope.cancelGoods(goodsId);
				}
			})
	    };
		
		let getClientData = function(){
			if(typeof $scope.orderInfo.client.birthday != 'string'){
				$scope.orderInfo.client.birthday = $filter('date')($scope.orderInfo.client.birthday,'yyyy-MM-dd');
			}
			$scope.orderInfo.client.label = $('.client_label').val();
		};
		
		let getOrderData = function(){
			$scope.orderInfo.order.salespersonId = $scope.salesperson.selected.userId;
		};
		
		$scope.addGoods = function(_row){
			$log.log($scope.tab2.goodsList.getDataTable().row(_row).data());
			let rowObj = $scope.tab2.goodsList.getDataTable().row(_row);
			let _goods = rowObj.data();
			let _quantity = rowObj.to$().find('.maiqi-spin-quantity').val();
			
			$scope.saveGoods(_goods,_quantity);
		};
		$scope.saveGoods = function(_goods,_quantity){
			Metronic.blockUI({
                target: "#orderEditPanel",
                animate: true,
                overlayColor: 'none'
            });
			$http.post(
	            'views/orders/saveOrderDetail',
	            {orderId:orderId, goods:_goods, quantity:_quantity}
	        ).then(function(response) {
	        	let res = response.data;
	        	if(res.isSuccess){
	        		Metronic.unblockUI("#orderEditPanel");
		        	Metronic.alert({
	                    type: 'success',
	                    icon: 'check',
	                    message: '保存成功！',
	                    container: '#orderEditPanel',
	                    place: 'prepend'
	                });
	        	}else{
	        		Metronic.unblockUI("#orderEditPanel");
		        	Metronic.alert({
	                    type: 'danger',
	                    icon: 'warning',
	                    message: '保存出错！Error:'+res.message,
	                    container: '#orderEditPanel',
	                    place: 'prepend'
	                });
	        	}
	        },function(){
	        	Metronic.unblockUI("#orderEditPanel");
	        	Metronic.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: '保存失败',
                    container: '#orderEditPanel',
                    place: 'prepend'
                });
	        });
		};
		$scope.cancelGoods = function(_goodsId){
			Metronic.blockUI({
                target: "#orderEditPanel",
                animate: true,
                overlayColor: 'none'
            });
			$http.post(
	            'views/orders/cancelGoods',
	            {orderId:orderId,goodsId:_goodsId}
	        ).then(function(response) {
	        	let res = response.data;
	        	if(res.isSuccess){
	        		if($scope.tab2 && $scope.tab2.goodsList){
	        			$scope.tab2.goodsList.getDataTable().ajax.reload();
	        		}
	        		Metronic.unblockUI("#orderEditPanel");
		        	Metronic.alert({
	                    type: 'success',
	                    icon: 'check',
	                    message: '保存成功！',
	                    container: '#orderEditPanel',
	                    place: 'prepend'
	                });
	        	}else{
	        		Metronic.unblockUI("#orderEditPanel");
		        	Metronic.alert({
	                    type: 'danger',
	                    icon: 'warning',
	                    message: '保存出错！Error:'+res.message,
	                    container: '#orderEditPanel',
	                    place: 'prepend'
	                });
	        	}
	        	
	        },function(){
	        	Metronic.unblockUI("#orderEditPanel");
	        	Metronic.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: '保存失败',
                    container: '#orderEditPanel',
                    place: 'prepend'
                });
	        });
		};
		
		$scope.saveOrder = function(){
			getClientData();
			getOrderData();
			$log.log($scope.orderInfo, $scope.salesperson.selected);
			Metronic.blockUI({
                target: "#orderEditPanel",
                animate: true,
                overlayColor: 'none'
            });
			$http.post(
	            'views/orders/saveOrderInfo',
	            {client:$scope.orderInfo.client,order:$scope.orderInfo.order}
	        ).then(function(response) {
	        	let res = response.data;
	        	if(res.isSuccess){
	        		Metronic.unblockUI("#orderEditPanel");
		        	Metronic.alert({
	                    type: 'success',
	                    icon: 'check',
	                    message: '保存成功！',
	                    container: '#orderEditPanel',
	                    place: 'prepend'
	                });
	        	}else{
	        		Metronic.unblockUI("#orderEditPanel");
		        	Metronic.alert({
	                    type: 'danger',
	                    icon: 'warning',
	                    message: '保存出错！Error:'+res.message,
	                    container: '#orderEditPanel',
	                    place: 'prepend'
	                });
	        	}
	        	
	        },function(){
	        	Metronic.unblockUI("#orderEditPanel");
	        	Metronic.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: '保存失败',
                    container: '#orderEditPanel',
                    place: 'prepend'
                });
	        });
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
	  	
		$scope.getClientByPhoneNum = function(){
			if($scope.orderInfo.client.phoneNum){
				Metronic.blockUI({
	                target: "#tab_1",
	                animate: true,
	                overlayColor: 'none'
	            });
				$http.post(
		            'views/orders/getClientByPhoneNum',
		            {phoneNum:$scope.orderInfo.client.phoneNum}
		        ).then(function(response) {
		        	let res = response.data;
		        	$log.log(res);
		        	if(res.isSuccess){
		        		$scope.orderInfo.client = res.data.client;
		        		initSelect2( ($scope.orderInfo && $scope.orderInfo.client) || null);
		        		initTags($scope.orderInfo);
		        	}
		        	Metronic.unblockUI("#tab_1");
		        },function(){
		        	Metronic.unblockUI("#tab_1");
		        	Metronic.alert({
                        type: 'danger',
                        icon: 'warning',
                        message: '获取订单数据失败',
                        container: '#tab_1',
                        place: 'prepend'
                    });
		        });
			}
		};
	  	
		let showTabHandler = function(){
			let scope = $scope;
			$('a[data-toggle="tab"]').on('shown.bs.tab',function(e){
				if(e.target.dataset.target == '#tab_1'){
					onShowTab1(scope);
				}else if(e.target.dataset.target == '#tab_2'){
					onShowTab2(scope);
				}else if(e.target.dataset.target == '#tab_3'){
					onShowTab3(scope);
				}else if(e.target.dataset.target == '#tab_4'){
					onShowTab4(scope);
				}
			});
		};
		
		let loadTabs = function(){
			showTabHandler();
			loadTab1();
			loadTab2();
			loadTab3();
			loadTab4();
		};
		
		loadTabs();
		
}]);