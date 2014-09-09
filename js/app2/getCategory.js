/**
 * Created by Mende Williams
 * Date: 8/20/14
 */

 var catUrl = 'http://' + bzEnv + '.buyerzone.com/api/v1/categories/' + bzCat,
     qsUrl = 'http://' + bzEnv + '.buyerzone.com/api/v1/categories/' + bzCat + '/questionSets/latest',
     getCategory;



 /**
 * Chained ajax calls that fetch category and question set
 * and resolve deferred object when finished with category
 * and question set
 * @type {*}
 */

 getCategory = function (catUrl, qsUrl, defer ) {
     var getCat, getQs, bzCategory;

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
        defer.resolveWith( this, bzCategory );
//        bzwebapi.render.init(bzCategory, $cont);
    });
 };

buildForm(catUrl, qsUrl, $('.bz-form'));