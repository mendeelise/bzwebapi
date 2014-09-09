/**
 * Created by Mende Williams
 * Date: 8/20/14
 */

var bwaRender;

/**
 * Render out question set
 *
 */

bwaRender = {

    /**
     * render category
     */
    category: function (cat, $cont) {
        var source = $('#category-template').html(),
            template = Handlebars.compile(source);

console.log($('#category-template').html());
console.log(template(cat));
        /* insert compiled template into the DOM */
        $cont.append(template(cat));
    },

    /**
     * Render RFQ form
     * @param cat
     * @param $cont
     */
    rfqForm: function ( cat, $cont ) {

        /* compile form shell template */
        $cont.append(compileHbsTemplate($('#rfq-form-template'), cat));

        $('.rfqForm').append(compileHbsTemplate($('#qs-template'), cat.qs.categoryQuestions));
        $('.rfqForm').append(compileHbsTemplate($('#qs-template'), cat.qs.registrationQuestions));
        $('.continue-btn').show();

    },

    aorForm: function (cat, $cont) {
        var formId = '#aorWebapiForm' + cat.categoryId;

       /* compile category template */
        $cont.append(compileHbsTemplate($('#category-template'), cat));

       /* compile form shell template */
        $cont.append(compileHbsTemplate($('#aor-form-template'), cat));

        $(formId).prepend(compileHbsTemplate($('#qs-template'), cat.qs.categoryQuestions));
        $(formId).prepend(compileHbsTemplate($('#qs-template'), cat.qs.registrationQuestions));

        $(formId).find('.submit-button').bind('click', function(e){
            e.preventDefault();

            bwaPostQsForm( $(formId)[0], bwaAorSuccess, bwaAorError, showAorSpinner, hideAorSpinner )
        });


    },

    /**
     * Handlebars custom helpers
     */
    helpers: function () {


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

        /* redirect */
        Handlebars.registerHelper('redirect', function() {
            if (this.redirect) {
                return new Handlebars.SafeString( 'data-redirect="' + this.redirect.url + '"' );
            }
        });

        /* other input */
         Handlebars.registerHelper('otherInput', function() {
             var answer = this,
                 source, template, html;

             if ( answer.properties && answer.properties.other ) {
                 source = $('#other-input-template').html();
                 template = Handlebars.compile(source);
                 html = template(this);
                 return new Handlebars.SafeString( html );
             }


//             if ( answer.properties && answer.properties.other ) {
//                 html = '<input type="text" id="' + answer.xmlId + '" name="' + 'xmlId' + '" class="other-input other-input-" />';
//                 return new Handlebars.SafeString( html );
//             }
         });


        /* answers */
        Handlebars.registerHelper('answers', function() {
            var answer = this.answersXML,
                qType = this.type,
                aType = this.answersXML.type,
                source, template, html;

            if ( qType === 'multiplechoice' ) {

                // radio
                if ( aType === 'radio' ) {
                    source = $('#radio-template').html();
                    template = Handlebars.compile(source);
                    html = template(this);


                    return new Handlebars.SafeString( html );
 //                    $.when(makeHbsTemplate('/bzwebapi/templates/radio.hbs', this, true))
//                     .then(function(html){
//                          return new Handlebars.SafeString( html );
//                     });

                }

                // checkboxes
                if ( aType === 'checkbox' ) {
                    source = $('#checkboxes-template').html();
                    template = Handlebars.compile(source);
                    html = template(this);

                    return new Handlebars.SafeString( html );
//                    $.when(makeHbsTemplate('/bzwebapi/templates/checkboxes.hbs', this, true))
//                     .then(function(html){
//                          return new Handlebars.SafeString( html );
//                    });

                }

                // select
                if ( aType === 'select' ) {
                    source = $('#select-template').html();
                    template = Handlebars.compile(source);
                    html = template(this);

                    return new Handlebars.SafeString( html );
//                    $.when(makeHbsTemplate('/bzwebapi/templates/select.hbs', this, true))
//                     .then(function(html){
//                          return new Handlebars.SafeString( html );
//                    });

                }
            }

            // textsingle
            if ( qType === 'textsingle') {
                source = $('#text-template').html();
                template = Handlebars.compile(source);
                html = template(this);

                return new Handlebars.SafeString( html );
//                $.when(makeHbsTemplate('/bzwebapi/templates/textsingle.hbs', this, true))
//                 .then(function(html){
//                      return new Handlebars.SafeString( html );
//                });

            }

            // textmultiple
            if ( qType === 'textmultiple') {
                source = $('#textmultiple-template').html();
                template = Handlebars.compile(source);
                html = template(this);

                return new Handlebars.SafeString( html );

//                $.when(makeHbsTemplate('/bzwebapi/templates/textmultiple.hbs', this, true))
//                 .then(function(html){
//                      return new Handlebars.SafeString( html );
//                });

            }

            // textparagraph
            if ( qType === 'textparagraph' ) {
                source = $('#textarea-template').html();
                template = Handlebars.compile(source);
                html = template(this);

                return new Handlebars.SafeString( html );
//                $.when(makeHbsTemplate('/bzwebapi/templates/textparagraph.hbs', this, true))
//                 .then(function(html){
//                      return new Handlebars.SafeString( html );
//                });

            }

        });

    },


    /**
     * init rendering
     */
    init: function () {
        bwaRender.helpers();
    }
};