from rest_framework import serializers
from .models import Tipo, Pokemon

class TipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo
        fields = '__all__'

class PokemonSerializer(serializers.ModelSerializer):
    tipo_primario = serializers.SlugRelatedField(slug_field='nome', queryset=Tipo.objects.all())
    tipo_secundario = serializers.SlugRelatedField(slug_field='nome', queryset=Tipo.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Pokemon
        fields = '__all__'
