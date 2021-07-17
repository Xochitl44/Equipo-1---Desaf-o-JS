let database = firebase.database();
let usersRef = database.ref("/users")
let postsRef = database.ref("/posts");

let searchParams = new URLSearchParams(window.location.search)
//Obtiene el valor pet key de la url.
const searchKeyParam = searchParams.get('search')
console.log("la busqueda de la pagina es: " + searchKeyParam)

$("#inputValue").keyup(function (e) { 
    if(e.which == 13) {
        let searchValue = e.target.value;
        console.log(searchValue);
        filterByTitle(searchValue);
    }   
});

$("#inputValue2").keyup(function (e) { 
    if(e.which == 13) {
        let searchValue = e.target.value;
        console.log(searchValue);
        window.location.reload=`search.html?search=${searchValue}`;
        $("#inputValue2").eq(0).val(searchKeyParam);
        filterByTitle(searchKeyParam)
    }   
});

const filterByTitle = (searchValue) => { 
    
    $("#nav-feed").empty();
    postsRef.on('value', snapshot => {    
    
        let postCollection = snapshot.val();
        let postValues = Object.values(postCollection);
        let postKeys = Object.keys(postCollection);

        let filterResult = postKeys.reduce( ( accum, current ) => {
            let postTitle = postCollection[current].title.toLowerCase();
            return postTitle.includes(searchValue) ? {...accum, [current]:postCollection[current]} : accum;
        }, {} );

        console.log(postCollection); 
        console.log(filterResult);

        for( result in filterResult ){
            let { content , date ,likes , tags , title , urlCover, user  } = filterResult[result];
            
            let expresion = /[ ,]/g
            let tagsPost = tags.split(expresion);
            let tagsLinks=``;
            tagsPost.forEach(element => {
                tagsLinks+=`<a>#${element}</a>`;        
            });

            console.log("");
            $("#nav-feed").append(`
                <div class="card mt-3 br-post post-card">
                    <div class="card-body">
                        <div class="d-flex c-header">
                                <img src="images/pics/alfred.jpg" alt="" class="br-100 pad"> <!-- foto de usuario -->
                            <div class="d-flex c-name">
                                <h6 class="nickname mb-0">Alfred Pizana</h6> <!-- nombre de usuario -->
                                <p>June 10</p>
                            </div>
                        </div>
                        <div class="card-content pl-5 pt-2">
                            <a href="index2.html?postID=${result}" class="post-list">
                                <h4 class="card-title">${title}</h4>
                            </a>
                            <div class="d-flex h-order">
                                <nav class="card-post-tags">${tagsLinks}</nav>
                            </div>
                            <div class=" d-flex read">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" role="img"
                                        aria-labelledby="ah0ho4vrguhqcalal3r0v1fzvlxju7zc"
                                        class="crayons-icon mb-1">
                                        <title id="ah0ho4vrguhqcalal3r0v1fzvlxju7zc">
                                            Reactions</title>
                                        <path
                                            d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z">
                                        </path>
                                    </svg>
                                    <span class="not-b">8 reactions</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" role="img"
                                        aria-labelledby="aavwx5vmqdgx8wvzfg593jo469ge3dnz"
                                        class="crayons-icon mb-1">
                                        <title id="aavwx5vmqdgx8wvzfg593jo469ge3dnz">
                                            Comments</title>
                                        <path
                                            d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z">
                                        </path>
                                    </svg>
                                    <button class="comment">Add comment</button>
                                </div>
                                <div class="d-flex">
                                    <p class="card-text mb-0"><small class="text-muted">9
                                            min read</small></p>
                                    <button class="save">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            ) 
        }
    })
}

const getuser = (user) => { usersRef.child(user).once('value',function(datos){
    user=datos.val();
    postUserName= user.userName;
    postUserPict= user.picture;

    console.log("userName:" ,postUserName)
    console.log("userPic:" ,postUserPict)
    
    /*$("#user-profile-pic").attr("src",postUserPict)
    $("#post-user-name").html(postUserName)*/                
    }
)}


