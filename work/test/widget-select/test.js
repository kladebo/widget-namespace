QUnit.test('widget-select', function (assert) {
    var item = new MYAPPLICATION.MODEL.WIDGETS.Select();
    assert.ok(item instanceof MYAPPLICATION.MODEL.WIDGETS.Select, 'is item instanceof Select');
});

module('widget select', function (assert) {
    var select = document.getElementById('qunit-fixture').getElementsByTagName('select');
    var item = new MYAPPLICATION.MODEL.WIDGETS.Select();

    QUnit.test('widget-select.create [multiple]', function (assert) {
        item.create(select[0]);
        assert.deepEqual(item.widgets.length, 1, 'widgets.length correct');
        
        var w = item.activeSelect;
        assert.deepEqual(w.native, select[0], 'native correct');
        assert.deepEqual(w.native.tabIndex, -1, 'native tabIndex correct');
        //assert.deepEqual(w.native.className, 'select-widget hidden', 'native className correct');
        
        assert.deepEqual(w.name, w.native.name, 'name is correct');
        assert.deepEqual(w.title, 'Functiegebied', 'title is correct');
        assert.deepEqual(w.isMultiple, true, 'isMultiple attr correct');
        assert.deepEqual(w.tabIndex, 2, 'tabIndex attr correct');
        assert.deepEqual(w.optionsLength, 5, 'optionsLength attr correct');
    });

    QUnit.test('widget-select.create [single] ', function (assert) {
        item.create(select[1]);
        assert.deepEqual(item.widgets.length, 2, 'widgets.length correct');

        var w = item.activeSelect;
        assert.deepEqual(w.isMultiple, false, 'isMultiple attr correct');
        assert.deepEqual(w.tabIndex, 5, 'tabIndex attr correct');
        assert.deepEqual(w.optionsLength, 6, 'optionsLength attr correct');
    });
});

module('widget select draw', function (assert) {
    var select = document.getElementById('qunit-fixture').getElementsByTagName('select');
    var item = new MYAPPLICATION.MODEL.WIDGETS.Select();
    var filter = MYAPPLICATION.MODEL.WIDGETS.SelectFilter = function () {};
    var option = MYAPPLICATION.MODEL.WIDGETS.SelectOption = function () {};
    option.prototype.create = function () {};
    filter.prototype.create = function () {};

    QUnit.test('widget-select.draw [multiple] ', function (assert) {
        assert.deepEqual(item.widgets.length, 0, 'widgets.length correct');
        
        item.create(select[0]);
        item.draw(item);

        assert.deepEqual(item.widgets.length, 1, 'widgets.length correctly');

        var w = item.activeSelect;
        assert.deepEqual(w.native.parentNode.children.length, 3, 'widget inserted correct');

        assert.deepEqual(w.gui.tagName, 'DIV', 'widget gui tagName is "DIV"');
        assert.deepEqual(w.gui.className, 'widget-select multiple', 'gui.className is "widget-select multiple"');
        assert.deepEqual(w.gui.tabIndex, w.tabIndex, 'gui.tabIndex correct');
        assert.deepEqual(w.gui.getAttribute('name'), w.name, 'gui.name correct');
        assert.deepEqual(w.gui.title, w.title, 'gui.title correct');

        assert.deepEqual(w.guiValue.tagName, 'SPAN', 'guiValue.tagName is "SPAN"');
        assert.deepEqual(w.guiValue.textContent, w.title, 'guiValue.textContent is "Functiegebied"');

        assert.deepEqual(w.guiDropDown.tagName, 'UL', 'guiDropDown.tagname is "UL"');
        assert.deepEqual(w.guiDropDown.getAttribute('role'), 'presentation', 'guiDropDown.role is "presentation"');
        assert.deepEqual(w.guiDropDown.className, 'widget-dropdown multiple hidden', 'guiDropDown.className is "widget-dropdown multiple hidden"');
    });
    
    QUnit.test('widget-select.draw [single] ', function (assert) {
        assert.deepEqual(item.widgets.length, 1, 'widgets.length correct');
        
        item.create(select[1]);
        item.draw(item);

        assert.deepEqual(item.widgets.length, 2, 'widgets.length correct');

        var w = item.activeSelect;
        assert.deepEqual(w.native.parentNode.children.length, 3, 'widget inserted correctly');


        assert.deepEqual(w.gui.tagName, 'DIV', 'widget gui tagName is "DIV"');
        assert.deepEqual(w.gui.className, 'widget-select', 'gui.className is "widget-select"');
        assert.deepEqual(w.gui.tabIndex, w.tabIndex, 'gui.tabIndex correct');
        assert.deepEqual(w.gui.getAttribute('name'), w.name, 'gui.name correct');
        assert.deepEqual(w.gui.title, w.title, 'gui.title correct');

        assert.deepEqual(w.guiValue.tagName, 'SPAN', 'guiValue.tagName is "SPAN"');
        assert.deepEqual(w.guiValue.textContent, '', 'guiValue.textContent" is ""');

        assert.deepEqual(w.guiDropDown.tagName, 'UL', 'guiDropDown.tagname is "UL"');
        assert.deepEqual(w.guiDropDown.getAttribute('role'), 'presentation', 'guiDropDown.role is "presentation"');
        assert.deepEqual(w.guiDropDown.className, 'widget-dropdown hidden', 'guiDropDown.className is "widget-dropdown hidden"');
    });
});
