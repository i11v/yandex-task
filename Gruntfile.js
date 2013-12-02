module.exports = function (grunt) {
  "use strict";

  var modules = [
        "public/js/modules/time.js",
        "public/js/modules/strg.js",
        "public/js/modules/tmpl.js",
        "public/js/modules/tabs.js",
        "public/js/modules/cmd.js"
      ]
    , pkg = grunt.file.readJSON("package.json");

  grunt.initConfig({
    pkg: pkg,
    jade: {
      debug: {
        options: {
          debug: true,
          data: {
            dev: true,
            title: pkg.title
          }
        },
        files: [{
          expand: true,
          cwd: "views",
          src: "*.jade",
          dest: ".",
          ext: ".html"
        }]
      },
      release: {
        options: {
          debug: false,
          data: {
            dev: false,
            title: pkg.title,
            commit: grunt.option("commit")
          }
        },
        files: [{
          expand: true,
          cwd: "views",
          src: "*.jade",
          dest: ".",
          ext: ".html"
        }]
      }
    },
    stylus: {
      debug: {
        options: {
          compress: false
        },
        files: {
          "public/build/main.css": "public/style/main.styl"
        }
      },
      release: {
        options: {
          compress: true
        },
        files: {
          "public/build/main.css": "public/style/main.styl"
        }
      }
    },
    concat: {
      modules: {
        src: modules,
        dest: "public/build/modules.js"
      },
      dev: {
        src: ["public/js/libs/jquery-1.10.2.min.js"].concat(modules),
        dest: "public/build/ya-task.js"
      },
      release: {
        src: ["public/js/libs/jquery-1.10.2.min.js", "public/build/modules.min.js"],
        dest: "public/build/ya-task.min.js"
      }
    },
    uglify: {
      options: {
        banner: "/*! (c) <%= pkg.author.email %>, <%= grunt.template.today('yyyy') %> */\n"
      },
      modules: {
        files: {
          "public/build/modules.min.js": modules
        }
      }
    },
    watch: {
      debug: {
        options: {
          livereload: true
        },
        files: ["views/**/*.jade", "public/style/**/*.styl", "public/js/**/*.js"],
        tasks: ["jade:debug", "stylus:debug", "concat:modules", "concat:dev"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-contrib-stylus");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("default", ["jade:debug", "stylus:debug", "concat:modules", "concat:dev", "watch:debug"]);
  grunt.registerTask("dev", ["jade:debug", "stylus:debug", "concat:modules", "concat:dev"]);
  grunt.registerTask("release", ["jade:release", "stylus:release", "uglify:modules", "concat:release"]);
};
