from rest_framework.response import Response
from rest_framework import status, viewsets
from books.models import Books, Comment
from books.serializers import BooksSerializer, CommentsSerializer, UpdateBookSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated

class BooksViewSet(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)
    
    #Get all registered books
    def get_books(self, request, *args, **kwargs):
        books = Books.objects.all()
        if books:
            serialized = BooksSerializer(books, many=True)
            return Response(serialized.data, status=status.HTTP_200_OK)
        else:
            return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)


    #Add/Register New Book
    def register_books(self, request, *args, **kwargs):
        # import pdb; pdb.set_trace()
        # data = {
        #     'title': request.data.get('title'),
        #     'authorName': request.data.get('authorName'),
        #     'authorEmail': request.data.get('authorEmail'),
        #     'bookType': request.data.get('bookType'),
        #     'bookLocation': request.data.get('bookLocation'),
        #     'description': request.data.get('description'),
        #     'coverImage': request.data.get('coverImage'),
        #     'user': request.user.id
        # }
        serializer = BooksSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Get books of specified user
    def get_user_books(self, request, book_id, format=None):
        
        books = Books.objects.filter(user_id=book_id)
        serializer = BooksSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    #Helper Method that loops through model to find book object with given id's
    def get_bookObject(self, book_id):
        # import pdb; pdb.set_trace()
        try:
            return Books.objects.get(id=book_id)
        except Books.DoesNotExist:
            return None


    #Uses helper method to get book specified and get its data
    def get_bookDetails(self, request, book_id, *args, **kwargs):
        # import pdb; pdb.set_trace()
        book_instance = self.get_bookObject(book_id)
        if not book_instance:
            return Response(
                {"res": "Object with book id does not exist!"},
                status = status.HTTP_400_BAD_REQUEST
            )
        serializer = BooksSerializer(book_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #Modifies book selected if it exists
    def modify_book(self, request, book_id):
        # import pdb; pdb.set_trace()
        book = Books.objects.get(id=book_id)

        if book.user_id == request.user.id:
            serializer = UpdateBookSerializer(book, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status = status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)      
    

    #Deletes selected book if it exists
    def delete_book(self, request, book_id, *args, **kwargs):
        book_instance = self.get_bookObject(book_id, request.user.id)
        if not book_instance:
            return Response(
                {"res": "Object with book id does not exist!"},
                status = status.HTTP_400_BAD_REQUEST
            )
        book_instance.delete()
        return Response(
            {"res": "Book Deleted!"},
            status = status.HTTP_200_OK
        )
    
class CommentsViewSet(viewsets.ViewSet):
    #Helper Method that loops through model to find comments in a book
    def get_comment_Object(self, book_id):
        # import pdb; pdb.set_trace()
        try:
            return Comment.objects.filter(book_id = book_id)
        except Comment.DoesNotExist:
            return None
    
    #Uses helper method to get comments data in a book
    def get_book_comments(self,request, *args, **kwargs):
        # import pdb; pdb.set_trace()
        comment_instance = self.get_comment_Object(self.kwargs.get('book_id'))
        if not comment_instance:
            return Response(
                {"res": "Comment Object does not Exist!"},
                status = status.HTTP_400_BAD_REQUEST
            )
        serializer = CommentsSerializer(comment_instance, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #Comments Function
    def add_comment(self, request, *args, **kwargs):
        data = {
            'body': request.data.get('body'),
            'author': request.user.id
        }
        serializer = CommentsSerializer(data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    