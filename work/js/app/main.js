/*global MYAPPLICATION: false */
(function (NS) {
    'use strict';
    var WIDGET = NS.MODEL.WIDGETS,
        HELPER = NS.MODEL.HELPERS,
        i, x, items, widget;
    window.addEventListener('load', function () {
        widget = new WIDGET.Select();
        items = document.getElementsByTagName('select');
        for (i = 0, x = items.length; i < x; i += 1) {
            widget.create(items[i]);
            widget.draw.call(widget);
        }

        items = document.getElementsByTagName('input');
        for (i = 0, x = items.length; i < x; i += 1) {
            widget = new WIDGET.TextBox();
            widget.init(items[i]);
            widget.draw();
        }
    });

}(MYAPPLICATION));
