from rest_framework.routers import DefaultRouter
from .views import TipoViewSet, PokemonViewSet
from django.urls import path, include

# URLs para a API, usando o DefaultRouter do Django REST Framework
# Define as rotas para os viewsets de Tipo e Pokemon
#
# O DefaultRouter cria URLs para os métodos CRUD dos viewsets
# e associa aos nomes de endpoint especificados.
router = DefaultRouter()
router.register(r'tipos', TipoViewSet, basename='tipo')
router.register(r'pokemons', PokemonViewSet, basename='pokemon')

urlpatterns = [
    path('', include(router.urls)),
]
