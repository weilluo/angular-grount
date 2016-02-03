module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dev: ['public', 'dist', 'tmp']
    },

    copy: {
      main: {
        files: [
          {src: ['app/index.html'], dest: 'public/index.html'},

          {src: ['config/config.js'], dest: 'public/assets/js/config.js'},
          {src: ['config/main.js'], dest: 'public/assets/js/main.js'},

          {expand: true, src: ['app/**'], dest: 'public/assets/js/'},

          {src: ['bower_components/requirejs/require.js'], dest: 'public/assets/js/require.js'},
          {src: ['bower_components/text/text.js'], dest: 'public/assets/js/require-text.js'},

          {expand: true, src: ['bower_components/bootstrap/dist/fonts/**'], dest: 'public/assets/fonts/'}
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
      js: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
        ],
        dest: 'public/assets/js/vendor.js'
      },
      css: {
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.css'
        ],
        dest: 'public/assets/css/vendor.css'
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'app/styles',
          cssDir: 'public/assets/css',
          environment: 'development'
        }
      }
    },

    watch: {
      options: {
        spawn: true,
        livereload: true
      },
      src: {
        files: ['app/index.html', 'config/*.js', 'app/**/*.{js|html}', 'app/styles/**/*.scss'],
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
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('build_dev', ['clean:dev', 'copy', 'concat', 'compass']);

  grunt.registerTask('build', []);

  grunt.registerTask('server', ['build_dev', 'connect:server', 'watch']);
};
