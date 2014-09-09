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
 //(function () {
     var getCat = $.ajax({
         type: 'GET',
         url: '/category/kitchen-sink.json',
         accept: 'application/json',
         contentType: 'application/json',
         success: function ( data ) {
             bzCategory = data;
         }
     });

     var getQs = $.ajax({
            type: 'GET',
            url: '/category/kitchen-sink-new-format.json',
            accept: 'application/json',
            contentType: 'application/json',
            success: function ( data ) {
                bzCategory.qs = data;
                console.log(bzCategory);
            }
        });

$.when(getCat, getQs).done(function(cat, qs) {
    bzwebapi.render.init();
});



