
// 列默认值
var DEFAULT_VALUE = {
	align: "center",
	formatter: unitTextFormatter,
	cellStyle: unitClassFormatter
}

var footerData = undefined;

// 加载表格数据
function loadTableList(url, datas) {
	
	datas = $.extend({
		UserID: '',
		RptDate: '2015-5-14'
	}, datas);

	doAjax({
		url: url
		,data: datas
	}, function(data) {

		footerData = data.pop();

		// 渲染
		$('#unitsListTable').bootstrapTable({
			height: getHeight(),
			columns: setColumns(TABLE_COLUMNS, DEFAULT_VALUE),
			data: data,
			headerHeight: 55, // zsk extend
			showFooter: true,
			showHeader: true
		}).on('click-row.bs.table', function (e, row, $element) {
			if(URL_LIST.gotoPageUrl){
				gotoPage(URL_LIST.gotoPageUrl, {areaId: row.areaId});
			}
	    })

	});
}

// setColumns
function setColumns(columns, options) {
	for (var i = 0, j = columns.length; i < j; i++) {
		columns[i].footerFormatter = footerFormatter;
	};
	return columns;
}

function footerFormatter(data, column){
	return footerData[column.field]
};

// 格式化单元格内容文本
function unitTextFormatter(value, row, index) {
	return value && value[0] || ""
}

// 格式化单元格样式
function unitClassFormatter(value, row, index, defaultValue) {
	if (defaultValue && defaultValue[1] == 1) { // 认购
		++FOOTER_DATA[0].num;
		return {classes: FOOTER_DATA[0].className}
	}

	if (defaultValue && defaultValue[1] == 2) { // 签约
		++FOOTER_DATA[1].num;
		return {classes:  FOOTER_DATA[1].className}
	}

	defaultValue && ++FOOTER_DATA[2].num;
	return {};	// 其他
}

// 表格的高度
function getHeight() {
	return $(window).height() - 138;
}


// 合并单元格
function combindTableRow(){
	var rows = $('#unitsListTable').find('tbody>tr');

	var columnValue = "";
	var len = 0;
	var rowspanLen = [];
	for(var i = 0, j = rows.length; i < j; i++){
		if(columnValue != "" && columnValue != rows.eq(i).find('td').html()){
			rowspanLen.push(len);
			len = 1;
		}else{
			++len;
		}
		columnValue = rows.eq(i).find('td').html()
	}

	// var currentRow = 0;
	// for(var i = 0, j = rowspanLen; i < j; i++){
	// 	if(rowsspanLen[i] > 1){
	// 		row.eq(i).find('td').eq(0).att('rowspan', rowsspanLen[i]);
	// 		currentRow++;
			
	// 	}
	// }
	

}