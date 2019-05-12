require('dotenv/config');
const axios = require('axios');
const watson = require('ibm-watson');

gettingSongData();

function gettingSongData(){
	//those should be dynamic
	let artist = "Queen";
	let song = "Radio Ga Ga";
	axios.get(
        `${process.env.MUSIXMATCH_API_URL}track.search?page=1&page_size=10&f_has_lyrics=true&q_artist=${artist}&q_track=${song}&s_artist_rating=desc&s_track_rating=desc&apikey=${process.env.MUSIXMATCH_API_KEY}`
    ).then(res => {    	
    	let songId = res.data.message.body.track_list[0].track.track_id;    	
      	getSongLyric(songId);
    }).catch(err => console.log(err, 'Somenthing went wrong'));  	
}

function getSongLyric(songId){
	axios.get(
	`${process.env.MUSIXMATCH_API_URL}track.lyrics.get?track_id=${songId}&apikey=${process.env.MUSIXMATCH_API_KEY}`
	).then(res =>{
		let songLyric = res.data.message.body.lyrics.lyrics_body, songId;
		watsonToneAlanyzer(songLyric);
	}).catch(err => console.log(err, 'Somenthing went wrong'));
}

