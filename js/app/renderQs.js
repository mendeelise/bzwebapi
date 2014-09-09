/**
 * Created by Mende Williams
 * Date: 8/20/14
 */

var bzwebapi = {};

/**
 * Render out question set
 *
 */

bzwebapi.render = {

    /**
     * render category
     */
    category: function (cat, $cont) {
        var source = $('#category-template').html(),
            template = Handlebars.compile(source);

        /* register templates for rendering */
        Handlebars.registerPartial("qsRenderer", $('#qs-renderer-template').html());
        Handlebars.registerPartial("qsAnswerRenderer", $('#qs-answer-renderer-template').html());

        /* insert compiled template into the DOM */
        $cont.html(template(cat));
    },

    helpers: function () {



        /* register helpers */

        /* required */
        Handlebars.registerHelper('req', function(required) {
            if (required === 'true') {
                return ' required';
            }
        });

        /* matchable */
        Handlebars.registerHelper('match', function(matchable) {
            if (matchable === 'true') {
                return ' matchable';
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
                    html = template(this);

                    return new Handlebars.SafeString( html );
                }

                // checkboxes
                if ( aType === 'checkboxes' ) {
                    source = $('#checkboxes-template').html();
                    template = Handlebars.compile(source);
                    html = template(this);

                    return new Handlebars.SafeString( html );
                }

                // select
                if ( aType === 'select' ) {
                    source = $('#select-template').html();
                    template = Handlebars.compile(source);
                    html = template(this);

                    return new Handlebars.SafeString( html );
                }
            }

            // textsingle
            if ( qType === 'textsingle') {
                source = $('#text-template').html();
                template = Handlebars.compile(source);
                html = template(this);

                return new Handlebars.SafeString( html );
            }

            // textmultiple
            if ( qType === 'textmultiple') {
                source = $('#textmultiple-template').html();
                template = Handlebars.compile(source);
                html = template(this);

                return new Handlebars.SafeString( html );
            }

            // textparagraph
            if ( qType === 'textparagraph' ) {
                source = $('#textarea-template').html();
                template = Handlebars.compile(source);
                html = template(this);

                return new Handlebars.SafeString( html );
            }

        });



    },


    /**
     * init rendering
     */
    init: function (cat, $cont) {
        bzwebapi.render.helpers();
        bzwebapi.render.category(cat, $cont);
    }
};