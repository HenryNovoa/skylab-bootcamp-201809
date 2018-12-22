const registerForm = document.getElementById('register_form')

registerForm.addEventListener('submit', function(event) {
    if (!validate(event.target, ['name', 'username', 'password', 'confirm_password'])) {
        event.preventDefault()
    } else {
        if (event.target.querySelector('input[name="password"]').value !== event.target.querySelector('input[name="confirm_password"]').value) {
             event.preventDefault()
             event.target.querySelector('input[name="password"]').classList.add('is-invalid')
             event.target.querySelector('input[name="confirm_password"]').classList.add('is-invalid')
        } else {
            event.target.querySelector('input[name="password"]').classList.remove('is-invalid')
            event.target.querySelector('input[name="confirm_password"]').classList.remove('is-invalid')
        }
    }
})
