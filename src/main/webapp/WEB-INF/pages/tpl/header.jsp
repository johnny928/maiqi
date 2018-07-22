<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!-- BEGIN HEADER INNER -->
<div class="page-header-inner">
	<!-- BEGIN LOGO -->
	<div class="page-logo">
		<a href="#/">  
		<img src="assets/admin/layout/img/logo.png" alt="logo" class="logo-default"/>
		</a>
		<div class="menu-toggler sidebar-toggler">
			<!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->
		</div>
	</div>
	<!-- END LOGO -->
	<!-- BEGIN HEADER SEARCH BOX -->
	<!-- DOC: Apply "search-form-expanded" right after the "search-form" class to have half expanded search box -->
	<form class="search-form hide" action="#" method="GET">
		<div class="input-group">
			<input type="text" class="form-control" placeholder="Search..." name="query">
			<span class="input-group-btn">
			<a href="javascript:;" class="btn submit"><i class="icon-magnifier"></i></a>
			</span>
		</div>
	</form>
	<!-- END HEADER SEARCH BOX -->
	<!-- BEGIN RESPONSIVE MENU TOGGLER -->
	<a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
	</a>
	<!-- END RESPONSIVE MENU TOGGLER -->
	<!-- BEGIN TOP NAVIGATION MENU -->
	<div class="top-menu">
		<ul class="nav navbar-nav pull-right">
			<!-- BEGIN NOTIFICATION DROPDOWN -->
			<!-- BEGIN USER LOGIN DROPDOWN -->
			<!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
			<li class="dropdown dropdown-user">
				<a href="#" class="dropdown-toggle" dropdown-menu-hover data-toggle="dropdown" data-close-others="true">
				<img ng-if="!userData.userImgVersion" alt="" class="img-circle" src="assets/admin/layout/img/avatar3_small.jpg"/>
				<img ng-if="userData.userImgVersion" alt="" class="img-circle" ng-src="views/profile/getIcon?v={{userData.userImgVersion}}"/>
				<span class="username username-hide-on-mobile">
				{{userData.userName}} </span>
				<i class="fa fa-angle-down"></i>
				</a>
				<ul class="dropdown-menu dropdown-menu-default">
						<li>
							<a href="#/profile/account">
							<i class="icon-user"></i> 账号设置 </a>
						</li>
						<li class="divider">
						</li>
						<li>
							<a href="logout">
							<i class="icon-key"></i> 登出 </a>
						</li>
				</ul>
			</li>
			<!-- END USER LOGIN DROPDOWN -->
			<!-- BEGIN QUICK SIDEBAR TOGGLER -->
			<!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
			<!-- END QUICK SIDEBAR TOGGLER -->
		</ul>
	</div>
	<!-- END TOP NAVIGATION MENU -->
</div>
<!-- END HEADER INNER -->