const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
	fileid: {
		type: String
		// required: true
	},
	filename: {
		type: String,
		required: true
	}
	// image: {
	// 	data: Buffer,
	// 	contentType: String
	// }
});

//643f2078d0fdb9aaaeb8db57

module.exports = ImageModel = mongoose.model('imageModel', ImageSchema);