from django.urls import path
from .views import QuizListView, QuizView

urlpatterns = [
		path('quizzes/', QuizListView.as_view(), name='quiz-list'),
		path('quiz/<int:quiz_id>/', QuizView.as_view(), name='quiz-detail'),
		path('quiz/submit/', QuizView.as_view(), name='quiz-submit'),
]