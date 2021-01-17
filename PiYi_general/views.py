from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.http import HttpResponse

from django.db import connection
import ast

from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt



def home(request):
    return render(request, "PiYi_general/home.html", {})

def about(request):
    return render(request, "PiYi_general/about.html", {})

def services(request):
    return render(request, "PiYi_general/services.html", {})

def contact(request):
    return render(request, "PiYi_general/contact.html", {})


