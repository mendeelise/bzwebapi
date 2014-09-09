/**
 * Created by Mende Williams
 * Date: 8/20/14
 */

var bzCategoryList;


 /**
 * Chained ajax calls that fetch category and question set
 * Execute render function when resolved
 * @type {*}
 */
(function () {
     var catsUrl = 'http://' + bzEnv + '.buyerzone.com/api/v1/categories',
         q = $.deparam.querystring(),
         bzObj = {},
         getCats;

    bzObj.bzEnv = q.env != undefined ? q.env : '';
    bzObj.bzPub = q.pub != undefined ? q.pub : '';




     getCats = $.ajax({
         type: 'GET',
         url: catsUrl,
         accept: 'application/json',
         contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(bzPub + ":" + bzPub));
        },
         success: function ( data ) {
             bzObj.cats = data;
             console.log(bzCategoryList);
         }
     });


    $.when(getCats).done(function(cats) {
        var source = $('#category-list-template').html(),
            template = Handlebars.compile(source);

        $('.category-list').html(template(bzObj))
    });

}());

