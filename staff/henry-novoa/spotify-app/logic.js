const logic = {
    searchArtists(query) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest()

            xhr.addEventListener('load', function () {
                var res = JSON.parse(xhr.responseText)
                debugger;
                resolve(res.artists.items)
            })

            xhr.addEventListener('error', function () {
                reject() // TODO
            })

            xhr.open('get', 'https://api.spotify.com/v1/search?type=artist&query=' + query)

            var token = 'BQC82s5sAVZKTv0svehRvZO8qSAEk7LVW1hJhjaCVPun4yTdknfxIn9UX-WOfC_PYT8xIqo7cqKwraZTCa0Ff-YdycIz-x_jZ_anptmY7SR1ccObKhTN4Tp0rpfqCwM5J9PSnavQs0N9'

            xhr.setRequestHeader('authorization', 'Bearer ' + token)

            xhr.send()
        })
    },

    searchAlbums(id) {
        // TODO

        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest()

            xhr.addEventListener('load', function () {
                var res = JSON.parse(xhr.responseText)
            
                resolve(res.items)
                console.log(res.items)
            })

            xhr.addEventListener('error', function () {
                reject() // TODO
            })

            xhr.open('get', 'https://api.spotify.com/v1/artists/'+id+'/albums');

            var token = 'BQC82s5sAVZKTv0svehRvZO8qSAEk7LVW1hJhjaCVPun4yTdknfxIn9UX-WOfC_PYT8xIqo7cqKwraZTCa0Ff-YdycIz-x_jZ_anptmY7SR1ccObKhTN4Tp0rpfqCwM5J9PSnavQs0N9'

            xhr.setRequestHeader('authorization', 'Bearer ' + token)

            xhr.send()
        })
    },
    searchSongs(id) {
        // TODO

        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest()

            xhr.addEventListener('load', function () {
                var res = JSON.parse(xhr.responseText)
            
                resolve(res.items)
                console.log(res.items)
            })

            xhr.addEventListener('error', function () {
                reject() // TODO
            })

            xhr.open('get', `https://api.spotify.com/v1/albums/${id}/tracks`);

            var token = 'BQC82s5sAVZKTv0svehRvZO8qSAEk7LVW1hJhjaCVPun4yTdknfxIn9UX-WOfC_PYT8xIqo7cqKwraZTCa0Ff-YdycIz-x_jZ_anptmY7SR1ccObKhTN4Tp0rpfqCwM5J9PSnavQs0N9'

            xhr.setRequestHeader('authorization', 'Bearer ' + token)

            xhr.send()
        })

    },

    playSong(url){
        


    }

}