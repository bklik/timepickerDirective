/***********************************************************************
 * Timepicker Directive
 * Author: Brenton Klik
 * 
 * Prerequisites:
 *  - AngularJS
 *  - styleSheetFactory (https://github.com/bklik/styleSheetFactory)
 *  - popupDirective (optional)
 * 
 * Description:
 * Creates a timepicker control.
/**********************************************************************/
angular.module('timepickerDirective', ['styleSheetFactory'])

.directive('timepickerDirective', ['$timeout', 'styleSheetFactory', function($timeout, styleSheetFactory) {
    return {
        scope: {
            'closeCallback': '=',
            'inputModel': '=',
        },
        restrict: 'E',
        template: '' +
            '<div class="time-picker">' +
                '<div class="time-value">' +
                    '<div class="hour" ng-click="controlHandler(\'hours\', $event)">12</div>' +
                    '<div>:</div>' +
                    '<div class="minutes" ng-click="controlHandler(\'minutes\', $event)">00</div>' +
                '</div>' +
                '<div class="time-clock">' +
                    '<div class="clock-hours">' +
                        '<div class="hand" id="hour-hand-9" ng-click="hourHandHandler(9, $event)"><div class="number">9</div></div>' +
                        '<div class="hand" id="hour-hand-10" ng-click="hourHandHandler(10, $event)"><div class="number">10</div></div>' +
                        '<div class="hand" id="hour-hand-11" ng-click="hourHandHandler(11, $event)"><div class="number">11</div></div>' +
                        '<div class="hand" id="hour-hand-12" ng-click="hourHandHandler(12, $event)"><div class="number">12</div></div>' +
                        '<div class="hand" id="hour-hand-1" ng-click="hourHandHandler(1, $event)"><div class="number">1</div></div>' +
                        '<div class="hand" id="hour-hand-2" ng-click="hourHandHandler(2, $event)"><div class="number">2</div></div>' +
                        '<div class="hand" id="hour-hand-3" ng-click="hourHandHandler(3, $event)"><div class="number">3</div></div>' +
                        '<div class="hand" id="hour-hand-4" ng-click="hourHandHandler(4, $event)"><div class="number">4</div></div>' +
                        '<div class="hand" id="hour-hand-5" ng-click="hourHandHandler(5, $event)"><div class="number">5</div></div>' +
                        '<div class="hand" id="hour-hand-6" ng-click="hourHandHandler(6, $event)"><div class="number">6</div></div>' +
                        '<div class="hand" id="hour-hand-7" ng-click="hourHandHandler(7, $event)"><div class="number">7</div></div>' +
                        '<div class="hand" id="hour-hand-8" ng-click="hourHandHandler(8, $event)"><div class="number">8</div></div>' +
                    '</div>' +
                    '<div class="clock-minutes">' +
                        '<div class="hand" id="minute-hand-45" ng-click="minuteHandHandler(45, $event)"><div class="number">45</div></div>' +
                        '<div class="hand" id="minute-hand-50" ng-click="minuteHandHandler(50, $event)"><div class="number">50</div></div>' +
                        '<div class="hand" id="minute-hand-55" ng-click="minuteHandHandler(55, $event)"><div class="number">55</div></div>' +
                        '<div class="hand" id="minute-hand-0" ng-click="minuteHandHandler(0, $event)"><div class="number">0</div></div>' +
                        '<div class="hand" id="minute-hand-5" ng-click="minuteHandHandler(5, $event)"><div class="number">5</div></div>' +
                        '<div class="hand" id="minute-hand-10" ng-click="minuteHandHandler(10, $event)"><div class="number">10</div></div>' +
                        '<div class="hand" id="minute-hand-15" ng-click="minuteHandHandler(15, $event)"><div class="number">15</div></div>' +
                        '<div class="hand" id="minute-hand-20" ng-click="minuteHandHandler(20, $event)"><div class="number">20</div></div>' +
                        '<div class="hand" id="minute-hand-25" ng-click="minuteHandHandler(25, $event)"><div class="number">25</div></div>' +
                        '<div class="hand" id="minute-hand-30" ng-click="minuteHandHandler(30, $event)"><div class="number">30</div></div>' +
                        '<div class="hand" id="minute-hand-35" ng-click="minuteHandHandler(35, $event)"><div class="number">35</div></div>' +
                        '<div class="hand" id="minute-hand-40" ng-click="minuteHandHandler(40, $event)"><div class="number">40</div></div>' +
                    '</div>' +
                '</div>' +
                '<div class="time-period">' +
                    '<div class="period" ng-click="periodHandler(\'am\', $event)"><div class="circle">am</div></div>' +
                    '<div class="period" ng-click="periodHandler(\'pm\', $event)"><div class="circle">pm</div></div>' +
                '</div>' +
                '<button ng-show="showButton" ng-click="done()">Done</button>' +
            '</div>',
        link: function($scope, $element, $attrs) {
            $scope.showButton = ($element.parent()[0].nodeName == 'POPUP-DIRECTIVE') ? true : false;

            // The document's stylesheet.
            var styleSheet = styleSheetFactory.getStyleSheet();

            // The prefix used by the browser for non-standard properties.
            var prefix = styleSheetFactory.getPrefix();

            // Add this directive's styles to the document's stylesheet.
            styleSheetFactory.addCSSRule(styleSheet, 'timepicker-directive',
                'display: block;' +
                'overflow: auto;' +
                'position: relative;' +
                'width: 200px;' +
                'z-index: 1;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'timepicker-directive .time-value',
                'background-color: #eee;' +
                'display: table;' +
                'margin-bottom: 8px;' +
                'width: 200px'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'timepicker-directive .time-value div',
                'color: #999;' +
                'cursor: pointer;' +
                'display: table-cell;' +
                'font-size: 64px;' +
                'font-weight: bold;' +
                'text-align: center;' +
                'width: 89px;' +
                '-'+prefix+'-transition: all 500ms ease;' +
                'transition: all 500ms ease;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'timepicker-directive .time-value div:nth-child(2)',
                'cursor: auto;' +
                'width: 22px;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'timepicker-directive .time-value div.selected',
                'color: #000;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'timepicker-directive .time-clock',
                'background-color: #eee;' +
                'border-radius: 50%;' +
                'margin: 0;' +
                'padding: 0;' +
                'overflow: hidden;' +
                'position: relative;' +
                'height: 200px;' +
                'width: 200px;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 
                'timepicker-directive .clock-hours,' +
                'timepicker-directive .clock-minutes',
                    'pointer-events: none;' +
                    'visibility: hidden;' +
                    'opacity: 0;' +
                    '-'+prefix+'-transition: all 500ms ease;' +
                    'transition: all 500ms ease;' +
                    '-'+prefix+'-transform-origin: 100px 100px;' +
                    'transform-origin: 100px 100px;' +
                    '-'+prefix+'-transform: scale(.5) translateY(100px);' +
                    'transform: scale(.5) translateY(100px);'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 
                'timepicker-directive .clock-hours .hand,' +
                'timepicker-directive .clock-minutes .hand',
                    'cursor: pointer;' +
                    'line-height: 32px;' +
                    'position: absolute;' +
                    'top: calc(50% - 16px);' +
                    'height: 32px;' +
                    'width: 100px;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 
                'timepicker-directive .clock-hours .hand .number,' +
                'timepicker-directive .clock-minutes .hand .number',
                    'background-color: #eee;' +
                    'border-radius: 16px;' +
                    'text-align: center;' +
                    'height: 2em;' +
                    'width: 2em;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 
                'timepicker-directive .clock-hours .hand:hover .number,' +
                'timepicker-directive .clock-minutes .hand:hover .number',
                    'background-color: #ddd;' +
                    'color: #000'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 
                'timepicker-directive .clock-hours .hand.selected::before,' +
                'timepicker-directive .clock-minutes .hand.selected::before',
                    'background-color: #000;' +
                    'content: \'\';' +
                    'display: block;' +
                    '' +
                    'position: absolute;' +
                    'top: calc(50% - 1px);' +
                    'top: -moz-calc(50% - 1px);' +
                    'height: 2px;' +
                    'width: 100%;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 
                'timepicker-directive .clock-hours .hand.selected .number,' +
                'timepicker-directive .clock-minutes .hand.selected .number',
                    'background-color: #000;' +
                    'color: #fff;'
            ,1);

            for(var i=1; i<=12; i++) {
                styleSheetFactory.addCSSRule(styleSheet, 
                    'timepicker-directive .clock-hours .hand:nth-child('+i+'),' +
                    'timepicker-directive .clock-minutes .hand:nth-child('+i+')',
                        '-'+prefix+'-transform-origin: 100% 50%;' +
                        'transform-origin: 100% 50%;' +
                        '-'+prefix+'-transform: rotate('+((i - 1) * 30)+'deg);' +
                        'transform: rotate('+((i - 1) * 30)+'deg);'
                ,1);
                styleSheetFactory.addCSSRule(styleSheet, 
                    'timepicker-directive .clock-hours .hand:nth-child('+i+') .number,' +
                    'timepicker-directive .clock-minutes .hand:nth-child('+i+') .number',
                        '-'+prefix+'-transform: rotate(-'+((i - 1) * 30)+'deg);' +
                        'transform: rotate(-'+((i - 1) * 30)+'deg);'
                ,1);
            }

            styleSheetFactory.addCSSRule(styleSheet, 
                'timepicker-directive .clock-hours.selected,' +
                'timepicker-directive .clock-minutes.selected',
                    'pointer-events: auto;' +
                    'visibility: visible;' +
                    'opacity: 1;' +
                    '-'+prefix+'-transform: scale(1) translateY(100px);' +
                    'transform: scale(1) translateY(100px);'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'timepicker-directive .time-period',
                'margin: 8px 0 16px 0;' +
                'overflow: auto;' +
                'position: relative;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'timepicker-directive .time-period .period',
                'cursor: pointer;' +
                'float: left;' +
                'height: 32px;' +
                'line-height: 32px;' +
                'margin: 0;' +
                'overflow: auto;' +
                'padding: 0;' +
                'position: relative;' +
                'text-align: center;' +
                'width: 50%;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'timepicker-directive .time-period .period .circle',
                'background-color: #ddd;' +
                'border-radius: 16px;' +
                'position: absolute;' +
                'left: 16px;' +
                'height: 32px;' +
                'width: 32px;' +
                '-'+prefix+'-transition: all 500ms ease;' +
                'transition: all 500ms ease;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'timepicker-directive .time-period .period:nth-child(2) .circle',
                'left: auto;' +
                'right: 1em;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'timepicker-directive .time-period .period.selected .circle',
                'background-color: #000;' +
                'color: #fff;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'timepicker-directive button',
                'width: 200px;'
            ,1);

            var hour = new Date().getHours();
            var period = (hour < 12) ? "am" : "pm";

            if(hour == 0)
                hour = 12;
            else if(hour <= 12)
                hour = hour;
            else
                hour = hour-12;
            
            var minute = Math.round(new Date().getMinutes() / 5) * 5;

            var control = "hours";

            var clearSelections = function() {
                var tmpArr = null;

                tmpArr = $element[0].querySelectorAll(".time-value div");
                for(var i=0; i<tmpArr.length; i++) {
                    tmpArr[i].classList.remove("selected");
                }

                tmpArr = $element[0].querySelectorAll(".time-clock div");
                for(var i=0; i<tmpArr.length; i++) {
                    tmpArr[i].classList.remove("selected");
                }

                tmpArr = $element[0].querySelectorAll(".clock-hours .hand");
                for(var i=0; i<tmpArr.length; i++) {
                    tmpArr[i].classList.remove("selected");
                }

                tmpArr = $element[0].querySelector(".clock-minutes .hand");
                for(var i=0; i<tmpArr.length; i++) {
                    tmpArr[i].classList.remove("selected");
                }

                tmpArr = $element[0].querySelectorAll(".time-period .period");
                for(var i=0; i<tmpArr.length; i++) {
                    tmpArr[i].classList.remove("selected");
                }
            };

            var setUISelections = function() {
                clearSelections();

                switch(control) {
                    case "hours":
                        $element[0].querySelector(".time-value .hour").classList.add("selected");
                        $element[0].querySelector(".time-clock .clock-hours").classList.add("selected");
                    break;
                    case "minutes":
                        $element[0].querySelector(".time-value .minutes").classList.add("selected");
                        $element[0].querySelector(".time-clock .clock-minutes").classList.add("selected");
                    break;
                }

                $element[0].querySelector(".clock-hours #hour-hand-"+hour).classList.add("selected");
                $element[0].querySelector(".clock-minutes #minute-hand-"+minute).classList.add("selected");

                switch(period) {
                    case "am":
                        $element[0].querySelector(".time-period .period:first-child").classList.add("selected");
                    break;
                    case "pm":
                        $element[0].querySelector(".time-period .period:last-child").classList.add("selected");
                    break;
                }

                if(hour < 10)
                    $element[0].querySelector(".time-value .hour").innerHTML = "&nbsp;"+ hour;
                else
                    $element[0].querySelector(".time-value .hour").innerHTML = hour;

                if(minute < 10)
                    $element[0].querySelector(".time-value .minutes").innerHTML = "0"+ minute;
                else
                    $element[0].querySelector(".time-value .minutes").innerHTML = minute;

                $scope.inputModel = hour + ":" + ((minute >= 10) ? minute : "0" + minute) + "" + period;
            }

            $scope.controlHandler = function(c, event) {
                control = c;
                setUISelections();
            };

            $scope.hourHandHandler = function(h, event) {
                hour = parseInt(h);
                control = "minutes";

                setUISelections();
            }

            $scope.minuteHandHandler = function(m, event) {
                minute = parseInt(m);
                control = "minutes";

                setUISelections();
            }

            $scope.periodHandler = function(p, event) {
                period = p;
                setUISelections();
            };

            $scope.done = function() {
                if(typeof $scope.closeCallback !== 'undefined') {
                    $scope.closeCallback();
                }
            };

            setUISelections();
        }
    }
}]);