from django.shortcuts import render
from django.views.generic.base import TemplateView

class HomeView(TemplateView):
    template_name = "books/home.html"

    def get(self, request):
        return render(request, self.template_name)

class RegisterBooksView(TemplateView):
    template_name = "books/register_books.html"

    def get(self, request):
        return render(request, self.template_name)


class BookDetailsView(TemplateView):
    template_name = "books/bookDetails.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

class ModifyBookView(TemplateView):
    template_name = "books/modify_book.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

# Create your views here.
