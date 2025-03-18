from django.urls import path

from .views import ListLineItemsView, UploadCardData

urlpatterns = [
    path('', ListLineItemsView.as_view(), name='line_items'),
    path('upload', UploadCardData.as_view(), name='upload'),
]