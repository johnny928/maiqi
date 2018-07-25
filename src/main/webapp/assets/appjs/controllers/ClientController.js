
/* Setup general page controller */
MetronicApp.controller('ClientsController', ['$rootScope', '$scope', 'settings','$modal', '$log','$compile', '$filter', '$state', 'maiqi', 
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
	
	let initTags = function(_clientTag){
		if (!jQuery().tagsInput) {
            return;
        }
		if(!$('.client_label').data('isTagsInputObj')){
			$('.client_label').tagsInput({
	            width: 'auto',
	            defaultText: '填写分类',
	            'onAddTag': function () {
	                //alert(1);
	            }
	        });
	        $('.client_label').data('isTagsInputObj',true);
		}
        if(_clientTag){
        	$('.client_label').val('');
        	$('.client_label').removeTag('');
        	$('.client_label').tagsInput.importTags('.client_label',_clientTag||'');
        }
	};
	
	let handleConfirm = function(){
		$('.del-client').confirmation({
			title: '确认删除此客户信息？',
			btnOkLabel: '确认',
			btnCancelLabel: '取消',
			onConfirm: function(event,el){
				event.preventDefault();
				let clientId = el.attr('data-clientId');
				$scope.delClient(clientId);
			}
		})
    };
    
    let initList = function(){
		$scope.queryCond = $scope.queryCond || {};
		if($.fn.DataTable.isDataTable("#clients-list")){
			$scope.clientsList.getDataTable().ajax.reload();
			return ;
		}
		var oTable = new Datatable();
		oTable.setAjaxParam('queryCond',JSON.stringify($scope.queryCond));
		oTable.init({
			src: $("#clients-list"),
			dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 
				"scrollY": "300",
				"ordering": false,
				"serverSide": true, //启用服务器端分页
				"paginate": true,
				"deferRender": true,
				"searching": false, //禁用原生搜索
				"bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                "ajax": {
                    "url": "views/clients/getClients" // ajax source
                },
                "columns": [
                    {
                    	"data": "clientName"
                    },
                    {
                    	"data": "phoneNum"
                    },
                    {	
                    	"data": "sex"
                    },
                    {	
                    	"data": "birthday",
                    },
                    {	
                    	"data": "level"
                    },
                    {	
                    	"data": "label"
                    },
                    {	
                    	"data": "clientSource"
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
	            	   'targets': [0,1,2,3,4,5,6,7,8]
	               },
	               {
	            	   'targets': [7],
	                	"render": function(data, type, full, meta){
	                		return $filter('date')(data,'yyyy-MM-dd HH:mm:ss');
	                	}
	               },
	               {
	            	   'targets': [8],
	                	"createdCell": function(td, cellData, rowData, row, col){
	                		let eles = ['<div><button class="btn btn-xs btn-success" ng-click="clientEdit(\''+rowData.clientId+'\')" >修改</button>',
				         		            '<p></p>',
				         		            '<button class="btn btn-xs green-stripe del-client" data-toggle="confirmation" data-placement="top" data-clientId="'+rowData.clientId+'">删除</button>',
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
		$scope.clientsList = oTable;
		
		$("#clients-list").on('init.dt draw.dt',function (e, settings, data){
			handleConfirm();
		});
		$('#searchBtn, #tools-reload').on('click',function(e){
			e.preventDefault();
			let label = $('.client_label').val();
			$scope.queryCond.labels = label ? label.split(',') : '';
			$scope.queryCond.createDateS = $scope.queryCond._createDateS ? $filter('date')($scope.queryCond._createDateS,'yyyy-MM-dd') : '';
			$scope.queryCond.createDateE = $scope.queryCond._createDateE ? $filter('date')($scope.queryCond._createDateE,'yyyy-MM-dd') : '';
			$log.log($scope.queryCond);
			oTable.setAjaxParam('queryCond',JSON.stringify($scope.queryCond));
			oTable.getDataTable().ajax.reload();
//			oTable.clearAjaxParams();
		});
	};
	
	$scope.clientEdit = function(_clientId){
		$log.log(_clientId)
		$state.go('clientEditer',{clientId: _clientId})
	}
	
    $scope.delClient = function(_clientId){
    	maiqi.post({url:'views/clients/delClient',
			data:{clientId:_clientId},
			errMsg:'删除商品失败！',container:'#clientsPanel'})
			.then(function(response){
	        	let res = response.data;
	        	if(res.isSuccess){
	        		if($scope.clientsList){
	        			$scope.clientsList.getDataTable().ajax.reload();
	        		}
	        		Metronic.unblockUI("#clientsPanel");
	        		maiqi.toastr.success('删除成功！');
	        	}	        
			})
			.finally(function(){
				Metronic.unblockUI("#clientsPanel");
			})
    };
	
	initSearchCollapse();
	initDatePick();
	initTags();
	initList();
}]);

