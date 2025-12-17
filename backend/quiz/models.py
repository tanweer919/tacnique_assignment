from django.db import models

# Create your models here.
class Quiz(models.Model):
		title = models.CharField(max_length=200)
		description = models.TextField()
		created_at = models.DateTimeField(auto_now_add=True)
  
		def __str__(self):
				return self.title
  
class Question(models.Model):
		question_type_choices = (
				('MCQ', 'Multiple Choice Question'),
				('TF', 'True/False'),
    ('TEXT', 'Text Answer'),)
		quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
		question_text = models.TextField()
		question_type = models.CharField(max_length=10, choices=question_type_choices)
		answer_text = models.TextField(blank=True, null=True)  # For TEXT type questions

		def __str__(self):
				return self.question_text
  
class Choice(models.Model):
		question = models.ForeignKey(Question, related_name='choices', on_delete=models.CASCADE)
		choice_text = models.CharField(max_length=200)
		is_correct = models.BooleanField(default=False)
	
		def __str__(self):
				return self.choice_text
  
