# Time-Picker

Time-Picker is an Angular directive that creates a time picker UI for a popup input.

**Requirements**

* [AngularJS (1.2+)](http://angularjs.org/)
* [JQuery (1.11+)](http://jquery.com/)
* [bklik/popup](https://github.com/bklik/popup/)

### Installation

Link to time-picker's CSS and Javascript files.
```html
<link rel="stylesheet" href="time-picker/css/password-generator.css"/>
<script src="time-picker/js/directives.js"></script>
```

In your app's directives.js file, add the timePicker.directives module.
```javascript
angular.module('myApp.directives', ['popup.directives', 'timePicker.directives']);
```

Last, simply add a _time_ attribute to an `<input>`.
```html
<input type="text" popup time/>
```

### Example
http://www.brentonklik.com/popup
