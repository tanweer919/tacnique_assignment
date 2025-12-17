from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import Quiz, Question
from .serializers import QuizSerializer, SubmitQuizSerializer

# Create your views here.

class QuizListView(ListAPIView):
		queryset = Quiz.objects.all()
		serializer_class = QuizSerializer
  
class QuizView(APIView):
		def get(self, req, quiz_id):
				try:
						quiz = Quiz.objects.get(id=quiz_id)
				except Quiz.DoesNotExist:
						return Response({"error": "Quiz not found"}, status=status.HTTP_404_NOT_FOUND)
				
				serializer = QuizSerializer(quiz)
				return Response(serializer.data, status=status.HTTP_200_OK)
		def post(self, req):
				serializer = SubmitQuizSerializer(data=req.data)
				if serializer.is_valid():
						quiz_id = serializer.validated_data['quiz_id']
						answers = serializer.validated_data['answers']
						
						try:
								quiz = Quiz.objects.get(id=quiz_id)
						except Quiz.DoesNotExist:
								return Response({"error": "Quiz not found"}, status=status.HTTP_404_NOT_FOUND)
						
						correct_count = 0
						for answer in answers:
								question_id = answer.get('question_id')
								user_answer = answer.get('answer_text')
								
								try:
										question = Question.objects.get(id=question_id, quiz=quiz)
								except Question.DoesNotExist:
										continue
								
								if question.question_type == 'TEXT':
										if question.answer_text.strip().lower() == user_answer.strip().lower():
												correct_count += 1
								else:
										if question.answer_text == user_answer:
												correct_count += 1
						
						total_questions = quiz.questions.count()
						score = {
								"correct_answers": correct_count,
								"total_questions": total_questions,
								"percentage": (correct_count / total_questions) * 100 if total_questions > 0 else 0
						}
						
						return Response(score, status=status.HTTP_200_OK)
				
				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
