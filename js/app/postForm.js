function convertFormToJSON(form){
    var array = jQuery(form).serializeArray();
    var json = {};

    jQuery.each(array, function() {
        json[this.name] = this.value || '';
    });

    return JSON.stringify(json);
}



// post form via ajax
$('#submit-form').click(function(e){
    var form = document.getElementById("bzwebapiForm"),
        data = convertFormToJSON(form);

    e.preventDefault();

    console.log(data);

    $.ajax({
        url: form.action,
        data: data,
        type: 'POST',
        accept: 'application/json',
        contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(bzPub + ":" + bzPub));
        },

        success: function(data){
            console.log(data);
            confirmSuccess(data);
        },
        error: function (data) {
            console.log('error');
            console.log('data');
            confirmError(data);
        }

    });
    return false;
});


function postForm() {
    var form = document.getElementById("bzwebapiForm"),
        data = convertFormToJSON(form);

    console.log(data);

    $.ajax({
        url: form.action,
        data: data,
        type: 'POST',
        accept: 'application/json',
        contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(bzPub + ":" + bzPub));
        },

        success: function(data){
            console.log(data);
//            confirmSuccess(data);

            var source = $('#confirm-success-template').html(),
                template = Handlebars.compile(source),
                html = (template(data));

            $('#thanks').html(template(data));

            $.fancybox({
                href: '#thanks'
            });

        },
        error: function (data) {
            console.log('error');
            console.log('data');
            confirmError(data);
        }

    });

}

function confirmSuccess(data) {
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
                var $aorCat = $('#aor-list').find(':checked').first(),
                catUrl, qsUrl, qsHtml;

                if ($aorCat.length) {
                    catUrl = $aorCat.attr('data-cat');
                    qsUrl = $aorCat.attr('data-qs');
                    buildForm(catUrl, qsUrl, $('#aor-form-wrapper'));

                    $('#fancybox-content #confirm-wrapper').html($('#aor-form-wrapper'));
                    $.fancybox.resize();

                }
            });
        }
    });

}

function confirmError(data) {
    var resp = JSON.parse(data.responseText),
        source = $('#confirm-error-template').html(),
        template = Handlebars.compile(source);

    $('#thanks').html(template(resp));

    $.fancybox({
        href: '#thanks',
        width: 400
    });

}