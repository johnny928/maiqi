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
			<a>订单管理</a>
		</li>
	</ul>
</div>
<!-- END PAGE HEADER-->
<!-- BEGIN MAIN CONTENT -->
<div ng-controller="OrderModalCtrl">
<div class="row"  id="orderPanel">
	<div class="col-md-12">
		<!-- Begin: life time stats -->
		<div class="portlet box green-haze">
			<div class="portlet-title">
				<div class="caption">
					<i class="fa fa-globe"></i>订单列表
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
								<label class="control-label">订单日期（开始）：</label>
								<div class="input-icon">
									<i class="fa fa-calendar"></i>
									<input class="form-control date-picker" size="16" type="text" ng-model="queryCond.orderTimeS" value="{{queryCond.orderTimeS}}" data-date="{{queryCond.orderTimeS}}" data-date-format="yyyy-dd-mm" data-date-viewmode="years"/>
								</div>
							</div>
							<div class="col-md-6">
								<label class="control-label">订单日期（结束）</label>
								<div class="input-icon">
									<i class="fa fa-calendar"></i>
									<input class="form-control date-picker" size="16" type="text" ng-model="queryCond.orderTimeE" value="{{queryCond.orderTimeE}}" data-date="{{queryCond.orderTimeE}}" data-date-format="yyyy-dd-mm" data-date-viewmode="years"/>
								</div>
							</div>
						</div>
						<div class="row form-group">
							<div class="col-md-6">
								<label class="control-label">客户：</label>
								<div class="input-icon">
									<i class="fa fa-user"></i>
									<input class="form-control" size="16" type="text" placeholder="张三" ng-model="queryCond.clientName" />
								</div>
							</div>
							<div class="col-md-6">
								<label class="control-label">售货员：</label>
								<div class="input-icon">
									<i class="fa fa-user"></i>
									<input class="form-control" size="16" type="text" placeholder="李四" ng-model="queryCond.salespersonName" />
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
				<div class="margin-top-10">
					<table class="table table-striped table-hover " id="orders_table">
						<thead>
							<tr>
								<th>
									订单号
								</th>
								<th>
									客户名称
								</th>
								<th>
									交易总额
								</th>
								<th>
									购买商品数
								</th>
								<th>
									售货员
								</th>
								<th>
									操作
								</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
		<!-- End: life time stats -->
	</div>
</div>
<!-- END MAIN CONTENT -->

<div class="mq-hover-block bottom-right" >
	<div>
		<a href="#" class="btn btn-circle btn-danger btn-block btn-lg m-icon-big" ng-click="newOrder()">
			<span class="glyphicon glyphicon-tag"></span> 新增订单 </a>
	</div>
</div>
</div>
<script type="text/ng-template" id="myModalContent.html">
	<div class="modal-header">
		<h4 class="modal-title">订单号：{{orderNumber}}</h4>
	</div>
	<div class="modal-body">
		<table class="table table-striped table-hover " id="{{orderId}}">
			<thead>
				<tr>
					<th>
						商品名
					</th>
					<th>
						原价
					</th>
					<th>
						交易价
					</th>
					<th>
						折扣
					</th>
					<th>
						数量
					</th>
					<th>
						交易总额
					</th>
				</tr>
			</thead>
		</table>
	</div>
	<div class="modal-footer">
	</div>
</script>


<!-- BEGIN MAIN JS -->
<script>
	//ComponentsOrders.init();
</script>
<!-- END MAIN JS -->