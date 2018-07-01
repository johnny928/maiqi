
/* Setup general page controller */
MetronicApp.controller('GoodsController', ['$rootScope', '$scope', 'settings','$modal', '$log','$compile', '$filter', '$state', 'maiqi',
	function($rootScope, $scope, settings, $modal, $log, $compile, $filter, $state, maiqi) {
	
	
	let initSearchCollapse = function(){
		if (jQuery().datepicker && MaiQi) {
			MaiQi.init();
			$('.portlet a.maiqi-search-collapse').trigger('click');
	    }
	};
	let initDatePick = function(){
		$scope.open = function($event, _opened) {
	    	$event.preventDefault();
	    	$event.stopPropagation();
	    	console.log($event);
	    	$scope[_opened] = true;
	  	};
	  	
	  	$scope.dateOptions = {
			language: 'zh-CN',
	        autoclose: true,
	        todayHighlight: true,
	        showWeeks: false,
	    	startingDay: 1
	  	};
	};
  	let initTags = function(_goodsTag){
		if (!jQuery().tagsInput) {
            return;
        }
		if(!$('.goods_label').data('isTagsInputObj')){
			$('.goods_label').tagsInput({
	            width: 'auto',
	            defaultText: '填写分类',
	            'onAddTag': function () {
	                //alert(1);
	            }
	        });
	        $('.goods_label').data('isTagsInputObj',true);
		}
        if(_goodsTag){
        	$('.goods_label').val('');
        	$('.goods_label').removeTag('');
        	$('.goods_label').tagsInput.importTags('.goods_label',_goodsTag||'');
        }
	};
	
	let handleConfirm = function(){
		$('.del-goods').confirmation({
			title: '确认删除此项商品？',
			btnOkLabel: '确认',
			btnCancelLabel: '取消',
			onConfirm: function(event,el){
				let goodsId = el.attr('data-goodsid');
				$scope.delGoods(goodsId);
			}
		})
    };
    
	let initList = function(){
		$scope.queryCond = $scope.queryCond || {};
		if($.fn.DataTable.isDataTable("#goods-list")){
			$scope.goodsList.getDataTable().ajax.reload();
			return ;
		}
		var oTable = new Datatable();
		oTable.setAjaxParam('queryCond',JSON.stringify($scope.queryCond));
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
                    "url": "views/goods/getGoods" // ajax source
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
                    	"data": "createTime"
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
	                	"render": function(data, type, full, meta){
	                		return $filter('date')(data,'yyyy-MM-dd HH:mm:ss');
	                	}
	               },
	               {
	            	   'targets': [5],
	                	"createdCell": function(td, cellData, rowData, row, col){
	                		let eles = ['<div><button class="btn btn-xs btn-success" ng-click="goodsEdit(\''+rowData.goodsId+'\')" >修改</button>',
				         		            '<p></p>',
				         		            '<button class="btn btn-xs green-stripe del-goods" data-toggle="confirmation" data-placement="top" data-goodsId="'+rowData.goodsId+'">删除</button>',
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
		$scope.goodsList = oTable;
		
		$("#goods-list").on('init.dt draw.dt',function (e, settings, data){
			handleConfirm();
		});
		
		$('#searchBtn').on('click',function(e){
			e.preventDefault();
			let label = $('.goods_label').val();
			$scope.queryCond.labels = label ? label.split(',') : '';
			$scope.queryCond.createDateS = $scope.queryCond._createDateS ? $filter('date')($scope.queryCond._createDateS,'yyyy-MM-dd') : '';
			$scope.queryCond.createDateE = $scope.queryCond._createDateE ? $filter('date')($scope.queryCond._createDateE,'yyyy-MM-dd') : '';
			$log.log($scope.queryCond);
			oTable.setAjaxParam('queryCond',JSON.stringify($scope.queryCond));
			oTable.getDataTable().ajax.reload();
//			oTable.clearAjaxParams();
		});
	};
	
	$scope.goodsEdit = function(_goodsId){
		$state.go('goodsEditer',{goodsId: _goodsId})
	}
	
    $scope.delGoods = function(_goodsId){
    	maiqi.post({url:'views/goods/delGoods',
			data:{goodsId:_goodsId},
			errMsg:'删除商品失败！',container:'#goodsPanel'})
			.then(function(response){
	        	let res = response.data;
	        	if(res.isSuccess){
	        		if($scope.goodsList){
	        			$scope.goodsList.getDataTable().ajax.reload();
	        		}
	        		Metronic.unblockUI("#goodsPanel");
		        	Metronic.alert({
	                    type: 'success',
	                    icon: 'check',
	                    message: '删除成功！',
	                    container: '#goodsPanel',
	                    closeInSeconds: 3, 
	                    place: 'prepend'
	                });
	        	}	        
			})
			.finally(function(){
				Metronic.unblockUI("#goodsPanel");
			})
    };
	
	initSearchCollapse();
	initDatePick();
	initTags();
	initList();
}]);

