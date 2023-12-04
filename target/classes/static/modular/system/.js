/**
 * 管理初始化
 */
var  = {
    id: "Table",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'patientIdcard', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'roomName', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'comment', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'pointDate', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'pointPlace', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        .seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加
 */
.openAdd = function () {
    var index = layer.open({
        type: 2,
        title: '添加',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '//_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看详情
 */
.openDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '//_update/' + .seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除
 */
.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "//delete", function (data) {
            Feng.success("删除成功!");
            .table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("Id",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询列表
 */
.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    .table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = .initColumn();
    var table = new BSTable(.id, "//list", defaultColunms);
    table.setPaginationType("client");
    .table = table.init();
});
