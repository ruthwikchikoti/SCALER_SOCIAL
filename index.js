document.addEventListener('DOMContentLoaded', function() {
    let post_btn = document.querySelector("#post-button");
    let post_con = document.querySelector(".posts");
  
    post_con.addEventListener('click', function(e) {
        if (e.target.alt === 'delete') {
            e.target.src = "assets/redimage.png";
            if (confirm("Are you sure you want to delete this post?")) {
                
              e.target.closest('.main-post').remove();
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
        if (e.target.src.includes("redheart.png")) {
          e.target.src = "assets/heart.png";
        } else {
          e.target.src = "assets/redheart.png";
        }
      } else if (e.target.alt === 'edit') {
        let postText = e.target.closest('.main-post').querySelector('.post-con-area p');
        let newText = prompt("Edit your post:", postText.textContent);
        if (newText !== null) {
          postText.textContent = newText;
        }
      }
    });
  
    post_btn.addEventListener('click', (e) => {
      let postText = document.querySelector("#post-area").value;
  
      let main_post = document.createElement('div');
      main_post.innerHTML = `
        <div class="main-post">
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
        </div>
      `;
  
      post_con.appendChild(main_post);
      document.querySelector("#post-area").value = ""; 

    });
  });
  

