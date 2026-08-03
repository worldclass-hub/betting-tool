# calculator/admin.py
from django.contrib import admin
from .models import BetLog, MatchAnalysis

@admin.register(BetLog)
class BetLogAdmin(admin.ModelAdmin):
    list_display = ['match', 'selection', 'odds', 'stake', 'result', 'profit_loss', 'date']
    list_filter = ['result', 'bet_type', 'date']
    search_fields = ['match', 'selection', 'league']
    readonly_fields = ['implied_probability', 'created_at', 'updated_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Match Information', {
            'fields': ('match', 'league', 'date')
        }),
        ('Bet Details', {
            'fields': ('bet_type', 'selection', 'odds', 'stake')
        }),
        ('Probability & Value', {
            'fields': ('your_probability', 'implied_probability', 'value')
        }),
        ('Result', {
            'fields': ('result', 'profit_loss')
        }),
        ('Notes', {
            'fields': ('reasoning', 'notes')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(MatchAnalysis)
class MatchAnalysisAdmin(admin.ModelAdmin):
    list_display = ['match', 'league', 'date']
    search_fields = ['match', 'league']
    ordering = ['-date']