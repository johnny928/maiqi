var ComponentsProportion = function(){
	var handleBootstrapTouchSpin = function() {
        $(".maiqi-spin-discount").TouchSpin({          
            buttondown_class: 'btn green',
            buttonup_class: 'btn green',
            min: 1,
            max: 10,
            decimals:1,
            step:0.5,
            stepinterval: 50,
            maxboostedstep: 10,
            postfix: '成'
        });
    };
	
	return {
		init: function(){
			handleBootstrapTouchSpin();
		}
	}
}();