/* Setup general page controller */
MetronicApp.controller('OrderEditCtrl', ['$rootScope', '$scope', 'settings','$modal', '$log', 
                                         '$state', '$stateParams','$http', '$filter','$compile','maiqi','$q',
	function($rootScope, $scope, settings, $modal, $log, $state, $stateParams, $http, $filter, $compile, maiqi,$q) {
	
		toastr.options = {
		  "closeButton": true,
		  "debug": false,
		  "positionClass": "toast-top-right",
		  "onclick": null,
		  "showDuration": "500",
		  "hideDuration": "3000",
		  "timeOut": "3000",
		  "extendedTimeOut": "3000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		};
	
		$scope.tabClick = function(tabName){
			$(tabName).addClass('active in');
		}
		
		let orderId = $stateParams.orderId;
		$scope.salesperson = {};
		$scope.clientSource = {};
		$scope.orderInfo = {client:{},order:{}};
		
		let initSelect2 = function(_client){
			if(_client){
//				$('#client-level').val(_client.level).trigger('change');
				$('#client-level').val(_client.level||'').select2();
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
	        	$('.client_label').tagsInput.importTags('.client_label',_orderInfo.client.label||'');
	        }
		};
		
		let onShowTab1 = function(){
			
		};
		
		let onShowTab2 = function(){
			if($.fn.DataTable.isDataTable("#goods-list")){
				$scope['tab2'].goodsList.getDataTable().ajax.reload();
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
	                    }
	                ],
	               "columnDefs": [
		               {
		            	   'defaultContent':'',
		            	   'targets': [0,1,2,3,4]
		               },
		               {
		            	   'targets': [4],
		                	"createdCell": function(td, cellData, rowData, row, col){
		                		let eles ;
		                		let addBtnClass = rowData.cnt>0 ? "hidden" : "";
		                		let cancelBtnClass = rowData.cnt>0 ? "" : "hidden";
	                			eles = ['<div>',
		                		            '<button class="btn btn-xs purple add-goods '+addBtnClass+'" ng-click="addGoods(\'tab2\',\''+row+'\')">添加商品 </button>',
		                		            '<button class="btn btn-xs green-stripe cancel-goods '+cancelBtnClass+'" data-toggle="confirmation" data-placement="top" data-tab-num="tab2" data-row-num="'+row+'" data-goodsId="'+rowData.goodsId+'">取消选择</button>',
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
//			$log.log('showTab3');
			if($.fn.DataTable.isDataTable("#details-edit")){
				$scope['tab3'].goodsList.getDataTable().ajax.reload();
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
	                    	"data": "orgPrice",
	                    	"className":"maiqi-org-price"
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
	                    	"data": "totalPrice",
	                    	"className":"maiqi-total-price"
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
		                		          	'<input type="text" value="'+(rowData.quantity||'0')+'" name="demo1" class="form-control maiqi-spin-quantity maiqi-goods-list-edit" maxlength="6" data-tab-num="tab3" data-row-num="'+row+'">',
		                		          '</div>'];
		                		let html = eles.join('\n');
		                		$(td).append($compile(html)($scope));
		                	}
		               },
		               {
		            	   'targets': [5],
		                	"createdCell": function(td, cellData, rowData, row, col){
		                		let eles = ['<div class="input-inline input-medium ">',
		                		            '<input type="text" value="'+(rowData.discount||'0')+'" name="demo1" class="form-control maiqi-spin-discount maiqi-goods-list-edit" maxlength="3" data-tab-num="tab3" data-row-num="'+row+'">',
		                		          '</div>'];
		                		let html = eles.join('\n');
		                		$(td).append($compile(html)($scope));
		                	}
		               },
		               {
		            	   'targets': [7],
		                	"createdCell": function(td, cellData, rowData, row, col){
		                		let eles = ['<div>',
		                		            '<button class="btn btn-xs green-stripe del-goods" data-toggle="confirmation" data-placement="top" data-tab-num="tab3" data-row-num="'+row+'" data-goodsId="'+rowData.goodsId+'">取消选择</button>',
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
			
			$scope.tab3 = {goodsList: oTable};
			
			$("#details-edit").on('init.dt draw.dt',function (e, settings, data){
				handleBootstrapTouchSpin();
				handleTotalPrice();
				handleConfirm();
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
		
		let initClientSource = function(){
			let initS = $scope.orderInfo.order.clientSource || $scope.orderInfo.client.clientSource;
			if( initS ){
    			let sel = $scope.operators.filter(function(node,index){
    				return node.userId == initS;
    			});
    			if(sel && sel.length>0){
    				$scope.clientSource.selected = sel[0];
    			}
    		}
		};
		
		let loadTab1 = function(){
			Metronic.blockUI({
                target: "#orderEditPanel",
                animate: true,
                overlayColor: 'none'
            });
			maiqi.post({url:'getOperators',errMsg:'获取订单数据失败！',container:'#orderEditPanel'})
				.then(function(response) {
		        	let res = response.data;
		        	if(res.isSuccess && res.data && res.data.allOperators){
		        		$scope.operators = res.data.allOperators || [];
		        		$scope.author = res.data.author || {};
		        	}
		        })
		        .then(function(_res){
	        		maiqi.post({url:'views/orders/getOrderInfo',data:{orderId:orderId},errMsg:'获取订单数据失败！',container:'#orderEditPanel'})
	        			.then(function(response) {
				        	let res = response.data;
				        	$log.log(res);
				        	if(res.isSuccess){
				        		$scope.orderInfo.client = res.data.orderInfo.client || {};
				        		$scope.orderInfo.order = res.data.orderInfo.order || {};
				        		$scope.orderNumber = res.data.orderInfo.order.orderNumber;
				        		initSelect2( ($scope.orderInfo && $scope.orderInfo.client) || null);
				        		initTags($scope.orderInfo);
				        	}
				        })
				        .then(function(){
				        	initOperator();
				        	initClientSource();
				        })
		        })
		        .finally(function(){
		        	Metronic.unblockUI("#orderEditPanel");
		        });
			
			$('.date-picker').each(function(index,el){
//		    	console.log($(el).attr('data-date'));
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
	    
	    let handleTotalPrice = function(){
	    	let that = this;
	    	$('.form-control.maiqi-spin-quantity, .form-control.maiqi-spin-discount').on('change',function(){
	    		let org = math.number($(this).closest('tr').find('.maiqi-org-price').text());
	    		let quantity = math.number($(this).closest('tr').find('.maiqi-spin-quantity').val());
	    		let discount = math.number($(this).closest('tr').find('.maiqi-spin-discount').val());
	    		$(this).closest('tr').find('.maiqi-total-price').text(math.chain(org).multiply(quantity).multiply(math.divide(discount,10)).round(2).done());
	    		let tab = $(this).attr('data-tab-num');
	    		let row = $(this).attr('data-row-num');
	    		let rowObj = $scope[tab].goodsList.getDataTable().row(row);
	    		let _goods = rowObj.data();
	    		maiqi.debounce(_goods.goodsId,$scope.saveGoods,1000,false).apply(that,[tab,row]);
	    	});
	    };
	    
	    let handleConfirm = function(){
			$('.cancel-goods').confirmation({
				title: '确认从已购列表中剔除此项商品？',
				btnOkLabel: '确认',
				btnCancelLabel: '取消',
				onConfirm: function(event,el){
					event.preventDefault();
					let goodsId = el.attr('data-goodsid');
					let tab = el.attr('data-tab-num');
					let row = el.attr('data-row-num');
					$scope.cancelGoods(tab,goodsId,row);
				}
			});
			
			$('.del-goods').confirmation({
				title: '确认从已购列表中剔除此项商品？',
				btnOkLabel: '确认',
				btnCancelLabel: '取消',
				onConfirm: function(event,el){
					event.preventDefault();
					let goodsId = el.attr('data-goodsid');
					let tab = el.attr('data-tab-num');
					let row = el.attr('data-row-num');
					$scope.delGoods(tab,goodsId,row);
				}
			});
	    };
		
		let getClientData = function(){
			if(typeof $scope.orderInfo.client.birthday != 'string'){
				$scope.orderInfo.client.birthday = $filter('date')($scope.orderInfo.client.birthday,'yyyy-MM-dd');
			}
			$scope.orderInfo.client.label = $('.client_label').val();
			$scope.orderInfo.client.clientSource = ($scope.clientSource.selected && $scope.clientSource.selected.userId) || '';
		};
		
		let getOrderData = function(){
			$scope.orderInfo.order.salespersonId = $scope.salesperson.selected && $scope.salesperson.selected.userId;
		};
		
		$scope.addGoods = function(_tab,_row){
			let rowObj = $scope[_tab].goodsList.getDataTable().row(_row);
			let _goods = rowObj.data();
			
			Metronic.blockUI({
                target: "#orderEditPanel",
                animate: true,
                overlayColor: 'none'
            });
			$log.log({orderId:orderId, goods:_goods, quantity: '1'});
			
			maiqi.post({url:'views/orders/saveOrderDetail',
				data:{orderId:orderId, goods:_goods, quantity: '1'},
				errMsg:'保存出错！',container:'#orderEditPanel'})
				.then(function(response){
		        	let res = response.data;
		        	if(res.isSuccess){
		        		rowObj.nodes().to$().find('.add-goods').addClass('hidden');
		        		rowObj.nodes().to$().find('.cancel-goods').removeClass('hidden');
		        	}	        
				})
				.finally(function(){
					Metronic.unblockUI("#orderEditPanel");
				})
		};
		
		$scope.saveGoods = function(_tab,_row){
			let rowObj = $scope[_tab].goodsList.getDataTable().row(_row);
			let _goods = rowObj.data();
			let _quantity = rowObj.nodes().to$().find('.maiqi-spin-quantity').val();
			let _discount = rowObj.nodes().to$().find('.maiqi-spin-discount').val();
			
			Metronic.blockUI({
                target: "#orderEditPanel",
                animate: true,
                overlayColor: 'none'
            });
			$log.log({orderId:orderId, goods:_goods, quantity:_quantity, discount: _discount});
			
			maiqi.post({url:'views/orders/saveOrderDetail',
				data:{orderId:orderId, goods:_goods, quantity:_quantity, discount: _discount},
				errMsg:'保存出错！',container:'#orderEditPanel'})
				.then(function(response){
		        	let res = response.data;
		        	if(res.isSuccess){
//		        		if($scope[_tab] && $scope[_tab].goodsList){
//		        			$scope[_tab].goodsList.getDataTable().ajax.reload();
//		        		}
		        		Metronic.unblockUI("#orderEditPanel");
		        		toastr.clear();
		        		toastr.success('保存成功');
		        	}	        
				})
				.finally(function(){
					Metronic.unblockUI("#orderEditPanel");
				})
		};
		
		$scope.cancelGoods = function(_tab,_goodsId,_row){
			let rowObj = $scope[_tab].goodsList.getDataTable().row(_row);
			Metronic.blockUI({
                target: "#orderEditPanel",
                animate: true,
                overlayColor: 'none'
            });
			
			maiqi.post({url:'views/orders/cancelGoods',data:{orderId:orderId,goodsId:_goodsId},errMsg:'保存出错！',container:'#orderEditPanel'})
				.then(function(response) {
		        	let res = response.data;
		        	if(res.isSuccess){
		        		rowObj.nodes().to$().find('.add-goods').removeClass('hidden');
		        		rowObj.nodes().to$().find('.cancel-goods').addClass('hidden');
		        	}		        	
		        })
		        .finally(function(){
		        	Metronic.unblockUI("#orderEditPanel");
		        });
		};
		
		$scope.delGoods = function(_tab,_goodsId,_row){
			let rowObj = $scope[_tab].goodsList.getDataTable().row(_row);
			Metronic.blockUI({
                target: "#orderEditPanel",
                animate: true,
                overlayColor: 'none'
            });
			
			maiqi.post({url:'views/orders/cancelGoods',data:{orderId:orderId,goodsId:_goodsId},errMsg:'保存出错！',container:'#orderEditPanel'})
				.then(function(response) {
		        	let res = response.data;
		        	if(res.isSuccess){
		        		if($scope[_tab] && $scope[_tab].goodsList){
		        			$scope[_tab].goodsList.getDataTable().ajax.reload();
		        		}
		        		Metronic.alert({
		                    type: 'success',
		                    icon: 'check',
		                    message: '保存成功！',
		                    container: '#orderEditPanel',
		                    closeInSeconds: 3, 
		                    place: 'prepend'
		                });
		        	}		        	
		        })
		        .finally(function(){
		        	Metronic.unblockUI("#orderEditPanel");
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
			
			maiqi.post({url:'views/orders/saveOrderInfo',data:{client:$scope.orderInfo.client,order:$scope.orderInfo.order},errMsg:'保存出错！',container:'#orderEditPanel'})
				.then(function(response) {
					console.log(response);
					let res = response.data;
					Object.assign($scope.orderInfo.client,res.data.client);
					Object.assign($scope.orderInfo.order,res.data.order);
		        	Metronic.alert({
	                    type: 'success',
	                    icon: 'check',
	                    message: '保存成功！',
	                    container: '#orderEditPanel',
	                    closeInSeconds: 3, 
	                    place: 'prepend'
	                });
		        })
		        .finally(function(){
		        	Metronic.unblockUI("#orderEditPanel");
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
			let newPhone = $scope.orderInfo.client.phoneNum;
			if($scope.orderInfo.client.phoneNum){
				Metronic.blockUI({
	                target: "#tab_1",
	                animate: true,
	                overlayColor: 'none'
	            });
				
				maiqi.post({url:'views/orders/getClientByPhoneNum',data:{phoneNum:$scope.orderInfo.client.phoneNum},errMsg:'获取订单数据失败！',container:'#tab_1'})
					.then(function(response) {
			        	let res = response.data;
			        	let msg = '找到手机号为【'+newPhone+'】的客户信息。';
			        	if(res.isSuccess){
			        		$scope.orderInfo.client = res.data.client;
			        		if(!$scope.orderInfo.client){
			        			$scope.orderInfo.client = {phoneNum:newPhone};
			        			msg = '找不到手机号为【'+newPhone+'】的客户信息，你可以完善该用户信息，完成后自动新增该用户信息。';
			        		}
			        		initSelect2( ($scope.orderInfo && $scope.orderInfo.client) || null);
			        		initTags($scope.orderInfo);
			        	}
			        	toastr.success(msg);
			        })
			        .finally(function(){
			        	Metronic.unblockUI("#tab_1");
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