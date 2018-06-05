var ComponentsOrderEditer = function(){
	var handleBootstrapTouchSpin = function() {

        $(".maiqi-spin-quantity").TouchSpin({          
            buttondown_class: 'btn green',
            buttonup_class: 'btn green',
            min: 0,
            max: 999999,
            stepinterval: 0,
            maxboostedstep: 999999,
            prefix: ''
        }); 
        
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
	
	return {
		init: function(){
			handleBootstrapTouchSpin();
			
			/*if (jQuery().datepicker && MaiQi) {
				MaiQi.initDatePicker();
            }*/
		}
	}
}();
