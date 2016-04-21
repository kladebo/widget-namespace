module.exports = function (grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['gruntfile.js', 'work/js/app.js', 'work/js/app/*'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: false,
                    console: true,
                    module: false,
                    document: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'https:localhost/8000/'
                }
            }
        },
        qunit: {
            files: ['work/test/**/*.html', '!work/test/selenium/*', '!work/test/protractor/*']
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['work/js/app/widget-*.js'],
                // the location of the resulting JS file
                dest: 'work/build/js/app/<%= pkg.name %>.js'
            }
        },
        uglify: {
            appjs: {
                options: {
                    // mangle: false,
                    preserveComments: false,
                    banner: '/*! main <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'work/build/js/app/main.min.js': ['work/js/app/main.js'],
                    'work/build/js/app/helpers.min.js': ['work/js/app/helpers.js'],
                    'work/build/js/app.min.js': ['work/js/app.js']
                }
            },
            widgetjs: {
                options: {
                    preserveComments: false,
                    banner: '/*! <%= pkg.description %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'work/build/js/app/<%= pkg.name %>.min.js': ['work/js/app/widget-*.js']

                }
            }
        },
        less: {
            development: {
                files: {
                    'work/build/css/app/widget-select.css': ['work/less/widget-select.less']
                }
            }
        },
        sass: {
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'nested' //Output style. Can be nested, compact, compressed, expanded
                },
                files: {
                    'work/build/css/layout.css': 'work/sass/layout.scss'
                }
            }
        },
        postcss: {
            options: {
                //map: true, // inline sourcemaps 
                // or 
                map: {
                    inline: false, // save all sourcemaps as separate files... 
                    annotation: 'work/css/app/maps/' // ...to the specified directory 
                },

                processors: [
                    require('pixrem')(), // add fallbacks for rem units 
                        require('autoprefixer')({
                        browsers: ['last 2 versions', 'Safari >= 5', '> 3% in NL']
                    }), // add vendor prefixes 
                    require('cssnano')() // minify the result 
                ]
            },
            dist: {
                src: 'work/build/css/layout.css',
                dest: 'work/css/app/layout.min.css'
            }
        },
        cssmin: {
            options: {
                //restructure: true,
                //aggressiveMerging: false,
                benchmark: true,
                keepBreaks: true
                    //                mediaMerging : true,
                    //mergeMediaQueries: true,
                    //removeDuplicateMediaQueries: true,
                    //shorthandCompacting: false,
                    //roundingPrecision: -1
            },
            target: {
                files: {
                    'work/css/app/widget-select.css': ['work/build/css/app/widget-select.css']
                }
            }
        },
        protractor_webdriver: {
            options: {
                // Task-specific options go here. 
                command: 'webdriver-manager start'
            }
        },
        protractor: {
            options: {
                configFile: 'work/test/protractor/conf.js', // Default config file 
                keepAlive: true, // If false, the grunt process stops when the test fails. 
                noColor: false, // If true, protractor will not use colors in its output. 
                args: {
                    // Arguments passed to the command 
                }
            },
            chrome: { // Grunt requires at least one target to run so you can simply put 'all: {}' here too. 
                options: {

                    args: {
                        browser: 'chrome'
                    } // Target-specific arguments 
                }
            },
            firefox: { // Grunt requires at least one target to run so you can simply put 'all: {}' here too. 
                options: {

                    args: {
                        browser: 'firefox'
                    } // Target-specific arguments 
                }
            }
        },
        clean: {
            //folder: ['path/to/dir/'],
            //folder_v2: ['path/to/dir/**'],
            //contents: ['path/to/dir/*'],
            //subfolders: ['path/to/dir/*/'],
            //css: ['path/to/dir/*.css'],
            //all_css: ['path/to/dir/**/*.css']
            css: ['work/build/css/', 'work/css/app/', 'www/css/*'],
            appjs: ['work/build/js/app/', 'www/js/app/', 'www/js/app.js'],
            //all_css: ['path/to/dir/**/*.css']
        },
        copy: {
            css: {
                cwd: 'work/css', // set working folder / root to copy
                src: '**/*', // copy all files and subfolders
                dest: 'www/css', // destination folder
                expand: true // required when using cwd

            },
            appjs: {
                cwd: 'work/build/js', // set working folder / root to copy
                src: '**/*', // copy only root files
                dest: 'www/js', // destination folder
                expand: true // required when using cwd
            }
        }
    });


    // Load the plugin that provides the "uglify" task.

    // npm install grunt-postcss pixrem autoprefixer cssnano --save-dev

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-sass'); //npm install grunt-contrib-sass --save-dev
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-protractor-webdriver');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy'); //npm install grunt-contrib-copy --save-dev

    // Default task(s).
    grunt.registerTask('code', ['jshint', 'connect', 'qunit', 'clean:appjs', 'uglify', 'copy:appjs']);
    grunt.registerTask('css', ['clean:css', 'less', 'cssmin', 'sass', 'postcss', 'copy:css']);
    grunt.registerTask('e2e', ['protractor:chrome']);
    grunt.registerTask('default', ['code', 'css', 'e2e']);

};
