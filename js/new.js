//Creamos una nueva instancia de nuestar db
let database = firebase.database();

//creamos una variable que apunte hacia la colecciónes
let usersRef = database.ref("/users")
let postsRef = database.ref("/posts")

//apuntamos hacia la raíz del storage
var storageRef = firebase.storage().ref();

var urlImageCover = ""
var urlExtraImage = ""

/*   ORH: TEMPORAL PARA CREAR USUARIOS
let userObject = {
    userName: "Xochitl",    
    picture: "https://avatars.githubusercontent.com/u/84822138?v=4"
}
const saveUser = () => {
    usersRef.push(userObject)
}
    <option value="-MejJl7qB95TMv3oQWwY">Alex</option>
    <option value="-MejKUt5xyvnoiRGyTXd">Oscar</option>
    <option value="-MejKvOK1E-5hGfJ6rIF">Jesus</option>
    <option value="-MejLARNwMGk-GFtXmt5">Carlos</option>
    <option value="-MejLObt9Q0Tl6_b2c7-">Ubaldo</option>
    <option value="-MejMSqgvlkYFWIMHiSV">Xochitl</option>
    <option value="user1">Xoch</option>
*/

//Creamos un listener que este al pendiente de cualquier cambio en los usuarios
usersRef.on('value', snapshot => {
    let usersCollection = snapshot.val()
    for (user in usersCollection) {
        let { userName } = usersCollection[user]
        $("#post-User").append(`
             <option value="${user}">${userName}</option>
        `)        
    }
})


postsRef.on('value', snapshot => {    
    // console.log(snapshot.val())    
    /*
    let postCollection = snapshot.val()
    for (post in postCollection) {
        let { content , date ,likes , tags , title , urlCover, user  } = postCollection[post]
        console.log( title , user , content )
        $("#post-User").append(`
             <h3>${userName}/${user}/${content} </h3>
        `)
    }
    */
})

//Creamos la variable que guardará el archivo que voy a subir
var fileCover
$("#post-cover-image").change(event => {
    console.log(event.target.files[0])
    fileCover = event.target.files[0]
})

var fileExtra
$("#post-imageExtra").change(event => {
    console.log(event.target.files[0])
    fileExtra = event.target.files[0]
})


const savePost = () => {
   
    let date = new Date()
    let dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    let mm = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let yyyy = date.getFullYear()
    let postDate = `${dd}/${mm}/${yyyy}`    

    let postCoverImage =  $("#post-cover-image").val()
    let postTitle =  $("#post-title").val()
    let postTags =  $("#post-tags").val()
    let postContent =  $("#post-content").val()
    let postLikes =  0
    let postImageExtra = $("#post-imageExtra").val()
    let postUser =  $("#post-User").val()
    postUser = "-MejMSqgvlkYFWIMHiSV"  // Xochitl

    /*    
    let urlImageCover = uploadFile(fileCover)
    let urlExtraImage = uploadFile(fileExtra)    
    */

    let postObject = 
    {
       content : postContent,
       date : postDate,
       likes : postLikes,
       tags : postTags,
       title : postTitle,
       urlCover : urlImageCover, //postCoverImage,
       user : postUser,
       extraImage : urlExtraImage //postImageExtra
    }

    postsRef.push(postObject)
    console.log ("postObject: " , postObject)

}

const uploadFile = (file) => {
    
    var uploadTask = storageRef.child('postimages/' + file.name).put(file);    
    let urlResult = ""
    
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function (snapshot) {                    
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                            switch (snapshot.state) {
                                case firebase.storage.TaskState.PAUSED: // or 'paused'
                                    console.log('Upload is paused');
                                    break;
                                case firebase.storage.TaskState.RUNNING: // or 'running'
                                    console.log('Upload is running');
                                    break;
                            }
                }, 
                function (error) {
                            // A full list of error codes is available at
                            // https://firebase.google.com/docs/storage/web/handle-errors
                            switch (error.code) {
                                case 'storage/unauthorized':
                                    // User doesn't have permission to access the object
                                    break;
                                case 'storage/canceled':
                                    // User canceled the upload
                                    break;
                                case 'storage/unknown':
                                    // Unknown error occurred, inspect error.serverResponse
                                    break;
                            }
                }, 
                function () {
                              // Upload completed successfully, now we can get the download URL
                        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                            // console.log('File available at', downloadURL);
                            // urlResult = downloadURL
                            // GUARDO EN LA VARIABLE GLOBAL EL URL DEL POST  Y MANDO A LLAMAR EL GUARDADO DEL POST  
                            urlImageCover = downloadURL                            
                            savePost()                        
                        }

                );
                }
                
            )
            /*
            console.log("antes de regresar",  urlResult)
            return urlResult
            */
}



$("#btn-publish").click(function (e) { 
    e.preventDefault();  
    //savePost()
    uploadFile(fileCover)
})

$("#btn-upload").click(function (e) {     
    e.preventDefault();            
    //console.log(fileCover)
    // let urlimage = uploadFile(fileCover)
    //console.log(urlimage)
})



