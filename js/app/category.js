/**
 * Created by Mende Williams
 * Date: 8/16/14
 */


var bzwebapi = {};

/**
 * Chained ajax calls that fetch category and question set
 * Execute render function when resolved
 * @type {*}
 */
bzwebapi.getCategory = $.ajax({
    type: 'GET',
    url: 'http://bz2-dev.buyerzone.com/api/v1/categories/10144',
    accept: 'application/json',
    contentType: 'application/json',
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa(30525 + ":" + 30525));
    },
    success: function ( data ) {
        bzwebapi.category = data;
    }
});


bzwebapi.getQs = bzwebapi.getCategory.then( function ( data ) {

    return $.ajax({
        type: 'GET',
        url: data._links.questionSet,
        accept: 'application/json',
        contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(30525 + ":" + 30525));
        },
        success: function ( data ) {
            bzwebapi.category.qs = data;
        }
    });

}).done(function(){
//    console.log(bzwebapi.category);
    bzwebapi.render.init();
});


/**
 * Render out question set
 *
 */

bzwebapi.render = {

    /**
     * render category
     */
    category: function () {
        var source = $('#category-template').html(),
            template = Handlebars.compile(source);

        Handlebars.registerPartial("qsRenderer", $('#qs-renderer-template').html());

        /* insert compiled template into the DOM */
        $('.mainContent').html(template(bzwebapi.category));
    },

    helpers: function () {

        /* register templates for rendering */
        Handlebars.registerPartial("qsAnswerRenderer", $('#qs-answer-renderer-template').html());
        Handlebars.registerPartial("regRenderer", $('#reg-renderer-template').html());
        Handlebars.registerPartial("qsRenderer", $('#reg-answer-renderer-template').html());

        /* register helpers */

        /* required */
        Handlebars.registerHelper('req', function(required) {
            if (required === 'true') {
                return 'required';
            }
        });

        /* matchable */
        Handlebars.registerHelper('match', function(matchable) {
            if (matchable === 'true') {
                return ' matchable';
            }
        });

        /* help text */
        Handlebars.registerHelper('help', function() {
            if (this.helpText) {
                return new Handlebars.SafeString(  '<p class="help">[help text]</p>' );
            }
        });

        /* note */
        Handlebars.registerHelper('note', function() {
            if (this.note) {
                return new Handlebars.SafeString( '<p class="note">' + this.note.note + '</p>' );
            }
        });

        /* answers */
        Handlebars.registerHelper('answers', function() {
            var answer = this.answersXML,
                qType = this.type,
                aType = answer.type,
                source, template, html;

            if ( qType === 'multiplechoice' ) {

                // radio
                if ( aType === 'radio' ) {
                    source = $('#radio-template').html();
                    template = Handlebars.compile(source);
                    html = template(answer);

                    return new Handlebars.SafeString( html );
                }

                // checkboxes
                if ( aType === 'checkboxes' ) {
                    source = $('#checkboxes-template').html();
                    template = Handlebars.compile(source);
                    html = template(answer);

                    return new Handlebars.SafeString( html );
                }
            }

            // textsingle
            if ( qType === 'textsingle' || qType === 'email' || qType === "zipcode" ) {
                source = $('#text-template').html();
                template = Handlebars.compile(source);
                html = template(answer);

                return new Handlebars.SafeString( html );
            }

            // textparagraph
            if ( qType === 'textparagraph' || qType === 'additionalnotes' ) {
                source = $('#textarea-template').html();
                template = Handlebars.compile(source);
                html = template(answer);

                return new Handlebars.SafeString( html );
            }

        });



    },


    /**
     * init rendering
     */
    init: function () {
        bzwebapi.render.helpers();
        bzwebapi.render.category();
    }
};