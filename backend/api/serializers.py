import rest_framework
import rest_framework.serializers

import api.models


class GamerSerializer(rest_framework.serializers.ModelSerializer):
    class Meta(object):
        model = api.models.GamerModel
        fields = ["username"]


class LeaderboardSerializer(rest_framework.serializers.ModelSerializer):
    username = rest_framework.serializers.SerializerMethodField()

    class Meta(object):
        model = api.models.LeaderboardModel
        fields = ['score', 'timestamp', 'level', 'username']

    def get_username(self, obj):
        try:
            if obj.gamer.exists():
                return obj.gamer.first().username
            return None
        except Exception:
            return None
