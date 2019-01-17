export const SongListService = {
    getSongList,
}

function getSongList(){
    return fetch('http://localhost:5000/api/song/getSongList')
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => { throw new Error(err) });
}