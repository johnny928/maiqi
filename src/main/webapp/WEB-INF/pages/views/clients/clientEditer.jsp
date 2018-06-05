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
<div class="row">
	<div class="col-md-12">
		<!-- Begin: life time stats -->
		<div class="portlet" >
			<div class="portlet-title">
				<div class="caption">
					<i class="fa fa-shopping-cart"></i>客户信息
				</div>
				<div class="actions">
					<a href="#" class="btn btn-success">
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
							<div class="col-sm-6">
								<div class="input-group">
									<span class="input-group-addon">
									<i class="fa fa-phone"></i>
									</span>
									<input type="text" class="form-control" />
								</div>
								<p class="help-block">
								</p>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label">姓名</label>
							<div class="col-sm-6">
								<div class="input-group">
									<span class="input-group-addon">
									<i class="fa fa-user"></i>
									</span>
									<input type="text" class="form-control" />
								</div>
								<p class="help-block">
								</p>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label">性别</label>
							<div class="col-sm-6">
								<div class="input-group">
									<span class="input-group-addon">
									<i class="fa fa-female"></i>
									</span>
					<input type="checkbox" class="make-switch" data-on-text="男" data-off-text="女">
								</div>
								<p class="help-block">
								</p>
							</div>
						</div>
						<div class="form-group ">
							<label class="col-sm-3 control-label">出生日期</label>
							<div class="col-sm-6">
								<div class="input-group">
									<span class="input-group-addon">
									<i class="fa fa-birthday-cake"></i>
									</span>
									<input type="text" class="form-control" />
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
									<select class="form-control select2me" data-placeholder="Select...">
										<option value=""></option>
										<option value="1">Leve.1</option>
										<option value="2" selected>Leve.2</option>
										<option value="3">Leve.3</option>
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
									<input id="tags_1" type="text" class="form-control tags" value="老会员,朋友,回头客"/>
								</div>
								<p class="help-block">
									描述客户特点，例如：回头客，蓝领等。 </code>
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
	ComponentsClientEditer.init(); // init todo page
</script>
<!-- END MAIN JS -->