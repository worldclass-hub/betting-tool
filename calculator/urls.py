# calculator/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('calculator/', views.value_calculator, name='value_calculator'),
    path('bet-log/', views.bet_log, name='bet_log'),
    path('analysis/', views.match_analysis, name='match_analysis'),
    path('dashboard/', views.dashboard, name='dashboard'),
]