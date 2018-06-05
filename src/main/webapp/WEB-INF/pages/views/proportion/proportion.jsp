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
			<a>分成管理</a>
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
		<div class="portlet">
			<div class="portlet-title">
				<div class="caption">
					<i class="fa fa-shopping-cart"></i>分成设置
				</div>
				<div class="actions">
					<a href="#" class="btn btn-success">
					<i class="fa fa-check"></i>
					<span class="hidden-480">
					完成 </span>
					</a>
					<a href="#/proportion" class="btn btn-default">
					<i class="fa fa-times"></i>
					<span class="hidden-480">
					取消 </span>
					</a>
				</div>
			</div>
			<div class="portlet-body">
				<div class="table-container">
					<table class="table table-striped table-bordered table-hover" id="datatable_ajax">
						<thead>
							<tr role="row" class="heading">
								<th width="5%">
									用户名
								</th>
								<th width="15%">
									登录名
								</th>
								<th width="15%">
									占比
								</th>
							</tr>
							<tr role="row" class="filter">
								<td>小明
								</td>
								<td>xiaoming
								</td>
								<td>
									<div class="input-inline input-medium ">
										<input type="text" value="10" name="demo1" class="form-control maiqi-spin-discount" maxlength="3">
									</div>
								</td>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<!-- End: life time stats -->
	</div>
</div>
<!-- END MAIN CONTENT -->
<!-- BEGIN MAIN JS -->
<script>
	ComponentsProportion.init();
</script>
<!-- END MAIN JS -->