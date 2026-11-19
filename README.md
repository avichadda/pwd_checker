# Password checker

This project is a small Python command-line password checker. It repeatedly
prompts for a password without displaying the typed characters, hashes the
input with SHA-256, and compares the resulting hash with the stored hash.

## How it works

1. `getpass.getpass()` asks for a password while keeping it hidden.
2. The password is encoded as UTF-8 bytes.
3. `hashlib.sha256()` creates a one-way SHA-256 digest.
4. The digest is converted to a hexadecimal string.
5. The result is compared with the SHA-256 hash stored in `pwd_checker.py`.
6. Matching input prints `Connection Successful!` and exits.
7. Any other input prints `Connection denied! Please try again.` and prompts
   again.

The checker does not store or compare the plain-text password. The stored
value is:

```text
03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4
```

The default password for this example is `1234`.

## Run it

From the project directory, run:

```bash
python3 pwd_checker.py
```

Press `Ctrl+C` to stop the checker while it is waiting for input.

## Security note

This is an educational example. A production authentication system should
verify credentials on a server, use a unique salt, and use a password-specific
slow hashing algorithm such as Argon2id, scrypt, or bcrypt. A password hash
should also be stored outside the source code, for example in a protected
environment variable or secrets manager.
