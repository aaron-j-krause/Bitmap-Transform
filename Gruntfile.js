module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.initConfig({
    jshint:{
      options:{
        jshintrc:true
      },
    files:['*.js', 'lib/**/*.js', 'test/**/*.js']
    },
    jscs: {
      all: {
        options: {
          config:'.jscsrc'
        },
        files: {
          src: ['*.js', 'lib/**/*.js', 'test/**/*.js']
        }
      }
    },
    simplemocha:{
      all:{
        src: ['test/**/*.js']
      }
    }
  });

  grunt.registerTask('test', ['simplemocha']);
  grunt.registerTask('default', ['jshint', 'jscs']);
};
