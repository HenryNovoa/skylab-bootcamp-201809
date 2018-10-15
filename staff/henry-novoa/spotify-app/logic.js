const logic = {

    call(path) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest()
            xhr.addEventListener('load', function () {
                var res = JSON.parse(xhr.responseText)
                if (!(res.artists)) {
                    resolve(res.items)
                }
                else {
                    if (!(res.artists.items.length)) throw Error('could not find any matches')
                    resolve(res.artists.items)
                }
            })
            xhr.addEventListener('error', function () {
                reject() // TODO
            })
            xhr.open('get', 'https://api.spotify.com/v1/' + path)
            var token = 'BQAbI4rCpnL8V3AE8bBHrMGV8G8M5aXZulKJIIorVX9TTbfn80Hh1fyCwUPNrVxh-dt2TG-SzUfBWbgCCQHLzZghWwo6HHpft7wLqRDdq4xee3Hv9XKe_WTb9LQVJba33_9S_W7rvirJ'
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

        return this.call('artists/' + id + '/albums')

    },
    searchSongs(id) {


        if (typeof id !== 'string') throw TypeError(id + ' is not a string');

        if (!id.trim().length) throw Error('id is empty or blank');

        return this.call(`albums/${id}/tracks`)


    },

    playSong(url) {

        $player.attr('src', '' + url + '')

    }

}