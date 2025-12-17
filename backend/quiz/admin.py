from django.contrib import admin
from .models import Quiz, Question, Choice
# Register your models here.
class QuestionInline(admin.TabularInline):
		model = Question
		extra = 1

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
		list_display = ('id', 'title', 'description', 'created_at')
		search_fields = ('title',)
		inlines = [QuestionInline]
  
class ChoiceInline(admin.TabularInline):
		model = Choice
		extra = 3

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
		list_display = ('id', 'question_text', 'question_type', 'quiz')
		list_filter = ('question_type',)
		search_fields = ('question_text',)
		inlines = [ChoiceInline]
  
@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
		list_display = ('id', 'choice_text', 'is_correct', 'question')
		list_filter = ('is_correct',)
		search_fields = ('choice_text',)

