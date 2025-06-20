from django.db import models

class Tipo(models.Model):
    # Definindo os campos do modelo Tipo
    # Cada tipo terá um código único e um nome
    codigo = models.IntegerField(unique=True)
    nome = models.CharField(max_length=100, unique=True)

    #setando o código automaticamente para o próximo número disponível
    def save(self, *args, **kwargs):
        if not self.codigo:
            ultimo = Tipo.objects.order_by('-codigo').first()
            self.codigo = (ultimo.codigo + 1) if ultimo else 1
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nome

class Pokemon(models.Model):
    # Definindo os campos do modelo Pokemon
    # Cada Pokémon terá um código único, nome e dois tipos (primário e secundário
    codigo = models.IntegerField(unique=True)
    nome = models.CharField(max_length=100)
    tipo_primario = models.ForeignKey(Tipo, related_name='primarios', on_delete=models.CASCADE)
    tipo_secundario = models.ForeignKey(Tipo, related_name='secundarios', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nome
