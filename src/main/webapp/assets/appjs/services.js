/***
GLobal Services
***/

// Route State Load Spinner(used on page or content load)
MetronicApp.service('maiqi', ['$http','$q','$timeout',
    function($http,$q,$timeout) {
		this.post = function(options){
			let deferred = $q.defer();
			$http.post(
				options.url,
				options.data
	        ).then(function(response) {
	        	let res = response.data;
	        	if(!res.isSuccess){
	        		Metronic.alert({
                        type: 'danger',
                        icon: 'warning',
                        message: options.errMsg||'请求失败！',
                        container: options.container,
                        closeInSeconds: 5, 
                        place: 'prepend'
                    });
	        		deferred.reject(options.errMsg||'请求失败！');
	        	}
	        	deferred.resolve(response);
	        },function(){
	        	Metronic.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: options.errMsg||'请求失败！',
                    container: options.container,
                    closeInSeconds: 5,
                    place: 'prepend'
                });
	        	deferred.reject(options.errMsg||'请求失败！');
	        })
			return deferred.promise;
				
		};
		
		this.queue = {};
		
		this.debounce = function(id,func,wait,immediate){
			let deferred = $q.defer();
			let that = this;
			return function(){
				var context = this, args = arguments;
				var later = function() {
					that.queue[id] = null;
					if(!immediate) {
						deferred.resolve(func.apply(context, args));
					}
				};
				var callNow = immediate && !timeout;
				if ( that.queue[id] ) {
					$timeout.cancel(that.queue[id]);
				}
				that.queue[id] = $timeout(later, wait);
				if (callNow) {
					deferred.resolve(func.apply(context,args));
				}
				return deferred.promise;
			}
		}
	}
]);
