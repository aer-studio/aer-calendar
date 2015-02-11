/**
 *
 * Aer Calendar v0.1
 * -----------------
 * A calendar plugin that extends jQuery to add a generateCalendar() function,
 * adds a <calendar> element through jQuery and provides a generate() function
 * to allow use outside of jQuery.
 *
 * Future Additions
 * ----------------
 * -Generated month changing buttons with handlers
 * -Animations on month change
 * -Maybe add Calendar helper functions to allow for getting calendar
 *    information
 * -Maybe classes for cells to differentiate between them.
 * -Google Calendar API support for easy integration
 *
 */

var Calendar = {

  /**
   * Returns the number of days in a month.
   */
  getDaysInMonth: function(year, month) {
    return Math.floor((new Date(year, month, 0) - new Date(year, month - 1, 1)) / 86400000) + 1;
  },

  generate: function(year, month) {
    /**
     * c ---- for storing the string to be passed to append to make the
     *        calendar. Contains DOM, may require revisiting; unsure if this is
     *        a good practice.
     *
     * i ---- an index for storing which cell the generator is in.
     *
     * d ---- stores the current day in the generator.
     */
    var c, i, d;
    /**
     * If the call to generateCalendar is passed with no variables, it defaults
     * to the current day.
     */
    if(year == null && month == null) {
      var o = new Date();
      year = o.getFullYear();
      month = o.getMonth() + 1;
    }
    /**
     * If the call to generateCalendar is passed with one variable, an error is
     * thrown, because the caller's intention is unclear.
     */
    else if(year ? !month : month)
      $.error('Only one variable passed to function generateCalendar, or a variable passed is 0\nSyntax:\n  $(selector).generateCalendar(<year>, <month>) OR\n  $(selector).generateCalendar()');
    /**
     * If the call to generateCalendar is passed with a negative variable, an
     * error is thrown for clarity's sake.
     *
     * REVIEW: In a future version, month values outside of bounds might
     *         increment or decrement the year.
     */
    else if(year < 0 || month < 0 || month > 12)
      $.error('One or more variables have exceeded or are beneath the allowed bounds');
    cal = '<table><thead><tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr></thead><tbody><tr>';
    /**
     * Index through the empty days at the beginning of a month and make empty
     * cells.
     */
    for(i = 1; i <= new Date(year, month - 1, 1).getDay(); i++)
      cal += '<td></td>';
    /**
     * Index through the remaining days of the month and fill the cells with
     * their date.
     */
    for(d = 1; d <= Calendar.getDaysInMonth(year, month); i++, d++) {
      cal += '<td>' + d + '</td>';
      /**
       * If the current index is a multiple of seven, loop down to the next row
       * to maintain a seven day week.
       */
      if(i % 7 == 0 && d != Calendar.getDaysInMonth(year, month))
        cal += '</tr><tr>';
      /**
       * If the current day is the last day of the month, end the calendar
       * generation.
       */
      else if (d == Calendar.getDaysInMonth(year, month)) {
        cal += '</tr></tbody</table>';
      }
    }
    /*
     * Return the value of cal for handling.
     */
     return cal;
  },

  $generate: function(year, month) {
    this.html(Calendar.generate(year, month));
  }
}

/**
 * If jQuery is loaded, we will extend jQuery to allow you to generate a
 * calendar on any object. We will also find all elements of tag 'calendar' and
 * automatically generate calendars for them based on their year and month
 * attributes.
 */
if($) {
  $(function() {
    var n = $('calendar');
    $.fn.generateCalendar = Calendar.$generate;
    n.generateCalendar(n.attr('year'), n.attr('month'));
  });
}