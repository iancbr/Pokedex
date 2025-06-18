from rest_framework import viewsets, filters
from .models import Tipo, Pokemon
from .serializers import TipoSerializer, PokemonSerializer

class TipoViewSet(viewsets.ModelViewSet):
    queryset = Tipo.objects.all()
    serializer_class = TipoSerializer

class PokemonViewSet(viewsets.ModelViewSet):
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nome', 'tipo_primario__nome', 'tipo_secundario__nome']
