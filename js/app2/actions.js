var  bwaGetCategory, bwaPostQsForm, bwaFeederSuccess, bwaFeederError, bwaAorSuccess, bwaAorError, bwaFancyMove;

 /**
 * Chained ajax calls that fetch category and question set
 * and resolve deferred object when finished with category
 * and question set
 * @type {*}
 */

 bwaGetCategory = function (catUrl, qsUrl, defer ) {
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
        defer.resolve( bzCategory );
    });

 };


/*
 * Post form to backend
 *
 */
bwaPostQsForm = function ( form, success, error, before, after ) {
    var data = convertFormToJSON(form);

    $.ajax({
        url: form.action,
        data: data,
        type: 'POST',
        accept: 'application/json',
        contentType: 'application/json',
        beforeSend: function(xhr) {
            if (before) {
                before();
            }
            xhr.setRequestHeader("Authorization", "Basic " + btoa(bzPub + ":" + bzPub));
        },
        complete: function () {
            if ( after ) {
                after();
            }
        },
        success: function(data){
            console.log(data);
            success(data, form);
        },
        error: function (data) {
            console.log('error');
            console.log('data');
            error(data, form);
        }

    });

};

bwaFeederSuccess = function (data) {
    var source = $('#confirm-success-template').html(),
        template = Handlebars.compile(source),
        aorSource = $('#confirm-aor-template').html(),
        aorTemplate;

    if (data.categoryList.length) {
        aorTemplate = Handlebars.compile(aorSource);
        $('#aor-cats').html(aorTemplate(data.categoryList));

    }

    $('#thanks').html(template(data));

    $.fancybox({
        href: '#confirm-wrapper',
        width: 400,
        onComplete: function () {
            $('#get-aor-form').bind('click', function(){
                var $aorCats = $('#aor-list').find(':checked'),
                aorCats = [],
                catUrl, qsUrl;

                $aorCats.each(function(e){
                    catUrl = $(this).attr('data-cat');
                    qsUrl = $(this).attr('data-qs');
                    aorCats.push({
                        'cat':catUrl,
                        'qs':qsUrl,
                        'defer': function(){
                            return new $.Deferred();
                         }
                    });
                });

                if (aorCats.length) {

                    bwaBuildAorCats( aorCats );
//                    catUrl = $aorCat.attr('data-cat');
//                    qsUrl = $aorCat.attr('data-qs');
//                    buildForm(catUrl, qsUrl, $('#aor-form-wrapper'));

                    $('#fancybox-content #confirm-wrapper').html($('#aor-cats-form-holder'));
                    $.fancybox.resize();
                    window.setTimeout(bwaFancyMove, 500);
                }
            });
        }
    });

};


bwaFancyMove = function() {
    var top = $('#fancybox-wrap').css('top').split('px')[0];
    top = parseInt(top);
//    top2 = parseInt($('#fancybox-wrap').css('top').split('px')[0]) + 50;
    $('#fancybox-wrap').css('top', top - 400 + 'px');
//    window.scrollTo(0, top);

};

bwaAorSuccess = function (data, form) {
    var source = $('#confirm-success-template').html(),
        template = Handlebars.compile(source),
        top = parseInt($('#fancybox-wrap').css('top').split('px')[0]) + 50;

    $(form).replaceWith(template(data));
    window.scrollTo(0, top);
};


bwaFeederError = function (data) {
    var resp = JSON.parse(data.responseText),
        source = $('#confirm-error-template').html(),
        template = Handlebars.compile(source);

    $('#thanks').html(template(resp));

    $.fancybox({
        href: '#thanks',
        width: 400
    });

};

bwaAorError = function (data, form ) {
    var resp = JSON.parse(data.responseText),
        source = $('#confirm-error-template').html(),
        template = Handlebars.compile(source);
    $(form).replaceWith(template(data));
};


bwaBuildAorCats = function (cats) {
    var len = cats.length,
        i, $defer;

    for ( i=0; i<len; i++) {
//        $defer = new $.Deferred();
        $defer = cats[i].defer();

        $defer.done( function(bzCat) {
           bwaRender.aorForm(bzCat, $('#aor-cats-form-holder')) ;
        });

         /* ajax requests to get cat and qs */
         bwaGetCategory(cats[i].cat, cats[i].qs, $defer);

    }

}