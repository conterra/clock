define([
    "dojox/timing",
    "dojo/date/locale",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "ct/util/css",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/has",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/clockwidget.html",
    "dijit/form/CheckBox",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane"
], function(d_timing, d_locale, d_class, d_style, d_construct, css, declare, lang, d_has, WidgetBase, TemplatedMixin, _WidgetsInTemplateMixin, template) {
    return declare([WidgetBase, TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        baseClass: "clock",
        activate: function() {
            var props = this._properties;
            var clockMode = props.clockMode;
            var t = this.t = new d_timing.Timer(1000);
            this._setTime();
            t.onTick = lang.hitch(this, "_setTime");
            t.start();
            if (clockMode === "analog") {
                this._buildClockTicks();
            }
            this._setWidgetMode(clockMode);
        },
        deactivate: function() {
            this.t.stop();
            this.t = null;
        },
        _setTime: function() {
            var clockMode = this._properties.clockMode;
            var date = new Date();
            if (clockMode === "digital") {
                var node = this.node_digital;
                node.innerHTML = d_locale.format(date, {timePattern: "HH:mm:ss", selector: "time"});
            } else {
                this._updateClockUI(date);
            }
        },
        _buildClockTicks: function() {
            var clock = this.clock_frame;
            for (var i = 1; i <= 60; i++) {
                var tick = d_construct.toDom("<div class='marker'></div>");
                if ((i % 5) === 0) {
                    d_class.add(tick, "marker-large");
                }
                d_construct.place(tick, clock);
                if (d_has("webkit")) {
                    d_style.set(tick, "-webkit-transform", "rotate(" + i * 6 + "deg)");
                }
                else{
                    d_style.set(tick, "transform", "rotate(" + i * 6 + "deg)");
                }
            }
        },
        _updateClockUI: function(date) {
            // time
            var sec = date.getSeconds();
            var min = date.getMinutes();
            var hrs = date.getHours();
            var sec_rotation = ((360 / 60) * sec) % 360;
            var min_rotation = ((360 / 60) * min) % 360;
            var hrs_rotation = ((360 / 12) * hrs + (30 / 60) * min) % 360;
            if (d_has("webkit")) {
                d_style.set(this.secondsPointer, "-webkit-transform", "rotate(" + sec_rotation + "deg)");
                d_style.set(this.minutesPointer, "-webkit-transform", "rotate(" + min_rotation + "deg)");
                d_style.set(this.hoursPointer, "-webkit-transform", "rotate(" + hrs_rotation + "deg)");
            }
            else {
                d_style.set(this.secondsPointer, "transform", "rotate(" + sec_rotation + "deg)");
                d_style.set(this.minutesPointer, "transform", "rotate(" + min_rotation + "deg)");
                d_style.set(this.hoursPointer, "transform", "rotate(" + hrs_rotation + "deg)");
            }
            // day of month
            var date = date.getDate();
            this.date_node.innerHTML = date;
        },
        _setWidgetMode: function(clockMode) {
            css.switchHidden(this.node_digital, clockMode === "analog");
            css.switchHidden(this.node_analog, clockMode === "digital");
        },
        //_utcCheckboxChanged: function() {
        //    console.log("checkbox: " + this.utcCheckBox.get('value'));
        //},
        _setTimeZone: function() {

        },
        resize: function(dim) {
            this.mainContainer.resize(dim);
        }

    });
});
