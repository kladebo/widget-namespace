/*global MYAPPLICATION: false */
(function (NS) {
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
            optionId = this.itemId,
            checkbox,
            textbox,
            addHighlight,
            removeHighlight;


        addHighlight = function () {
            widget.highlightId = optionId;
            WIDGETS.Select.optionAddHighlight();
        };

        removeHighlight = function () {
            widget.highlightId = optionId;
            WIDGETS.Select.optionRemoveHighlight();
        };

        widget.guiDropDown.appendChild(this.item);

        
        this.item.selected = widget.native[optionId].selected;
        this.item.setAttribute('role', 'option');

        if (widget.isMultiple) {
            checkbox = document.createElement('input');
            this.item.appendChild(checkbox);
            checkbox.type = 'checkbox';
            checkbox.className = 'widget-select__checkbox';
            
            checkbox.addEventListener('mousedown', function (e){
                e.preventDefault();
            });
            
            this.item.className = 'widget-select__dropdown-item--multiple';
            if (this.item.selected) {
                checkbox.checked = true;
                this.item.classList.add('widget-select__dropdown-item--multiple--active');
            }
        } else {
            this.item.className = 'widget-select__dropdown-item';
            if (this.item.selected) {
                this.item.classList.add('widget-select__dropdown-item--active');
            }
        }
        textbox = document.createElement('span');
        this.item.appendChild(textbox);
        textbox.className = 'widget-select__item-textBox';
        textbox.textContent = widget.native[optionId].textContent;
        
        if (!widget.isMultiple && this.item.selected) {
            widget.guiValue.textContent = textbox.textContent;
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


    };

    WIDGETS.SelectOption = Option;

}(MYAPPLICATION));
