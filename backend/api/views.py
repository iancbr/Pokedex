from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Tipo, Pokemon
from .serializers import TipoSerializer, PokemonSerializer

class TipoViewSet(viewsets.ModelViewSet):
    queryset = Tipo.objects.all()
    serializer_class = TipoSerializer

    def destroy(self, request, *args, **kwargs):
        tipo = self.get_object()

        # Verifica se o tipo está associado a algum Pokémon
        em_uso = Pokemon.objects.filter(tipo_primario=tipo).exists() or Pokemon.objects.filter(tipo_secundario=tipo).exists()

        if em_uso:
            return Response(
                {"erro": "Este tipo está associado a um ou mais Pokémons e não pode ser excluído."},
                status=status.HTTP_400_BAD_REQUEST
            )

        return super().destroy(request, *args, **kwargs)

class PokemonViewSet(viewsets.ModelViewSet):
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nome', 'tipo_primario__nome', 'tipo_secundario__nome']

    def create(self, request, *args, **kwargs):
        tipo_primario = request.data.get("tipo_primario")
        tipo_secundario = request.data.get("tipo_secundario")

        if tipo_primario and tipo_secundario and tipo_primario == tipo_secundario:
            raise ValidationError({"erro": "Tipo primário e secundário não podem ser iguais."})

        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        tipo_primario = request.data.get("tipo_primario")
        tipo_secundario = request.data.get("tipo_secundario")

        if tipo_primario and tipo_secundario and tipo_primario == tipo_secundario:
            raise ValidationError({"erro": "Tipo primário e secundário não podem ser iguais."})

        return super().update(request, *args, **kwargs)
