var ComponentsOrders = function(){
	return {
		init: function(){
			if (jQuery().datepicker && MaiQi) {
				MaiQi.init();
				$('.portlet a.maiqi-search-collapse').trigger('click');
            }
		}
	}
}();