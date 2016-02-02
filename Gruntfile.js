module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      main: {
        files: [
          {src: ['app/index.html'], dest: 'public/index.html'}
        ]
      }
    },

    uglify: {
      build: {
        src: 'public/vendor.js',
        dest: 'dist/vendor.min.js'
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'bower_components/requirejs/require.js',
          'bower_components/jquery/dist/jquery.js'
        ],
        dest: 'public/vendor.js'
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: './',

          paths: {
            text: 'bower_components/text/text',

            angular: 'bower_components/angular/angular',
            'angular-route': 'bower_components/angular-route/angular-route',
            'angular-deferred-bootstrap': 'bower_components/angular-deferred-bootstrap/angular-deferred-bootstrap'
          },

          shim: {
            'angular-route': ['angular'],
            'angular-deferred-bootstrap': ['angular']
          },

          include: [
            'app/app'
          ],

          optimize: 'none',

          out: 'public/app.js'
        }
      }
    },

    connect: {
      dev: {
        port: 4200,
        base: 'public'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-connect');

  grunt.registerTask('build', ['copy', 'concat', 'uglify', 'requirejs']);

  grunt.registerTask('server', ['connect:dev']);
};
