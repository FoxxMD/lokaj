'use strict';

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var modRewrite = require('connect-modrewrite');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: 'build/dist',
            dev: 'app'
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/*'
                        ]
                    }
                ]
            },
            dev:{
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dev %>'
                        ]
                    }
                ]
            },
            default: ['.tmp']
        },
        sync: {
            dist: {
                files: [
                    {
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: '**'
                    }
                ]
            }
        },
        less: {
            dev: {
               options: {
                    sourceMap: true,
                   sourceMapBasepath: '<%= yeoman.app %>/css/less/',
                   sourceMapRootpath: 'less/',
                   outputSourceFiles: true
                },
                files: {
                    '<%= yeoman.app %>/css/app.css': '<%= yeoman.app %>/css/less/app.less'
                }
            }
        },
        watch: {
            options: {
                livereload: 35729

                //debounceDelay: 600
            },
            src: {
                files: [
                    '<%= yeoman.app %>/*.html',
                    '<%= yeoman.app %>/css/**/*',
                    '!<%= yeoman.app %>/css/app.css',
                    '<%= yeoman.app %>/js/**/*',
                    '<%= yeoman.app %>/views/**/*'
                ]
            },
            pre: {
                files:['<%= yeoman.app %>/css/less/**/*'],
                tasks:['less:dev']
            }
        },
        connect: {
            //server: {
            proxies: [
                {
                    context: '/api',
                    host: 'localhost',
                    port: 8080,
                    https: false,
                    changeOrigin: false
                }
            ],
            options: {
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0'
            }
            //},
            ,
            livereload: {
                options: {
                    open: 'http://gtgamefest.local:9000',
                    port:9000,
                    livereload: 35729,
                    base: [
                        '<%= yeoman.app %>'
                    ],
                    middleware: function (connect) {
                        return [
                            proxySnippet,
                            modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.gif\\.jpg$ /index.html [L]']),
                            connect.static(require('path').resolve('app'))
                        ];
                    }
                }
            },
            dist: {
                options: {
                    port:9000,
                    protocol: 'http',
                    base: '<%= yeoman.dist %>',
                    livereload: 35729,
                    middleware: function (connect) {
                        return [
                            proxySnippet,
                            modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.gif\\.jpg$ /index.html [L]']),
                            connect.static(require('path').resolve('dist'))
                        ];
                    }
                }
            }


        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: [
                            'views/**',
                            'images/**',
                            'fonts/**',
                            'index.html'],
                        dest: '<%= yeoman.dist %>/'
                    }
                ]
            }
        },
        // Test settings
        karma: {
            unit: {
                configFile: 'test/config/karma.conf.js',
                singleRun: true
            }
        },
        bowercopy: {
            options: {
                destPrefix: '<%= yeoman.app %>'
            },
            test: {
                files: {
                    'test/lib/angular-mocks': 'angular-mocks',
                    'test/lib/angular-scenario': 'angular-scenario'
                }
            }
        },
        wiredep: {
            target: {
                src: '<%= yeoman.app %>/index.html'
            },
            cwd: '<%= yeoman.app %>',
           exclude:{
                src:['lib/fullcalendar/dist/fullcalendar.js']
        }
        },
        useminPrepare: {
            dev: {
                src:['<%= yeoman.app %>/index.html'],
                options: {
                    root:'<%= yeoman.app %>',
                    dest: '<%= yeoman.dev %>'
                }
            },
            dist: {
                src:['<%= yeoman.app %>/index.html'],
                options: {
                    dest: '<%= yeoman.dist %>'
                }
            }
        },
        usemin:{
            'dev-html':{
                options:{
                    assetsDirs:['<%= yeoman.dist %>'],
                    type:'html'
                },
                files:{
                    src:['<%= yeoman.dist %>/index.html']
                }
            },
            'dev-css':{
                options:{
                    assetsDirs:['<%= yeoman.dist %>'],
                    type:'css'
                },
                files:{
                    src:['<%= yeoman.dist %>/styles/**.css']
                }
            }
        },
        ngAnnotate: {
            options:{
                sourcemap:true
            },
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/js/',
                        src: ['**/*.js', '!**/gtresources/**'],
                        dest: '<%= yeoman.app %>/js/'
                    },
                    {
                        //Since this project doesn't include a min it needs to be annotated or else angular gets grumpy about strict annotation
                        '<%= yeoman.app %>/lib/angular-flowtype/angular-flowtype.js':'<%= yeoman.app %>/lib/angular-flowtype/angular-flowtype.js'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/js/',
                        src: ['**/*.js', '!**/gtresources/**'],
                        dest: '<%= yeoman.app %>/js/'
                    },
                    {
                        //Since this project doesn't include a min it needs to be annotated or else angular gets grumpy about strict annotation
                        '<%= yeoman.app %>/lib/angular-flowtype/angular-flowtype.js':'<%= yeoman.app %>/lib/angular-flowtype/angular-flowtype.js'
                    }
                ]
            }
        }

    });

    grunt.registerTask('server:dev', function (target) {
            return  grunt.task.run([
                'less:dev',
                'wiredep',
                'ngAnnotate:dev',
                'configureProxies',
                'connect:livereload',
                'watch'
            ]);
    });
    grunt.registerTask('server:dist', function (target) {
        return  grunt.task.run([
            'clean:dist',
            'less:dev',
            'wiredep',
            'ngAnnotate:dist',
            'copy:dist',
            'useminPrepare:dist',
            'concat:generated',
            'cssmin:generated',
            'uglify:generated',
            'usemin'
        ]);
    });
};
