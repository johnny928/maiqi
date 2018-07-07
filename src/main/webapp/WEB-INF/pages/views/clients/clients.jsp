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
			<a>客户管理</a>
		</li>
	</ul>
</div>
<!-- END PAGE HEADER-->
<!-- BEGIN MAIN CONTENT -->
<div class="row" id="clientsPanel" ng-controller="ClientsController">
	<div class="col-md-12">
		<!-- Begin: life time stats -->
		<div class="portlet">
			<div class="portlet-body">
				<div class="portlet box green-haze">
			<div class="portlet-title">
				<div class="caption">
					<i class="fa fa-globe"></i>客户列表
				</div>
				<div class="tools">
					<a href="javascript:;" class="maiqi-search-collapse">
						<i class="fa fa-search"></i>
					</a>
					<a href="javascript:;" class="maiqi-reload" id="tools-reload"></a>
				</div>
			</div>
			<div class="portlet-body">
				<div class="maiqi-search-block">
					<form id="searchForm" role="form">
						<div class="row form-group">
							<div class="col-md-6">
								<label class="control-label">手机号：</label>
								<div class="input-icon">
									<i class="fa fa-phone"></i>
									<input type="text" class="form-control" ng-model="queryCond.phoneNum" />
								</div>
							</div>
							<div class="col-md-6">
								<label class="control-label">客户名：</label>
								<div class="input-icon">
									<i class="fa fa-user"></i>
									<input type="text" class="form-control" ng-model="queryCond.clientName"/>
								</div>
							</div>
						</div>
						<div class="row form-group">
							<div class="col-md-12">
								<label class="control-label">分类：</label>
								<div class="input-icon">
									<input type="text" size="16" id="label" class="form-control tags client_label" />
								</div>
							</div>
						</div>
						<div class="row form-group">
							<div class="col-md-6">
								<label class="control-label">创建日期（开始）：</label>
								<div class="input-icon">
									<i class="fa fa-calendar"></i>
									<input type="text" readonly class="form-control" datepicker-popup="yyyy-MM-dd" ng-model="queryCond._createDateS" is-open="createDateSOpened" 
										datepicker-options="dateOptions" 
										clear-text="清空"
										close-text="关闭"
										current-text="今天"
										ng-required="true" close-text="Close" ng-click="open($event,'createDateSOpened')"/>
						              
								</div>
							</div>
							<div class="col-md-6">
								<label class="control-label">创建日期（结束）</label>
								<div class="input-icon">
									<i class="fa fa-calendar"></i>
									<input type="text" readonly class="form-control" datepicker-popup="yyyy-MM-dd" ng-model="queryCond._createDateE" is-open="createDateEOpened" 
										datepicker-options="dateOptions" 
										clear-text="清空"
										close-text="关闭"
										current-text="今天"
										ng-required="true" close-text="Close" ng-click="open($event,'createDateEOpened')"/>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-10 col-md-offset-1">
								<button class="btn blue btn-block margin-top-10" id="searchBtn">搜索 <i class="m-icon-swapright m-icon-white"></i></button>
							</div>
						</div>
					</form>
				</div>
				<table class="table table-striped table-hover" id="clients-list">
					<thead>
						<tr>
							<th width="2%">
								用户名
							</th>
							<th width="3%">
								手机号
							</th>
							<th width="1%">
								性别
							</th>
							<th width="2%">
								出生日期
							</th>
							<th width="1%">
								等级
							</th>
							<th width="3%">
								标签
							</th>
							<th width="3%">
								创建时间
							</th>
							<th width="2%">
								操作
							</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
			</div>
		</div>
		<!-- End: life time stats -->
	</div>
</div>
<!-- END MAIN CONTENT -->

<div class="mq-hover-block bottom-right" >
	<div>
		<a href="#/clients/clientEditer" class="btn btn-circle btn-danger btn-block btn-lg m-icon-big" >
			<span class="glyphicon glyphicon-tag"></span> 客户登记 </a>
	</div>
</div>
<!-- BEGIN MAIN JS -->
<script>
	//ComponentsClients.init();
</script>
<!-- END MAIN JS -->