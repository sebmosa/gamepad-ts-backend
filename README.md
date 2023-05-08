<h1  align="center">Gamepad Backend</h1>

<a  href="https://gamepad-ts-next.vercel.app"><img  src="https://res.cloudinary.com/dr9kwlfuq/image/upload/v1683563128/Gamepad_TS_Backend/gtb-homepage-games-added_fn5zzx.jpg"  title="Gamepad Backend TypeScript"  alt="Gamepad Backend TypeScript"></a>

## Overview

**Demo**

<a  href="https://gamepad-ts-next.vercel.app"  target="_blank"> [https://gamepad-ts-next.vercel.app](https://gamepad-ts-next.vercel.app)/</a>

**Server**

<a  href="https://gamepad-ts-backend.onrender.com"  target="_blank"> [https://gamepad-ts-backend.onrender.com](https://gamepad-ts-backend.onrender.com)/</a>

API used : https://api.rawg.io/docs/

**Client**

<a  href="https://github.com/sebmosa/gamepad-ts-next"  target="_blank"> [https://github.com/sebmosa/gamepad-ts-next](https://github.com/sebmosa/gamepad-ts-next)</a>

## Packages

- Node.js

- Express

- Multer

- Mongoose

- Zod

- Axios

- Crypto-js

- Uid2

- Cors

- Dotenv

## Architecture

Routes Rawg :

The purpose of these routes is to hide the API Key, filter the data returned in order to provide the front end with typed and formatted data.

- GET /platforms : Request to the Rawg API which returns the list of platforms.
- GET /genres : Request to the Rawg API which returns the list of genres.
- GET /games : Request to the Rawg API wich returns a standard or a custom game list with the params page_size, page, search, platforms, genres, metacritic, ordering.
- GET /games/:id : Request to the Rawg API wich returns the details of game based on its id.

Routes User :

- POST /signup : Create a user account with crypted password (salt, hash) and token, all saved in mongoDB database.
- POST /login : Route to decrypt the password + middleware (auth)

## Running the project

Clone this repository :

```
git clone https://github.com/sebmosa/gamepad-ts-backend.git

cd gamepad-ts-backend
```

To install packages :

```
npm install
```

or

```
pnpm install
```

When installation is complete, run the project with:

```
npm run dev
```

or

```
pnpm dev
```

## Deployment

- Server : Deployed on https://render.com

- MongoDb database : Hosted on Atlas https://cloud.mongodb.com/

## Contact

<a  href="https://www.linkedin.com/in/s%C3%A9bastien-mosagna-85a1a29/"  target="_blank"> <img src="https://res.cloudinary.com/dr9kwlfuq/image/upload/v1683577491/Gamepad_TS_Backend/LI-In-Bug_afyv46.png"
width="40"
/></a>
<a  href="mailto:sebmosa@gmail.com"  target="_blank"> <img src="https://res.cloudinary.com/dr9kwlfuq/image/upload/v1683577816/Gamepad_TS_Backend/Gmail_icon_ptcfsz.png"
width="40"
/></a>
