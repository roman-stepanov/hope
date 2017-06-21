'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      build: 'build/'
    },

    copy: {
      html: {
        files: [{
          expand: true,
          src: '*.html',
          dest: 'build/'
        }]
      },
      normalize: {
        files: [{
          expand: true,
          cwd: 'node_modules/normalize.css/',
          src: 'normalize.css',
          dest: 'build/css/'
        }]
      },
      resources: {
        files: [{
          expand: true,
          src: [
            'fonts/**.{woff,woff2}',
            'img/**/*.{jpg,png}'
          ],
          dest: 'build/'
        }]
      },
      jquery: {
        files: [{
          expand: true,
          cwd: 'node_modules/jquery/dist/',
          src: [
            'jquery.min.js',
            'jquery.min.map'
          ],
          dest: 'build/js/'
        }]
      },
      imagesloaded: {
        files: [{
          expand: true,
          cwd: 'node_modules/imagesloaded/',
          src: 'imagesloaded.pkgd.min.js',
          dest: 'build/js/'
        }]
      },
      masonry: {
        files: [{
          expand: true,
          cwd: 'node_modules/masonry-layout/dist/',
          src: 'masonry.pkgd.min.js',
          dest: 'build/js/'
        }]
      },
      js: {
        files: [{
          expand: true,
          src: 'js/**/*.js',
          dest: 'build/'
        }]
      }
    },

    less: {
      style: {
        files: {
          'build/css/style.css': 'less/style.less'
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require('autoprefixer')({
              browsers: [
                'last 1 version',
                'last 2 Chrome versions',
                'last 2 Firefox versions',
                'last 2 Opera versions',
                'last 2 Edge versions'
              ]
            })
          ]
        },
        src: 'build/css/style.css'
      }
    },

    csso: {
      style: {
        options: {
          report: 'gzip'
        },
        files: {
          'build/css/style.min.css': 'build/css/style.css'
        }
      }
    },

    browserSync: {
      build: {
        bsFiles: {
          src: [
            'build/*.html',
            'build/css/*.css',
            'build/js/**/*.js'
          ]
        },
        options: {
          server: 'build/',
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: '*.html',
        tasks: 'copy:html'
      },
      style: {
        files: 'less/**/*.less',
        tasks: [
          'less',
          'postcss',
          'csso'
        ],
        options: {
          spawn: false
        }
      },
      js: {
        files: 'js/**/*.js',
        tasks: 'copy:js'
      }
    }
  });

  grunt.registerTask('build', [
    'clean',
    'copy',
    'less',
    'postcss',
    'csso'
  ]);

  grunt.registerTask('serve', [
    'browserSync',
    'watch'
  ]);
};
