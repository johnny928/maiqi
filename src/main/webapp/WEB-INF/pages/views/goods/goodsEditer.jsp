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
	<div class="page-toolbar">
	</div>
</div>
<!-- END PAGE HEADER-->
<!-- BEGIN MAIN CONTENT -->
<div class="row" ng-controller="OrderEditCtrl" id="goodsPanel">
	<div class="col-md-12">
		<!-- Begin: life time stats -->
		<div class="portlet" >
			<div class="portlet-title">
				<div class="caption">
					<i class="fa fa-shopping-cart"></i>商品信息
				</div>
				<div class="actions">
					<a href="#" class="btn btn-success" ng-click="saveGoods()">
					<i class="fa fa-check"></i>
					<span class="hidden-480">
					完成 </span>
					</a>
					<a href="#/goods" class="btn btn-default" ng-click="cancel()">
					<i class="fa fa-times"></i>
					<span class="hidden-480">
					取消 </span>
					</a>
				</div>
			</div>
			<div class="portlet-body">
				<div>
					<form action="#" id="form-client" class="form-horizontal form-bordered">
						<div class="form-group">
							<label class="col-sm-3 control-label">商品名</label>
							<div class="col-sm-6">
								<div class="input-group">
									<span class="input-group-addon">
									<i class="fa fa-briefcase"></i>
									</span>
									<input type="text" class="form-control" ng-model="goods.goodsName"/>
								</div>
								<p class="help-block">
								</p>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label">商品单价</label>
							<div class="col-sm-6">
								<div class="input-group">
									<span class="input-group-addon">
									<i class="fa fa-cny"></i>
									</span>
									<input type="number" step="0.01" min="0" class="form-control" ng-model="goods.orgPrice"/>
								</div>
								<p class="help-block">
								</p>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label">标签</label>
							<div class="col-sm-6">
								<div class="input-group">
									<span class="input-group-addon">
									<i class="fa fa-th-list"></i>
									</span>
									<input type="text" class="form-control tags goods_label" />
								</div>
								<p class="help-block">
								</p>
							</div>
						</div>
						<div class="form-group ">
							<label class="col-sm-3 control-label">描述</label>
							<div class="col-sm-6">
								<div class="input-group">
									<span class="input-group-addon">
									<i class="fa fa-comment"></i>
									</span>
									<textarea id="maxlength_textarea" class="form-control" maxlength="225" rows="2" placeholder="This textarea has a limit of 225 chars." ng-model="goods.goodsDesc"></textarea>
								</div>
								<p class="help-block">
								</p>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- End: life time stats -->
	</div>
</div>
<!-- END MAIN CONTENT -->
<!-- BEGIN MAIN JS -->
<script>
	//ComponentsGoodsEditer.init(); // init todo page
</script>
<!-- END MAIN JS -->