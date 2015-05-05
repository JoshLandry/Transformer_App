'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');

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
        src: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*/js']
      }
    },

    simplemocha: {
      all: {
        src: ['test/**/*.js']
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
       src: ['**/*.html','**/*.css', '**/*.jpg', '**/*.png' ],
       dest: 'build/',
       flatten: false,
       filter: 'isFile'
     }
   },

   browserify: {
     dev: {
       src: ['app/**/*.js', 'app/*.js'],
       dest: 'build/bundle.js'
     },

     options: {
       transform: ['debowerify']
     }
   }
  });

  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('build', ['clean', 'browserify', 'copy']);
  grunt.registerTask('default', ['test']);
};
