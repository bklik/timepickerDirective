'use strict';

angular.module('timePicker.directives', [])
    /**********************************************************************
     * time/timePicker Directives
     * Author: Brenton Klik
     *
     * Prerequisites: AngularJS, JQuery, Popup Directive
     * 
     * Description:
     * These directives make up the popup content for a time picker
     * control. At the top of the control, displays the currently selected
     * time. Clicking on the hour, or minutes will toggle the clock circle
     * accordingly. Clicking on the hands of the hour/minute clock circle
     * will updated the currently selected time.
     *
     * "am/pm" and buttons that change the currently selected time period 
     * accourdingly.
     *
     * When the "Set Time" button is pressed, the currently selected time
     * is sent to the popup and the popup is closed.
    **********************************************************************/
    .directive('time', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $(element).attr("directive", "time-picker");
                $(element).addClass("time-input");
            }
        }
    }])
    .directive('timePicker', ["$timeout", function($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'time-picker/templates/time-picker.html',
            replace: true,
            scope: {},
            link: function(scope, element, attrs) {
                var hour = 12;
                var minute = 0;
                var period = "am";
                var control = "hours";

                $timeout(function(){
                    setUISelections();
                });

                var setUISelections = function() {
                    $(element).find(".time-value div").removeClass("selected");
                    $(element).find(".time-clock div").removeClass("selected");
                    $(element).find(".clock-hours .hand").removeClass("selected");
                    $(element).find(".clock-minutes .hand").removeClass("selected");
                    $(element).find(".time-period .period").removeClass("selected");

                    switch(control) {
                        case "hours":
                            $(element).find(".time-value .hour").addClass("selected");
                            $(element).find(".time-clock .clock-hours").addClass("selected");
                        break;
                        case "minutes":
                            $(element).find(".time-value .minutes").addClass("selected");
                            $(element).find(".time-clock .clock-minutes").addClass("selected");
                        break;
                    }

                    $(element).find(".clock-hours #hour-hand-"+hour).addClass("selected");
                    $(element).find(".clock-minutes #minute-hand-"+minute).addClass("selected");

                    switch(period) {
                        case "am":
                            $(element).find(".time-period .period:first-child").addClass("selected");
                        break;
                        case "pm":
                            $(element).find(".time-period .period:last-child").addClass("selected");
                        break;
                    }

                    if(hour < 10)
                        $(element).find(".time-value .hour").html("&nbsp;"+ hour);
                    else
                        $(element).find(".time-value .hour").html(hour);

                    if(minute < 10)
                        $(element).find(".time-value .minutes").html("0"+ minute);
                    else
                        $(element).find(".time-value .minutes").html(minute);

                    $("#hdTime").val(hour + ":" + ((minute > 10) ? minute : "0" + minute) + "" + period);
                }

                scope.controlHandler = function(c, event) {
                    control = c;
                    setUISelections();
                };

                scope.hourHandHandler = function(h, event) {
                    hour = parseInt(h);
                    control = "minutes";

                    setUISelections();
                }

                scope.minuteHandHandler = function(m, event) {
                    minute = parseInt(m);
                    control = "minutes";

                    setUISelections();
                }

                scope.periodHandler = function(p, event) {
                    period = p;
                    setUISelections();
                };

                scope.$on("POPUP_VALUE", function(event, message) {
                    try {
                        hour = parseInt(message.split(':')[0]);
                        minute = parseInt(message.split(':')[1].substr(0, message.split(':')[1].length-2));
                        period = message.split(':')[1].substr(message.split(':')[1].length-2, message.split(':')[1].length);
                    } catch(error) {
                        var h = new Date().getHours();
                        if(h == 0)
                            hour = 12;
                        else if(h <= 12)
                            hour = h;
                        else
                            hour = h-12;

                        minute = Math.round(new Date().getMinutes() / 5) * 5;
                        period = (h < 12) ? "am" : "pm";

                    }
                    setUISelections();
                });

                scope.closeTimePicker = function(event) {
                    scope.$emit("CLOSE_POPUP");
                }

                scope.setTime = function(event) {
                    scope.$emit("UPDATE_POPUP", $("#hdTime").val());
                    scope.closeTimePicker(event);
                }
            }
        }
    }]);