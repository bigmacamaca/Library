from django.contrib import admin
from .models import Books, Comment

class BooksAdmin(admin.ModelAdmin):
    list_display = ('id','title', 'authorName', 'authorEmail', 'bookLocation', 'bookType', 'description', 'added', 'user', 'coverImage')

class CommentAdmin(admin.ModelAdmin):
    list_display = ('id','book','author','date_added','body')

admin.site.register(Books, BooksAdmin)
admin.site.register(Comment, CommentAdmin)
# Register your models here.
