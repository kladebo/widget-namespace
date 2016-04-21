(function (NS) {
    var WIDGETS = NS.createNS("MYAPPLICATION.MODEL.WIDGETS");

    //function TextBox() {}
    var TextBox = function (){};

    TextBox.prototype.init = function (obj) {
        this.native = obj;
        this.widget = document.createElement('div');
    };

    TextBox.prototype.draw = function () {
        // Insert the DOM node right after the nativeSelect within the document
        this.native.parentNode.insertBefore(this.widget, this.native.nextSibling);
        this.widget.appendChild(this.native);
        this.widget.className = 'widget-input';
    };
    
    WIDGETS.TextBox = TextBox;

})(MYAPPLICATION);
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
            WIDGETS.Select.optionClicked();

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
(function (NS) {
    // create namespace for widget
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
        Select.activeSelect.guiDropDown.classList.add('hidden');
    };

    showDropDown = function () {
        Select.activeSelect.guiDropDown.classList.remove('hidden');
    };

    toggleDropDown = function () {
        if (Select.activeSelect.guiDropDown.className.indexOf('hidden') >= 0) {
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
        // uses fallthrough!
        switch (widget.isMultiple) {
            case false:
                if (widgetOption.classList.contains('active')) {
                    widgetOption.classList.remove('active');
                    widgetFilter.classList.remove('active');
                    widget.guiValue.textContent = widget.title;
                    break;
                } else {
                    for (i = 0, x = widget.optionItems.length; i < x; i += 1) {
                        widget.optionItems[i].classList.remove('active');
                        widget.filterItems[i].classList.remove('active');
                    }
                    widget.guiValue.textContent = widgetOption.textContent;
                }
                /* falls through */
            case true:
                widgetOption.classList.toggle('active');
                widgetFilter.classList.toggle('active');
        }
        for (i = 0, x = widget.filterItems.length; i < x; i += 1) {
            if (widget.filterItems[i].className.indexOf('active') >= 0) {
                count += 1;
            }
        }
        if (count === 0) {
            widget.guiFilterGroup.classList.add('hidden');
        } else {
            widget.guiFilterGroup.classList.remove('hidden');
        }
    };

    setNative = function () {
        var widget = Select.activeSelect,
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
        widget.title = nativeSelect.getAttribute('title');
        widget.tabIndex = parseInt(nativeSelect.getAttribute('tabIndex'), 10);
        widget.optionsLength = nativeSelect.length;

        // disable native within the document
        nativeSelect.tabIndex = -1;
        nativeSelect.classList.add('hidden');

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

        widget.guiFilterBar = document.querySelector('.select-widget-filterbar');

        // setup the widgetValue
        widget.guiValue = document.createElement('span');
        widget.gui.appendChild(widget.guiValue);
        widget.guiValue.textContent = widget.isMultiple ? widget.title : '';

        // setup the widgetDropDown
        widget.guiDropDown = document.createElement('ul');
        widget.gui.appendChild(widget.guiDropDown);
        widget.guiDropDown.setAttribute('role', 'presentation');
        widget.guiDropDown.className = 'widget-dropdown hidden';

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
            WIDGETS.Select.activeSelect = widget;
        });

        // Each time the user click on a widget
        widget.gui.addEventListener('blur', function () {
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
                toggleDropDown();
            } else if (e.keyCode === 38 || e.keyCode === 40) {

                if (widget.isMultiple && widget.guiDropDown.className.indexOf('hidden') >= 0) {
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
            } else if (e.keyCode === 13) {
                if (!widget.isMultiple) {
                    toggleDropDown();
                    return;
                }
                if (typeof Select.activeSelect.highlightId !== 'undefined') {
                    widget.optionId = Select.activeSelect.highlightId;
                    WIDGETS.Select.optionClicked();
                }
            }
            console.log(event.keyCode);
        });

        // Insert the fragment right after the nativeSelect within the document
        widget.native.parentNode.insertBefore(fragment, widget.native.nextSibling);
    };

    Select.optionClicked = function () {
        setNative();
        setSelect();
    };

    Select.optionAddHighlight = function () {
        if (typeof Select.activeSelect.highlightId !== 'undefined') {
            Select.activeSelect.optionItems[Select.activeSelect.highlightId].classList.add('highlight');
        }
    };

    Select.optionRemoveHighlight = function () {
        if (typeof Select.activeSelect.highlightId !== 'undefined') {
            Select.activeSelect.optionItems[Select.activeSelect.highlightId].classList.remove('highlight');
        }
    };

    WIDGETS.Select = Select;

})(MYAPPLICATION);
