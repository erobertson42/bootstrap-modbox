module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['dist/*'],
		uglify: {
			options: {
				compress: true,
				mangle: true,
				sourceMap: true,
				banner: grunt.file.read('header.txt')
			},
			dist: {
				files: [
					{ src: 'dist/<%= pkg.name %>.js', dest: 'dist/<%= pkg.name %>.min.js' },
					{ src: 'dist/<%= pkg.name %>.esm.js', dest: 'dist/<%= pkg.name %>.esm.min.js' }
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');


	// prepare js file - add banner comment, add version number
	grunt.registerTask('prepareDist', 'Copy source file to dist folder, add banner comment, and add version number.', function() {
		grunt.file.copy('src/bootstrap-modbox.js', 'dist/bootstrap-modbox.js', {
			process: (contents) => {
				const banner = grunt.template.process(grunt.file.read('header.txt'));
				return banner + contents.replace(/(class modbox {)/, `$1\n\n\tstatic version = '${grunt.config.get('pkg.version')}';`);
			}
		});
	});

	// prepare js module file - add export command
	grunt.registerTask('prepareDistModule', 'Add export command.', function() {
		grunt.task.requires('prepareDist');

		grunt.file.copy('dist/bootstrap-modbox.js', 'dist/bootstrap-modbox.esm.js', {
			process: (contents) => contents.replace(/(class modbox)/, 'export default $1')
		});
	});


	// default tasks
	grunt.registerTask('default', ['clean', 'prepareDist', 'prepareDistModule', 'uglify']);
};
