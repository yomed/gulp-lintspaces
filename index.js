var
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
		file.lintspaces = lintspaces.getInvalidLines(file.path);

		return this.emit('data', file);
	});
};
