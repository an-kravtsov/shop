#!/usr/bin/python
# -*- coding: utf-8 -*-

from django.contrib import admin
from .models import *

class SubscribierAdmin(admin.ModelAdmin):
    # list_display = ["name", "email"]
    list_display = [field.name for field in Subscribier._meta.fields ]
    # exclude = ('email',) # поле не показывается при выделении
    fields = ("name",)  # показывается
    list_filter = ("name",)
    search_fields = ("name", "email",)

    class Meta:
        model = Subscribier

admin.site.register(Subscribier, SubscribierAdmin)