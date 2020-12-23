### Installation

For the backend I used:

1. Node.js
2. Concurrently
3. Nodemon
4. Cors
5. Express
6. Morgan
7. Node-fetch
8. Body-parser

For the frontend I used:

1. React.js
2. Material UI
3. Axios
4. UUID
5. Redux
6. React-redux

Download project or clone from GitHub from dev branch.
To install the dependencies position in the root folder and execute the next instructions in the terminal.

```sh
$ npm install
$ cd client
$ npm install
$ cd ..
```

In root folder create .env file and place BACKEND_PORT = 8000 inside it. On this project, we will use port 8000 because in frontend all API calls are set on localhost:8000

Now we can run server and client. In task is used concurrently dependency so there is no need to run it separately

```sh
$ npm start
```

### Backend

Local server is created in server.js file. In map helpers we have 2 helper files, one is used to proxy calls on DuckDuckGo API and another one is to handle history (save and append file history file).
In map API are located our API routes /duck and /history. In duck.js we can proxy through 2 methods, POST and GET.

### Frontend

Fronted is located in the client folder. Material UI is used for UI styles. For state management is used redux with hooks. Redux reduces and the store is placed in /src/redux folder. The app is divided into 2 parts, SideBar and Main section.
The history search is located in SideBar, while search results are located in the Main seciton.
