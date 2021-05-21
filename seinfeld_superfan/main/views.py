from django.shortcuts import render, redirect
from . models import *
from django.contrib import messages
import bcrypt

def index(request):
    return render(request, 'index.html')

