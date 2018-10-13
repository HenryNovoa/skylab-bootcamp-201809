const $artists = $('.artists')

const $albums = $('.albums')

const $songs = $('.songs')

const $player = $('.player')

$artists.hide()
$albums.hide()
$songs.hide()
$('.albums').hide()

const $form = $('form')

$form.submit(event => {
    event.preventDefault()

    const $input = $form.find('input')

    const query = $input.val()

    logic.searchArtists(query)
        .then(artists => {
            listArtist(artists)
        })
        .catch(console.error)
})

function listArtist(artists) {
    $artists.show()

    const $ul = $artists.find('ul')

    $ul.empty()

    artists.forEach(artist => {
        const $a = $(`<a href="#">${artist.name}</a>`)

        $a.click(() => {

            let id = artist.id
            logic.searchAlbums(id)
                .then(albums => {
                    
                    showAlbums(albums);
                });

            //showAlbums();
            console.log(artist)

            // TODO search albums by artist id
        })


        const $li = $('<li>')

        $li.append($a)

        $ul.append($li)
    })
}

function showAlbums(albums) {

    $albums.show()
    $artists.hide()

    const $ul = $albums.find('ul');
    $ul.empty()

    albums.forEach(album => {
        const $a = $(`<a href= "#">${album.name}</a>`)

        $a.click(() => {

            let id = album.id
            logic.searchSongs(id)
                .then(songs => {
                    showSongs(songs);
                });

            //showAlbums();
            console.log(album)

            // TODO search albums by artist id
        })

        const $li = $('<li>')

        $li.append($a)
        $ul.append($li)

    })
}

function showSongs(songs){

    $albums.hide()
    $songs.show()

    const $ul = $songs.find('ul')
    $ul.empty()

    songs.forEach(song => {
        const $a = $(`<a href= "#">${song.name}</a>`)

        $a.click(() => {
            
            console.log(song)

         
            logic.playSong(song.preview_url)

            $player.attr('src', '' + song.preview_url + '')

            

            // let id = album.id
            // logic.searchSongs(id)
            //     .then(songs => {
            //         showSongs(songs);
            //     });

            // //showSongs();
            // console.log(song)

            // TODO search albums by artist id
        })

        const $li = $('<li>')

        $li.append($a)
        $ul.append($li)

    })


    

}