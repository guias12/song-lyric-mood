require('dotenv/config');
const axios = require('axios');
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');


const toneAnalyzer = new ToneAnalyzerV3({
	version: '2017-09-21'
});


gettingSongData();

function gettingSongData() {
	//those should be dynamic
	let artist = "Bruno Mars";
	let song = "Grenade";
	axios.get(
		`${process.env.MUSIXMATCH_API_URL}track.search?page=1&page_size=10&f_has_lyrics=true&q_artist=${artist}&q_track=${song}&s_artist_rating=desc&s_track_rating=desc&apikey=${process.env.MUSIXMATCH_API_KEY}`
	).then(res => {
		let songId = res.data.message.body.track_list[0].track.track_id;
		getSongLyric(songId);
	}).catch(err => console.log(err, 'Somenthing went wrong'));
}

function getSongLyric(songId) {
	axios.get(
		`${process.env.MUSIXMATCH_API_URL}track.lyrics.get?track_id=${songId}&apikey=${process.env.MUSIXMATCH_API_KEY}`
	).then(res => {
		let songLyric = res.data.message.body.lyrics.lyrics_body;
		lyricAnalyzer(songLyric);
	}).catch(err => console.log(err, 'Somenthing went wrong'));
}

//Using IBM Watsons Tone-Analyzer to identify the feelings of the song lyric
function lyricAnalyzer(songLyric) {
	let input = { "text": songLyric };
	let params = {
		'tone_input': input,
		'content_type': 'application/json'
	};
	toneAnalyzer.tone(params, function(error, response) {
		if (error) {
			console.log('Error:', error);
		}
		// No error, we got our tone result.
		else {
			// The tone of the text, as determined by watson.
			let tone = JSON.stringify(response, null, 2);
			// Output Watson's tone analysis to the console.
			console.log(tone);
		}
	});
}
