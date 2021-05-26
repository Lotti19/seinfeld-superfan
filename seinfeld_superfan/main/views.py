from django.shortcuts import render, redirect

from . models import *

from django.contrib import messages

import bcrypt

def index(request):
    return render(request, 'index.html')

def new_user(request):
    
    return render(request, 'register.html')

def existing_user(request):
    
    return render(request, 'login.html')

def register(request):
    
    if request.method == 'GET':
        return redirect('/new_user')

    errors = User.objects.user_validator(request.POST)
    
    if errors:
        for e in errors.values():
            messages.error(request, e)
            
        return redirect('/new_user')
    
    else:
        new_user = User.objects.register(request.POST)
        request.session['user_id'] = new_user.id
        messages.success(request, 'You have successfully registered!')
        
        return redirect('/existing_user')
    
def login(request):
    
    if request.method == 'GET':
        return redirect('/new_user')
    
    if not User.objects.authenticate(request.POST['email'], request.POST['password']):
        messages.error(request, 'Invalid Email/Password')
        
        return redirect('/existing_user')
    
    user = User.objects.get(email=request.POST['email'])
    request.session['user_id'] = user.id
    messages.success(request, 'You have succesfully logged in!')
    
    return redirect(f'/success/{user.id}')

def success(request, user_id):
    
    if 'user_id' not in request.session:
        return redirect('/')
    
    user = User.objects.get(id=user_id)
    
    context = {
        'user': user,
        'one_user': User.objects.get(id=request.session['user_id']),
    }
    
    return render(request, 'profile.html', context)

def community(request):
    
    context = {
        'posts': Post.objects.all()
    }
    
    return render(request, 'community.html', context)

def post(request):
    
    Post.objects.create(message=request.POST['post'], poster=User.objects.get(id=request.session['user_id']))
    
    return redirect('/post_success')

def post_success(request):
    
    context = {
        'posts': Post.objects.all()
    }
    
    return render(request, 'community.html', context)

def post_comment(request, id):
    
    poster = User.objects.get(id=request.session['user_id'])
    post = Post.objects.get(id=id)
    Comment.objects.create(comment=request.POST['comment'], poster=poster, post=post)
    return redirect('/post_success')

def add_like(request, id):
    
    liked_post = Post.objects.get(id=id)
    user_liking = User.objects.get(id=request.session['user_id'])
    liked_post.user_likes.add(user_liking)
    
    return redirect('/post_success')

def profile(request, user_id):

    user = User.objects.get(id=user_id)
    
    context = {
        'user': user,
        'one_user': User.objects.get(id=request.session['user_id']),
    }

    return render(request, 'profile.html', context)

