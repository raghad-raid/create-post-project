const postButton = document.getElementById('post');
const postContent = document.getElementById('postContent');
const postArea = document.getElementById('postArea');

window.addEventListener('DOMContentLoaded', loadPosts);

postButton.addEventListener('click', () => {
  const text = postContent.value.trim();
  if (!text) return;

  const posts = getSavedPosts();
  posts.push(text); 
  savePosts(posts);
  renderPost(text, posts.length - 1); 
  postContent.value = '';
});

function renderPost(text, index) {
  const post = document.createElement('div');
  post.className = 'post-item';

  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  post.appendChild(paragraph);

  const actions = document.createElement('div');
  actions.style.marginTop = '8px';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.style.marginRight = '10px';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';

  deleteBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete this post?')) {
      const posts = getSavedPosts();
      posts.splice(index, 1);
      savePosts(posts);
      reloadPosts();
    }
  });
  editBtn.addEventListener('click', () => {
    const newText = prompt('Edit your post:', text);
    if (newText !== null) {
      const posts = getSavedPosts();
      posts[index] = newText.trim();
      savePosts(posts);
      reloadPosts();
    }
  });

  actions.appendChild(deleteBtn);
  actions.appendChild(editBtn);
  post.appendChild(actions);
  postArea.appendChild(post);
}

function getSavedPosts() {
  return JSON.parse(localStorage.getItem('posts') || '[]');
}

function savePosts(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
}
function loadPosts() {
  const posts = getSavedPosts();
  posts.forEach((text, index) => renderPost(text, index));
}
function reloadPosts() {
  postArea.innerHTML = '';
  loadPosts();
}
