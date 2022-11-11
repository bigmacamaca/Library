// $(document).ready(function () {
   
// });

$(document).ready(function() {
    var base_url = window.location.origin
    console.log('test')
    console.log(base_url)
    $.ajax({
        method: 'GET',
        url: base_url + '/books/api/get_books/',
        beforeSend: function() {
            console.log('before send');
        },
        success: function(data) {
            displayBooks(data);
            console.log('Data get successful');
        },
        error: function() {
            console.log('sum ting wong get');
        }
    });
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var csrftoken = getCookie('csrftoken');

//For Logging out user
$('#logoutLlink').click(function (){
    var base_url = window.location.origin
    console.log('Logout test')
    $.ajax({
        type: 'POST',
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        url: base_url + '/users/api/logout/',
        data: {},
        success: function(response) {
            window.location = base_url + '/books/home'
            console.log("Logged Out successfully!");
            console.log(response);
        },
        error: function() {
            console.log('sum ting wong logout');
        }
    });
});



function displayBooks(data) {
    var base_url = window.location.origin
    let template = "";
    $.each(data, function(index, value) {
        console.log(value)
        template += 

        "<div class='card mb-3' style='max-width: 540px;'>" +
        "<div class='row no-gutters'>" +
            "<div class='col-md-4'>" +
                "<img src= "+ value.coverImage +" class='card-img'>" +
            "</div>" +
            "<div class='col-md-8'>" +
                "<div class='card-body'>" +
                    "<h5 class='card-title'>"+ value.title +"</h5>" +
                    "<p class='card-text'><small class='text-muted'>"+ value.authorName +"</small></p>" +
                    "<p class='card-text'>"+ value.description +"</p>" +
                    "<a class='btn btn-primary' href="+base_url+"/books/bookDetails/"+value.id+" role='button'>View</a>" +

                "</div>" +
            "</div>" +
        "</div>" +
    "</div>"       
        

        
    });
    $('#dataDisplay').append(template)
    console.log(template)
    // document.getElementById('dataDisplay').innerHTML = template
}

