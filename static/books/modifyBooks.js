$(document).ready(function() {
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    console.log('get book detail')
    console.log('url', base_url + '/books/api/get_bookDetails/'+id)
    $.ajax({
        method: 'GET',
        url : base_url + '/books/api/get_bookDetails/'+id+ '/', 
        // url: 'http://127.0.0.1:8000/api/books/get_bookDetails/<int:book_id>/',
        beforeSend: function() {
            console.log('before send');
        },
        success: function(data) {
            displayBooks(data);
            console.log(data);
        },
        error: function(error) {
            console.log('sum ting wong get', error);
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

//Modify Book Ajax
$('#updateBookForm').submit(function (event){
    event.preventDefault();
    console.log('test update book')
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]

    formData = new FormData();

    // formData.append('title', $('#title').val());
    formData.append('bookType', $('#bookType').val());
    formData.append('bookLocation', $('#bookLocation').val());
    formData.append('description', $('#description').val())
    
    // if( document.getElementById("title").value != '' ){
    //     // console.log("no files selected");
    //     formData.append('coverImage', $('#coverImage')[0].files[0]);
    // }

    if( document.getElementById("coverImage").files.length >= 1 ){
        // console.log("no files selected");
        formData.append('coverImage', $('#coverImage')[0].files[0]);
    }

    if(document.getElementById("title").value != '' ){
        // console.log("no files selected");
        formData.append('title', $('#title').val());
    }



    if (formData) {
        $.ajax({
            type: 'POST',
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            url : base_url + '/books/api/modify_book/'+id+ '/', 
            // url: 'http://127.0.0.1:8000/api/modify_book/<int:book_id>/',

            data: formData,
            processData: false,
            contentType: false,

            success: function(response) {
                // displayBooks(data);
                window.location = base_url + '/books/home'
                console.log('book modified!')
                console.log(response);
            },
            error: function() {
                console.log('sum ting wong modify book');
            }
        });
    }
});

$("#deleteButton").click(function(event){
    event.preventDefault();
    console.log('Delete test')
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    $.ajax({
        type: 'DELETE',
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        url : base_url + '/books/api/delete_book/'+id+ '/', 
        // url: 'http://127.0.0.1:8000/api/modify_book/<int:book_id>/',

        success: function(response) {
            window.location = base_url + '/books/home'
            console.log('book deleted!')
            console.log(response);
        },
        error: function() {
            console.log('sum ting wong delete book');
        }
    });
});

function displayBooks(data) {
    var base_url = window.location.origin
    let template = "";
        template += 

        "<div class='card mb-3' style='max-width: 540px;'>" +
        "<div class='row no-gutters'>" +
            "<div class='col-md-4'>" +
                "<img src= "+ data.coverImage +" class='card-img'>" +
            "</div>" +
            "<div class='col-md-8'>" +
                "<div class='card-body'>" +
                    "<h5 class='card-title'>"+ data.title +"</h5>" +
                    "<p class='card-text'><small class='text-muted'>"+ data.authorName +"</small></p>" +
                    "<p class='card-text'><small class='text-muted'>"+ data.bookType +"</small></p>" +
                    "<p class='card-text'><small class='text-muted'>"+ data.bookLocation +"</small></p>" +
                    "<p class='card-text'>"+ data.description +"</p>" +
                "</div>" +
            "</div>" +
        "</div>" +
    "</div>"

    $('#bookDetailDisplay').append(template)
    console.log(template)
    // document.getElementById('dataDisplay').innerHTML = template
}
