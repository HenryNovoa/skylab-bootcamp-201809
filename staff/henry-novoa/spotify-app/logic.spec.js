describe('logic', () => {
    describe('search artists', () => {
        beforeEach(() => {
            var query;

        })


        true && it('should succeed on matching query', () => {
            var query = 'jackson'

            return logic.searchArtists(query)
                .then(artists => {
                    expect(artists).toBeDefined()

                    expect(artists.length).toBeGreaterThan(0)
                })
        })

        !true && it('should fail on non-matching query', () => {
            var query = 'sdfsdfsdfsdfds'


            return logic.searchArtists(query)
                .then(artists => {
                    expect(artists).toBeDefined()
                }
                );


        })


        it('should throw error un undefined query', () => {

            expect(() => {
                logic.searchArtists(undefined)
            }).toThrowError(TypeError, 'undefined is not a string')
        })

        it('should throw error on empty query', () => {

            expect(() => {
                logic.searchArtists('')
            }).toThrowError(Error, 'query is empty or blank')
        })

        it('should throw error on blank query', () => {
            expect(() =>
                logic.searchArtists('   \t\n')).toThrowError(Error, 'query is empty or blank')
        })
        it('should throw error on non-string query (object)', () => {
            expect(() => {
                logic.searchArtists({})
            }).toThrowError(TypeError, '[object Object] is not a string')
        })
        it('should throw error on non-string query (number)', () => {
            expect(() => {
                logic.searchArtists(123)
            }).toThrowError(TypeError, '123 is not a string')
        })
        it('should throw error on non-string query(boolean)', () => {
            expect(() => {
                logic.searchArtists(true)
            }).toThrowError('true is not a string')
        })
        it('should throw error on non-string query(array)', () => {
            expect(() => {
                logic.searchArtists([])
            }).toThrowError(TypeError, ' is not a string')
        })

    })



    describe('show albums', () => {
        it('should succeed on matching query', () => {
            var id = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

            return logic.searchAlbums(id)
                .then(albums => {
                    expect(albums).toBeDefined()

                    expect(albums.length).toBeGreaterThan(0)
                })
        })
        it('should throw error on undefined id', () => {
            expect(function () {
                logic.searchAlbums(undefined);
            }).toThrowError(TypeError, 'undefined is not a string');
        })

        it('should throw error on empty id', () => {
            expect(function () {
                logic.searchAlbums('');
            }).toThrowError(Error, 'id is empty or blank');
        })

        it('should throw error on blank id', () => {
            expect(function () {
                logic.searchAlbums('  ');
            }).toThrowError(Error, 'id is empty or blank');
        })
        it('should fail on non-string id(array)', () => {
            expect(function () {
                logic.searchAlbums([]);
            }).toThrowError(TypeError, ' is not a string');
        })

        it('should fail on non-string id(boolean)', () => {
            expect(function () {
                logic.searchAlbums(true);
            }).toThrowError(TypeError, 'true is not a string');
        })

        it('should fail on non-string id(object)', () => {
            expect(function () {
                logic.searchAlbums({});
            }).toThrowError(TypeError, '[object Object] is not a string');
        })



    })




    //Songs
    describe('search tracks', () => {
        it('should succeed on valid id', () => {
            var id = '2ANVost0y2y52ema1E9xAZ' // jackson album
            return logic.searchSongs(id)
                .then(songs => {
                    expect(songs).toBeDefined()

                    expect(songs.length).toBeGreaterThan(0)
                })
        })

        it('should throw error on undefined id', () => {
            expect(function () {
                logic.searchSongs(undefined);
            }).toThrowError(TypeError, 'undefined is not a string');
        })

        it('should throw error on empty id', () => {
            expect(function () {
                logic.searchSongs('');
            }).toThrowError(Error, 'id is empty or blank');
         })

        it('should throw error on blank id', () => {
            expect(function () {
                logic.searchSongs('  ');
            }).toThrowError(Error, 'id is empty or blank');
        })
        it('should fail on non-string id(array)', () => {
            expect(function () {
                logic.searchSongs([]);
            }).toThrowError(TypeError, ' is not a string');
        })

        it('should fail on non-string id(boolean)', () => {
            expect(function () {
                logic.searchSongs(true);
            }).toThrowError(TypeError, 'true is not a string');
        })

        it('should fail on non-string id(object)', () => {
            expect(function () {
                logic.searchSongs({});
            }).toThrowError(TypeError, '[object Object] is not a string');
        })

    })
    //Play song

    //describe()


})
