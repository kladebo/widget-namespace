
(function (NS) {
    // create namespace for widget
    'use strict';
    var Option,
        HELPER = NS.MODEL.HELPERS,
        WIDGETS = NS.createNS("MYAPPLICATION.MODEL.WIDGETS");

    Option = function () {};

    Option.prototype.create = function (widget) {
        this.widget = widget;
        this.item = document.createElement('li');

        this.widget.optionItems = this.widget.optionItems || [];
        this.itemId = this.widget.optionItems.push(this.item) - 1;
        this.draw();
    };

    Option.prototype.draw = function () {
        var widget = this.widget,
            optionId = this.itemId;

        widget.guiDropDown.appendChild(this.item);

        this.item.textContent = widget.native[optionId].textContent;
        this.item.selected = widget.native[optionId].selected;
        this.item.setAttribute('role', 'option');
        this.item.className = 'widget-dropdown-item' + (this.item.selected ? ' active' : '');
        if (!widget.isMultiple && this.item.selected) {
            widget.guiValue.textContent = this.item.textContent;
        }

        this.item.addEventListener('click', function (e) {
            // cancles the bubbling so widgetDropDown wont hide
            if (!e) {
                var e = window.event; // jshint ignore:line
            }
            e.cancelBubble = true;
            if (e.stopPropagation) {
                e.stopPropagation();
            }

            widget.optionId = optionId;
            WIDGETS.Select.activeSelect = widget;
            WIDGETS.Select.optionClicked(e);

            HELPER.scrollView(widget.guiDropDown, e);
        });

        this.item.addEventListener('mouseover', function () {
            addHighlight();
        });

        this.item.addEventListener('mouseout', function () {
            removeHighlight();
        });

        var addHighlight = function () {
            widget.highlightId = optionId;
            WIDGETS.Select.optionAddHighlight();
        };

        var removeHighlight = function () {
            widget.highlightId = optionId;
            WIDGETS.Select.optionRemoveHighlight();
        };
    };

    WIDGETS.SelectOption = Option;

})(MYAPPLICATION);
