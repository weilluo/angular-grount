var randomstring = require('randomstring');

module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      tmp: ['tmp'],
      dist: ['dist']
    },

    ejs: {
      all: {
        options: {
          version: "<%= version %>"
        },
        src: ['app/index.ejs'],
        dest: 'tmp/index.html'
      }
    },

    copy: {
      main: {
        files: [
          {src: ['config/main.js'], dest: 'tmp/assets/main.js'},

          {expand: true, src: ['app/**'], dest: 'tmp/assets/'},
          {src: ['bower_components/requirejs/require.js'], dest: 'tmp/assets/require.js'},
          {src: ['bower_components/text/text.js'], dest: 'tmp/assets/require-text.js'}
        ],
      },

      dev: {
        files: [
          {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/fonts/**'], dest: 'tmp/assets/fonts', filter: 'isFile'}
        ]
      },

      prod: {
        files: [
          {src: ['tmp/index.html'], dest: 'dist/index.html'},
          {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/fonts/**'], dest: 'dist/assets/fonts', filter: 'isFile'}
        ]
      }
    },

    concat: {
      js: {
        src: [
          'bower_components/angular/angular.js',
          'bower_components/angular-ui-router/release/angular-ui-router.js',
          'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
        ],
        dest: 'tmp/assets/vendor.js'
      },
      css: {
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.css'
        ],
        dest: 'tmp/assets/vendor.css'
      }
    },

    less: {
      dist: {
        files: {
          'tmp/assets/app.css': 'app/styles/app.less'
        }
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      build: {
        files: {
          'dist/assets/vendor<%= version %>.js': ['tmp/assets/vendor.js']
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
          'dist/assets/vendor<%= version %>.css': ['tmp/assets/vendor.css'],
          'dist/assets/app<%= version %>.css': ['tmp/assets/app.css']
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: './tmp/assets',
          mainConfigFile: 'tmp/assets/main.js',
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
        files: ['app/index.ejs', 'config/*.js', 'app/**/*.js', 'app/**/*.html', 'app/**/*.less'],
        tasks: ['build:dev']
      },
    },

    connect: {
      server: {
        options: {
          livereload: true,
          port: 4200,
          base: 'tmp'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
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

  grunt.task.registerTask('build', 'Build assets for app.', function(env) {
    if (env === 'dev') {
      grunt.task.run('clean:tmp', 'gv:dev', 'ejs', 'copy_dev', 'concat', 'less');
    } else if (env === 'prod') {
      grunt.task.run('clean', 'gv:prod', 'ejs', 'copy_prod', 'concat', 'less', 'uglify', 'cssmin', 'requirejs');
    } else {
      throw Error('Unkown params "env" = ' + env + ' for build assets task.');
    }
  });

  grunt.registerTask('server', ['build:dev', 'connect:server', 'watch']);
};
