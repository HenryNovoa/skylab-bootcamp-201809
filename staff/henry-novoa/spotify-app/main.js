const $artists = $('.artists')
const $albums = $('.albums')
const $songs = $('.songs')
const $player = $('.player')
const $form = $('form')

$artists.hide()
$albums.hide()
$songs.hide()
$('.albums').hide()

$form.submit(event => {
    event.preventDefault()
    const $input = $form.find('input')
    const query = $input.val()
    logic.searchArtists(query)
        .then(artists => {
            view.listArtist(artists)
        })
        .catch(console.error)
})

