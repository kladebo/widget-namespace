QUnit.test('widget-select-option', function (assert) {
    var item = new MYAPPLICATION.MODEL.WIDGETS.SelectOption();
    assert.ok(item instanceof MYAPPLICATION.MODEL.WIDGETS.SelectOption, 'is item instanceof SelectOption');
});

module('widget option create', function (assert) {
    var select = document.getElementById('qunit-fixture').getElementsByTagName('select');
    var widget = {};
    widget.native = select[0];
    widget.isMultiple = select[0].multiple;
    widget.guiDropDown = document.createDocumentFragment();
    widget.guiValue = document.createDocumentFragment();

    var item = new MYAPPLICATION.MODEL.WIDGETS.SelectOption();

    QUnit.test('option.create one', function (assert) {
        item.create(widget);
        assert.deepEqual(item.itemId, 0, 'itemId correct');
        assert.deepEqual(item.widget, widget, 'widget correct');
        assert.deepEqual(item.widget.optionItems.length, 1, 'optionItems.length correct');
        
        assert.deepEqual(item.item.tagName, 'LI', 'tagName correct');
        assert.deepEqual(item.item.textContent, '10km', 'textContent correct');
        assert.deepEqual(item.item.getAttribute('role'), 'option', 'item.role correct');
        assert.deepEqual(item.item.className, 'widget-select__dropdown-item', 'item.className correct');
        
        item.create(widget);
        assert.deepEqual(item.itemId, 1, 'itemId correct');
        assert.deepEqual(item.widget.optionItems.length, 2, 'optionItems.length correct');
        assert.deepEqual(item.item.textContent, '20km', 'textContent correct');
        
        item.create(widget);
        assert.deepEqual(item.itemId, 2, 'itemId correct');
        assert.deepEqual(item.widget.optionItems.length, 3, 'optionItems.length correct');
        assert.deepEqual(item.item.className, 'widget-select__dropdown-item widget-select__dropdown-item--active', 'item.className correct');
        assert.deepEqual(item.item.textContent, '30km', 'textContent correct');
        assert.deepEqual(widget.guiValue.textContent, '30km', 'widget.guiValue correct');
        
    });

});
