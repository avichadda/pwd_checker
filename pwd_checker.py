# importing libraries for some commands...
import getpass
# Getpass allows the password to stay hidden and not be echoed.
import hashlib
# Hashlib allows to encrypt raw-text with various kinds of encryption methods

password = "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4"
# This is an SHA-256 hash, consisting of 256 digits, which is encrypted.

def prompt():
# "Def" is a command to create a sub-routine.
    user_prompt = getpass.getpass("Please provide your password: ")
    hash = hashlib.sha256(user_prompt.encode()).hexdigest()
    # This command takes the password inputed by the user, and makes it into a hash.
    return hash

while True:
    hash = prompt()
# This command repeats the sub-routine until the password is correct

    if hash == password:
        print("Connection Successful!")
        break
    else:
        print("Connection denied! Please try again.")
# This command tests if the password inputed by the user is equal to the hash stored on the server.
