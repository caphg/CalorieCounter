$( document ).ready(function() {
    $('#dateFrom').datetimepicker({
        timepicker:false,
        format:'Y/m/d'
    });
    $('#dateTo').datetimepicker({
        timepicker:false,
        format:'Y/m/d'
    });
    $('#timeFrom').datetimepicker({
        datepicker:false,
        format:'H'
    });
    $('#timeTo').datetimepicker({
        datepicker:false,
        format:'H'
    });
});
