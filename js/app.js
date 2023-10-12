const url = "https://jsonplaceholder.typicode.com/posts"


const loadingElement = document.querySelector("#loading") 
const postsContainer = document.querySelector("#posts-container")

//post individual
const postPage = document.querySelector("#post");
const postContainer = document.querySelector("#post-container");
const commentsContainer = document.querySelector("#comments-container");

//formulario de comentarios

const commentForm = document.querySelector("#comment-form");
const emailInput = document.querySelector("#email");
const bodyInput = document.querySelector("#body");


//get id from url
//pegar id da url

const urlSerchParams = new URLSearchParams(window.location.search)
const postId = urlSerchParams.get("id")


// Get all posts
// pegar todos os posts

async function getAllPosts() {
    const response = await fetch(url);
    
    console.log(response);
    //pega os dados de response e converte array de objetos
    const data = await response.json();
  
    console.log(data);
  
    loadingElement.classList.add("hide");
  
    data.map((post) => {
      const div = document.createElement("div");
      const title = document.createElement("h2");
      const body = document.createElement("p");
      const link = document.createElement("a");
  
      title.innerText = post.title;
      body.innerText = post.body;
      link.innerText = "Ler";
      link.setAttribute("href", `/post.html?id=${post.id}`);
  
      div.appendChild(title);
      div.appendChild(body);
      div.appendChild(link);
      postsContainer.appendChild(div);
    });
  }

  //Get postes individuais

async function getPosts(id){

    const [responsPost, responseComments] = await Promise.all([

        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`)

    ])

    const dataPost = await responsPost.json()
    const dataComments = await responseComments.json()

    loadingElement.classList.add("hide");
    postPage.classList.remove("hide");


    
    const title = document.createElement("h1");
    const body = document.createElement("p");
   
    title.innerText = dataPost.title
    body.innerText = dataPost.body

    postContainer.appendChild(title)
    postContainer.appendChild(body)

    dataComments.map((comment)=>{
        createComment(comment)
    })

    

}

//cria comentario

function createComment(comment){

    const div = document.createElement("div")
    const email = document.createElement("h3")
    const commentBody = document.createElement("p")   

    email.innerText = comment.email;
    commentBody.innerText = comment.body
       
    div.appendChild(email)
    div.appendChild(commentBody)
    

    commentsContainer.appendChild(div)

   }

//posta o comentario

async function postComment(comment) {
    const response = await fetch(url, {
      method: "POST",
      body: comment,
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    createComment(data);

}


if(!postId){
    getAllPosts();

}else{
    getPosts(postId)

    commentForm.addEventListener("submit", (e)=>{
        e.preventDefault();

        let comment = {
            email: emailInput.value,
            body: bodyInput.value,
        }

        comment = JSON.stringify(comment)
        
        postComment(comment);
    })
    
}

    
