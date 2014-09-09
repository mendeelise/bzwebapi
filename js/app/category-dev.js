/**
 * Created by Mende Williams
 * Date: 8/20/14
 */

var bzCategory;
 /**
 * Chained ajax calls that fetch category and question set
 * Execute render function when resolved
 * @type {*}
 */
 (function () {
     var getCat = $.ajax({
         type: 'GET',
         url: 'http://bz2-dev.buyerzone.com/api/v1/categories/10681',
         accept: 'application/json',
         contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(30525 + ":" + 30525));
        },
         success: function ( data ) {
             bzCategory = data;
         }
     });

     var getQs = $.ajax({
            type: 'GET',
            url: 'http://bz2-dev.buyerzone.com/api/v1/categories/10681/questionSets/latest',
            accept: 'application/json',
            contentType: 'application/json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(30525 + ":" + 30525));
            },
            success: function ( data ) {
                bzCategory.qs = data;
            }
        });

    $.when(getCat, getQs).done(function(cat, qs) {
        bzwebapi.render.init();
    });

 }());

