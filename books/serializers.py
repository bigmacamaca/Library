from rest_framework import serializers
from .models import Books, Comment

class BooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = '__all__'
    
class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class UpdateBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        coverImage = serializers.ImageField(required=False)
        fields = (
            'title',
            'bookType',
            'bookLocation',
            'description',
            'coverImage',
        )
