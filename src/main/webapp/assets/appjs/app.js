/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $scope.$on('$viewContentLoaded', function() {
        Metronic.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
    $rootScope.userData = {};
    $http({
		method : 'POST',
		url : 'views/profile/getAuthor',
		data: {}
	}).then(function successCallback(response) {
		var result = response.data;
		if(result.isSuccess == 1){
			$rootScope.userData = result.data.userData || {};
		}
	}, function errorCallback(response) {
		// 请求失败执行代码
	});
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
//        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/orders");  
    
    $stateProvider

	 // Order
	    .state('orders', {
	        url: "/orders",
	        templateUrl: "views/orders/orders",
	        data: {pageTitle: 'Orders'},
	//      controller: "GeneralPageController",
	        resolve: {
	            deps: ['$ocLazyLoad', function($ocLazyLoad) {
	                return $ocLazyLoad.load({
	                    name: 'MetronicApp',
	                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
	                    files: [
	                        'assets/global/plugins/select2/select2.css',                             
	                        'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
	                        'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
							'assets/global/css/maiqi/maiqi.css',
	                        'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
	                        'assets/global/plugins/select2/select2.min.js',
	                        'assets/global/plugins/datatables/all.min.js',
	
	                        'assets/global/scripts/maiqi/maiqi.js',
	                        'assets/global/scripts/datatable.js',
	                        'assets/appjs/scripts/table-ajax.js',
	                        'assets/admin/pages/scripts/orders.js',
	
	                        'assets/appjs/controllers/OrderController.js'
	                    ]
	                });
	            }]
	        }
	    })
	    
	    .state('orderEditer', {
	        url: "/orders/orderEditer/:orderId",
	        templateUrl: "views/orders/orderEditer",
	        data: {pageTitle: 'OrderEditer'},
	//      controller: "GeneralPageController",
	        resolve: {
	            deps: ['$ocLazyLoad', function($ocLazyLoad) {
	                return $ocLazyLoad.load([{
                        name: 'ui.select',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                        ] 
                    },{
	                    name: 'MetronicApp',
	                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
	                    files: [
	                    	'assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
	                        'assets/global/plugins/select2/select2.css',                             
	                        'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
	                        'assets/admin/pages/css/search.css',
	                        'assets/global/css/maiqi/maiqi.css',
	                        'assets/global/plugins/jquery-tags-input/jquery.tagsinput.css',
	                        
	                        'assets/global/plugins/jquery-tags-input/jquery.tagsinput.min.js',
//	                        'assets/global/plugins/bootstrap/js/bootstrap.min.js',
	                        'assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
	                        'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
	                        'assets/global/plugins/bootstrap-confirmation/bootstrap-confirmation.min.js',
	                        'assets/global/plugins/select2/select2.min.js',
	                        'assets/global/plugins/datatables/all.min.js',
	                        'assets/global/plugins/mathjs/math.min.js',
	
	                        'assets/global/scripts/datatable.js',
	                        'assets/appjs/scripts/table-ajax.js',
	                        'assets/global/scripts/maiqi/maiqi.js',
//	                        'assets/admin/pages/scripts/orderEditer.js',
	                        'assets/appjs/controllers/OrderEditController.js'
	                    ]
	                }]);
	            }]
	        }
	    })
	    
	    
	    .state('goods', {
	        url: "/goods",
	        templateUrl: "views/goods/goods",
	        data: {pageTitle: 'Goods'},
	//      controller: "GeneralPageController",
	        resolve: {
	            deps: ['$ocLazyLoad', function($ocLazyLoad) {
	                return $ocLazyLoad.load({
	                    name: 'MetronicApp',
	                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
	                    files: [
	                        'assets/global/plugins/select2/select2.css',                             
	                        'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
	                        'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
							'assets/global/css/maiqi/maiqi.css',
	                        'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
	                        'assets/global/plugins/select2/select2.min.js',
	                        'assets/global/plugins/datatables/all.min.js',
	                        'assets/global/plugins/jquery-tags-input/jquery.tagsinput.css',
	                        
	                        'assets/global/plugins/jquery-tags-input/jquery.tagsinput.min.js',	
	                        'assets/global/plugins/bootstrap-confirmation/bootstrap-confirmation.min.js',
	                        'assets/global/scripts/maiqi/maiqi.js',
	                        'assets/global/scripts/datatable.js',
	                        'assets/appjs/scripts/table-ajax.js',
	                        'assets/admin/pages/scripts/goods.js',
	
	                        'assets/appjs/controllers/GoodsController.js'
	                    ]
	                });
	            }]
	        }
	    })
	    
	    .state('goodsEditer', {
	        url: "/goods/goodsEditer/:goodsId",
	        templateUrl: "views/goods/goodsEditer",
	        data: {pageTitle: 'goodsEditer'},
	//      controller: "GeneralPageController",
	        resolve: {
	            deps: ['$ocLazyLoad', function($ocLazyLoad) {
	                return $ocLazyLoad.load({
	                    name: 'MetronicApp',
	                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
	                    files: [
	                    	'assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
	                    	'assets/global/plugins/jquery-tags-input/jquery.tagsinput.css',
	                        'assets/global/plugins/select2/select2.css',                             
	                        'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
	                        'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
	                        'assets/admin/pages/css/search.css',
	                        'assets/global/css/maiqi/maiqi.css',
	                        
	                        'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
	                        'assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
	                        'assets/global/plugins/jquery-tags-input/jquery.tagsinput.min.js',
	                        'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
	                        'assets/global/plugins/select2/select2.min.js',
	                        'assets/global/plugins/datatables/all.min.js',
	
	                        'assets/global/scripts/datatable.js',
	                        'assets/appjs/scripts/table-ajax.js',
	                        
//	                        'assets/admin/pages/scripts/goodsEditer.js',
	                        'assets/appjs/controllers/GoodsEditController.js'
	                    ]
	                });
	            }]
	        }
	    })
	    
	    .state('proportion', {
	        url: "/proportion",
	        templateUrl: "views/proportion/proportion",
	        data: {pageTitle: 'Proportion'},
	//      controller: "GeneralPageController",
	        resolve: {
	            deps: ['$ocLazyLoad', function($ocLazyLoad) {
	                return $ocLazyLoad.load({
	                    name: 'MetronicApp',
	                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
	                    files: [
	                        'assets/global/plugins/select2/select2.css',                             
	                        'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
	                        'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
							'assets/global/css/maiqi/maiqi.css',
	                        'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
	                        'assets/global/plugins/select2/select2.min.js',
	                        'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
	                        'assets/global/plugins/datatables/all.min.js',
	
	                        'assets/global/scripts/datatable.js',
	                        'assets/appjs/scripts/table-ajax.js',
	                        'assets/admin/pages/scripts/proportion.js',
	
	                        'assets/appjs/controllers/ProportionController.js'
	                    ]
	                });
	            }]
	        }
	    })
	    .state('memberLevels', {
	        url: "/memberLevels",
	        templateUrl: "views/memberLevel/memberLevels",
	        data: {pageTitle: 'MemberLevels'},
	//      controller: "GeneralPageController",
	        resolve: {
	            deps: ['$ocLazyLoad', function($ocLazyLoad) {
	                return $ocLazyLoad.load({
	                    name: 'MetronicApp',
	                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
	                    files: [
	                        'assets/global/plugins/select2/select2.css',                             
	                        'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
	                        'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
							'assets/global/css/maiqi/maiqi.css',
	                        'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
	                        'assets/global/plugins/select2/select2.min.js',
	                        'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
	                        'assets/global/plugins/datatables/all.min.js',
	                        'assets/global/plugins/bootstrap-confirmation/bootstrap-confirmation.min.js',
	
	                        'assets/global/scripts/datatable.js',
	                        'assets/appjs/scripts/table-ajax.js',
	                        'assets/admin/pages/scripts/proportion.js',
	
	                        'assets/appjs/controllers/MemberLevelController.js'
	                    ]
	                });
	            }]
	        }
	    })
	
		.state('clients', {
	        url: "/clients",
	        templateUrl: "views/clients/clients",
	        data: {pageTitle: 'Clients'},
	//      controller: "GeneralPageController",
	        resolve: {
	            deps: ['$ocLazyLoad', function($ocLazyLoad) {
	                return $ocLazyLoad.load({
	                    name: 'MetronicApp',
	                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
	                    files: [
							'assets/global/plugins/select2/select2.css',                             
							'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
							'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
							'assets/global/css/maiqi/maiqi.css',
							'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
							'assets/global/plugins/select2/select2.min.js',
							'assets/global/plugins/datatables/all.min.js',
							'assets/global/plugins/jquery-tags-input/jquery.tagsinput.css',
							
							'assets/global/plugins/jquery-tags-input/jquery.tagsinput.min.js',	
							'assets/global/plugins/bootstrap-confirmation/bootstrap-confirmation.min.js',
							'assets/global/scripts/maiqi/maiqi.js',
							'assets/global/scripts/datatable.js',
							'assets/appjs/scripts/table-ajax.js',
	
	                        'assets/appjs/controllers/ClientController.js'
	                    ]
	                });
	            }]
	        }
	    })
	    
	    .state('clientEditer', {
	        url: "/clients/clientEditer/:clientId",
	        templateUrl: "views/clients/clientEditer",
	        data: {pageTitle: 'ClientEditer'},
	//      controller: "GeneralPageController",
	        resolve: {
	            deps: ['$ocLazyLoad', function($ocLazyLoad) {
	            	return $ocLazyLoad.load([{
                        name: 'ui.select',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                        ] 
                    },{
	                    name: 'MetronicApp',
	                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
	                    files: [
	                    	'assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
	                    	'assets/global/plugins/jquery-tags-input/jquery.tagsinput.css',
	                        'assets/global/plugins/select2/select2.css',                             
	                        'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
	                        'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
	                        'assets/admin/pages/css/search.css',
	                        'assets/global/css/maiqi/maiqi.css',
	                        
	                        'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
	                        'assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
	                        'assets/global/plugins/jquery-tags-input/jquery.tagsinput.min.js',
	                        'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
	                        'assets/global/plugins/select2/select2.min.js',
	                        'assets/global/plugins/datatables/all.min.js',
	
	                        'assets/global/scripts/datatable.js',
	                        'assets/appjs/scripts/table-ajax.js',
	                        'assets/global/scripts/maiqi/maiqi.js',
	                        'assets/admin/pages/scripts/clientEditer.js',
	                        'assets/appjs/controllers/ClientEditController.js'
	                    ]
	                }]);
	            }]
	        }
	    })
    
	    .state('dashboard', {
	        url: "/dashboard",
	        templateUrl: "views/dashboard/dashboard",
	        data: {pageTitle: 'ClientEditer'},
	//      controller: "GeneralPageController",
	        resolve: {
	            deps: ['$ocLazyLoad', function($ocLazyLoad) {
	                return $ocLazyLoad.load({
	                    name: 'MetronicApp',
	                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
	                    files: [
							'assets/admin/pages/css/tasks.css',
							
							'assets/global/plugins/morris/raphael-min.js',
							'assets/global/plugins/jquery.sparkline.min.js',
							'assets/global/plugins/mathjs/math.min.js',
							'assets/admin/pages/scripts/tasks.js',
	                        'assets/appjs/controllers/DashboardController.js'
	                    ]
	                });
	            }]
	        }
	    })
        // User Profile
        .state("profile", {
            url: "/profile",
            templateUrl: "views/profile/main",
            data: {pageTitle: 'User Profile'},
            //controller: "UserProfileController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',  
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            'assets/admin/pages/css/profile.css',
                            'assets/admin/pages/css/tasks.css',
                            
                            'assets/global/plugins/jquery.sparkline.min.js',
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',

                            'assets/admin/pages/scripts/profile.js',

                            'assets/appjs/controllers/UserProfileController.js'
                        ]                    
                    });
                }]
            }
        })

        // User Profile Account
        .state("profile.account", {
            url: "/account",
            templateUrl: "views/profile/account",
            data: {pageTitle: 'User Account'}
        })

}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);