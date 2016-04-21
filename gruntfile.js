module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'work/js/app.js','work/js/app/*'],
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
                separator: ';',
            },
            dist: {
                // the files to concatenate
                src: ['work/js/app/widget-*.js'],
                // the location of the resulting JS file
                dest: 'work/build/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            my_target: {
                options: {
                    // mangle: false,
                    preserveComments: false,
                    banner: '/*! main <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'work/build/js/app/main.min.js': ['work/js/app/main.js'],
                    'work/build/js/app/helpers.min.js': ['work/js/app/helpers.js']
                }
            },
            my_target2: {
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
                    'work/build/css/app/widget-select.css': ['work/css/widget-select.less']
                }
            }
        },
        cssmin: {
            options: {
                //restructure: true,
                //aggressiveMerging: false,
                benchmark: true,
                keepBreaks: true,
                //                mediaMerging : true,
                //mergeMediaQueries: true,
                //removeDuplicateMediaQueries: true,
                //shorthandCompacting: false,
                //roundingPrecision: -1
            },
            target: {
                files: {
                    'work/build/css/app/widget-select.css': ['work/build/css/app/widget-select.css']
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
                        browser: 'chrome',
                    } // Target-specific arguments 
                }
            },
            firefox: { // Grunt requires at least one target to run so you can simply put 'all: {}' here too. 
                options: {

                    args: {
                        browser: 'firefox',
                    } // Target-specific arguments 
                }
            },
        }
    });


    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-protractor-webdriver');

    // Default task(s).
    grunt.registerTask('code', ['jshint', 'connect', 'qunit', 'uglify']);
    grunt.registerTask('css', ['less', 'cssmin']);
    grunt.registerTask('klaas', ['protractor:chrome']);
    grunt.registerTask('default', ['connect', 'qunit']);

};
