const post_container = document.getElementById('post-container')
const loading = document.querySelector(".loader")
const filter = document.getElementById('filter')

let page = 1;
let limit = 5;

//fetching the data from api
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/?_limit=${limit}&_page=${page}`)
    //fetch returns a promise. 

    const data = await res.json(); //res.json returns a promise with data 

    return data;
}

async function show_posts() {
    const posts = await getPosts();

    posts.forEach(post => {

        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = ` <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2 >
            <p class="post-body"> ${post.body}</p>
        </div >
            <div>`
        post_container.appendChild(postEl)


    });
}

show_posts();

function showLoading() {
    loading.classList.add('show');
    setTimeout(() => {
        loading.classList.remove('show');
        setTimeout(() => {
            page++;
            show_posts();
        })
    }, 1000)
}

//Getting few values about the heights to scroll properly
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
        showLoading();
    }

})


function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}

filter.addEventListener('input', filterPosts);