from django.db import models
from users.models import CustomUser

BOOK_TYPE_CHOICES = [('PHYSICAL', 'Physical'),
                    ('PAPERBACK', 'Paperback'),
                    ('DIGITAL', 'Digital')]

BOOK_LOCATION_CHOICES = [('HOME', 'Home'),
                    ('OFFICE', 'Office'),
                    ('INTO THE MATRIX', 'Into the Matrix')]

class Books(models.Model):
    title = models.CharField(max_length=250)
    authorName = models.CharField(max_length=250)
    authorEmail = models.CharField(max_length=250)
    bookType = models.CharField(max_length = 12, choices = BOOK_TYPE_CHOICES, default='Physical')
    bookLocation = models.CharField(max_length = 30, choices = BOOK_LOCATION_CHOICES, default='Home')
    description = models.TextField(max_length=300, default="User hasn't placed a bio yet.")
    added = models.DateTimeField(auto_now_add=True, auto_now=False)
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE, blank=True, null = True)
    coverImage = models.ImageField(blank=True, null=True, default='defaultCover.png', upload_to='books_images')

    def __str__(self):
        return self.title
    
    def total_likes(self):
        return self.likes.count()

class Comment(models.Model):
    book = models.ForeignKey(Books, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)
    body = models.TextField()

    class Meta:
        ordering = ['date_added']

    

# Create your models here.
