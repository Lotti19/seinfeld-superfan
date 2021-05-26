from django.db import models

from django.contrib.auth.models import User

import re

import bcrypt

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
PASSWORD_REGEX = re.compile(r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')

class UserManager(models.Manager):
    
    def user_validator(self, postData):
        
        errors = {}
        
        if len(postData['first_name']) < 2:
            errors['first_name'] = 'First Name should be at least 2 characters long'
            
        if len(postData['last_name']) < 2:
            errors['last_name'] = 'Last Name should be at least 2 characters long'
            
        if not EMAIL_REGEX.match(postData['email']):
            errors ['email'] = 'Invalid email address'
            
        email_check = self.filter(email=postData['email'])
        
        if email_check:
            errors ['email_check'] = 'Email already in use'
            
        if not PASSWORD_REGEX.match(postData['password']):
            errors['password'] = 'Password must be 8 characters and contain: 1 uppercase letter, 1 lowercase letter, and 1 number. May contain special characters.'
            
        if postData['password'] != postData['confirm_password']:
            errors['password'] = 'Passwords do not match'
            
        return errors
    
    def authenticate(self, email, password):
    
        user = None
        
        try:
            user = User.objects.get(email=email)
            
        except:
            return False
        
        return bcrypt.checkpw(password.encode(), user.password.encode())

    def register(self, postData):
        
        pw = bcrypt.hashpw(postData['password'].encode(), bcrypt.gensalt()).decode()
        
        return self.create(
            first_name = postData['first_name'],
            last_name = postData['last_name'],
            email = postData['email'],
            password = pw,
        )

class User(models.Model):
    
    first_name = models.CharField(max_length = 255)
    last_name = models.CharField(max_length = 255)
    email = models.CharField(max_length = 255)
    password = models.CharField(max_length = 100)
    confirm_password = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()
    
class Post(models.Model):
    
    message = models.CharField(max_length=255)
    poster = models.ForeignKey(User, related_name='user_messages', on_delete=models.CASCADE)
    user_likes = models.ManyToManyField(User, related_name='liked_posts')
    
class Comment(models.Model):
    
    comment = models.CharField(max_length=255)
    poster = models.ForeignKey(User, related_name='user_comments', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='post_comments', on_delete=models.CASCADE)