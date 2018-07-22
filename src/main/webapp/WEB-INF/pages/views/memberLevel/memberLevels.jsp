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
			<a>会员等级管理</a>
		</li>
	</ul>
	<div class="page-toolbar">
	</div>
</div>
<!-- END PAGE HEADER-->
<div ng-controller="MemberLevelController" >
<!-- BEGIN MAIN CONTENT -->
<div class="row" id="memberLevelPanel">
	<div class="col-md-12">
		<!-- Begin: life time stats -->
		<div class="portlet">
			<div class="portlet-title">
				<div class="caption">
					<i class="fa fa-shopping-cart"></i>会员等级管理
				</div>
			</div>
			<div class="portlet-body">
				<table class="table table-striped table-bordered table-hover" id="level-list">
					<thead>
						<tr role="row" class="heading">
							<th width="5%">
								会员等级
							</th>
							<th width="15%">
								会员等级说明
							</th>
							<th width="15%">
								折扣
							</th>
							<th width="1%">
							</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
		<!-- End: life time stats -->
	</div>
</div>
<!-- <div class="mq-hover-block bottom-right" >
	<div>
		<a href="#" class="btn btn-circle btn-danger btn-block btn-lg m-icon-big" ng-click="newLevel()">
			<span class="glyphicon glyphicon-tag"></span> 新增会员等级 </a>
	</div>
</div> -->
</div>
<!-- END MAIN CONTENT -->
<!-- BEGIN MAIN JS -->
<script>
	//ComponentsProportion.init();
</script>
<!-- END MAIN JS -->