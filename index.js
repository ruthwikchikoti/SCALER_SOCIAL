document.addEventListener('DOMContentLoaded', function () {
  let post_btn = document.querySelector("#post-button");
  let post_con = document.querySelector(".posts");

  loadPostsFromLocalStorage();
  loadLikedPostsFromLocalStorage();

  post_con.addEventListener('click', function (e) {
    if (e.target.alt === 'delete') {
      e.target.src = "assets/redd.png";

      if (confirm("Are you sure you want to delete this post?")) {
        let postElement = e.target.closest('.main-post');
        postElement.remove();

        removePostFromLocalStorage(postElement.dataset.postId);
      }
    } else if (e.target.alt === 'comment') {
      let commentBox = e.target.parentElement.querySelector('.comment-box');
      if (commentBox) {
        commentBox.remove();
      } else {
        commentBox = document.createElement('textarea');
        commentBox.classList.add('comment-box');
        e.target.parentElement.appendChild(commentBox);
      }
    } else if (e.target.alt === 'heart') {
      toggleLike(e.target.closest('.main-post').dataset.postId, e.target);
    } else if (e.target.alt === 'edit') {
      let postTextElement = e.target.closest('.main-post').querySelector('.post-con-area p');
      let newText = prompt("Edit your post:", postTextElement.textContent);
      if (newText !== null) {
        postTextElement.textContent = newText;
        let postId = e.target.closest('.main-post').dataset.postId;
        updatePostTextInLocalStorage(postId, newText);
      }
    }
  });

  post_btn.addEventListener('click', (e) => {
    let postText = document.querySelector("#post-area").value;

    let postId = Date.now().toString(); 
    createPostElement(postText, postId);

    document.querySelector("#post-area").value = "";
    savePostToLocalStorage(postText, postId);
  });

  function createPostElement(postText, postId) {
    let main_post = document.createElement('div');
    main_post.classList.add('main-post');
    main_post.dataset.postId = postId;
    main_post.innerHTML = `
        <div class="post-main">
          <div class="profile-img">
            <img src="assets/profile_image.png" alt="profile">
          </div>
          <div class="feed-con-right">    
            <div class="post-det">
              <h4>Name</h4>
              <h5>@user</h5>
              <div class="feed-con-right-btns">
                <img src="assets/edit.png" alt="edit">
                <img src="assets/delete.png" alt="delete">
              </div>
            </div>
            <div class="post-con-area">
              <p>${postText}</p>
            </div>
            <div class="buttons">
              <img src="assets/comment.png" alt="comment">
              <img src="assets/heart.png" alt="heart">
            </div>
          </div>
        </div>
      `;

    post_con.appendChild(main_post);
  }

  function savePostToLocalStorage(postText, postId) {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
      postId: postId,
      text: postText,
      liked: false
    };
    storedPosts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(storedPosts));
  }

  function loadPostsFromLocalStorage() {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    storedPosts.forEach(post => {
      if (post.text && post.postId) { 
        createPostElement(post.text, post.postId);
        if (post.liked) {
          toggleLike(post.postId, document.querySelector(`.main-post[data-post-id="${post.postId}"] .buttons img[alt="heart"]`));
        }
      }
    });
  }

  function removePostFromLocalStorage(postId) {
    let storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    storedPosts = storedPosts.filter(post => post.postId !== postId);
    localStorage.setItem('posts', JSON.stringify(storedPosts));
  }

  function updatePostTextInLocalStorage(postId, newText) {
    let storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    let post = storedPosts.find(post => post.postId === postId);
    if (post) {
      post.text = newText;
      localStorage.setItem('posts', JSON.stringify(storedPosts));
    }
  }
  function toggleLike(postId, likeIcon) {
    let storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    let postIndex = storedPosts.findIndex(post => post.postId === postId);
    if (postIndex !== -1) {
      storedPosts[postIndex].liked = !storedPosts[postIndex].liked;
      localStorage.setItem('posts', JSON.stringify(storedPosts));
      likeIcon.src = storedPosts[postIndex].liked ? "assets/redheart.png" : "assets/heart.png";
    }
  }
  
  function loadLikedPostsFromLocalStorage() {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    storedPosts.forEach(post => {
        if (post.liked) {
            markPostAsLiked(post.postId);
        }
    });
  }

  function markPostAsLiked(postId) {
    const postElement = document.querySelector(`.main-post[data-post-id="${postId}"]`);
    if (postElement) {
        const likeIcon = postElement.querySelector('.buttons img[alt="heart"]');
        if (likeIcon) {
            likeIcon.src = "assets/redheart.png";
        }
    }
  }
});
