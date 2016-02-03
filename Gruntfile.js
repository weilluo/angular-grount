var randomstring = require('randomstring');

module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      public: ['public'],
      dist: ['dist']
    },

    ejs: {
      all: {
        options: {
          version: "<%= version %>"
        },
        src: ['app/index.ejs'],
        dest: 'public/index.html'
      }
    },

    copy: {
      main: {
        files: [
          {src: ['config/main.js'], dest: 'public/assets/main.js'},

          {expand: true, src: ['app/**'], dest: 'public/assets/'},
          {src: ['bower_components/text/text.js'], dest: 'public/assets/require-text.js'}
        ],
      },

      dev: {
        files: [
          {expand: true, cwd: 'bower_components/bootstrap/dist/fonts', src: ['**'], dest: 'public/assets'},

          {src: ['bower_components/requirejs/require.js'], dest: 'public/assets/require.js'}
        ]
      },

      prod: {
        files: [
          {src: ['public/index.html'], dest: 'dist/index.html'},
          {expand: true, cwd: 'bower_components/bootstrap/dist/fonts', src: ['**'], dest: 'dist/assets'},

          {src: ['bower_components/requirejs/require.js'], dest: 'dist/assets/require.js'}
        ]
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      build: {
        files: {
          'dist/assets/vendor<%= version %>.js': ['public/assets/vendor.js']
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      build: {
        files: {
          'dist/assets/vendor<%= version %>.css': ['public/assets/vendor.css'],
          'dist/assets/app<%= version %>.css': ['public/assets/app.css']
        }
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
        dest: 'public/assets/vendor.js'
      },
      css: {
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.css'
        ],
        dest: 'public/assets/vendor.css'
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'app/styles',
          cssDir: 'public/assets',
          environment: 'development'
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: './public/assets',
          mainConfigFile: 'public/assets/main.js',
          // optimize: 'none',
          name: '../../bower_components/almond/almond',
          include: ['main'],
          out: 'dist/assets/app<%= version %>.js'
        }
      }
    },

    watch: {
      options: {
        spawn: true,
        livereload: true
      },
      src: {
        files: ['app/index.ejs', 'config/*.js', 'app/**/*.js', 'app/**/*.html', 'app/**/*.scss'],
        tasks: ['build_dev']
      },
    },

    connect: {
      server: {
        options: {
          livereload: true,
          port: 4200,
          base: 'public'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-ejs');

  grunt.registerTask('gv', 'Generate a assets version.', function(env) {
    if (env === 'dev') {
      grunt.config.set('version', '');
    } else if (env === 'prod') {
      grunt.config.set('version', '-' + randomstring.generate());
    } else {
      throw Error('Unkown params "env" = ' + env + ' for generate version task.');
    }
  });

  grunt.registerTask('copy_dev', 'Copy files for development.', function(env) {
    grunt.task.run('copy:main', 'copy:dev');
  });

  grunt.registerTask('copy_prod', 'Copy files for development.', function(env) {
    grunt.task.run('copy:main', 'copy:prod');
  });

  grunt.registerTask('build_dev', ['clean:public', 'gv:dev', 'ejs', 'copy_dev', 'concat', 'compass']);

  grunt.task.registerTask('build', ['clean', 'gv:prod', 'ejs', 'copy_prod', 'concat', 'compass', 'uglify', 'cssmin', 'requirejs']);

  grunt.registerTask('server', ['build_dev', 'connect:server', 'watch']);
};
