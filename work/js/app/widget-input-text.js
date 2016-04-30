/*global MYAPPLICATION: false */
(function (NS) {
    'use strict';
    var WIDGETS = NS.createNS("MYAPPLICATION.MODEL.WIDGETS"),
        TextBox = function () {};

    TextBox.prototype.init = function (obj) {
        this.native = obj;
        this.widget = document.createElement('div');
    };

    TextBox.prototype.draw = function () {
        // Insert the DOM node right after the nativeSelect within the document
        this.native.parentNode.insertBefore(this.widget, this.native.nextSibling);
        this.widget.appendChild(this.native);
        this.widget.className = 'widget-input';

        this.native.setAttribute('autocomplete', 'off');
        this.native.className = 'widget-input__input';
        this.native.addEventListener('focus', function () {
            this.parentNode.classList.add('widget-input--focus');
        });
        this.native.addEventListener('blur', function () {
            this.parentNode.classList.remove('widget-input--focus');
        });
    };

    WIDGETS.TextBox = TextBox;

}(MYAPPLICATION));
