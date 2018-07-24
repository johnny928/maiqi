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
	<div class="page-toolbar">
	</div>
</div>
<!-- END PAGE HEADER-->
<!-- BEGIN MAIN CONTENT -->
<div class="row" ng-controller="ClientEditCtrl" id="clientEditPanel">
	<div class="col-md-12">
		<!-- Begin: life time stats -->
		<div class="portlet" >
			<div class="portlet-title">
				<div class="caption">
					<i class="fa fa-shopping-cart"></i>客户信息
				</div>
				<div class="actions">
					<a href="#" class="btn btn-success" ng-click="saveClient()">
					<i class="fa fa-check"></i>
					<span class="hidden-480">
					保存 </span>
					</a>
					<a href="#/clients" class="btn btn-default">
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
							<label class="col-sm-3 control-label">手机号</label>
							<div class="col-sm-4">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="fa fa-phone"></i>
									</span>
									<input type="text" class="form-control" ng-model="client.phoneNum"/>
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
									<input type="text" class="form-control" ng-model="client.clientName"/>
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
					<i class="fa" ng-class="{'fa-female':(client.sex||'女'=='女'),'fa-male':(client.sex=='男')}"></i>
					</span>
					<div class="btn-group">
				        <label class="btn grey-cararra" ng-model="client.sex" btn-radio="'男'" ng-true-value="'男'"
								ng-false-value="'女'" >{{client.sex=='男'?'男':'&nbsp;&nbsp;'}}</label>
									<label class="btn grey-cararra" ng-model="client.sex" btn-radio="'女'" ng-true-value="'男'"
								ng-false-value="'女'" >{{client.sex=='女'?'女':'&nbsp;&nbsp;'}}</label>
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
									<input type="text" readonly class="form-control" datepicker-popup="yyyy-MM-dd" ng-model="client.birthday" is-open="opened" 
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
									ng-model="client.level">
										<option value="">无</option>
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
									<input type="text" class="form-control tags client_label" />
								</div>
								<p class="help-block">
									描述客户特点，例如：回头客，蓝领等。 </code>
								</p>
							</div>
						</div>
						<div class="form-group ">
							<label class="control-label col-md-3">客户来源</label>
							<div class="col-sm-6">
								<div class="input-group">
									<span class="input-group-addon">
									<i class="fa fa-group"></i>
									</span>
									<ui-select ng-model="clientSource.selected" theme="bootstrap">
							            <ui-select-match placeholder="请选择该客户的来源..." >{{$select.selected.userName}}</ui-select-match>
							            <ui-select-choices repeat="person in operators | filter: $select.search">
							              <div ng-bind-html="person.userName | highlight: $select.search"></div>
							              <small ng-bind-html="'登录名：'+person.loginName | highlight: $select.search"></small>
							            </ui-select-choices>
							        </ui-select>
									<span class="input-group-btn">
							            <button class="btn btn-default" ng-click="clearClientSource($event, $select)">X</button>
							        </span>
								</div>
							</div>
						</div>
						<!-- <div class="form-actions">
							<div class="row">
								<div class="col-md-offset-3 col-md-3">
									<button type="button" class="btn purple btn-block"><i class="fa fa-check"></i> 保存</button>
								</div>
							</div>
						</div> -->
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
	ComponentsClientEditer.init(); // init todo page
</script>
<!-- END MAIN JS -->