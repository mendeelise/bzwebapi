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
     var catUrl = 'http://' + bzEnv + '.buyerzone.com/api/v1/categories/' + bzCat,
         qsUrl = 'http://' + bzEnv + '.buyerzone.com/api/v1/categories/' + bzCat + '/questionSets/latest',
         getCat, getQs;

     getCat = $.ajax({
         type: 'GET',
         url: catUrl,
         accept: 'application/json',
         contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(bzPub + ":" + bzPub));
        },
         success: function ( data ) {
             bzCategory = data;
         }
     });

     getQs = $.ajax({
            type: 'GET',
            url: qsUrl,
            accept: 'application/json',
            contentType: 'application/json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(bzPub + ":" + bzPub));
            },
            success: function ( data ) {
                bzCategory.qs = data;
            }
        });

    $.when(getCat, getQs).done(function(cat, qs) {
        bzwebapi.render.init();
    });

}());

