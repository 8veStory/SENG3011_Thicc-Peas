"""
Lets you delete all the disease, reports and articles out of the Firestore.
"""

from firestore_client import FireStore_Client

if __name__ == "__main__":
    client = FireStore_Client()

    answer = None
    while (answer != "y" and answer != "n"):
        answer = input("Delete 'diseases'? Y/N ").lower()
        if answer == "y":
            print("Deleting...")
            client.delete_inside_collection("diseases")

    answer = None
    while (answer != "y" and answer != "n"):
        answer = input("Delete 'reports'? Y/N ").lower()
        if answer == "y":
            print("Deleting...")
            client.delete_inside_collection("reports")

    answer = None
    while (answer != "y" and answer != "n"):
        answer = input("Delete 'articles'? Y/N ").lower()
        if answer == "y":
            print("Deleting...")
            client.delete_inside_collection("articles")
