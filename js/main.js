//Creamos una nueva instancia de nuestar db
let database = firebase.database();

//creamos una variable que apunte hacia la colecciónes
let usersRef = database.ref("/users")
let postsRef = database.ref("/posts")