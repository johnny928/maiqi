var MaiQi = function(){
	var initDatePicker = function(){
		$.fn.datepicker.dates['cn'] = {   //切换为中文显示  
		    days: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],  
	        daysShort: ["日", "一", "二", "三", "四", "五", "六", "七"],  
	        daysMin: ["日", "一", "二", "三", "四", "五", "六", "七"],  
	        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],  
	        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],  
	        today: "今天",  
	        clear: "清除"  
		};
	    $('.date-picker').datepicker({  
		    autoclose: true, //自动关闭  
		    beforeShowDay: $.noop,    //在显示日期之前调用的函数  
		    calendarWeeks: false,     //是否显示今年是第几周  
		    clearBtn: false,          //显示清除按钮  
		    daysOfWeekDisabled: [],   //星期几不可选  
		    endDate: Infinity,        //日历结束日期  
		    forceParse: true,         //是否强制转换不符合格式的字符串  
		    format: 'yyyy-mm-dd',     //日期格式  
		    keyboardNavigation: true, //是否显示箭头导航  
		    language: 'cn',           //语言  
		    minViewMode: 0,  
		    orientation: "auto",      //方向  
		    rtl: false,  
		    startDate: -Infinity,     //日历开始日期  
		    startView: 0,             //开始显示  
		    todayBtn: true,          //今天按钮  
		    todayHighlight: true,    //今天高亮  
		    weekStart: 0              //星期几是开始  
		});
	};
	
	var initPortletSearchTool = function(){
		$('.portlet a.maiqi-search-collapse').on('click',function(){
			if($(this).hasClass('search-hide')){
				$(this).parents('.portlet').find('.maiqi-search-block').show();
				$(this).find('i').removeClass('fa-search-plus').addClass('fa-search');
				$(this).removeClass('search-hide');
			}else{
				$(this).parents('.portlet').find('.maiqi-search-block').hide();
				$(this).find('i').removeClass('fa-search').addClass('fa-search-plus');
				$(this).addClass('search-hide');
			}
		});
	}
	
	return {
		init: function(){
			initDatePicker();
			initPortletSearchTool();
		},
		initDatePicker: initDatePicker,
		initPortletSearchTool: initPortletSearchTool
	}
}();
