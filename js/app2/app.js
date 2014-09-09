 var catUrl = 'http://' + bzEnv + '.buyerzone.com/api/v1/categories/' + bzCat,
     qsUrl = 'http://' + bzEnv + '.buyerzone.com/api/v1/categories/' + bzCat + '/questionSets/latest';


/*  Load Handlebars Helpers */
//HelperHoard.load(Handlebars, ['embed']);

//var $catDefer = $.Deferred();
/** Init RFQ page **/
(function (){
    var $catDefer = $.Deferred();

    /* when ajax calls come back, get templates, then render page */
    $catDefer.done( function(bzCat) {
       var getFormTemplate, getQsTemplate;

        getFormTemplate = $.get('/bzwebapi/templates/rfq-form.hbs', function(html){
            $('body').append(html);
//            bwaRender.init();
//            bwaRender.category(bzCat, $('.bz-form'))
//            bwaRender.rfqForm(bzCat, $('.bz-form'))

        });

        getQsTemplate = $.get('/bzwebapi/templates/qs-renderer.hbs', function(html){
            $('body').append(html);
        });

        $.when(getFormTemplate, getQsTemplate).done(function(){
            bwaRender.init();
            bwaRender.category(bzCat, $('.bz-form'))
            bwaRender.rfqForm(bzCat, $('.bz-form'))

            $('#submit-form').click(function(e){
                var form = document.getElementById('bzwebapiForm');
                e.preventDefault;
                bwaPostQsForm( form, bwaFeederSuccess, bwaFeederError, showSpinner, hideSpinner )
            });
        });

    });

     /* ajax requests to get cat and qs */
     bwaGetCategory(catUrl, qsUrl, $catDefer);

}());

