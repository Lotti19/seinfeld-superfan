from django.urls import path

from . import views

urlpatterns = [
    path('', views.store),
    path('cart/', views.cart),
    path('checkout', views.checkout),
    path('updateItem', views.updateItem),
]