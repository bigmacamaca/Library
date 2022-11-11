$(document).ready(function() {
    var base_url = window.location.origin
    console.log('test get user list')
    $.ajax({
        method: 'GET',
        url: base_url + '/users/api/allUsers/',
        beforeSend: function() {
            console.log('before send');
        },
        success: function(data) {
            displayBooks(data);
            console.log('user list get successful');
        },
        error: function() {
            console.log('sum ting wong get user list');
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

function displayBooks(data) {
    var base_url = window.location.origin
    let template = "";
    $.each(data, function(index, value) {
        console.log(value)
        template += "<br>" +
                    "<div id='cardBorder'>" + 
                        "<div class='d-flex align-items-center'>" +
                            "<div class='image'>" +
                                "<img src=" + value.avatar + " class='rounded' width='155'></img>" +
                            "</div>" +

                    "<div class='ml-3 w-100'>" + 
                        "<h4 class='mb-0 mt-0'>" + value.first_name + "</h4>"+
                        "<span>" + value.email + "</span>" +
                        "<div class='p-2 mt-2 bg-secondary d-flex justify-content-between rounded text-white stats'>" +
                            "<div class='d-flex flex-column'>" +
                                "<span class='bio'> Bio: </span>" +
                                "<span class='booksNumber'>" + value.bio + "</span>" +
                            "</div>" +
                        "</div>"+
                    "<div class='button mt-2 d-flex flex-row align-items-center'>" +
                        "<a href="+base_url+"/users/profile/"+value.id+" class='btn btn-sm btn-outline-primary w-100'>View Profile</a>" +
                    "</div>" +
                "</div>" +
            "</div>" 


    });
    $('#UserListDisplay').prepend(template)
    console.log(template)
    // document.getElementById('dataDisplay').innerHTML = template
}

// function displayBooks(data) {
//     url = base_url + '/api/user/allUsers/'
//     let template = "";
//     $.each(data, function(index, value) {
//         console.log(value)
//         template += "<image>" + value.avatar + "</image>" +
//                     "<h1><a href= '"+ base_url +"/get_userList/"+value.id+"'>" + value.first_name + " " + value.last_name + "</a></h1>" + 
//                     "<p>" + value.email + "</p>" +
//                     "<p>" + value.bio + "</p>"
//     });
//     $('#dataDisplay').append(template)
//     console.log(template)
//     // document.getElementById('dataDisplay').innerHTML = template
// }