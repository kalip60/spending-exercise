"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.http import HttpResponse, JsonResponse
import json

spendingsArray = [{'description': 'Mango', 'amount': '12', 'spent_at': '2022-02-23T14:47:20.381Z', 'currency': 'USD'}]

def spendings(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        if body['description'] and body['amount'] and body['spent_at'] and body['currency']:
            spendingsArray.append(body)
            return HttpResponse(status=201)
        else:
            return HttpResponse(status=400)
    else:
        return JsonResponse(spendingsArray, safe = False)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('spendings/', spendings),
]
