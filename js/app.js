import { http } from './easyHTTP';
import { ui } from './ui';

// Get posts event
document.addEventListener('DOMContentLoaded', getPosts);

// Submit post event
ui.postBtn.addEventListener('click', submitPost)

// Remove post event
ui.postWrapper.addEventListener('click', removePost)

// Update post event
ui.postWrapper.addEventListener('click', enableEditState)

// Cancel update post event
ui.wrapper.addEventListener('click', cancelUpdate)

// Show post method:
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(posts => ui.showPosts(posts))
    .catch(err => console.log(err))
}

// Submit post method:
function submitPost(e) {
  const data = {
    title: ui.postTitle.value,
    description: ui.postDesc.value
  }

  const id = ui.postID.value;

  if(data.title !== '' && data.description !== '') {
    if(id === '') {
      // Add new post
      http.post('http://localhost:3000/posts', data)
      .then(data => getPosts())
      .catch(err => console.log(err))

      // Show alert
      ui.showAlert('Post added!', 'success', 'afterend')
    } else {
      // Update post
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(() => {
          ui.showAlert('Post has been updated!', 'success', 'afterend')
          ui.changeFormState('')
          getPosts()
        })
    }

    // Clear fields
    ui.clearInputs()
  } else {
    // Show alert
    ui.showAlert('Please fill in all fields', 'danger', 'beforebegin')
  }

  // Stop reload on submit post
  e.preventDefault()
}

// Remove post
function removePost(e) {
  let targetID = e.target.parentElement.parentElement.id;
  if(targetID === 'post-remove') {
    const id = e.target.parentElement.parentElement.dataset.id;
    if(confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(() => {
        getPosts()
        ui.showAlert('Post has been removed!', 'success', 'afterend')
      })
    }
  }

  e.preventDefault()
}

// Enable edit state
function enableEditState(e) {
  const targetID = e.target.parentElement.parentElement.id;
  if(targetID === 'post-edit') {
    const id = e.target.parentElement.parentElement.dataset.id;
    const currPostTitle = e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent;
    const currPostDesc = e.target.parentElement.parentElement.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title: currPostTitle,
      description: currPostDesc
    }

    ui.fillForm(data)

  }


  e.preventDefault()
}

// Cancel update
function cancelUpdate(e) {
  if(e.target.id === 'cancel-update') {
    ui.changeFormState('')
  }
}

// Update post
// function updatePost(e) {
//   let targetID = e.target.parentElement.parentElement.id;

//   const data = {
//     title: ui.postTitle.value,
//     description: ui.postDesc.value
//   }

//   if(targetID === 'post-edit') {
//     const id = e.target.parentElement.parentElement.dataset.id;
//     if(confirm('Are you sure?')) {
//       http.put(`http://localhost:3000/posts/${id}`, data)
//       .then(() => {
//         getPosts()
//         ui.showAlert('Post has been updated!', 'success', 'afterend')
//       })
//     }
//   }

//   e.preventDefault()
// }