# 🔄 RESTack API

**RESTack** is an experimental REST API developed exclusively for educational purposes.

There are some different operations that can be performed, such as a CRUD for users, and also the creation of projects. Furthermore, there are some rules for route access, e.g. only authenticated users can create, update and delete projects/users, but retrieving them is allowed for everyone.

<br/>

---

<br/>

## 💟 Tools & Dependencies Used

- Node.js
- Express
- PostgreSQL
- Sequelize
- JWT
- Bcrypt
- Body Parser
- Cookie Parser
- ESLint
- Prettier
- Insomnia
- DBeaver

<br/>

---

<br/>

## ♾️ Helpful Content

[HTTP response status codes (MDN Web Docs)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

<br/>

---

<br/>

## ✅ Installation

Run the following command to install the dependencies from _package.json_:

`yarn install`

<br/>

---

<br/>

## ▶️ Examples

**POST** @ _http://localhost:3000/signup_

Used to create a new user with `name`, `email` and `password`. Returns the user's info or an error message (e.g. `email` already exists).

![POST_201](assets/post-signup-201.png)

![POST_400](assets/post-signup-400.png)

<br/>

**POST** @ _http://localhost:3000/login_

Used to authenticate the user using `email` and `password`. Generates a cookie with the user credentials (JSON Web Token), necessary to manage the projects. If there is some wrong information a message is sent back.

![POST_200](assets/post-login-200.png)

![POST_404](assets/post-login-404.png)

<br/>

**GET** @ _http://localhost:3000/user_

Used to retrieve all the _users_ from the database.

![GET_200](assets/get-user-200.png)

<br/>

**GET** @ _http://localhost:3000/project_

Used to retrieve all the _projects_ from the database.

![GET_200](assets/get-project-200.png)

<br/>

**GET** @ _http://localhost:3000/user/id_

Used to retrieve a _user_ by its `id`, or a message if it not exists.

![GET_200](assets/get-user-id-200.png)

<br/>

**GET** @ _http://localhost:3000/project/id_

Used to tetrieve a _project_ by its `id`, or message if it not exists.

![GET_200](assets/get-project-id-200.png)

<br/>

**POST** @ _http://localhost:3000/project/id/add_user_

Used to add a _user_ to a _project_ through the project's `id`.

![POST_200](assets/post-user-to-project-200.png)

<br/>

**POST** @ _http://localhost:3000/user/id/add_project_

Used to add a _project_ to a _user_ through the user's `id`.

![POST_200](assets/post-project-to-user-200.png)

<br/>

Some other routes available are:

- **POST** @ _http://localhost:3000/project/_: Create a new project with `name`, `stack`

- **PUT** @ _http://localhost:3000/project/id_: Update an existing project by `id`

- **PUT** @ _http://localhost:3000/user/id_: Updata an existing user by `id`

- **DELETE** @ _http://localhost:3000/project/id_: Delete a project by `id`

- **DELETE** @ _http://localhost:3000/user/id_: Delete a user by `id`

<br/>

An important aspect of **RESTack** is the user authentication, necessary to perform some actions, such as create a project:

![POST_401](/assets/post-project-401.png)
