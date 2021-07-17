const url = new URL(window.location.href)
let postID = url.searchParams.get("postID")

if (postID =="" )
{
    postID = "-Mel0_OXeGV5YyZWvXY4"
}

console.log("PostID", postID)

//Creamos una nueva instancia de nuestar db
let database = firebase.database();

//creamos una variable que apunte hacia la colecciónes
let usersRef = database.ref("/users")
let postsRef = database.ref("/posts")
let userID = ""

postsRef.child(postID).once('value',function(datos)
    {
        post=datos.val();

        postContent= post.content;
        postDate= post.date;
        postLikes=post.likes;
        postTags=post.tags;
        postTitle=post.title
        urlImageCover = post.urlCover
        userID =  post.user 

        if (urlImageCover != "")
            $("#main-card-img").attr("src",urlImageCover)
        else 
            $("#main-card-img").remove()
        
        $("#post-title").html(postTitle)
        $("#post-content").html( '<p>' +  postContent + '</p>')
        $("#post-like-counter").html (postLikes)

       
        let año = postDate.substr(6,4)       
        let mes = postDate.substr(3,2)
        let dia = postDate.substr(0,2)        
        let d = new Date(`${año}"/"${mes}"/"${dia}`);        
        
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

        let dateFormatedPost = `${mo} ${da}`
        $("#post-dateformatted").html(dateFormatedPost + " 7 min read")

        usersRef.child(userID).once('value',function(datos)
            {
                    user=datos.val();
                    postUserName= user.userName;
                    postUserPict= user.picture;
            
                    $("#user-profile-pic").attr("src",postUserPict)
                    $("#post-user-name").html(postUserName)                
            }
        )    

    }
)


