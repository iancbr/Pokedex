from rest_framework.routers import DefaultRouter
from .views import TipoViewSet, PokemonViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'tipos', TipoViewSet, basename='tipo')
router.register(r'pokemons', PokemonViewSet, basename='pokemon')

urlpatterns = [
    path('', include(router.urls)),
]
