
function ConvertFormToJSON(form){
    var array = jQuery(form).serializeArray();
    var json = {};

    jQuery.each(array, function() {
        json[this.name] = this.value || '';
    });

    return json;
}



$('#test').click(function(event){
    var testForm = document.getElementById("bzwebapiForm");
    var testData = ConvertFormToJSON(testForm);
    var jData = JSON.stringify(testData);

    console.log(testData);
    console.log(jData);


    $.ajax({
        url: 'http://bz2-dev.buyerzone.com/api/v1/categories/10681/request',
        data: jData,
        type: 'POST',
        accept: 'application/json',
        contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(30525 + ":" + 30525));
        },

        success: function(data){
            console.log(data);
        }
    });
    return false;
});
