from django.urls import path

from . import views

urlpatterns = [
    path('', views.index),
    path('community', views.community),
    path('post', views.post),
    path('post_success', views.post_success),
    path('post_comment', views.post_comment),
    path('add_like', views.add_like),
]