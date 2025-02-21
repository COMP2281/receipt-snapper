from rest_framework.routers import DefaultRouter
from .views import PreviousExpenseViewSet

router = DefaultRouter()
router.register(r'previous-expenses', PreviousExpenseViewSet, basename='previous-expense')

urlpatterns = router.urls
