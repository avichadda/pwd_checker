# Password checkpoint

A small Vite + React front-end for the password checker. The password is hashed with
SHA-256 in the browser and compared with the hash used by the original Python
prototype. No password value is sent over the network.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

> This is a local demonstration of password verification, not a production
> authentication system. Production applications should verify credentials on a
> server and use a slow, salted password-hashing algorithm.