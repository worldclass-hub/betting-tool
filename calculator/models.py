# calculator/models.py
from django.db import models
from django.utils import timezone

class BetLog(models.Model):
    """Stores all your betting history"""
    
    BET_TYPES = [
        ('1X2', 'Match Result (1X2)'),
        ('OVER_UNDER', 'Over/Under Goals'),
        ('BTTS', 'Both Teams to Score'),
        ('HANDICAP', 'Asian Handicap'),
        ('DRAW_NO_BET', 'Draw No Bet'),
        ('DOUBLE_CHANCE', 'Double Chance'),
    ]
    
    RESULT_CHOICES = [
        ('W', 'Win'),
        ('L', 'Loss'),
        ('P', 'Pending'),
        ('V', 'Void'),
    ]
    
    # Match Information
    match = models.CharField(max_length=200, help_text="e.g., Man United vs Chelsea")
    league = models.CharField(max_length=100, blank=True)
    date = models.DateField(default=timezone.now)
    
    # Bet Details
    bet_type = models.CharField(max_length=20, choices=BET_TYPES)
    selection = models.CharField(max_length=100, help_text="e.g., Home Win, Over 2.5")
    odds = models.FloatField()
    stake = models.FloatField(help_text="Amount bet in Naira")
    
    # Calculated Fields (auto-filled)
    implied_probability = models.FloatField(blank=True, null=True)
    your_probability = models.FloatField(blank=True, null=True, help_text="Your estimated probability %")
    value = models.FloatField(blank=True, null=True)
    
    # Result
    result = models.CharField(max_length=1, choices=RESULT_CHOICES, default='P')
    profit_loss = models.FloatField(blank=True, null=True)
    
    # Notes
    reasoning = models.TextField(blank=True, help_text="Why did you make this bet?")
    notes = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        # Auto-calculate implied probability when odds is set
        if self.odds:
            self.implied_probability = round(1 / self.odds, 3)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.match} - {self.selection} at {self.odds}"

class MatchAnalysis(models.Model):
    """For storing pre-match research data"""
    
    match = models.CharField(max_length=200)
    league = models.CharField(max_length=100)
    date = models.DateField()
    
    # Team stats
    home_win_rate = models.FloatField(blank=True, null=True)
    away_win_rate = models.FloatField(blank=True, null=True)
    home_goals_avg = models.FloatField(blank=True, null=True)
    away_goals_avg = models.FloatField(blank=True, null=True)
    
    # Head to Head
    h2h_home_wins = models.IntegerField(default=0)
    h2h_away_wins = models.IntegerField(default=0)
    h2h_draws = models.IntegerField(default=0)
    
    # Form
    home_form = models.CharField(max_length=10, blank=True, help_text="e.g., WWLWD")
    away_form = models.CharField(max_length=10, blank=True)
    
    # Notes
    notes = models.TextField(blank=True)
    
    def __str__(self):
        return self.match