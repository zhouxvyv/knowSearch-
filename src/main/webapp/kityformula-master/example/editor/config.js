/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    config.extraPlugins = 'kityformula';
    config.allowedContent = true;
    config.protectedSource.push("/<span(.*)>.+<\/span>/");
    config.shiftEnterMode = CKEDITOR.ENTER_P;
    config.enterMode=2;
    config.filebrowserImageUploadUrl = "";
    config.toolbar=
    [
        //加粗     斜体，     下划线      穿过线      下标字        上标字
        [/*'Bold', 'Italic', 'Underline', 'Strike',*/ 'Subscript', 'Superscript',/*],
        // 数字列表          实体列表            减小缩进    增大缩进
        ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent'],
        //左对 齐             居中对齐          右对齐          两端对齐
        ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
        //图片    flash    表格       水平线            表情       特殊字符                   分页符
        [*/'Image', 'Flash', /*'Table', 'HorizontalRule', 'SpecialChar', */'kityformula'/*, 'PageBreak', 'FontSize'*/]/*,

        //文本颜色     背景颜色
        ['TextColor', 'BGColor'],
        //全屏           显示区块
        ['Maximize', '-']*/
    ];

};

