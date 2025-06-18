import os
import json
from django.core.management.base import BaseCommand
from api.models import Tipo, Pokemon


class Command(BaseCommand):
    help = 'Carrega os pokémons e tipos do arquivo JSON para o banco de dados'

    def handle(self, *args, **options):
        caminho_arquivo = os.path.join('backend', 'dados_iniciais.json')

        with open(caminho_arquivo, encoding='utf-8') as arquivo:
            pokemons_data = json.load(arquivo)

        # Gerar dicionário de tipos únicos com código incremental
        tipos_unicos = {}
        codigo_tipo = 1
        for p in pokemons_data:
            for tipo in [p["tipo_primario"], p.get("tipo_secundario")]:
                if tipo:
                    tipo_formatado = tipo.strip().title()
                    if tipo_formatado not in tipos_unicos:
                        tipos_unicos[tipo_formatado] = codigo_tipo
                        codigo_tipo += 1

        # Criar os tipos no banco (se ainda não existirem)
        for nome, codigo in tipos_unicos.items():
            Tipo.objects.get_or_create(nome=nome, defaults={'codigo': codigo})

        # Criar os pokémons
        for p in pokemons_data:
            nome = p["nome"].strip().title()
            codigo = p["codigo"]
            tipo1_nome = p["tipo_primario"].strip().title()
            tipo2_raw = p.get("tipo_secundario")
            tipo2_nome = tipo2_raw.strip().title() if tipo2_raw else None

            tipo1 = Tipo.objects.get(nome=tipo1_nome)
            tipo2 = Tipo.objects.get(nome=tipo2_nome) if tipo2_nome else None

            Pokemon.objects.get_or_create(
                codigo=codigo,
                defaults={
                    "nome": nome,
                    "tipo_primario": tipo1,
                    "tipo_secundario": tipo2,
                }
            )

        self.stdout.write(self.style.SUCCESS("Pokémons e tipos carregados com sucesso."))
