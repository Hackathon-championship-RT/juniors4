import django.urls

import api.views


urlpatterns = [
    django.urls.path("leaderboard/<int:level>/", api.views.get_top_scores, name="leaderboard"),
    django.urls.path("leaderboard/put_data/", api.views.put_data, name="put_data"),
    django.urls.path("register/", api.views.register, name="register"),
    django.urls.path("login/", api.views.login, name="login"),
]
