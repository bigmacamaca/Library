from django.urls import path
from books import views
from books import apis

app_name = "books"

urlpatterns = [
    #API urls
    path('api/get_books/', apis.BooksViewSet.as_view({'get':'get_books'})),
    path('api/register_books/', apis.BooksViewSet.as_view({'post':'register_books'})),
    path('api/get_user_books/<int:book_id>/', apis.BooksViewSet.as_view({'get':'get_user_books'})),
    path('api/get_bookObject/<int:book_id>/', apis.BooksViewSet.as_view({'get':'get_bookObject'})),
    path('api/get_bookDetails/<int:book_id>/', apis.BooksViewSet.as_view({'get':'get_bookDetails'})),
    path('api/modify_book/<int:book_id>/', apis.BooksViewSet.as_view({'post':'modify_book'})),
    path('api/delete_book/<int:book_id>/', apis.BooksViewSet.as_view({'delete':'delete_book'})),
    path('api/get_comment_Object/<int:book_id>/', apis.CommentsViewSet.as_view({'get':'get_comment_Object'})),
    path('api/get_book_comments/<int:book_id>/', apis.CommentsViewSet.as_view({'get':'get_book_comments'})),
    # path('api/add_comment/', apis.CommentsViewSet.as_view({'post':'add_comment'})),
    path('api/add_comment/<int:book_id>/', apis.CommentsViewSet.as_view({'post':'add_comment'})),

    #Views urls
    path('home/', views.HomeView.as_view(), name="home"),
    path('registerBook/', views.RegisterBooksView.as_view(), name="registerBook"),
    path('bookDetails/<int:book_id>/', views.BookDetailsView.as_view(), name="bookDetails"),
    path('modify-book/<int:book_id>/', views.ModifyBookView.as_view(), name="modify-book"),
]