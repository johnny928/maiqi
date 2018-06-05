<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<div class="row">
	<div class="col-md-12">
		<div class="portlet light">
			<div class="portlet-title tabbable-line">
				<div class="caption caption-md">
					<i class="icon-globe theme-font hide"></i>
					<span class="caption-subject font-blue-madison bold uppercase">帐号设置</span>
				</div>
				<ul class="nav nav-tabs">
					<li class="active">
						<a href="#" data-target="#tab_1_1" data-toggle="tab">用户信息</a>
					</li>
					<li>
						<a href="#" data-target="#tab_1_2" data-toggle="tab">用户头像</a>
					</li>
					<li>
						<a href="#" data-target="#tab_1_3" data-toggle="tab">密码修改</a>
					</li>
				</ul>
			</div>
			<div class="portlet-body">
				<div class="tab-content">
					<!-- PERSONAL INFO TAB -->
					<div class="tab-pane active" id="tab_1_1">
						<form role="form" action="#" novalidate name="accountForm">
							<div class="form-group" ng-class="{'has-error':accountForm.userName.$invalid}">
								<label class="control-label">用户名</label>
								<input type="text" placeholder="{{author.userName}}" class="form-control" name="userName" id="userName"
								required ng-minlength="3" ng-maxlength="50" 
								ng-model="author.userName" />
							</div>
							<div class="form-group" ng-class="{'has-error':accountForm.loginName.$invalid}">
								<label class="control-label">登录名</label>
								<input type="text" placeholder="{{author.loginName}}" class="form-control" name="loginName" id="loginName"
								required ng-minlength="3" ng-maxlength="25"
								ng-model="author.loginName"/>
							</div>
							<div class="form-group">
								<label class="control-label">用户描述</label>
								<textarea id="maxlength_textarea" class="form-control" maxlength="500" rows="2" placeholder="{{author.userDesc}}" ng-model="author.userDesc">{{author.userDesc}}</textarea>
							</div>
							<div class="margiv-top-10">
								<a href="#" class="btn green-haze" ng-click="accountSave(accountForm.$valid)" ng-class="{'active': isActive}">
								Save Changes </a>
								<a href="#" class="btn default" ng-click="accountCancel()">
								Cancel </a>
							</div>
						</form>
					</div>
					<!-- END PERSONAL INFO TAB -->
					<!-- CHANGE AVATAR TAB -->
					<div class="tab-pane" id="tab_1_2">
						<p>
							Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
						</p>
						<form action="#" role="form">
							<div class="form-group">
								<div class="fileinput fileinput-new" data-provides="fileinput">
									<div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
										<img src="http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=no+image" alt=""/>
									</div>
									<div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;">
									</div>
									<div>
										<span class="btn default btn-file">
										<span class="fileinput-new">
										Select image </span>
										<span class="fileinput-exists">
										Change </span>
										<input type="file" name="...">
										</span>
										<a href="#" class="btn default fileinput-exists" data-dismiss="fileinput">
										Remove </a>
									</div>
								</div>
								<div class="clearfix margin-top-10">
									<span class="label label-danger">NOTE! </span>
									<span>Attached image thumbnail is supported in Latest Firefox, Chrome, Opera, Safari and Internet Explorer 10 only </span>
								</div>
							</div>
							<div class="margin-top-10">
								<a href="#" class="btn green-haze">
								Submit </a>
								<a href="#" class="btn default">
								Cancel </a>
							</div>
						</form>
					</div>
					<!-- END CHANGE AVATAR TAB -->
					<!-- CHANGE PASSWORD TAB -->
					<div class="tab-pane" id="tab_1_3">
						<form action="#">
							<div class="form-group">
								<label class="control-label">Current Password</label>
								<input type="password" class="form-control"/>
							</div>
							<div class="form-group">
								<label class="control-label">New Password</label>
								<input type="password" class="form-control"/>
							</div>
							<div class="form-group">
								<label class="control-label">Re-type New Password</label>
								<input type="password" class="form-control"/>
							</div>
							<div class="margin-top-10">
								<a href="#" class="btn green-haze">
								Change Password </a>
								<a href="#" class="btn default">
								Cancel </a>
							</div>
						</form>
					</div>
					<!-- END CHANGE PASSWORD TAB -->
				</div>
			</div>
		</div>
	</div>
</div>