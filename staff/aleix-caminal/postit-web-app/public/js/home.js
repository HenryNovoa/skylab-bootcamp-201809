const addBoardForm = document.getElementById('add_board_form')

addBoardForm.addEventListener('submit', function(event) {
    if (!validate(event.target, ['title'])) {
        event.preventDefault()
        setTimeout(function() {
            event.target.querySelector('input[name="title"]').classList.remove('is-invalid')
        }, 3000)
    }
})

function prepareToDrop(event) {
    event.preventDefault()
}

function drag(postId, event) {
    event.dataTransfer.setData('postId', postId)
}

function drop(boardId, event) {
    event.preventDefault()
    fetch('/post', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            action: 'update',
            id: event.dataTransfer.getData('postId'),
            board_id: boardId
        })
    }).then(result => {
        return result.json()
    }).then(json => {
        const board = event.target.closest('#board' + json.post.boardId)
        const post = document.querySelector('#post' + json.post.id)
        board.insertBefore(post, board.lastChild)
    })
}
