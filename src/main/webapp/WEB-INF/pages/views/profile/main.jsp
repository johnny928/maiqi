<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!-- BEGIN PAGE HEADER-->
<div class="page-bar">
	<ul class="page-breadcrumb">
		<li>
			<i class="fa fa-home"></i>
			<a>Home</a>
			<i class="fa fa-angle-right"></i>
		</li>
		<li>
			<a>用户简况</a>
		</li>
	</ul>
	<div class="page-toolbar">
		<div class="btn-group pull-right">
		</div>
	</div>
</div>
<h3 class="page-title">
	用户简况
</h3>
<!-- END PAGE HEADER-->

<!-- BEGIN PAGE CONTENT-->
<div class="row" ng-controller="UserProfileController">
	<div class="col-md-12">
		<!-- BEGIN PROFILE SIDEBAR -->
		<div class="profile-sidebar">
			<!-- PORTLET MAIN -->
			<div class="portlet light profile-sidebar-portlet">
				<!-- SIDEBAR USERPIC -->
				<div class="profile-userpic">
					<img ng-if="!userData.userImgVersion" src="assets/admin/pages/media/profile/profile_user.jpg" class="img-responsive" alt="">
					<img ng-if="userData.userImgVersion" ng-src="views/profile/getIcon?v={{userData.userImgVersion}}" class="img-responsive" alt="">
				</div>
				<!-- END SIDEBAR USERPIC -->
				<!-- SIDEBAR USER TITLE -->
				<div class="profile-usertitle">
					<div class="profile-usertitle-name">
						{{author.userName}}
					</div>
					<div class="profile-usertitle-job">
						{{author.loginName}}
					</div>
				</div>
				<!-- END SIDEBAR USER TITLE -->
				<!-- SIDEBAR MENU -->
				<div class="profile-usermenu">
					<ul class="nav">
						<li ng-class="{active: $state.includes('profile.account')}" >
							<a ui-sref="profile.account" >
							<i class="icon-settings" ></i>
							帐号设置 </a>
						</li>
					</ul>
				</div>
				<!-- END MENU -->
			</div>
			<!-- END PORTLET MAIN -->
		</div>
		<!-- END BEGIN PROFILE SIDEBAR -->
		<!-- BEGIN PROFILE CONTENT -->
		<div ui-view class="profile-content fade-in-up"> 
		</div>
		<!-- END PROFILE CONTENT -->
	</div>
</div>
<!-- END PAGE CONTENT-->