$(document).ready(function() {
    var base_url = window.location.origin
    $('#registerBookForm').submit(function (event){
        event.preventDefault();
        console.log('test register book')
        formData = new FormData();

        formData.append('title', $('#title').val());
        formData.append('authorName', $('#authorName').val());
        formData.append('authorEmail', $('#authorEmail').val());
        formData.append('bookType', $('#bookType').val());
        formData.append('bookLocation', $('#bookLocation').val());
        formData.append('description', $('#description').val())
        formData.append('isAvailable', $('#isAvailable').val());
        formData.append('coverImage', $('#coverImage')[0].files[0]);

        if (formData) {
                $.ajax({
                    type: 'POST',
                    beforeSend: function(xhr, settings) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    },
                    url: base_url + '/books/api/register_books/',
                    
                    data: formData,
                    processData: false,
                    contentType: false,

                    success: function(response) {
                        window.location = base_url + '/books/home'
                        console.log('Book registered!');
                        console.log(response);
                    },
                    error: function() {
                        console.log('sum ting wong register book');
                    }
            });
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
