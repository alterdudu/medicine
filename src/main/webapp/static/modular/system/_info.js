/**
 * 初始化详情对话框
 */
var InfoDlg = {
    InfoData : {}
};

/**
 * 清除数据
 */
InfoDlg.clearData = function() {
    this.InfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
InfoDlg.set = function(key, val) {
    this.InfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
InfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
InfoDlg.close = function() {
    parent.layer.close(window.parent..layerIndex);
}

/**
 * 收集数据
 */
InfoDlg.collectData = function() {
    this
    .set('id')
    .set('patientIdcard')
    .set('roomName')
    .set('comment')
    .set('pointDate')
    .set('pointPlace');
}

/**
 * 提交添加
 */
InfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "//add", function(data){
        Feng.success("添加成功!");
        window.parent..table.refresh();
        InfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.InfoData);
    ajax.start();
}

/**
 * 提交修改
 */
InfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "//update", function(data){
        Feng.success("修改成功!");
        window.parent..table.refresh();
        InfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.InfoData);
    ajax.start();
}

$(function() {

});
