'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-karma');

	grunt.initConfig({
		jshint: {
			dev: {
				options: {
					node: true,
					globals: {
						describe: true,
						it: true,
						before: true,
						after: true
					}
				},
				src: ['Gruntfile.js', 'test/server/*.js', 'server.js', 'routes.js']
			}
		},

		simplemocha: {
			all: {
				src: ['test/server/*.js']
			}
		},

		clean: {
			build: {
				src: ['build/']
			}
		},

		copy: {
			build: {
				expand: true,
				cwd: 'app/',
				src: ['**/*.html', '**/*.bmp'],
				dest: 'build/',
				flatten: false,
				filter: 'isFile'
			}
		},
		
		browserify: {
			dev: {
				src: ['app/js/**/*.js'],
				dest: 'build/bundle.js'
			},
			karmatest: {
				src: ['test/karma_tests/*_test.js'],
				dest: 'test/karma_tests/karma_test_bundle.js'
			},
			options: {
				transform: ['debowerify']
			}
		},

		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		}
	});
	grunt.registerTask('build', ['clean', 'browserify', 'copy']);
	grunt.registerTask('test:client', ['browserify:karmatest', 'karma:unit']);
	grunt.registerTask('test:server', ['jshint', 'simplemocha']);
};