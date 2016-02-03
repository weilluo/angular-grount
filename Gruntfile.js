module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dev: ['public/assets/js', 'public/*.js', 'public/index.html']
    },

    copy: {
      main: {
        files: [
          {src: ['app/index.html'], dest: 'public/index.html'},

          {src: ['config/config.js'], dest: 'public/assets/js/config.js'},
          {src: ['config/main.js'], dest: 'public/assets/js/main.js'},

          {expand: true, src: ['app/**'], dest: 'public/assets/js/'},

          {src: ['bower_components/requirejs/require.js'], dest: 'public/assets/js/require.js'},
          {src: ['bower_components/text/text.js'], dest: 'public/assets/js/require-text.js'}
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
          'bower_components/jquery/dist/jquery.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js'
        ],
        dest: 'public/vendor.js'
      }
    },

    watch: {
      options: {
        spawn: true,
        livereload: true
      },
      src: {
        files: ['app/index.html', 'app/**/*.js', 'config/*.js'],
        tasks: ['build_dev']
      },
    },

    connect: {
      server: {
        options: {
          livereload: true,
          port: 8000,
          base: 'public'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('build_dev', ['clean:dev', 'copy', 'concat']);

  grunt.registerTask('build', []);

  grunt.registerTask('server', ['build_dev', 'connect:server', 'watch']);
};
