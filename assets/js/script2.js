$(function () {
    $(function () {
        $('#btnFilter').click();
    })
    $('#form').submit(function (e) {
        e.preventDefault();
        var txt = $(this).serialize();
        
        $.ajax({
            type: 'post',
            url: 'ajax/ajax.php',
            data: txt,
            dataType: 'json',
            success: function (json) {
                var searchField = $("#dateFilter").val();
                $.getJSON('json/sample-data.json', function (data) {
                    regex = new RegExp(searchField, "i");
                    var count = 1;
                    var events = [];
                    $.each(data.events, function (key, value) {
                        if (regex == "/(?:)/i") { // as the regex takes the value of the searchField it starts with "/ (? :) / i", so I pass the empty value
                            regex = "";
                        }
                        var dateNow = new Date();
                        var dateNowMonth = dateNow.getMonth();
                        var dateStart = new Date(value.start);
                        var dateEnd = new Date(value.end);
                        var dateShortFilter = dateStart.toLocaleDateString();
                        var dateShort = dateEnd.toLocaleDateString();
                        dateMonthEvent = dateStart.getMonth();

                        if (dateMonthEvent == dateNowMonth || regex != "") { // lists the events of the month, if you have already filtered in the dateFilter it lists only the searched
                            if (dateShortFilter.search(regex) != -1) {
                                events += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 cardFilter">';
                                events += '<div class="dateShort" data-dateShort="' + dateShort + '"></div>';
                                events += '<div class="tile">';
                                events += '<div class="wrapper">';
                                events += '<div class="header"><span class="titleFilter">' + value.title + '</span> | <span class="price">PRICE: ' + value.costs + '</span></div>';
                                events += '<div class="banner-img">';
                                if (value.image != "") { events += '<img src="img/' + value.image + '" alt="Image 1"/>'; }
                                events += '</div>';
                                events += '<div class="dates">';
                                events += '<div class="start">';
                                events += '<strong>STARTS</strong><p class="labelDate">' + dateStart + '</p>';
                                events += '<span></span>';
                                events += '</div>';
                                events += '<div class="ends">';
                                events += '<strong>ENDS</strong><p class="labelDate">' + dateEnd + '<p class="labelDate">';
                                events += '</div>';
                                events += '</div>';

                                events += '<div class="descriptionBox">';
                                events += '<p class="descriptionLabel">' + value.description + '</p>';
                                events += '</div>';
                                events += '<div class="stats">';
                                events += '<div>';
                                events += '<strong>Name</strong> ' + value.venue.name;
                                events += '</div>';
                                events += '<div>';
                                events += '<strong>Zip</strong> ' + value.venue.zip;
                                events += '</div>';
                                events += '<div>';
                                events += '<strong>Place</strong>' + value.venue.city + " - " + value.venue.street;
                                events += '</div>';
                                events += '</div>';
                                events += '<div class="stats">';
                                events += '<div>';
                                events += '<strong>Recurrence</strong> ' + value.recurrence;
                                events += '</div>';
                                events += '<div>';
                                events += '<strong>Category</strong> ' + value.category;
                                events += '</div>';
                                events += '<div>';
                                events += '<strong>Cost</strong>' + value.costs;
                                events += '</div>';
                                events += '</div>';
                                events += '<div class="footer">';
                                events += '<a href="' + value.link + '" class="Cbtn Cbtn-primary" target="_blank">View</a>';
                                events += '</div>';
                                events += '</div>';
                                events += '</div>';
                                events += '</div>';
                            }
                        }
                    });
                    $('#divAppend').html(events);
                });

            }
        })
    });
    $('#dateFilter').datepicker({
        dateFormat: 'mm/dd/yyyy',
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayBtn: true,
        minDate: 0,
        todayHighlight: true,
        showWeekDays: false,
        startDate: "today",
    });
});