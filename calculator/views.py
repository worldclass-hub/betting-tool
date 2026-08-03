# calculator/views.py
from django.shortcuts import render, redirect
from django.contrib import messages
from django.db.models import Count, Sum, Q
from .models import BetLog
from .utils import calculate_value, calculate_implied_probability, calculate_expected_value, get_recommendation

def index(request):
    """Home page with dashboard"""
    # Stats
    total_bets = BetLog.objects.count()
    total_wins = BetLog.objects.filter(result='W').count()
    total_losses = BetLog.objects.filter(result='L').count()
    total_profit = BetLog.objects.aggregate(Sum('profit_loss'))['profit_loss__sum'] or 0
    
    win_rate = (total_wins / total_bets * 100) if total_bets > 0 else 0
    
    # Recent bets
    recent_bets = BetLog.objects.order_by('-created_at')[:10]
    
    context = {
        'total_bets': total_bets,
        'total_wins': total_wins,
        'total_losses': total_losses,
        'total_profit': round(total_profit, 2),
        'win_rate': round(win_rate, 1),
        'recent_bets': recent_bets,
    }
    return render(request, 'calculator/index.html', context)

def value_calculator(request):
    """Value Calculator Tool"""
    result = None
    
    if request.method == 'POST':
        try:
            your_probability = float(request.POST.get('your_probability', 0)) / 100
            odds = float(request.POST.get('odds', 0))
            stake = request.POST.get('stake')
            stake = float(stake) if stake else None
            
            implied_prob = calculate_implied_probability(odds)
            value = calculate_value(your_probability, odds)
            
            if value is not None:
                recommendation = get_recommendation(value)
            else:
                recommendation = "❓ Invalid input"
            
            result = {
                'your_probability': your_probability * 100,
                'implied_probability': implied_prob * 100 if implied_prob else None,
                'odds': odds,
                'value': value,
                'recommendation': recommendation,
                'stake': stake,
                'expected_value': calculate_expected_value(your_probability, odds, stake) if stake else None,
                'edge': (your_probability - implied_prob) * 100 if implied_prob else None,
            }
            
        except (ValueError, TypeError):
            messages.error(request, "Please enter valid numbers")
    
    return render(request, 'calculator/value_calculator.html', {'result': result})

def bet_log(request):
    """Log new bets and view history"""
    if request.method == 'POST':
        try:
            bet = BetLog(
                match=request.POST.get('match'),
                league=request.POST.get('league', ''),
                bet_type=request.POST.get('bet_type'),
                selection=request.POST.get('selection'),
                odds=float(request.POST.get('odds')),
                stake=float(request.POST.get('stake')),
                your_probability=float(request.POST.get('your_probability')) if request.POST.get('your_probability') else None,
                reasoning=request.POST.get('reasoning', ''),
            )
            
            # Auto-calculate implied probability and value
            if bet.odds and bet.your_probability:
                bet.implied_probability = 1 / bet.odds
                bet.value = (bet.your_probability / 100 * bet.odds) - 1
            
            bet.save()
            messages.success(request, f'Bet logged successfully!')
            return redirect('/bet-log/')
            
        except (ValueError, TypeError):
            messages.error(request, 'Error: Please check your input values')
    
    bets = BetLog.objects.all().order_by('-created_at')
    
    context = {
        'bets': bets,
    }
    return render(request, 'calculator/bet_log.html', context)

def match_analysis(request):
    """Analyze matches before betting"""
    context = {
        'analyses': [],
    }
    return render(request, 'calculator/match_analysis.html', context)

def dashboard(request):
    """Detailed dashboard with analytics"""
    bet_type_stats = BetLog.objects.values('bet_type').annotate(
        wins=Count('id', filter=Q(result='W')),
        total=Count('id'),
        profit=Sum('profit_loss')
    )
    
    context = {
        'bet_type_stats': bet_type_stats,
    }
    return render(request, 'calculator/dashboard.html', context)