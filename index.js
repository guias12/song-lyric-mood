require('dotenv/config');
const axios = require('axios');

gettingSongData();

function gettingSongData(){
	//those should be dynamic
	let artist = "Queen";
	let song = "Bohemian Rhapsody";
	axios.get(
        `${process.env.MUSIXMATCH_API_URL}track.search?page=1&page_size=10&q_artist=${artist}&q_track=${song}&apikey=${process.env.MUSIXMATCH_API_KEY}`
    ).then(res => {    	
    	let songId = res.data.message.body.track_list[0].track.track_id;
      	getSongLyric(songId);
    }).catch(err => console.log(err, 'Somenthing went wrong'));  	
}

function getSongLyric(songId){
	axios.get(
	`${process.env.MUSIXMATCH_API_URL}track.lyrics.get?track_id=${songId}&apikey=${process.env.MUSIXMATCH_API_KEY}`
	).then(res =>{
		console.log(res.data, songId);
	}).catch(err => console.log(err, 'Somenthing went wrong'));
}