# calculator/utils.py
def calculate_implied_probability(odds):
    """Convert odds to implied probability"""
    if odds is None or odds <= 0:
        return None
    return round(1 / odds, 3)

def calculate_value(your_probability, odds):
    """
    Calculate value
    Value = (Your Probability × Odds) - 1
    If value > 0.10 (10%), it's a good bet
    """
    if your_probability is None or odds is None:
        return None
    if your_probability <= 0 or your_probability > 1:
        return None
    return round((your_probability * odds) - 1, 3)

def calculate_expected_value(your_probability, odds, stake):
    """Calculate expected value in Naira"""
    value = calculate_value(your_probability, odds)
    if value is None or stake is None:
        return None
    return round(value * stake, 2)

def get_recommendation(value):
    """Get bet recommendation based on value"""
    if value is None:
        return "❓ Unknown"
    if value > 0.15:
        return "✅ STRONG BET (15%+ edge)"
    elif value > 0.10:
        return "✅ GOOD BET (10%+ edge)"
    elif value > 0.05:
        return "⚠️ CONSIDER (5-10% edge)"
    elif value > 0:
        return "⚠️ SMALL VALUE (<5%)"
    else:
        return "❌ NO VALUE (Skip)"

def get_recommendation_color(value):
    """Get color for recommendation"""
    if value is None:
        return "gray"
    if value > 0.10:
        return "green"
    elif value > 0.05:
        return "yellow"
    elif value > 0:
        return "orange"
    else:
        return "red"