const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filer = document.getElementById("filer");

let limit = 5;
let page = 1;

const url = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`;

function getPosts() {
  fetch(url)
    .then((response) => response.json())
    .then(function (data) {
      data.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
        <div class ="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>  
      `;
        postsContainer.appendChild(postElement);
      });
    });
}

getPosts();

function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      getPosts();
    }, 300);
  }, 1000);
}

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 20) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);
