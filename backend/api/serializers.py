import rest_framework
import rest_framework.serializers

import api.models


class GamerSerializer(rest_framework.serializers.ModelSerializer):
    class Meta(object):
        model = api.models.GamerModel
        fields = ["username"]


class LeaderboardSerializer(rest_framework.serializers.ModelSerializer):
    gamer = rest_framework.serializers.PrimaryKeyRelatedField(queryset=api.models.GamerModel.objects.all(), required=False)
    username = rest_framework.serializers.SerializerMethodField()
    class Meta(object):
        model = api.models.LeaderboardModel
        fields = ['score', 'timestamp', 'level', 'username', 'gamer']

    def get_username(self, obj):
        try:
            return obj.gamer.username if obj.gamer else None
        except Exception:
            return None
