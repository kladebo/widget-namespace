QUnit.test('widget-select-filter', function (assert) {
    var item = new MYAPPLICATION.MODEL.WIDGETS.SelectFilter();
    assert.ok(item instanceof MYAPPLICATION.MODEL.WIDGETS.SelectFilter, 'is item instanceof SelectFilter');
});

module('widget filter create', function (assert) {
    var select = document.getElementById('qunit-fixture').getElementsByTagName('select');
    var widget = {};
    widget.native = select[0];
    widget.isMultiple = select[0].multiple;


    var item = new MYAPPLICATION.MODEL.WIDGETS.SelectFilter();

    QUnit.test('filter.create one', function (assert) {
        item.create(widget);

        var p = item.item.parentNode;
        assert.deepEqual(p.getAttribute('name'), widget.native.name, 'widget-select__filter-group name ok');
        assert.deepEqual(p.className, 'widget-select__filter-group', 'widget-select__filter-group class ok');

        assert.deepEqual(item.itemId, 0, 'itemId correct');
        assert.deepEqual(item.widget, widget, 'widget correct');
        assert.deepEqual(item.widget.filterItems.length, 1, 'filterItems.length correct');

        assert.deepEqual(item.item.tagName, 'LI', 'tagName correct');
        assert.deepEqual(item.item.textContent, '10km', 'textContent correct');
        assert.deepEqual(item.item.getAttribute('role'), 'option', 'item.role correct');
        assert.deepEqual(item.item.className, 'widget-select__filter-item', 'item.className correct');

        item.create(widget);
        assert.deepEqual(item.itemId, 1, 'itemId correct');
        assert.deepEqual(item.widget.filterItems.length, 2, 'filterItems.length correct');
        assert.deepEqual(item.item.textContent, '20km', 'textContent correct');

        item.create(widget);
        assert.deepEqual(item.itemId, 2, 'itemId correct');
        assert.deepEqual(item.widget.filterItems.length, 3, 'filterItems.length correct');
        assert.deepEqual(item.item.className, 'widget-select__filter-item widget-select__filter-item--active', 'item.className correct');
        assert.deepEqual(item.item.textContent, '30km', 'textContent correct');

    });

});
