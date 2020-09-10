class UI {
  constructor() {
    this.wrapper = document.getElementById('wrapper')
    this.postWrapper = document.getElementById('posts')
    this.postCard = document.getElementById('post-card')
    this.postBody = document.getElementById('posts')
    this.postForm = document.getElementById('post-form')
    this.postTitle = document.getElementById('post-title')
    this.postDesc = document.getElementById('post-desc')
    this.postID = document.getElementById('post-id')
    this.postBtn = document.getElementById('post-submit')
    this.formState = 'add'
  }

  showPosts(posts) {
    let html = ``;
    posts.forEach(post => {
      html += `
      <div class="card shadow-sm mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.description}</p>
          <div class="float-right">
            <a href="" id="post-edit" class="card-link text-info" data-id="${post.id}">
              <i class="fa fa-edit"></i>
            </a>
            <a href="" id="post-remove" class="card-link text-danger" data-id="${post.id}">
              <i class="fa fa-trash"></i>
            </a>
          </div>
        </div>
      </div>
      `;
    })
    this.postBody.innerHTML = html;
  }

  // Fill field to edit
  fillForm(data) {
    this.postID.value = data.id;
    this.postTitle.value = data.title;
    this.postDesc.value = data.description;

    this.changeFormState('edit')
  }

  changeFormState(state) {
    if(state === 'edit') {
      this.postBtn.value = 'Update post!'
      this.postBtn.className = 'btn btn-warning btn-block'

      const newBtn = document.createElement('button')
      newBtn.id = 'cancel-update';
      newBtn.className = 'btn btn-dark btn-block mt-3'
      newBtn.textContent = 'Cancel update'
      this.postForm.insertAdjacentElement('afterend', newBtn)
    } else {
      this.postBtn.value = 'Submit post!'
      this.postBtn.className = 'btn btn-info btn-block'
      
      document.getElementById('cancel-update').remove()

      this.postID.value = '';

      this.clearInputs()
    }
  }

  // Show alert
  showAlert(msg, type, position) {
    this.clearAlert()
    const alerUI = document.createElement('div')
    alerUI.id = 'alert';
    alerUI.className = `alert alert-${type}`
    alerUI.textContent = msg;
    this.wrapper.insertAdjacentElement(position, alerUI)
    setTimeout(() => {
      alerUI.remove()
    }, 3000)
  }

  // Clear alerts if there is already
  clearAlert() {
    const currAlert = document.getElementById('alert')
    if(currAlert) {
      currAlert.remove();
    }
  }

  clearInputs() {
    this.postID.value = ''
    this.postTitle.value = '';
    this.postDesc.value = '';
  }
}

export const ui = new UI();