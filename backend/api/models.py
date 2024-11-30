import django.db
import django.db.models


class LeaderboardModel(django.db.models.Model):
    score = django.db.models.FloatField(null=False)
    timestamp = django.db.models.DateTimeField(auto_now=True)
    level = django.db.models.IntegerField(null=False)


class GamerModel(django.db.models.Model):
    token = django.db.models.CharField(max_length=40)
    username = django.db.models.CharField(max_length=120)
    leaderboard = django.db.models.ForeignKey(LeaderboardModel, on_delete=django.db.models.CASCADE, related_name="gamer", null=True)
