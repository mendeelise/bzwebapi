
function convertFormToJSON(form){
    var array = jQuery(form).serializeArray();
    var json = {};

    jQuery.each(array, function() {
        json[this.name] = this.value || '';
    });

    return JSON.stringify(json);
}


function makeHbsTemplate( source, context, remote ) {
    var dfd;

    if ( remote ) {
        dfd = $.Deferred();
        $.get( source, function (source) {
            var template = Handlebars.compile(source),
                html = template(context);
            dfd.resolve(html);
        });
       return dfd.promise();
    }
}


function compileHbsTemplate( source, context ) {
    var template = Handlebars.compile(source.html());
    return template(context);
}

function showSpinner(){
    $('.ajax-spinner').show();
}

function hideSpinner(){
    $('.ajax-spinner').hide();
}

function showAorSpinner(){
    $('.aorForm:visible').first().find('.ajax-aor-spinner').show();
}

function hideAorSpinner(){
    $('.ajax-aor-spinner:visible').hide();
}