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
	<div class="page-toolbar">
	</div>
</div>
<!-- END PAGE HEADER-->
<!-- BEGIN MAIN CONTENT -->
<div class="row" ng-controller="OrderEditCtrl" id="orderEditPanel">
	<div class="col-md-12">
		<!-- Begin: life time stats -->
		<div class="portlet" >
			<div class="portlet-title">
				<div class="caption">
					<i class="fa fa-shopping-cart"></i>订单号：{{orderNumber}}
				</div>
				<div class="actions">
					<a href="#" class="btn btn-success" ng-click="saveOrder()">
					<i class="fa fa-check"></i>
					<span class="hidden-480">
					完成 </span>
					</a>
					<a href="#/orders" class="btn btn-default">
					<i class="fa fa-times"></i>
					<span class="hidden-480">
					取消 </span>
					</a>
				</div>
			</div>
			<div class="portlet-body">
					<ul class="nav nav-tabs" >
						
						<li class="active">
							<a href="#" data-target="#tab_1" data-toggle="tab">客户信息</a>
						</li>
						<li>
							<a href="#" data-target="#tab_2" data-toggle="tab">商品选择</a>
						</li>
						<li>
							<a href="#" data-target="#tab_3" data-toggle="tab">商品清单</a>
						</li>
						<li>
							<a href="#" data-target="#tab_4" data-toggle="tab">售货员</a>
						</li>
						
					</ul>
					<div class="tab-content">
						<div class="tab-pane fade active in" id="tab_1">
								<div>
									<form action="#" id="form-client" class="form-horizontal form-bordered">
										<div class="form-group">
											<label class="col-sm-3 control-label">手机号</label>
											<div class="col-sm-4">
												<div class="input-group">
													<span class="input-group-addon">
									<i class="fa fa-phone"></i>
									</span>
													<input type="text" class="form-control" ng-model="orderInfo.client.phoneNum"/>
												</div>
												<p class="help-block">
													E.g: 136XXXXXXXX.<br>
												</p>
											</div>
										</div>
										<div class="form-group">
											<label class="col-sm-3 control-label">姓名</label>
											<div class="col-sm-4">
												<div class="input-group">
													<span class="input-group-addon">
									<i class="fa fa-user"></i>
									</span>
													<input type="text" class="form-control" ng-model="orderInfo.client.clientName"/>
												</div>
												<p class="help-block">
													E.g: 张三</code>
												</p>
											</div>
										</div>
										<div class="form-group">
											<label class="col-sm-3 control-label">性别</label>
											<div class="col-sm-4">
												<div class="input-group">
													<span class="input-group-addon">
									<i class="fa" ng-class="{'fa-female':(orderInfo.client.sex||'女'=='女'),'fa-male':(orderInfo.client.sex=='男')}"></i>
									</span>
									<div class="btn-group">
								        <label class="btn grey-cararra" ng-model="orderInfo.client.sex" btn-radio="'男'" ng-true-value="'男'"
    								ng-false-value="'女'" >{{orderInfo.client.sex=='男'?'男':'&nbsp;&nbsp;'}}</label>
    									<label class="btn grey-cararra" ng-model="orderInfo.client.sex" btn-radio="'女'" ng-true-value="'男'"
    								ng-false-value="'女'" >{{orderInfo.client.sex=='女'?'女':'&nbsp;&nbsp;'}}</label>
								    </div>
												</div>
												<p class="help-block">
												</p>
											</div>
										</div>
										<div class="form-group ">
											<label class="col-sm-3 control-label">出生日期</label>
											<div class="col-sm-4">
												<div class="input-group">
													<span class="input-group-addon">
														<i class="fa fa-birthday-cake"></i>
													</span>
													<input type="text" readonly class="form-control" datepicker-popup="yyyy-MM-dd" ng-model="orderInfo.client.birthday" is-open="opened" 
														datepicker-options="dateOptions" 
														clear-text="清空"
														close-text="关闭"
														current-text="今天"
														ng-required="true" close-text="Close" ng-click="open($event)"/>
										              <span class="input-group-btn">
										                <button type="button" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>
										              </span>
												</div>
												
												<p class="help-block">
												</p>
											</div>
										</div>
										<div class="form-group ">
											<label class="col-sm-3 control-label">等级</label>
											<div class="col-sm-6">
												<div class="input-group">
													<span class="input-group-addon">
													<i class="fa fa-diamond"></i>
													</span>
													<select id="client-level" class="form-control select2me" data-placeholder="Select..." 
													ng-model="orderInfo.client.level">
														<option value=""></option>
														<option value="1">Level.1</option>
														<option value="2">Level.2</option>
														<option value="3">Level.3</option>
														<option value="4">Level.4</option>
														<option value="5">Level.5</option>
													</select>
												</div>
											</div>
										</div>
										<div class="form-group">
											<label class="col-sm-3 control-label">标签</label>
											<div class="col-sm-6">
												<div class="input-group">
													<span class="input-group-addon">
													<i class="fa fa-th-list"></i>
													</span>
													<input id="client_label" type="text" class="form-control tags" />
												</div>
												<p class="help-block">
													描述客户特点，例如：回头客，蓝领等。 </code>
												</p>
											</div>
										</div>
									</form>
								</div>
							</div>
							<div class="tab-pane fade" id="tab_2" >
								<div class="row search-form-default">
									<div class="col-md-12">
										<form action="#">
											<div class="input-group">
												<span class="input-group-btn">
													<input type="checkbox" class="make-switch" data-on-text="商品名" data-off-text="标签名">
												</span>
												<div class="input-cont">
													<input type="text" placeholder="Search..." class="form-control" ng-model="orderInfo.client.label"/>
												</div>
												<span class="input-group-btn">
												<button type="button" class="btn green-haze">
												Search &nbsp; <i class="m-icon-swapright m-icon-white"></i>
												</button>
												</span>
											</div>
										</form>
									</div>
								</div>
								<div class="table-responsive">
									<table class="table table-striped table-bordered table-advance table-hover">
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
											<i class="fa fa-file"></i> 数量
										</th>
										<th class="text-nowrap">
											<i class="fa fa-check"></i> 打折
										</th>
										<th class="text-nowrap">
											<i class="fa fa-cny"></i> 折后总额
										</th>
										<th>
										</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>
											<a href="javascript:;">
											Pixel Ltd </a>
										</td>
										<td>
											 Server hardware purchase
										</td>
										<td>
											 52560.10￥ 
										</td>
										<td>
											大小: 中容纳电脑尺寸: 15英寸是否有背部缓冲棉: 是适用对象: 中年防水程度: 防泼水性别: 男质地: 涤纶提拎部件类型: 硬把闭合方式: 拉链搭扣内部结构: 拉链暗袋 手机袋 证件袋 夹层拉链袋 电脑插袋 相机插袋箱包外袋种类: 内贴袋流行元素: 机车图案: 纯色颜色分类: 15.6寸(送七+水壶+火机) 17寸(送七+水壶+火机) 15.6寸（裸包不带赠品） 17寸（裸包不带赠品） 15.6（送七+雨罩+火机） 17寸（送七+雨罩+火机） 15.6寸（促销送腰包推荐） 17寸（促销送腰包推荐） 15.6寸（送七+水壶+雨罩） 17寸（送七加水壶+雨罩）有无夹层: 有箱包硬度: 软是否可折叠: 否成色: 全新适用场景: 旅行品牌: 瑞士军刀货号: BDD812风格: 学院形状: 竖款方形肩带样式: 双根里料材质: 锦纶箱包尺寸: 48*33*23
										</td>
										<td>
											<div class="input-inline input-medium ">
												<input type="text" value="5" name="demo1" class="form-control maiqi-spin-quantity" maxlength="6">
											</div>
										</td>
										<td>
											<div class="input-inline input-medium ">
												<input type="text" value="10" name="demo1" class="form-control maiqi-spin-discount" maxlength="3">
											</div>
										</td>
										<td>
											52560.10￥
										</td>
										<td>
											<a class="btn default btn-xs red-soft" href="javascript:;">
											添加 </a>
											<p></p>
											<a class="btn default btn-xs green-stripe" href="javascript:;">
											取消 </a>
										</td>
									</tr>
									</tbody>
									</table>
								</div>
								<div class="margin-top-20">
									<ul class="pagination">
										<li>
											<a href="javascript:;">
											Prev </a>
										</li>
										<li>
											<a href="javascript:;">
											1 </a>
										</li>
										<li>
											<a href="javascript:;">
											2 </a>
										</li>
										<li class="active">
											<a href="javascript:;">
											3 </a>
										</li>
										<li>
											<a href="javascript:;">
											4 </a>
										</li>
										<li>
											<a href="javascript:;">
											5 </a>
										</li>
										<li>
											<a href="javascript:;">
											Next </a>
										</li>
									</ul>
								</div>
							</div>
							<div class="tab-pane fade" id="tab_3" >
								<div class="table-responsive">
									<table class="table table-striped table-bordered table-advance table-hover">
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
											<i class="fa fa-file"></i> 数量
										</th>
										<th class="text-nowrap">
											<i class="fa fa-check"></i> 打折
										</th>
										<th class="text-nowrap">
											<i class="fa fa-cny"></i> 折后总额
										</th>
										<th>
										</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>
											<a href="javascript:;">
											Pixel Ltd </a>
										</td>
										<td>
											 Server hardware purchase
										</td>
										<td>
											 52560.10￥ 
										</td>
										<td>
											大小: 中容纳电脑尺寸: 15英寸是否有背部缓冲棉: 是适用对象: 中年防水程度: 防泼水性别: 男质地: 涤纶提拎部件类型: 硬把闭合方式: 拉链搭扣内部结构: 拉链暗袋 手机袋 证件袋 夹层拉链袋 电脑插袋 相机插袋箱包外袋种类: 内贴袋流行元素: 机车图案: 纯色颜色分类: 15.6寸(送七+水壶+火机) 17寸(送七+水壶+火机) 15.6寸（裸包不带赠品） 17寸（裸包不带赠品） 15.6（送七+雨罩+火机） 17寸（送七+雨罩+火机） 15.6寸（促销送腰包推荐） 17寸（促销送腰包推荐） 15.6寸（送七+水壶+雨罩） 17寸（送七加水壶+雨罩）有无夹层: 有箱包硬度: 软是否可折叠: 否成色: 全新适用场景: 旅行品牌: 瑞士军刀货号: BDD812风格: 学院形状: 竖款方形肩带样式: 双根里料材质: 锦纶箱包尺寸: 48*33*23
										</td>
										<td>
											<div class="input-inline input-medium ">
												<input type="text" value="5" name="demo1" class="form-control maiqi-spin-quantity" maxlength="6">
											</div>
										</td>
										<td>
											<div class="input-inline input-medium ">
												<input type="text" value="10" name="demo1" class="form-control maiqi-spin-discount" maxlength="3">
											</div>
										</td>
										<td>
											52560.10￥
										</td>
										<td>
											<a class="btn default btn-xs green-stripe" href="javascript:;">
											取消 </a>
										</td>
									</tr>
									</tbody>
									</table>
								</div>
								<div class="margin-top-20">
									<ul class="pagination">
										<li>
											<a href="javascript:;">
											Prev </a>
										</li>
										<li>
											<a href="javascript:;">
											1 </a>
										</li>
										<li>
											<a href="javascript:;">
											2 </a>
										</li>
										<li class="active">
											<a href="javascript:;">
											3 </a>
										</li>
										<li>
											<a href="javascript:;">
											4 </a>
										</li>
										<li>
											<a href="javascript:;">
											5 </a>
										</li>
										<li>
											<a href="javascript:;">
											Next </a>
										</li>
									</ul>
								</div>
							</div>
							<div class="tab-pane fade" id="tab_4" >
								<div>
									<form action="#" id="form-salesman" class="form-horizontal form-bordered">
										<div class="form-group ">
											<label class="control-label col-md-3">售货员</label>
											<div class="col-md-4">
												<div class="input-group">
													<span class="input-group-addon">
													<i class="fa fa-female"></i>
													</span>
													<select class="form-control input-xlarge select2me" data-placeholder="Select...">
														<option value=""></option>
														<option value="AL">Alabama</option>
														<option value="WY" selected>Wyoming</option>
													</select>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
			</div>
		</div>
		<!-- End: life time stats -->
	</div>
</div>
<!-- END MAIN CONTENT -->
<!-- BEGIN MAIN JS -->
<script>
	ComponentsOrderEditer.init(); // init todo page
</script>
<!-- END MAIN JS -->