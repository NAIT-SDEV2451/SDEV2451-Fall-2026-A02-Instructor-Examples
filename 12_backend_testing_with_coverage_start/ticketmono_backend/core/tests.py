from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

User = get_user_model()


# user registration tests.
class UserRegistraionViewTestCase(APITestCase):
    regsiter_url = "/api/v1/auth/register/"

    # - check if it registered the user
    def test_register_creates_a_new_user(self):

        payload = {
            "username": "newuser",
            "email": "newuser@newness.com",
            "password": "securiopasswordio1235656345",
        }
        response = self.client.post(self.regsiter_url, payload)

        # assertions
        self.assertEqual(response.status_code, 201)  # success status code
        self.assertEqual(User.objects.count(), 1)  # has a new user created
        EXPECTED_MESSAGE = "User registered successfully."
        self.assertEqual(
            response.data["message"],
            EXPECTED_MESSAGE,
        )

    # - check what happens when serializer is invalid
    def test_register_with_missing_fields_returns_400(self):
        bad_payload = {"username": "someuser"}
        response = self.client.post(self.regsiter_url, bad_payload)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(User.objects.count(), 0)

    # - a duplicate user name
    def test_register_user_with_duplicate_username_returns_400(self):
        # create a user.
        SAMPLE_USERNAME = "existing_user"
        User.objects.create(
            username=SAMPLE_USERNAME,
            email="something@example.com",
            password="something1235q345",
        )
        # create a payload and execture the request
        payload = {
            "username": SAMPLE_USERNAME,
            "email": "newuser@newness.com",
            "password": "securiopasswordio1235656345",
        }
        response = self.client.post(self.regsiter_url, payload)

        # make some assertions.
        # make sure it's a bad request.
        self.assertEqual(response.status_code, 400)
        # ensure there's only the one user created.
        self.assertEqual(User.objects.count(), 1)


# me view
class MeViewTestCase(APITestCase):
    me_url = "/api/v1/auth/me/"

    # remember setUp runs before the tests.
    def setUp(self):
        # below the values are just random.
        # there's library called faker in most langs that
        # just create fake data.
        self.user = User.objects.create(
            username="gary",
            email="something@example.com",
            password="something1235q345",
        )

    # - user has the correct data returned
    def test_me_returns_correct_user_data(self):
        # authenticate
        self.client.force_authenticate(user=self.user)
        # the request
        response = self.client.get(self.me_url)

        self.assertEqual(response.status_code, 200)
        # check the data
        self.assertEqual(response.data["id"], self.user.id)
        self.assertEqual(response.data["username"], self.user.username)
        self.assertEqual(response.data["email"], self.user.email)
        self.assertEqual(response.data["role"], self.user.role)

    # - user needs to be authenticated.
    def test_me_requires_authentication(self):
        response = self.client.get(self.me_url)
        self.assertEqual(response.status_code, 401)
