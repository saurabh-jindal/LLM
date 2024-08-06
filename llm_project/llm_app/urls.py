from django.urls import path
from .views import select_model, query

urlpatterns = [
    path('select_model/', select_model, name='select_model'),
    path('query/', query, name='query'),
]
