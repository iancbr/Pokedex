from django.db import models

class Tipo(models.Model):
    codigo = models.IntegerField(unique=True)
    nome = models.CharField(max_length=100, unique=True)


    def __str__(self):
        return self.nome

class Pokemon(models.Model):
    codigo = models.IntegerField(unique=True)
    nome = models.CharField(max_length=100)
    tipo_primario = models.ForeignKey(Tipo, related_name='primarios', on_delete=models.CASCADE)
    tipo_secundario = models.ForeignKey(Tipo, related_name='secundarios', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nome
