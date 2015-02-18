# aer-calendar

Aer Calendar is a JavaScript library that allows for easy calendar generation and Google Calendar implementation.

You can pass arguments into the constructor four ways:
``` JavaScript
new Calendar(id)
new Calendar(id, month) // defaults to current
new Calendar(id, month, year)
new Calendar({
  id, month, year, apiKey, calendarId, generate
})
```

##Using the Constructor
Parameters|Description
---|---
id|the ID of the element in which to generate the calendar
month|the initial month of the calendar
year|the initial year of the calendar
apiKey|the API key for use with the Google Calendar API
calendarId|the ID of the public Google Calendar to get events from
generate|sets whether or not to automatically generate the calendar; if you are using the Google Calendar API, make sure you check for the library being loaded before manually generating the calendar

# Classing
All calendars generated by this plugin are classed with "aer-calendar" - <code>&lt;table class=&quot;aer-calendar&quot;&gt;</code>. No styles are applied out of the box, but users can use this as a hook to style however they want.

# Future Additions
The following are features that are planned to be added soon:

- Animations on month change
- Google Calendar API support for easy integration
- **Maybe** classes for cells to differentiate between them
