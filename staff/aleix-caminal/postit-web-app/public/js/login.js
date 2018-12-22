const loginForm = document.getElementById('login_form')

loginForm.addEventListener('submit', function(event) {
    if (!validate(event.target, ['username', 'password'])) event.preventDefault()
})
