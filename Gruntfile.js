var mozjpeg = require('imagemin-mozjpeg');

module.exports = function (grunt) {
    "use strict";

    // Configurable paths for the application
    var appConfig = {
        app: 'app',
        dist: 'public'
    };

    grunt.initConfig({
        estudiobox: appConfig,
        karma: {
            unit: {
                options: {
                    configFile: 'test/karma.conf.js',
                    singleRun: true,
                    browsers: ['PhantomJS']
                }
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= estudiobox.dist %>/scripts/{,*/}*.js',
                    '<%= estudiobox.dist %>/styles/{,*/}*.css',
                    '<%= estudiobox.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= estudiobox.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= estudiobox.app %>/index.html',
            options: {
                dest: '<%= estudiobox.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= estudiobox.dist %>/{,*/}*.html'],
            css: ['<%= estudiobox.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: [
                    '<%= estudiobox.dist %>',
                    '<%= estudiobox.dist %>/images',
                    '<%= estudiobox.dist %>/styles'
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= estudiobox.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= estudiobox.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= estudiobox.app %>',
                    dest: '<%= estudiobox.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'shared/**/*html',
                        'pages/**/*.html',
                        'img/**/*.{ico,svg}'
                        //'img/**/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= estudiobox.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: 'app/bower_components/fontawesome',
                    src: 'fonts/*',
                    dest: '<%= estudiobox.dist %>'
                }, {
                    expand: true,
                    cwd: '<%= estudiobox.app %>/styles',
                    src: ['fonts/**/*.eot', 'fonts/**/*.svg', 'fonts/**/*.ttf', 'fonts/**/*.woff', 'fonts/**/*.woff2'],
                    dest: '<%= estudiobox.dist %>/css/'
                }, {
                    expand: true,
                    cwd: '<%= estudiobox.app %>/staticpages',
                    src: '**/*',
                    dest: '<%= estudiobox.dist %>/staticpages'
                }, {
                    expand: true,
                    cwd: '<%= estudiobox.app %>/robots/dev',
                    src: ['robots.txt'],
                    dest: '<%= estudiobox.dist %>'
                }]
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= estudiobox.app %>/vendor/bootstrap',
                    src: ['css/**/*', 'fonts/**/*'],
                    dest: '<%= estudiobox.app %>/staticpages'
                }]
            },
            production: {
                files: [{
                    expand: true,
                    cwd: '<%= estudiobox.app %>/robots/production',
                    src: ['robots.txt'],
                    dest: '<%= estudiobox.dist %>'
                }]
            }
        },
        clean: {
            build: ["public/"],
            docs: ["docs/"]
        },
        includeSource: {
            options: {
                basePath: 'app'
            },
            dev: {
                files: {
                    'app/index.html': 'app/index.html'
                }
            }
        },
        wiredep: {
            app: {
                src: ['<%= estudiobox.app %>/index.html'],
                ignorePath: /\.\.\//
            },
            test: {
                devDependencies: true,
                src: 'test/karma.conf.js',
                ignorePath: /\.\.\//,
                fileTypes: {
                    js: {
                        block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                        detect: {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'../{{filePath}}\','
                        }
                    }
                }
            }
        },
        less: {
            dev: {
                options: {
                    paths: ["<%= estudiobox.app %>/styles"]
                },
                files: {
                    "<%= estudiobox.app %>/styles/estudiobox.css": "<%= estudiobox.app %>/styles/estudiobox.less"
                }
            }
        },
        pleeease: {
            options: {
                autoprefixer: {'browsers': ['last 40 versions', 'ios 6']},
                minifier: false
            },
            estudiobox: {
                files: {
                    '<%= estudiobox.app %>/styles/estudiobox.css': '<%= estudiobox.app %>/styles/estudiobox.css'
                }
            }
        },
        /*
        *NgConstant: Module to set Environment Variables
        **/
        ngconstant: {
            // Options for all targets
            options: {
                space: '  ',
                wrap: '"use strict";\n\n {%= __ngModule %}',
                name: 'configEnvironment'
            },
            // Environment targets
            production: {
                options: {
                    dest: '<%= estudiobox.app %>/environmentConfig.js'
                },
                constants: {
                    ENV: {
                        name: 'production',
                        host: 'http://estudiobox.es'
                    }
                }
            },
            development: {
                options: {
                    dest: '<%= estudiobox.app %>/environmentConfig.js'
                },
                constants: {
                    ENV: {
                        name: 'development',
                        host: 'http://estudiobox.es'
                    }
                }
            },
            localhost: {
                options: {
                    dest: '<%= estudiobox.app %>/environmentConfig.js'
                },
                constants: {
                    ENV: {
                        name: 'localhost',
                        host: ''
                    }
                }
            }
        },
        ngdocs: {
            options: {
                dest: 'docs/',
                html5Mode: false
            },
            api: {
                src: [
                    '<%= estudiobox.app %>/app.js',
                    '<%= estudiobox.app %>/appRoutes.js',
                    '<%= estudiobox.app %>/environmentConfig.js',
                    '<%= estudiobox.app %>/shared/**/*.js',
                    '<%= estudiobox.app %>/pages/**/*.js'
                ],
                title: 'EstudioBox Angularjs'
            }
        },
        watch: {
            scripts: {
                files: [
                    '<%= estudiobox.app %>/app.js',
                    '<%= estudiobox.app %>/appRoutes.js',
                    '<%= estudiobox.app %>/shared/**/*.js',
                    '<%= estudiobox.app %>/pages/**/*.js'
                ],
                tasks: ['includeSource'],
                options: {
                    spawn: false
                }
            },
            bower: {
                files: ['<%= estudiobox.app %>/bower_components/**/*'],
                tasks: ['wiredep']
            },
            css: {
                files: ['<%= estudiobox.app %>/styles/**/*.less'],
                tasks: ['less:dev', 'pleeease:estudiobox', 'copy:dev'],
                options: {
                    spawn: false
                }
            }
        },
        imagemin: {                          // Task
            static: {                          // Target
                options: {                       // Target options
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg()]
                },
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'app/img/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'public/img/'                  // Destination path prefix
                }]
            },
            dynamic: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'src/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/'                  // Destination path prefix
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('build', '', function () {
        grunt.task.run('ngconstant:development');
        grunt.task.run('server-tasks');
    });

    grunt.registerTask('build-stage', '', function () {
        grunt.task.run('ngconstant:stage');
        grunt.task.run('server-tasks');
    });

    grunt.registerTask('build-production', '', function () {
        grunt.task.run('ngconstant:production');
        grunt.task.run('server-tasks');
        grunt.task.run('copy:production');
    });

    grunt.registerTask('server-tasks', [
        'clean:build',
        'less',
        'pleeease:estudiobox',
        'wiredep',
        'includeSource',
        'useminPrepare',
        'copy:dist',
        'concat:generated',
        'uglify:generated',
        'cssmin:generated',
        'usemin',
        'htmlmin',
        'imagemin:static'
    ]);

    grunt.registerTask('build-docs', [
        'clean:docs',
        'ngdocs'
    ]);

    grunt.registerTask('build-dev', [
        'wiredep',
        'includeSource',
        'ngconstant:development',
        'less',
        'pleeease',
        'copy:dev'
    ]);

    grunt.registerTask('dev', [
        'build-dev',
        'watch'
    ]);
};
