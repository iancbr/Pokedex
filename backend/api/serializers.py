from rest_framework import serializers
from .models import Tipo, Pokemon

# Serializers para os modelos Tipo e Pokemon
# converte os modelos em formatos JSON para a API

class TipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo
        fields = '__all__'
        read_only_fields = ['codigo']

class PokemonSerializer(serializers.ModelSerializer):
    
    
    tipo_primario_nome = serializers.CharField(source='tipo_primario.nome', read_only=True)
    tipo_secundario_nome = serializers.CharField(source='tipo_secundario.nome', read_only=True)

    
    class Meta:
        model = Pokemon
        fields = ['id', 'codigo', 'nome', 'tipo_primario', 'tipo_secundario', 'tipo_primario_nome', 'tipo_secundario_nome']

    def validate(self, data):
        if data.get('tipo_primario') and data.get('tipo_secundario') and data['tipo_primario'] == data['tipo_secundario']:
            raise serializers.ValidationError("O tipo primário e secundário não podem ser iguais.")
        return data