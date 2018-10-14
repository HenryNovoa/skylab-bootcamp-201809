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

            var token = 'BQCRC3nA3YEnVHO8K5xBSqYuvqiTspg6C9ashy6FaZksxvaiKw0hUbhiiakka4w45Y_SkXoFC0ILtWzVny8WTzA8FAFKoeNxaPgdeYj4JX8ZI028Umm-e02yeLCtwzQ-kF1S1-mfTo4o'

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

            var token = 'BQCRC3nA3YEnVHO8K5xBSqYuvqiTspg6C9ashy6FaZksxvaiKw0hUbhiiakka4w45Y_SkXoFC0ILtWzVny8WTzA8FAFKoeNxaPgdeYj4JX8ZI028Umm-e02yeLCtwzQ-kF1S1-mfTo4o'

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

            var token = 'BQCRC3nA3YEnVHO8K5xBSqYuvqiTspg6C9ashy6FaZksxvaiKw0hUbhiiakka4w45Y_SkXoFC0ILtWzVny8WTzA8FAFKoeNxaPgdeYj4JX8ZI028Umm-e02yeLCtwzQ-kF1S1-mfTo4o'

            xhr.setRequestHeader('authorization', 'Bearer ' + token)

            xhr.send()
        })

    },

    playSong(url){



    }

}