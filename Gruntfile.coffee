module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.initConfig
    browserify:
      src:
        files:
          "build/compact.min.js": [
            "src/**/*.js"
          ]
        options:
          transform: ["uglifyify"]

  grunt.registerTask "build", ["browserify"]
  grunt.registerTask "default", ["build"]
