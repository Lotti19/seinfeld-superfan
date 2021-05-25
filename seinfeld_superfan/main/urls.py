from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.index),
    path('store/', include('store.urls')),
    path('community', views.community),
    path('post', views.post),
    path('post_success', views.post_success),
    path('post_comment', views.post_comment),
    path('add_like', views.add_like),
    path('new_user', views.new_user),
    path('existing_user', views.existing_user),
    path('register', views.register),
    path('startquiz', views.startquiz),
]