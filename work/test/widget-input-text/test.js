QUnit.test('widget-text', function (assert) {
    var item = new MYAPPLICATION.MODEL.WIDGETS.TextBox();
    assert.ok(item instanceof MYAPPLICATION.MODEL.WIDGETS.TextBox, 'is item instanceof TextBox');
});

QUnit.test('widget-text.init', function (assert) {
    var input = document.getElementById('qunit-fixture').getElementsByTagName('input');
    var item = new MYAPPLICATION.MODEL.WIDGETS.TextBox();
    item.init(input[0]);
    assert.ok(item.native === input[0], 'item.native === input');
});
QUnit.test('widget-text.draw', function (assert) {
    var input = document.getElementById('qunit-fixture').getElementsByTagName('input');
    var item = new MYAPPLICATION.MODEL.WIDGETS.TextBox();
    item.init(input[0]);
    item.draw();
    var parent = item.native.parentNode;
    assert.ok(parent.tagName.toLowerCase() === 'div', 'parent.tagName === div');
    assert.ok(parent.className === 'widget-input', 'parent.className === widget-input');
});