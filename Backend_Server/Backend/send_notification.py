import firebase_admin
from firebase_admin import credentials, messaging

# Path to your service account JSON file
SERVICE_ACCOUNT_KEY = r"D:\GitHub\Quick Aid\QuickAid\Backend_Server\Backend\serviceAccountKey.json"

# FCM device token (from the browser)
FCM_DEVICE_TOKEN = \
[
    "e4hmRSBDYNGkQx3ZJYKyVG:APA91bFPgacBzD50iIEwDibGNdUwWkvOXy2LdX03lhiiilDODAeJnVxHuTj0a9i1GheaWuZatTrDR6Mp9d_e7dhaQ-Ck5GPr5jGvrVwWbR-ayQtKWycWZ2Y",
    "dd_3mN3ah-puuh57FC8tyz:APA91bFBQiC5MrfikQZni0QkRnIN3iDZlvPa1cPqI4-R_aVJr8iK45XGM-DbroWZQu7cpfNwN4ArqpZ6NfEdLygtNhidjBeBDoCryLJSA6_gemubnTQz4G0",
    "fFxuq04MRp3bqt-W_3N4Oy:APA91bEnKYDkXmeKyuofcizXBYwNMr99Ot97UufP1nxy_6-ZFxAjhPrJ1srupi_mcwKVsDI4zTp4QcRLlqSkt1aN2uf2wQsHHu7SXnc6J3Q5a8FxtrfbZ_i0xCNev38Xbfp6hgNgj4R9"
 ]

def initialize_firebase():
    """
    Initialize Firebase Admin SDK.
    """
    cred = credentials.Certificate(SERVICE_ACCOUNT_KEY)
    firebase_admin.initialize_app(cred)
    # print("Firebase initialized.")

def send_test_notification(app_name="quickaid", title="title", body="body", token="token"):
# def send_test_notification(token=""):
    """
    Send a test notification to the specified FCM token.
    """
    try:
        # Create a message payload
        message = messaging.Message(
            data={
                # "title" : "title",
                # "text": "body",
                "title" : title,
                "text": body,
                "icon": "https://www.ulka.autos/static/lunch_booking/images/vegan-food.png",  # URL of the icon
                "click_action": "https://google.com",
            },
            token=token,
        )

        # Send the notification
        response = messaging.send(message)
        print(f"Notification sent successfully! Response: {response}")
    except Exception as e:
        print(f"Error sending notification: {e}")




def send_notification(app_name="quickaid", title="", body="", token=""):
    # initialize_firebase()
    send_test_notification(app_name=app_name, title=title, body=body, token=token)
 
if __name__ == "__main__":
    # Initialize Firebase
    initialize_firebase()

    # Send a test notification
    for i in FCM_DEVICE_TOKEN:
        # send_test_notification(token=i)
        send_notification(app_name="quickaid", title=">>ammar", body="", token=i)