$(document).ready(function() {
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    //bookTen
    console.log('get book detail')
    // console.log(user.id)
    console.log('url', base_url + '/books/api/get_bookDetails/'+id)
    console.log('url', base_url + '/books/api/get_book_comments/'+id)
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
    $.ajax({
        method: 'GET',
        url : base_url + '/books/api/get_book_comments/'+id+ '/', 
        // url: 'http://127.0.0.1:8000/api/books/get_bookDetails/<int:book_id>/',
        beforeSend: function() {
            console.log('before get comments');
        },
        success: function(commentsData) {
            // let data = commentsData;
            displayComments(commentsData);
            console.log(commentsData);
        },
        error: function(error) {
            console.log('sum ting wong get comments', error);
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


//Add Comment
$('#CommentForm').submit(function (event){
    event.preventDefault();
    console.log('test add Comment')
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]

    formData = new FormData();


    formData.append('body', $('#body').val());

    if (formData) {
        $.ajax({
            type: 'POST',
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            url : base_url + '/books/api/add_comment/'+id+ '/', 
            // url: 'http://127.0.0.1:8000/api/modify_book/<int:book_id>/',

            data: formData,
            processData: false,
            contentType: false,

            success: function(response) {
                // displayBooks(data);
                window.location = base_url + '/books/bookDetails/'+id+'/'
                console.log('Comment Added!')
                console.log(response);
            },
            error: function() {
                console.log('sum ting wong add comment');
            }
        });
    }
});



// Delete Book
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
                "<div class='card'>" +
                    "<div class='card-body'>" +
                        "<div class='row'>" +
                            "<div class='col-lg-5 col-md-5 col-sm-6'>" +
                                "<div class='white-box text-center'><img src="+ data.coverImage +" class='card-img'></div>" +
                            "</div>" +
                            "<div class='col-lg-7 col-md-7 col-sm-6'>" +
                                "<h4 class='box-title mt-5'>"+ data.title +"</h4>" +
                                "<p class='card-text'><small class='text-muted'> "+ data.authorName +" </small></p>" +
                                "<p>"+ data.description +"</p>" +
                                "<a href="+base_url+"/books/modify-book/"+data.id+" class='btn btn-primary btn-rounded'>Update Book</a>" +
                                "<h3 class='box-title mt-5'>Specifics</h3>" +
                                "<ul class='list-unstyled'>" +
                                    "<li>Book Type: "+data.bookType+" </li>" +
                                    "<li>Location: "+data.bookLocation+" </li>" +
                               "</ul>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>"
                
    $('#bookDetailDisplay').append(template)
    console.log(template)
    // document.getElementById('dataDisplay').innerHTML = template
}

function displayComments(commentsData) {
    var base_url = window.location.origin
    let template = "";
    $.each(commentsData, function(index, value) {
        template += 

        "<article class='media'>" +
        "<div class='media-content'>" +
            "<div class='content'>" +
                "<p>" +
                    "<strong>"+ value.author + " </strong> <small>"+ value.date_added +"</small>" +
                    "<br>" +
                    "<p>"+ value.body +"</p>" +
                "</p>" +
            "</div>" +
        "</div>" +
    "</article>"
    });      
    $('#commentsDisplay').append(template)
    console.log(template)
    // document.getElementById('dataDisplay').innerHTML = template
}
