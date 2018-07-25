
/* Setup general page controller */
MetronicApp.controller('MemberLevelController', ['$rootScope', '$scope', 'settings','$modal', '$log', 
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
	
	let handleBootstrapTouchSpin = function() {
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
	
	let initList = function(){
		if($.fn.DataTable.isDataTable("#level-list")){
			$scope.levelList.getDataTable().ajax.reload();
			return ;
		}
		var oTable = new Datatable();
		oTable.init({
			src: $("#level-list"),
			dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 
				"scrollY": "300",
				"ordering": false,
				"serverSide": false, //启用服务器端分页
				"paginate": false,
				"paging": false,
				"deferRender": true,
				"searching": false, //禁用原生搜索
				"bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                "ajax": {
                    "url": "views/memberLevel/getMemberLevels" // ajax source
                },
                "columns": [
                    {
                    	"data": "level"
                    },
                    {
                    	"data": null
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
	            	   'targets': [0,1,2,3]
	               },
//	               {
//	            	   'targets': [0],
//	                	"createdCell": function(td, cellData, rowData, row, col){
//	                		let eles = [
//	                		          	'<input type="number" class="form-control maiqi-member-level maiqi-change-handel" data-row-num="'+row+'" value="'+rowData.level+'" />'
//	                		          ];
//	                		let html = eles.join('\n');
//	                		$(td).append($compile(html)($scope));
//	                	}
//	               },
	               {
	            	   'targets': [1],
	                	"createdCell": function(td, cellData, rowData, row, col){
	                		let eles = [
	                		          	'<textarea class="form-control maiqi-change-handel maiqi-member-levelDesc" maxlength="200" rows="2" data-row-num="'+row+'" placeholder="等级描述，最多可输入100个汉字。" >'+rowData.levelDesc+'</textarea>'
	                		          ];
	                		let html = eles.join('\n');
	                		$(td).append($compile(html)($scope));
	                	}
	               },
	               {
	            	   'targets': [2],
	                	"createdCell": function(td, cellData, rowData, row, col){
	                		let eles = ['<div class="input-inline input-medium ">',
	                		          	'<input type="text" value="'+(rowData.discount||'0')+'" class="form-control maiqi-spin-discount maiqi-change-handel maiqi-member-discount" maxlength="6" data-row-num="'+row+'">',
	                		          '</div>'];
	                		let html = eles.join('\n');
	                		$(td).append($compile(html)($scope));
	                	}
	               },
	               {
	            	   'targets': [3],
	                	"createdCell": function(td, cellData, rowData, row, col){
	                		let eles = ['<div><button class="btn btn-xs btn-success hidden maiqi-member-edit" ng-click="saveLevel(\''+row+'\')" >修改</button>',
			         		            //'<p></p>',
			         		            //'<button class="btn btn-xs green-stripe del-level" data-toggle="confirmation" data-placement="top" data-row-num="'+row+'">删除</button>',
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
		$scope.levelList = oTable;
		
		$("#level-list").on('init.dt draw.dt',function (e, settings, data){
			handleBootstrapTouchSpin();
			tableEventHandle();
			handleConfirm();
		});
		
	};
	
	let handleConfirm = function(){
		$('.del-level').confirmation({
			title: '确认删除此等级设置？',
			btnOkLabel: '确认',
			btnCancelLabel: '取消',
			onConfirm: function(event,el){
				event.preventDefault();
				let row = el.attr('data-row-num');
				$scope.delLevel(row);
			}
		});
    };
	
	let getLevelData = function( row ){
		let tab = $scope.levelList.getDataTable();
		let rowObj = tab.row(row);
		let _memberLevel = rowObj.data();
		console.log(_memberLevel);
		Object.assign(_memberLevel,{ 
//			level:rowObj.nodes().to$().find('.maiqi-member-level').val(),
			levelDesc:rowObj.nodes().to$().find('.maiqi-member-levelDesc').val(),
			discount:rowObj.nodes().to$().find('.maiqi-member-discount').val()} );
		return _memberLevel;
	};
	
	let toggleEdit = function(row, showType){
		let tab = $scope.levelList.getDataTable();
		let rowObj = tab.row(row);
		let editBtn = rowObj.nodes().to$().find('.maiqi-member-edit');
		if(showType=='show'){
			editBtn.removeClass('hidden');
		}else if(showType=='hide'){
			if(!editBtn.hasClass('hidden')){
				editBtn.addClass('hidden');
			}
		}else{
			if(editBtn.hasClass('hidden')){
				editBtn.removeClass('hidden');
			}else{
				editBtn.addClass('hidden');
			}
		}
	};
	
	let tableEventHandle = function(){
		let that = this;
		$('.maiqi-change-handel').on('change',function(event){
			let row = $(this).attr('data-row-num');
			toggleEdit(row,'show');
		});
	};
	
	let handleEvent = function(){
		$scope.newLevel = function(){
	    	let tab = $scope.levelList.getDataTable();
	    	tab.row.add({
	    		'levelId': null,
	    		'level':0,
	    		'discount': 10,
	    		'levelDesc': '',
	    		'createTime': null,
	    		'updateTime': null,
	    		'createUserId': null,
	    		'updateUserId': null
	    	}).draw();
		};
		
		$scope.saveLevel = function(row){
			let _memberLevel = getLevelData(row);
			maiqi.post({url:'views/memberLevel/saveMemberLevel',data:{memberLevel: _memberLevel}, container:'#memberLevelPanel'})
			.then(function(response) {
	        	let res = response.data;
	        	if(res.isSuccess && res.data.memberLevel){
	        		console.log(res.data.memberLevel);
	        		toggleEdit(row,'hide');
	        		toastr.success('保存成功！');
	        	}
	        })
	        .finally(function(){
	        	Metronic.unblockUI("#memberLevelPanel");
	        });
		};
		
		$scope.delLevel = function(row){
			let m = getLevelData(row);
			if(m.levelId){
				
			}else{
				let tab = $scope.levelList.getDataTable();
				let rowObj = tab.row(row);
				rowObj.remove().draw(false);
			}
		}
	}
	
	initList();
	handleEvent();
}]);

