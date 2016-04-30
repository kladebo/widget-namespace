/*jslint node: true*/
'use strict';
var WidgetPage = function () {
    this.get = function () {
        browser.driver.get('http://klaas/klaas/widget_select/version03/www');
    };

};

var Widget = function () {
    this.dropdown = function (dropdownName) {

        var openDropdown = function () {
            var x = element.all(by.css('.widget-select')).filter(function (elem, index) {
                return elem.getAttribute('name').then(function (name) {
                    return name === dropdownName;
                });
            }).first();
            x.click();
        };

        return {
            option: function (optionvalue) {
                openDropdown();

                return element.all(by.css('div.widget-select.widget-select--focus li')).filter(function (elem, index) {
                    return elem.getText().then(function (text) {
                        return text === optionvalue;
                    });
                }).first();
            }
        };
    };
};

describe('this page', function () {
    var obj;
    var widgetPage = new WidgetPage();


    beforeEach(function () {
        widgetPage.get();
    });

    it('should have a title', function () {
        expect(dv.getTitle()).toEqual('widget v3 [namespace]');
    });

    it('should have a form', function () {
        obj = dv.findElement(by.tagName('form'));
        expect(obj.getAttribute('id')).toEqual('searchform');
    });

    it('should have a button', function () {
        obj = dv.findElement(by.id('klaas'));
        expect(obj.getTagName()).toEqual('button');
    });

    it('the button should have text', function () {
        obj = dv.findElement(by.id('klaas'));
        expect(obj.getText()).toEqual('SEARCH');
    });

    it('should have a input with a placeholder', function () {
        obj = dv.findElement(by.xpath('//input[1]'));
        expect(obj.getAttribute('placeholder')).toEqual('E.g. project manager');
        expect(obj.getAttribute('name')).toEqual('keyword');
    });

    describe('the select-widgets', function () {

        var widget = new Widget();
        
        it('should do something', function () {
            widget.dropdown('description[]').option('Projectmanagement').click();
            var select = element(by.css('select[name="description[]"]'));
            expect(select.getAttribute('value')).toEqual('Projectmanagement');           

        });

    });
});
