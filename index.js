var
	util 		= require('util'),
	es 			= require('event-stream'),
	Lintspaces 	= require('lintspaces')
;

module.exports = function(options) {
	var lintspaces = new Lintspaces(options || {});

	return es.through(function(file) {
		if (file.isNull()) {
			return this.emit('data', file);
		}

		lintspaces.validate(file.path);

		var invalidLines = lintspaces.getInvalidLines(file.path);

		for (var linenumber in invalidLines) {
			this.emit('error', util.format('Error in line %d: %s', linenumber, invalidLines[linenumber]));
		}

		return this.emit('data', file);
	});
};
