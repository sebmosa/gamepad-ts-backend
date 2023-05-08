<h1  align="center">Gamepad Backend</h1>

<a  href="https://gamepad-ts-next.vercel.app"><img  src="https://res.cloudinary.com/dr9kwlfuq/image/upload/v1683563128/Gamepad_TS_Backend/gtb-homepage-games-added_fn5zzx.jpg"  title="Gamepad Backend TypeScript"  alt="Gamepad Backend TypeScript"></a>

## Overview

**Server**

<a  href="https://gamepad-ts-next.vercel.app"  target="_blank"> [https://gamepad-ts-backend.onrender.com](https://gamepad-ts-backend.onrender.com)/</a>

API used : https://api.rawg.io/docs/

**Client**

<a  href="https://gamepad-ts-next.vercel.app"  target="_blank"> https://gamepad-ts-next.vercel.app</a>

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

## Marvel Client

- React

- HTTP request with axios (get, post)

- Hooks (useState, useEffect, useContext)

- React Router Dom

- Cookies

Please check :
<a  href="[https://github.com/bangtam1994/marvel-frontend-react](https://github.com/bangtam1994/marvel-frontend-react)">[https://github.com/bangtam1994/marvel-frontend-react](https://github.com/bangtam1994/marvel-frontend-react)</a>

## Deployment

- Client : deployed with Netlify

- Server : deployed with Heroku

- MongoDb database : hosted on Mlab

## Contact

<a  href="https://www.linkedin.com/in/bangtamnguyen"  target="_blank"> <img src="https://salon-ctco.com/wp-content/uploads/2018/09/Logo-LinkedIn.png"
width="45"
/></a>
<a  href="mailto:bangtam1994@hotmail.com"  target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
width="40"
/></a>
