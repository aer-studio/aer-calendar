#Aer Calendar

Aer Calendar is a JavaScript library that allows for easy calendar generation and Google Calendar implementation.

#How to Use

You can pass arguments into the constructor four ways:
``` JavaScript
new Calendar(id) // uses current year and month
new Calendar(id, month) // uses the current year
new Calendar(id, month, year)
new Calendar({
  id, month, year, apiKey, calendarId, generate
})
```

##Arguments

Parameters|Description|Required
---:|---|:---:
id|the ID of the element in which to generate the calendar|Yes
month|the initial month of the calendar|No
year|the initial year of the calendar|No
apiKey|the API key for use with the Google Calendar API|Yes if using GAPI
calendarId|the ID of the public Google Calendar to get events from|Yes if using GAPI
generate|sets whether or not to automatically generate the calendar; if you are using the Google Calendar API, make sure you check for the library being loaded before manually generating the calendar|No

##Examples

###Using Google Calendar to List Events

``` HTML
<html>
<head>
<script src='/path/to/aer-calendar.js'></script>
</head>
<body>
<span id='aer-calendar'></span>
<span id='aer-events'></span>
<script>
var calendar = new Calendar({
  calendarElemId: 'aer-calendar',
  eventElemId: 'aer-event',
  apiKey: 'yourApiKey',
  calendarId: 'yourPublicCalendarId'
});
var initGAPI = function() {
  calendar.gapi();
}
</script>
<script src='https://apis.google.com/js/client.js?onload=initGAPI'></script>
</body>
</html>
```

###Just Generating a Calendar
``` HTML
<html>
<head>
<script src='/path/to/aer-calendar.js'></script>
</head>
<body>
<span id='aer-calendar'></span>
<script>
var calendar = new Calendar('aer-calendar');
</script>
</body>
</html>
```

##Classing

Documentation on classing will be finalized when a better naming scheme is developed. For now, look to the calendar generation for classing information.
