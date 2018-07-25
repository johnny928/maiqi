/* Setup general page controller */
MetronicApp.controller('GoodsEditController', ['$rootScope', '$scope', 'settings','$modal', '$log', 'maiqi', '$stateParams', '$state',
	function($rootScope, $scope, settings, $modal, $log, maiqi, $stateParams, $state ) {
	
	let goodsId = $stateParams.goodsId;
		
	let initTags = function(_goods){
		if (!jQuery().tagsInput) {
            return;
        }
		if(!$('.goods_label').data('isTagsInputObj')){
			$('.goods_label').tagsInput({
	            width: 'auto',
	            defaultText: '添加标签',
	            'onAddTag': function () {
	                //alert(1);
	            }
	        });
	        $('.goods_label').data('isTagsInputObj',true);
		}
    	$('.goods_label').val('');
    	$('.goods_label').removeTag('');
    	$('.goods_label').tagsInput.importTags('.goods_label', (_goods && _goods.label)||'');
	};
	
	let getGoodsData = function(){
		$scope.goods.label = $('.goods_label').val();
		return $scope.goods;
	};
	
	let initTable = function(){
		if(!goodsId) return;
		maiqi.post({url:'views/goods/getGoodsById',data:{goodsId:goodsId},errMsg:'获取数据失败！',container:'#goodsPanel'})
			.then(function(response) {
	        	let res = response.data;
	        	$log.log(res);
	        	if(res.isSuccess && res.data){
	        		$scope.goods = res.data.goods;
	        	}
	        })
	        .finally(function(){
	        	initTags($scope.goods);
	        	Metronic.unblockUI("#goodsPanel");
	        });
	}
	
	let handleEvent = function(){
		$scope.saveGoods = function(){
			$log.log(getGoodsData());
			maiqi.post({url:'views/goods/saveGoods',data:{goods:getGoodsData()},errMsg:'保存数据失败！',container:'#goodsPanel'})
				.then(function(response) {
		        	let res = response.data;
		        	$log.log(res);
		        	if(res.isSuccess){
		        		maiqi.toastr.success('保存成功！');
		        	}
		        })
		        .finally(function(){
		        	Metronic.unblockUI("#goodsPanel");
		        });
		}
		$scope.cancel = function(){
			$state.go('goods',null)
		}
	}
	
	initTags();
	initTable();
	handleEvent();
}]);