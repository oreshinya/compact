module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-bower-concat'
  grunt.loadNpmTasks 'grunt-karma'

  grunt.initConfig
    jshint:
      all: [
        "src/**/*.js"
        "test/src/**/*.js"
      ]

    bower_concat:
      all:
        dest: 'test/vendor.js'
        bowerOptions:
          relative: false

    browserify:
      src:
        files:
          "build/compact.min.js": [
            "src/**/*.js"
          ]
        options:
          transform: ["uglifyify"]

      test:
        files:
          "test/build/compact_spec.js": [
            "test/src/**/*_spec.js"
          ]
        options:
          transform: ["espowerify"]

    karma:
      unit:
        options:
          frameworks: [
            'mocha'
          ]
          files: [
            './test/vendor.js'
            './test/build/**/*_spec.js'
          ]
          browsers:[
            'PhantomJS', 'Safari', 'Chrome'
          ]
          reporters: 'dots'
          singleRun: true

  grunt.registerTask "build", ["jshint", "browserify"]
  grunt.registerTask "test", ["bower_concat", "build", "karma"]
  grunt.registerTask "default", ["build"]
