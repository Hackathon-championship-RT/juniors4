import uuid

import rest_framework
import rest_framework.status
import rest_framework.decorators
import rest_framework.response
import rest_framework.authtoken
import rest_framework.permissions

import django.contrib.auth.models

import datetime

import api.models
import api.serializers


@rest_framework.decorators.api_view(["GET"])
def testview(request):
    return rest_framework.response.Response([
        {"imagePath": "/icons/kia.svg"},
        {"imagePath": "/icons/honda.svg"},
        {"imagePath": "/icons/lamborgini.svg"},
        {"imagePath": "/icons/mercedes.svg"}
    ])


@rest_framework.decorators.api_view(["POST"])
def login(request):
    serializer = api.serializers.UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = django.contrib.auth.models.User.objects.get(
            username=serializer.data["username"],
        )
        user.set_password(serializer.data["password"])
        user.save()
        token = rest_framework.authtoken.models.Token.objects.create(user=user)
        return rest_framework.response.Response(
            {
                "token": token.key,
                "user": serializer.data,
            }
        )

    return rest_framework.response.Response(
        serializer.errors, status=rest_framework.status.HTTP_400_BAD_REQUEST,
    )


@rest_framework.decorators.api_view(["POST"])
def register(request):
    serializer = api.serializers.GamerSerializer(data=request.data)
    if serializer.is_valid():
        gamer = serializer.save()
        gamer.token = str(uuid.uuid4())
        gamer.save()
        return rest_framework.response.Response({"token": gamer.token})


@rest_framework.decorators.api_view(["POST"])
def put_data(request):
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Token '):
        token = auth_header.split(' ')[1]
    else:
        return rest_framework.response.Response(
            {"error": "Token not found"},
            status=rest_framework.status.HTTP_401_UNAUTHORIZED
        )

    serializer = api.serializers.LeaderboardSerializer(data=request.data)
    if serializer.is_valid():
        try:
            gamer = api.models.GamerModel.objects.get(token=token)
        except api.models.GamerModel.DoesNotExist:
            return rest_framework.response.Response(
                {"error": "Invalid token"},
                status=rest_framework.status.HTTP_401_UNAUTHORIZED
            )

        try:
            leaderboard = api.models.LeaderboardModel.objects.filter(level=serializer.data["level"]).get(gamer=gamer)
            score_time = datetime.datetime.strptime(serializer.data["score"], "%H:%M:%S").time()
            print(leaderboard.score, score_time)
            if leaderboard.score > score_time:
                leaderboard.score = serializer.data["score"]
                leaderboard.save()
        except api.models.LeaderboardModel.DoesNotExist:
            leaderboard = api.models.LeaderboardModel.objects.create(
                score=serializer.data["score"],
                level=serializer.data["level"],
            )
            leaderboard.gamer.set([gamer])

        return rest_framework.response.Response(serializer.data)

    return rest_framework.response.Response(
        serializer.errors, status=rest_framework.status.HTTP_400_BAD_REQUEST,
    )


@rest_framework.decorators.api_view(["GET"])
def get_top_scores(request, level):
    top_scores = api.models.LeaderboardModel.objects.filter(level=level) \
        .order_by('score')[:10]

    serializer = api.serializers.LeaderboardSerializer(top_scores, many=True)
    return rest_framework.response.Response(serializer.data)
