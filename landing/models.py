#!/usr/bin/python
# -*- coding: utf-8 -*-

from django.db import models

# Create your models here.
class Subscribier(models.Model):
    email = models.EmailField()
    name = models.CharField(max_length=128)

    def __str__(self):
        return "Пользователь - %s, %s" % (self.name, self.email)

    class Meta:
        verbose_name = "Подписчики"
        verbose_name_plural = "Список подписчиков"
