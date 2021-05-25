from django.shortcuts import render, redirect

from . models import *

def store(request):
    
    return render(request, 'store/store.html')
