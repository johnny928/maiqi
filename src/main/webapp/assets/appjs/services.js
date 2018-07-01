/***
GLobal Services
***/

// Route State Load Spinner(used on page or content load)
MetronicApp.service('maiqi', ['$http','$q',
    function($http,$q) {
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
	        		deferred1.reject(options.errMsg||'请求失败！');
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
	        	deferred1.reject(options.errMsg||'请求失败！');
	        })
			return deferred.promise;
				
		}
	}
]);
