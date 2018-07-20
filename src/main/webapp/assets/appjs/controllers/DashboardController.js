'use strict';

MetronicApp.controller('DashboardController', function($rootScope, $scope, $http, $timeout,maiqi) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        Metronic.initAjax();
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageBodySolid = true;
    $rootScope.settings.layout.pageSidebarClosed = false;
    
    let initStat = function(){
    	$scope.stat = {};
    	maiqi.post({url:'views/dashboard/getTodaySales',
			errMsg:'获取数据失败！',container:'#dashboardPanel'})
			.then(function(response){
	        	let res = response.data;
	        	if(res.isSuccess){
	        		$scope.stat = res.data;
	        	}	        
			})
			.finally(function(){
				Metronic.unblockUI("#dashboardPanel");
			})
    };
    
    let initSalesStat = function(){
    	$scope.showSalesStat = 'showSalesStatDay';
    	$scope[$scope.showSalesStat]();
    	$("input[name='sales_stat_options']").on('change',function(){
    		let showId = $("input[name='sales_stat_options']:checked").val();
    		$scope.$apply(function(){
    			$scope.showSalesStat = showId;
    		});
    		$scope[$scope.showSalesStat]();
    		});
    }
    
    $scope.showSalesStatDay = function(){
    	if(echarts){
    		let myChart = echarts.init(document.getElementById('showSalesStatDay'));

    		maiqi.post({url:'views/dashboard/getSalesStatByDay',
    			errMsg:'获取数据失败！',container:'#dashboardPanel'})
    			.then(function(response){
    	        	let res = response.data;
    	        	console.log(res);
    	        	if(res.isSuccess && res.data){
    	        		let series = res.data.salesStatByDay;
    	        		series = series.map(function(item){
    	        			Object.assign(item,{
    	        				type:'line',
        	                    stack: '总量',
        	                    areaStyle: {normal: {}}
    	        			});
    	        			return item;
    	        		});
    	        		let option = {
    	        			    title: {
    	        			        text: ''
    	        			    },
    	        			    tooltip : {
    	        			        trigger: 'axis',
    	        			        axisPointer: {
    	        			            type: 'cross',
    	        			            label: {
    	        			                backgroundColor: '#6a7985'
    	        			            }
    	        			        }
    	        			    },
    	        			    legend: {
    	        			        data:res.data.users
    	        			    },
    	        			    toolbox: {
    	        			        feature: {
    	        			            saveAsImage: {}
    	        			        }
    	        			    },
    	        			    grid: {
    	        			        left: '3%',
    	        			        right: '4%',
    	        			        bottom: '3%',
    	        			        containLabel: true
    	        			    },
    	        			    xAxis : [
    	        			        {
    	        			            type : 'category',
    	        			            boundaryGap : false,
    	        			            data : res.data.xAxis
    	        			        }
    	        			    ],
    	        			    yAxis : [
    	        			        {
    	        			            type : 'value'
    	        			        }
    	        			    ],
    	        			    series : series
    	        			}
    	        		myChart.setOption(option);
    	        	}	        
    			})
    			.finally(function(){
    				Metronic.unblockUI("#dashboardPanel");
    			})
    	}
    };
    
    $scope.showSalesStatMonth = function(){
    };
    
    $scope.showSalesStatYear = function(){
    };
    
    initStat();
    initSalesStat();
});