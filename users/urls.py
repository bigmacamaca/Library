from django.urls import path
from users import views
from users import apis

# from rest_framework.authtoken.views import obtain_auth_token

app_name = "users"

urlpatterns = [
    #all user apis

    path('api/get_UserObject/<int:user_id>/', apis.LoggedUserViewSet.as_view({'get':'get_UserObject'})),
    path('api/get_userDetails/<int:user_id>/', apis.LoggedUserViewSet.as_view({'get':'get_userDetails'})),
    path('api/update_user/<int:user_id>/', apis.LoggedUserViewSet.as_view({'post':'update_profile'})),

    path('api/logout/', apis.UsersViewSet.as_view({'post':'user_logout'})),
    path("api/registerUser/", apis.UsersViewSet.as_view({'post':'RegisterUser'})),
    path("api/allUsers/", apis.UsersViewSet.as_view({'get':'get_userList'})),
    path('api/loginUser/', apis.UsersViewSet.as_view({'post':'user_login'})),
    path('api/change_pass/', apis.UsersViewSet.as_view({'post':'change_pass'})),

    #all user views
    path('register/', views.RegisterUserView.as_view(), name="register"),
    path('update-profile/<int:user_id>/', views.UpdateProfileView.as_view(), name="update-profile"),
    path('all-users/', views.AllUsersView.as_view(), name="all-users"),
    path('login/', views.LoginView.as_view(), name="login"),
    path('change-password/', views.ChangePasswordView.as_view(), name="change-password"),
    path('profile/<int:user_id>/', views.ProfileView.as_view(), name="profile"),
    
    # path('bookDetails/<int:book_id>/', views.UserDetailsView.as_view(), name="UserDetailsView"),
]

