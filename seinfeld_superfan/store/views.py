from django.shortcuts import render

from . models import *

def store(request):
    
    products = Product.objects.all()
    context ={
        'products':products
    }
    
    return render(request, 'store/store.html', context)

