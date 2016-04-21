(function (NS) {
    // create namespace for widget
    'use strict';
    var Filter,
        WIDGETS = NS.createNS("MYAPPLICATION.MODEL.WIDGETS");

    Filter = function () {};

    Filter.prototype.create = function (widget) {
        this.widget = widget;
        this.item = document.createElement('li');

        if (!this.widget.guiFilterBar) {
            this.widget.guiFilterBar = document.createDocumentFragment();
            console.log('Please put a element on the page with \'select-widget-filterbar\' as className');
        }

        if (!this.widget.filterItems) {
            this.widget.filterItems = [];

            this.widget.guiFilterGroup = document.createElement('ul');
            this.widget.guiFilterBar.appendChild(this.widget.guiFilterGroup);
            this.widget.guiFilterGroup.setAttribute('role', 'presentation');
            this.widget.guiFilterGroup.className = 'widget-filter-group';
            this.widget.guiFilterGroup.setAttribute('name', this.widget.native.name);
        }

        this.itemId = this.widget.filterItems.push(this.item) - 1;
        this.draw();
    };

    Filter.prototype.draw = function () {
        var widget = this.widget,
            filterId = this.itemId;


        widget.guiFilterGroup.appendChild(this.item);

        this.item.innerHTML = widget.native[filterId].value;
        this.item.selected = widget.native[filterId].selected;
        this.item.setAttribute('role', 'option');
        this.item.className = 'widget-filter-item' + (this.item.selected ? ' active' : '');

        
        this.item.addEventListener('click', function (e) {
            // cancles the bubbling
            if (!e) {
                var e = window.event;// jshint ignore:line
            }
            e.cancelBubble = true;
            if (e.stopPropagation) {
                e.stopPropagation();
            }

            widget.optionId = filterId;
            WIDGETS.Select.activeSelect = widget;
            WIDGETS.Select.optionClicked();
        });
    };

//    WIDGETS.Select = WIDGETS.Select || {};
    WIDGETS.SelectFilter = Filter;

})(MYAPPLICATION);
