/*global MYAPPLICATION: false */
(function (NS) {
    'use strict';
    var Select,
        widgetClicked,
        hideDropDown,
        showDropDown,
        toggleDropDown,
        setSelect,
        setNative,
        WIDGETS = NS.createNS("MYAPPLICATION.MODEL.WIDGETS");

    widgetClicked = function () {
        toggleDropDown();
    };

    hideDropDown = function () {
        Select.optionRemoveHighlight();
        delete Select.activeSelect.highlightId;
        Select.activeSelect.guiDropDown.classList.add('widget-select__dropdown--hidden');
    };

    showDropDown = function () {
        Select.activeSelect.guiDropDown.classList.remove('widget-select__dropdown--hidden');
    };

    toggleDropDown = function () {
        if (Select.activeSelect.guiDropDown.className.indexOf('widget-select__dropdown--hidden') >= 0) {
            showDropDown();
        } else {
            hideDropDown();
        }
    };

    setSelect = function () {
        var i, x,
            count = 0,
            widget = Select.activeSelect,
            widgetOption = widget.optionItems[widget.optionId],
            widgetFilter = widget.filterItems[widget.optionId];

        if (!widget.isMultiple) {
            hideDropDown();

            if (widgetOption.classList.contains('widget-select__dropdown-item--active')) {
                widgetOption.classList.remove('widget-select__dropdown-item--active');
                widgetFilter.classList.remove('widget-select__filter-item--active');
                widget.guiValue.textContent = widget.title;
            } else {
                for (i = 0, x = widget.optionItems.length; i < x; i += 1) {
                    widget.optionItems[i].classList.remove('widget-select__dropdown-item--active');
                    widget.filterItems[i].classList.remove('widget-select__filter-item--active');
                }
                widgetOption.classList.add('widget-select__dropdown-item--active');
                widgetFilter.classList.add('widget-select__filter-item--active');
                widget.guiValue.textContent = widgetOption.textContent;
            }
        } else {
            widgetOption.classList.toggle('widget-select__dropdown-item--multiple--active');
            widgetFilter.classList.toggle('widget-select__filter-item--active');

            if (widgetOption.classList.contains('widget-select__dropdown-item--multiple--active')) {
                widgetOption.querySelector('input.widget-select__checkbox').checked = true;
            } else {
                widgetOption.querySelector('input.widget-select__checkbox').checked = false;
            }
        }
        for (i = 0, x = widget.filterItems.length; i < x; i += 1) {
            if (widget.filterItems[i].className.indexOf('widget-select__filter-item--active') >= 0) {
                count += 1;
            }
        }
        if (count === 0) {
            widget.guiFilterGroup.classList.add('widget-select__filter-group--hidden');
        } else {
            widget.guiFilterGroup.classList.remove('widget-select__filter-group--hidden');
        }
    };

    setNative = function () {
        var widget = WIDGETS.Select.activeSelect,
            nativeOption = widget.native[widget.optionId];
        // uses fallthrough!
        switch (widget.isMultiple) {
            case false:
                if (nativeOption.selected) {
                    widget.native.selectedIndex = -1;
                    break;
                }
                /* falls through */
            case true:
                nativeOption.selected = !nativeOption.selected;
        }
    };


    Select = function () {
        this.widgets = this.widgets || [];
    };

    Select.prototype.create = function (nativeSelect) {

        // setup work
        var widget = {};
        this.widgets.push(widget);
        this.activeSelect = widget;

        // setup: reference to native 
        widget.native = nativeSelect;
        // setup: widget properties from native attributes
        widget.isMultiple = nativeSelect.multiple;
        widget.name = nativeSelect.name;
        widget.title = nativeSelect.title;
        widget.tabIndex = parseInt(nativeSelect.getAttribute('tabIndex'), 10);
        widget.optionsLength = nativeSelect.length;

        // disable native within the document
        nativeSelect.tabIndex = -1;
        //nativeSelect.classList.add('hidden');

    };

    Select.prototype.draw = function () {
        var i, x, fragment, option, filter,
            widget = this.activeSelect; //widget;

        // setup the widget
        fragment = document.createDocumentFragment();
        widget.gui = document.createElement('div');
        fragment.appendChild(widget.gui);
        widget.gui.className = widget.isMultiple ? 'widget-select multiple' : 'widget-select';
        widget.gui.tabIndex = widget.tabIndex;
        widget.gui.setAttribute('name', widget.name);
        widget.gui.title = widget.title;

        widget.guiFilterBar = document.querySelector('.widget-select__filterbar');

        // setup the widgetValue
        widget.guiValue = document.createElement('span');
        widget.gui.appendChild(widget.guiValue);
        widget.guiValue.className = 'widget-select__value';
        widget.guiValue.textContent = widget.isMultiple ? widget.title : '';

        // setup the widgetDropDown
        widget.guiDropDown = document.createElement('ul');
        widget.gui.appendChild(widget.guiDropDown);
        widget.guiDropDown.setAttribute('role', 'presentation');
        widget.guiDropDown.className = 'widget-select__dropdown' + (widget.isMultiple ? ' multiple' : '') + ' widget-select__dropdown--hidden';

        // setup the widgetOptions AND the widgetFilters

        option = new WIDGETS.SelectOption();
        filter = new WIDGETS.SelectFilter();
        for (i = 0, x = widget.optionsLength; i < x; i += 1) {
            widget.optionId = i;

            option.create(widget);
            filter.create(widget);
        }

        // Each time the user click on a widget element
        widget.gui.addEventListener('click', function () {
            this.focus();
            widgetClicked();

        });

        widget.gui.addEventListener('focus', function () {
            this.classList.add('focus');
            WIDGETS.Select.activeSelect = widget;
        });

        // Each time the user click on a widget
        widget.gui.addEventListener('blur', function () {
            this.classList.remove('focus');
            hideDropDown();
        });

        widget.gui.addEventListener('keydown', function (e) {
            if (!e) {
                var e = window.event; // jshint ignore:line
            }
            e.cancelBubble = true;
            if (e.stopPropagation) {
                e.stopPropagation();
            }

            if (e.altKey && (e.keyCode === 38 || e.keyCode === 40)) {
                e.preventDefault();
                toggleDropDown();
            } else if (e.keyCode === 38 || e.keyCode === 40) {
                e.preventDefault();

                if (widget.isMultiple && widget.guiDropDown.className.indexOf('widget-select__dropdown--hidden') >= 0) {
                    return;
                }

                if (widget.isMultiple) {
                    WIDGETS.Select.optionRemoveHighlight();
                }
                if (typeof widget.highlightId === 'undefined') {
                    widget.highlightId = -1;
                }

                //if(!widget.isMultiple){
                //    widget.highlightId = widget.optionId;
                //}

                if (e.keyCode === 38) {
                    if (widget.highlightId > 0) {
                        widget.highlightId -= 1;
                    }
                } else if (e.keyCode === 40) {
                    if (widget.highlightId < widget.optionItems.length - 1) {
                        widget.highlightId += 1;
                    }
                }

                if (widget.isMultiple) {
                    WIDGETS.Select.optionAddHighlight();
                } else {
                    if (widget.optionId === widget.highlightId) {
                        return;
                    }
                    widget.optionId = widget.highlightId;
                    WIDGETS.Select.optionClicked();
                }
                return;
            } else if (e.keyCode === 13) {
                if (!widget.isMultiple) {
                    toggleDropDown();
                    return;
                }
                if (typeof Select.activeSelect.highlightId !== 'undefined') {
                    widget.optionId = WIDGETS.Select.activeSelect.highlightId;
                    WIDGETS.Select.optionClicked();
                }
            }
            console.log(e.keyCode);
        });

        // Insert the fragment right after the nativeSelect within the document
        widget.native.parentNode.insertBefore(fragment, widget.native.nextSibling);
    };

    Select.optionClicked = function () {
        setNative();
        setSelect();
    };

    Select.optionAddHighlight = function () {
        var highlightId = WIDGETS.Select.activeSelect.highlightId;
        if (typeof highlightId !== 'undefined') {
            WIDGETS.Select.activeSelect.optionItems[highlightId].classList.add('widget-select__dropdown-item--highlight');
        }
    };

    Select.optionRemoveHighlight = function () {
        var highlightId = WIDGETS.Select.activeSelect.highlightId;
        if (typeof highlightId !== 'undefined') {
            WIDGETS.Select.activeSelect.optionItems[highlightId].classList.remove('widget-select__dropdown-item--highlight');
        }
    };

    WIDGETS.Select = Select;

}(MYAPPLICATION));
