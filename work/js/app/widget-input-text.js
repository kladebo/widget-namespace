(function (NS) {
    var WIDGETS = NS.createNS("MYAPPLICATION.MODEL.WIDGETS");

    //function TextBox() {}
    var TextBox = function () {};

    TextBox.prototype.init = function (obj) {
        this.native = obj;
        this.widget = document.createElement('div');
    };

    TextBox.prototype.draw = function () {
        // Insert the DOM node right after the nativeSelect within the document
        this.native.parentNode.insertBefore(this.widget, this.native.nextSibling);
        this.widget.appendChild(this.native);
        this.widget.className = 'widget-input';
        this.native.addEventListener('focus', function () {
            this.parentNode.classList.add('focus');
        });
        this.native.addEventListener('blur', function () {
            this.parentNode.classList.remove('focus');
        });
    };

    WIDGETS.TextBox = TextBox;

})(MYAPPLICATION);
