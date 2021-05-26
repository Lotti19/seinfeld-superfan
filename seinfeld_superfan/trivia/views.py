from django.shortcuts import render

from . models import *

def startquiz(request):
    
    return render(request, 'trivia/trivia.html')  