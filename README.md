# aer-calendar
<strong>Please note that this is very early in development!</strong>

A JavaScript plugin that extends both the DOM and jQuery and provides a method to generate a calendar using pure JavaScript.

<h1>How to Use</h1>
There are three ways to use the aer-calendar plugin. If you have jQuery loaded, you can use either:
<pre>&#60;calendar year=? month=?&#62;&#60;/calendar&#62;</pre>
or use standard jQuery selectors with the '.generateCalendar(<year>, <month>)' method. For example:
<pre>$(selector).generateCalendar(year, month);</pre>
You can also use pure JavaScript to generate a calendar using document object selectors:
<pre>document.getElementById('calendar').innerHTML(Calendar.generateCalendar(year, month);</pre>

<h1>Future Additions</h1>
The following are features that are planned to be added soon:
<ul>
<li>Generated month changing buttons with handlers</li>
<li>Animations on month change</li>
<li><strong>Maybe</strong> add Calendar helper functions to allow for getting calendar information</li>
<li><strong>Maybe</strong> classes for cells to differentiate between them</li></li>
<li>Google Calendar API support for easy integration</li>
</ul>
