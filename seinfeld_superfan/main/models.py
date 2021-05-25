from django.db import models

import re

import bcrypt

email_regex = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
PASSWORD_REGEX = re.compile(r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')

class UserManager(models.Manager):
    
    def user_validator(self, postData):
        
        errors = {}
        
        if len(postData['first_name']) < 2 or postData['first_name'].isalpha() != True:
            errors['first_name'] = 'First name must be at least 2 characters'
        if len(postData['last_name']) < 2:
            errors['last_name'] = 'Last name must be at least 2 characters'
        elif not email_regex.match(postData['email']):
            errors['email'] = "Invalid email format"
        existing_user = User.objects.filter(email = postData['email'])
        if len(existing_user) != 0:
            errors['email'] = "Email already in use"
        if not PASSWORD_REGEX.match(postData['password']):
            errors['password'] = 'Password must be 8 characters and contain: 1 uppercase letter, 1 lowercase letter, and 1 number. May contain special characters.'
        elif postData['password'] != postData['confirm_pw']:
            errors['password'] = "Password and Confirm Password inputs must match"
        return errors
    
    def authenticate(self, email, password):
    
        user = None
        
        try:
            user = User.objects.get(email=email)
            
        except:
            return False
        
        return bcrypt.checkpw(password.encode(), user.password.encode())

    def log_validator(self, postData):
        
        errors = {}
        
        if len(postData['email']) == 0:
            errors['email'] = "Email is required"
        elif not email_regex.match(postData['email']):
            errors['email'] = "Invalid email format"
        existing_user = User.objects.filter(email = postData['email'])
        if len(existing_user) != 1:
            errors['email'] = "User not found"
        if len(postData['password']) == 0:
            errors['password'] = "Password is required"
        elif len(postData['password']) < 8:
            errors['password'] = "Password must be at least 8 characters"
        elif bcrypt.checkpw(postData['password'].encode(), existing_user[0].password.encode()) != True:
            errors['email'] = "Email and password do not match"
        return errors

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