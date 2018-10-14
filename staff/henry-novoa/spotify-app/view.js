var view = {
    listArtist(artists) {
        $artists.show()
        const $ul = $artists.find('ul')
        $ul.empty()
        artists.forEach(artist => {
            const $a = $(`<a href="#">${artist.name}</a>`)
            $a.click(() => {
                let id = artist.id
                logic.searchAlbums(id)
                    .then(albums => {

                        view.showAlbums(albums);
                    });
                //showAlbums();
                console.log(artist)

                // TODO search albums by artist id
            })
            const $li = $('<li>')
            $li.append($a)
            $ul.append($li)
        })
    },

    showAlbums(albums) {

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
                        view.showSongs(songs);
                    });

                //showAlbums();
                console.log(album)

                // TODO search albums by artist id
            })

            const $li = $('<li>')

            $li.append($a)
            $ul.append($li)

        })
    },
    showSongs(songs) {

        $albums.hide()
        $songs.show()

        const $ul = $songs.find('ul')
        $ul.empty()

        songs.forEach(song => {
            const $a = $(`<a href= "#">${song.name}</a>`)

            $a.click(() => {
                console.log(song)
                logic.playSong(song.preview_url)
            })

            const $li = $('<li>')

            $li.append($a)
            $ul.append($li)

        })


    }
}
