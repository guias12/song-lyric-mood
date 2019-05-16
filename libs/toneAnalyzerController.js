const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');

const toneAnalyzer = new ToneAnalyzerV3({
	version: '2017-09-21'
});

//Using IBMs Watson Tone-Analyzer to identify the feelings of the song lyric
function lyricAnalyzer(songLyric) {
	let params = {
		'tone_input': { "text": songLyric },
		'content_type': 'application/json'
	};
	toneAnalyzer.tone(params, function(err, response) {
		if (err) {
			console.log('Error:', err);
		}
		else {
			// The tone of the text, as determined by watson.
			let tone = JSON.stringify(response, null, 2);
			console.log(tone);
			return tone;
		}
	});
}

module.exports = {
    lyricAnalyzer
};