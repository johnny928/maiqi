var Login = function() {

    var handleLogin = function() {

        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                remember: {
                    required: false
                }
            },

            messages: {
                username: {
                    required: "请输入用户名称。"
                },
                password: {
                    required: "请输入密码。"
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   
                $('.alert-danger', $('.login-form')).show();
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function(form) {
                form.submit(); // form validation success, call ajax form submit
            }
        });

        $('.login-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                	login();
                }
                return false;
            }
        });
        
        $('#login_btn').click(function(e){
        	if ($('.login-form').validate().form()) {
        		login();
        	}
        });

		// 登录
		function login() {
			$.ajax({
				type : "POST",
				url : "login",
				data : "loginName=" + $('#username').val() + "&password="
						+ $('#password').val(),
				dataType: 'json',
				beforeSend : function(){
					Metronic.blockUI({
						target : 'body',
						animate : true
					});
				},
				success : function(data) {
					if (data.isSuccess == 1) {
						$(window).attr('location', 'index');
					} else {
						Metronic.alert({
			                container: '', // alerts parent container(by default placed after the page breadcrumbs)
			                place: 'append', // append or prepent in container 
			                type: 'danger',  // alert's type
			                message: '用户验证失败！请输入正确的用户名和密码。',  // alert's message
			                close: true, // make alert closable
			                reset: true, // close all previouse alerts first
			                focus: true, // auto scroll to the alert after shown
			                closeInSeconds: 2, // auto close after defined seconds
			                icon: 'warning' // put icon before the message
			            });
					}
				},
				error: function(request, textStatus, errorThrown){
					Metronic.alert({
		                container: '', // alerts parent container(by default placed after the page breadcrumbs)
		                place: 'append', // append or prepent in container 
		                type: 'danger',  // alert's type
		                message: '用户验证失败！错误码：'+request.status+'。',  // alert's message
		                close: true, // make alert closable
		                reset: true, // close all previouse alerts first
		                focus: true, // auto scroll to the alert after shown
		                closeInSeconds: 2, // auto close after defined seconds
		                icon: 'warning' // put icon before the message
		            });
				},
				complete: function(){
					Metronic.unblockUI('body');
				}
			});
			
		};
    }

    return {
        //main function to initiate the module
        init: function() {

            handleLogin();

        }

    };

}();