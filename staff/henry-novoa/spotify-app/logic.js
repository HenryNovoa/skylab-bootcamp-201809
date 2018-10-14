const logic = {

    call(path){
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest()
            xhr.addEventListener('load', function () {
                var res = JSON.parse(xhr.responseText)
                if(!(res.artists)){
                resolve(res.items)
                }
                else{resolve(res.artists.items)}
            })
            xhr.addEventListener('error', function () {
                reject() // TODO
            })
            xhr.open('get', 'https://api.spotify.com/v1/'+path)
            var token = 'BQCRC3nA3YEnVHO8K5xBSqYuvqiTspg6C9ashy6FaZksxvaiKw0hUbhiiakka4w45Y_SkXoFC0ILtWzVny8WTzA8FAFKoeNxaPgdeYj4JX8ZI028Umm-e02yeLCtwzQ-kF1S1-mfTo4o'
            xhr.setRequestHeader('authorization', 'Bearer ' + token)
            xhr.send()
        })
    },
    
    searchArtists(query) {
        if (typeof query !== 'string') throw TypeError(query + ' is not a string');
        if (!query.trim().length) throw Error('query is empty or blank');
        return this.call('search?type=artist&query=' + query);
    },



    searchAlbums(id) {
        
        if (typeof id !== 'string') throw TypeError(id + ' is not a string');

        if (!id.trim().length) throw Error('id is empty or blank');

        return this.call('artists/'+id+'/albums')
       
    },
    searchSongs(id) {
        

        if (typeof id !== 'string') throw TypeError(id + ' is not a string');

        if (!id.trim().length) throw Error('id is empty or blank');

        return this.call(`albums/${id}/tracks`)
       

    },

    playSong(url){

        $player.attr('src', '' + url + '')

    }

}