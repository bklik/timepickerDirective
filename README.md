# Timepicker Directive
A directive that adds a timepicker control.

**Requirements**

* [AngularJS](http://angularjs.org/)
* [bklik/styleSheetFactory](https://github.com/bklik/styleSheetFactory)
* [bklik/popupDirective (optional)](https://github.com/bklik/popup/)

### Installation

Link to popup's CSS and Javascript files.
```html
<script src="timepickerDirective/timepickerDirective.js"></script>
```

In your app's directives.js file, add the timepickerDirective module.
```javascript
angular.module('myApp', ['timepickerDirective']);
```

Last, simply add a `<popup-directive>` element you reference from an event on an element.
```html
<input type="text" ng-model="mytime">
<timepicker-directive input-model="mytime"></timepicker-directive>
```

Or, with popupDirective:
```html
<input type="text" ng-focus="popup01.show($event)" ng-model="mytime">
<popup-directive api="popup01">
    <timepicker-directive close-callback="popup01.hide" input-model="mytime"></timepicker-directive>
</popup-directive>