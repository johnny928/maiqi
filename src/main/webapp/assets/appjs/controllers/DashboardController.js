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
    	$scope.showSalesStatTabId = 'salesStatDay';
    	$scope.showSalesStat( $scope.showSalesStatTabId );
    	$("input[name='sales_stat_options']").on('change',function(){
    		$scope.$apply(function(){
    			$scope.showSalesStatTabId = $("input[name='sales_stat_options']:checked").val();
    		});
    		$scope.showSalesStat( $scope.showSalesStatTabId );
    		});
    }
    
    $scope.showSalesStat = function(showId){
    	$scope.salesStatUrl = {
			'salesStatDay':'getSalesStatByDay',
			'salesStatMonth':'getSalesStatByMonth',
			'salesStatYear':'getSalesStatByYear'
    	};
    	if(echarts){
    		let myChart = echarts.init(document.getElementById(showId));
    		maiqi.post({url:'views/dashboard/'+$scope.salesStatUrl[showId],
    			errMsg:'获取数据失败！',container:'#dashboardPanel'})
    			.then(function(response){
    	        	let res = response.data;
    	        	console.log(res);
    	        	if(res.isSuccess && res.data){
    	        		let series = res.data.salesStat;
    	        		let toal = getToal(series);
    	        		let users = res.data.users;
    	        		users.push('Toal');
    	        		series = series.map(function(item){
    	        			Object.assign(item,{
    	        				type:'line',
        	                    stack: '总量',
        	                    areaStyle: {normal: {}}
    	        			});
    	        			return item;
    	        		});
    	        		series.push(
	        					{
	        			            name:'Toal',
	        			            type:'line',
	        			            stack: '总量',
	        			            areaStyle: {normal: {}},
	        			            data:toal
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
    	        			        data:users,
    	        			        width:'50%',
    	        			        left:'20'
    	        			    },
    	        			    toolbox: {
    	        			        feature: {
    	        			        	dataZoom: {
    	        			                yAxisIndex: 'none'
    	        			            },
    	        			            dataView: {readOnly: false},
    	        			            magicType: {type: ['line', 'bar']},
    	        			            restore: {},
    	        			            saveAsImage: {}
    	        			        },
    	        			        right:30
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
    
    
    let initProStat = function(){
    	$scope.showProStatTabId = 'proStatDay';
    	$scope.showProStat( $scope.showProStatTabId );
    	$("input[name='pro_stat_options']").on('change',function(){
    		$scope.$apply(function(){
    			$scope.showProStatTabId = $("input[name='pro_stat_options']:checked").val();
    		});
    		$scope.showProStat( $scope.showProStatTabId );
    		});
    }
    
    $scope.showProStat = function(showId){
    	$scope.proStatUrl = {
			'proStatDay':'getProStatByDay',
			'proStatMonth':'getProStatByMonth',
			'proStatYear':'getProStatByYear'
    	};
    	if(echarts){
    		let myChart = echarts.init(document.getElementById(showId));
    		maiqi.post({url:'views/dashboard/'+$scope.proStatUrl[showId],
    			errMsg:'获取数据失败！',container:'#dashboardPanel'})
    			.then(function(response){
    	        	let res = response.data;
    	        	console.log(res);
    	        	if(res.isSuccess && res.data){
    	        		let series = res.data.salesStat;
    	        		let toal = getToal(series);
    	        		let users = res.data.users;
    	        		users.push('Toal');
    	        		series = series.map(function(item){
    	        			Object.assign(item,{
    	        				type:'line',
        	                    stack: '总量',
        	                    areaStyle: {normal: {}}
    	        			});
    	        			return item;
    	        		});
    	        		series.push(
	        					{
	        			            name:'Toal',
	        			            type:'line',
	        			            stack: '总量',
	        			            areaStyle: {normal: {}},
	        			            data:toal
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
    	        			        data:users,
    	        			        width:'50%',
    	        			        left:'20'
    	        			    },
    	        			    toolbox: {
    	        			        feature: {
    	        			        	dataZoom: {
    	        			                yAxisIndex: 'none'
    	        			            },
    	        			            dataView: {readOnly: false},
    	        			            magicType: {type: ['line', 'bar']},
    	        			            restore: {},
    	        			            saveAsImage: {}
    	        			        },
    	        			        right:30
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
    
    let getToal = function(seriies){
    	let ser = seriies;
    	let nser = ser.map(function(item){return item.data});
    	let toal = [];
    	nser.forEach(function(item){
    		item.forEach(function(node,index){
    			toal[index] = math.chain(math.number(toal[index]||0)).add(math.number(node)).round(2).done();
    		});
    	});
    	return toal;
    }
    
    $scope.showSalesStatMonth = function(){
    };
    
    $scope.showSalesStatYear = function(){
    };
    
    initStat();
    initSalesStat();
    initProStat();
});