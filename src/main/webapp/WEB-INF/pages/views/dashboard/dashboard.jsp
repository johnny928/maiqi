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
			<a>销售情况</a>
		</li>
	</ul>
</div>
<!-- END PAGE HEADER-->
<!-- BEGIN MAIN CONTENT -->
<div ng-controller="DashboardController" id="dashboardPanel">
	<!-- BEGIN DASHBOARD STATS -->
	<div class="row">
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
			<div class="dashboard-stat blue-madison">
				<div class="visual">
					<i class="fa fa-comments"></i>
				</div>
				<div class="details">
					<div class="number">
						1349
					</div>
					<div class="desc">
						今日总订单数
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
			<div class="dashboard-stat red-intense">
				<div class="visual">
					<i class="fa fa-bar-chart-o"></i>
				</div>
				<div class="details">
					<div class="number">
						12,5M$
					</div>
					<div class="desc">
						今日总销售额
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
			<div class="dashboard-stat green-haze">
				<div class="visual">
					<i class="fa fa-shopping-cart"></i>
				</div>
				<div class="details">
					<div class="number">
						549
					</div>
					<div class="desc">
						今日我的订单数
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
			<div class="dashboard-stat purple-plum">
				<div class="visual">
					<i class="fa fa-globe"></i>
				</div>
				<div class="details">
					<div class="number">
						+89%
					</div>
					<div class="desc">
						今日我的销售额
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END DASHBOARD STATS -->
	<div class="row">
		<div class="col-md-6 col-sm-12">
			<!-- BEGIN PORTLET-->
			<div class="portlet light ">
				<div class="portlet-title">
					<div class="caption caption-md">
						<i class="icon-bar-chart font-green-haze hide"></i>
						<span class="caption-subject font-green-haze bold uppercase">销售情况</span>
					</div>
					<div class="actions">
						<div class="btn-group btn-group-devided" data-toggle="buttons">
							<label class="btn btn-transparent grey-salsa btn-circle btn-sm active">
							<input type="radio" name="options" class="toggle" id="option1">按日</label>
							<label class="btn btn-transparent grey-salsa btn-circle btn-sm">
							<input type="radio" name="options" class="toggle" id="option2">按月</label>
							<label class="btn btn-transparent grey-salsa btn-circle btn-sm">
							<input type="radio" name="options" class="toggle" id="option2">按年</label>
						</div>
					</div>
				</div>
				<div class="portlet-body">
					<div id="sales_statistics" class="portlet-body-morris-fit morris-chart" style="height: 260px">
					</div>
				</div>
			</div>
			<!-- END PORTLET-->
		</div>
		<div class="col-md-6 col-sm-12">
			<!-- BEGIN PORTLET-->
			<div class="portlet light ">
				<div class="portlet-title">
					<div class="caption caption-md">
						<i class="icon-bar-chart font-green-haze hide"></i>
						<span class="caption-subject font-green-haze bold uppercase">分成情况</span>
					</div>
					<div class="actions">
						<div class="btn-group btn-group-devided" data-toggle="buttons">
							<label class="btn btn-transparent grey-salsa btn-circle btn-sm active">
							<input type="radio" name="options" class="toggle" id="option1">按日</label>
							<label class="btn btn-transparent grey-salsa btn-circle btn-sm">
							<input type="radio" name="options" class="toggle" id="option2">按月</label>
							<label class="btn btn-transparent grey-salsa btn-circle btn-sm">
							<input type="radio" name="options" class="toggle" id="option2">按年</label>
						</div>
					</div>
				</div>
				<div class="portlet-body">
					<div id="sales_proportion" class="portlet-body-morris-fit morris-chart" style="height: 260px">
					</div>
				</div>
			</div>
			<!-- END PORTLET-->
		</div>
	</div>
</div>
<!-- END MAIN CONTENT -->
<!-- BEGIN MAIN JS & CSS -->
<script>
	Tasks.initDashboardWidget();
</script>
<!-- BEGIN MAIN JS & CSS -->