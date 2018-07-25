
/* Setup general page controller */
MetronicApp.controller('ProportionController', ['$rootScope', '$scope', 'settings','$modal', '$log', 
                                                '$state', '$stateParams','$http', '$filter','$compile','maiqi','$q',
function($rootScope, $scope, settings, $modal, $log, $state, $stateParams, $http, $filter, $compile, maiqi,$q) {
	
	let handleBootstrapTouchSpin = function() {
        $(".maiqi-spin-proportion").TouchSpin({          
        	buttondown_class: 'btn green',
            buttonup_class: 'btn green',
            min: 0,
            max: 10,
            decimals:1,
            step:0.1,
            stepinterval: 50,
            maxboostedstep: 10,
            prefix: '成'
        }); 
    };
	
	let initList = function(){
		if($.fn.DataTable.isDataTable("#proportion-list")){
			$scope.proportionList.getDataTable().ajax.reload();
			return ;
		}
		var oTable = new Datatable();
		oTable.init({
			src: $("#proportion-list"),
			dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 
				"scrollY": "300",
				"ordering": false,
				"serverSide": true, //启用服务器端分页
				"paginate": false,
				"paging": false,
				"deferRender": true,
				"searching": false, //禁用原生搜索
				"bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                "ajax": {
                    "url": "views/proportion/getAllUsers" // ajax source
                },
                "columns": [
                    {
                    	"data": "userName"
                    },
                    {
                    	"data": "loginName"
                    },
                    {	
                    	"data": null
                    }
                ],
               "columnDefs": [
	               {
	            	   'defaultContent':'',
	            	   'targets': [0,1,2]
	               },
	               {
	            	   'targets': [2],
	                	"createdCell": function(td, cellData, rowData, row, col){
	                		let eles = ['<div class="input-inline input-medium ">',
	                		          	'<input type="text" value="'+(rowData.proportion||'0')+'" name="demo1" class="form-control maiqi-spin-proportion" maxlength="6">',
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
		$scope.proportionList = oTable;
		
		$("#proportion-list").on('init.dt draw.dt',function (e, settings, data){
			handleBootstrapTouchSpin();
		});
		
	};
	
	let getUsersData = function(){
		$scope.saveData = [];
		let tab = $scope.proportionList.getDataTable();
		tab.rows().data().each(function(node,index){
			let data = Object.assign({},node);
			data.proportion = tab.row(index).nodes().to$().find('.maiqi-spin-proportion').val();
			$scope.saveData.push(data);
		})
	}
	
	let handleEvent = function(){
		$scope.saveUsers = function(){
			getUsersData();
			maiqi.post({url:'views/proportion/saveUsers',data:{users: $scope.saveData}, errMsg:'获取订单号失败！',container:'#proportionPanel'})
			.then(function(response) {
	        	let res = response.data;
	        	if(res.isSuccess){
	        		maiqi.toastr.success('保存成功！');
	        	}
	        })
	        .finally(function(){
	        	Metronic.unblockUI("#proportionPanel");
	        });
		};
	}
	
	initList();
	handleEvent();
}]);

