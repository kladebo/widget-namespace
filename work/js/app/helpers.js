/*global MYAPPLICATION: false */
(function (NS) {
    // create namespace for widget
    'use strict';
    var HELPER = NS.createNS("MYAPPLICATION.MODEL.HELPERS");

    HELPER.findPos = function (obj) {
        var r = {
            abstop: 0,
            absleft: 0,
            width: 0,
            height: 0,
            toParentTop: 0,
            toParentLeft: 0
        };
        if (!obj) {
            return r;
        }
        r.width = obj.offsetWidth;
        r.height = obj.offsetHeight;
        r.toParentLeft = obj.offsetLeft;
        r.toParentTop = obj.offsetTop;
        if (obj.offsetParent) {
            do {
                if (obj.style.position !== 'absolute') {
                    r.absleft += obj.offsetLeft;
                    r.abstop += obj.offsetTop;
                }
                obj = obj.offsetParent;
            } while (obj);
        }
        return r;
    };

    HELPER.returnParent = function (from, parentTagName) {
        var find,
            parentString = parentTagName.toLowerCase();

        find = function (from) {
            if (parentString === 'body') {
                return false;
            }

            if (parentString === from.tagName.toLowerCase()) {
                return from;
            } else {
                return find(from.parentNode);
            }
        };
        return find(from);
    };

    HELPER.scrollView = function (obj, e) {
        if (!e) {
            var e = window.event; // jshint ignore:line
        }
        var from, to,
            item = e.srcElement || e.target,
            itemPos = HELPER.findPos(item),
            boxHeight = obj.clientHeight,
            scrollHeight = obj.scrollHeight,
            scrolled = obj.scrollTop,
            scrollStep = 5;

        if (scrollHeight <= boxHeight) {
            // no scroll posible
            return;
        } else if (scrollHeight > boxHeight) {
            // scrolling is possible
            if ((itemPos.toParentTop - scrolled) <= itemPos.height) {
                // scroll up
                from = obj.scrollTop;
                to = from - itemPos.height;
                (function scroll() {
                    if (scrolled === 0) {
                        return;
                    }
                    from -= scrollStep;
                    if (from > to - scrollStep) {
                        obj.scrollTop -= scrollStep;
                        setTimeout(scroll, 30);
                    }
                }());
            } else if ((itemPos.toParentTop - scrolled + itemPos.height) >= boxHeight - itemPos.height) {
                // scroll down
                from = obj.scrollTop;
                to = from + itemPos.height;
                (function scroll() {
                    if (scrollHeight === boxHeight + obj.scrollTop) {
                        return;
                    }
                    from += scrollStep;
                    if (from < to + scrollStep) {
                        obj.scrollTop += scrollStep;
                        setTimeout(scroll, 30);
                    }
                }());
            }
        }
    };

}(MYAPPLICATION));
