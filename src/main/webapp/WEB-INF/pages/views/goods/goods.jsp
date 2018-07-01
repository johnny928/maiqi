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
			<a>商品管理</a>
		</li>
	</ul>
</div>
<!-- END PAGE HEADER-->
<!-- BEGIN MAIN CONTENT -->
<div class="row" ng-controller="GoodsController" id="goodsPanel">
	<div class="col-md-12">
		<!-- Begin: life time stats -->
		<div class="portlet">
			<div class="portlet-body">
				<div class="portlet box green-haze">
			<div class="portlet-title">
				<div class="caption">
					<i class="fa fa-globe"></i>商品列表
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
								<label class="control-label">商品名：</label>
								<div class="input-icon">
									<i class="fa fa-briefcase"></i>
									<input class="form-control" size="16" type="text" ng-model="queryCond.goodsName" placeholder="小鳄鱼棉质短袖"  />
								</div>
							</div>
							<div class="col-md-6">
								<label class="control-label">分类：</label>
								<div class="input-icon">
									<input type="text" size="16" id="label" class="form-control tags goods_label" />
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
				<div class="table-responsive">
					<table class="table table-striped table-bordered table-advance table-hover" id="goods-list">
						<thead>
							<tr>
								<th class="text-nowrap">
									<i class="fa fa-briefcase"></i> 商品名称
								</th>
								<th class="text-nowrap">
									<i class="fa fa-th-list"></i> 分类
								</th>
								<th class="text-nowrap">
									<i class="fa fa-cny"></i> 单价
								</th>
								<th class="text-nowrap">
									<i class="fa fa-comment"></i> 描述
								</th>
								<th class="text-nowrap">
									<i class="fa fa-calendar"></i> 创建时间
								</th>
								<th>
								</th>
							</tr>
						</thead>
					</table>
				</div>
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
		<a href="#/goods/goodsEditer" class="btn btn-circle btn-danger btn-block btn-lg m-icon-big" >
			<span class="glyphicon glyphicon-tag"></span> 新增商品 </a>
	</div>
</div>
<!-- BEGIN MAIN JS -->
<script>
	ComponentsGoods.init();
</script>
<!-- END MAIN JS -->