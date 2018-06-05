<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<div class="page-sidebar navbar-collapse collapse">
	<!-- BEGIN SIDEBAR MENU -->
	<!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
	<!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
	<!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
	<!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
	<!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
	<!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
	<ul class="page-sidebar-menu page-sidebar-menu-light " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" ng-class="{'page-sidebar-menu-closed': settings.layout.pageSidebarClosed}">
		
		<li class="start">
			<a href="#/orders">
			<i class="icon-home"></i>
			<span class="title">订单管理</span>
			</a>
		</li>
		<li class="start">
			<a href="#/goods">
			<i class="icon-home"></i>
			<span class="title">商品管理</span>
			</a>
		</li>
		<li class="start">
			<a href="#/proportion">
			<i class="icon-home"></i>
			<span class="title">分成管理</span>
			</a>
		</li>
		<li class="start">
			<a href="#/clients">
			<i class="icon-home"></i>
			<span class="title">客户管理</span>
			</a>
		</li>
	</ul>
	<!-- END SIDEBAR MENU -->
</div>	