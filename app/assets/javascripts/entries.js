$( document ).ready(function() {
    $('#dateFrom').datetimepicker({
        pickTime:false,
        format: 'YYYY/MM/DD'
    });
    $('#dateTo').datetimepicker({
        pickTime:false,
        format: 'YYYY/MM/DD'
    });
    $('#timeFrom').datetimepicker({
        pickDate:false,
        format: 'HH:mm'
    });
    $('#timeTo').datetimepicker({
        pickDate:false,
        format: 'HH:mm'
    });
    $('#newEntryDate').datetimepicker({
        format: 'YYYY/MM/DD HH:mm'
    });

});
