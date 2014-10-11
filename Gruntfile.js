module.exports = function (grunt) {
    var path = require('path'),
        blocksFolder = 'src/blocks', // папка в которой лежат папки с блоками
        tplFolder = 'templates';  // папка с шаблонами


    /*  CONFIG
     --------------------------------------------------------------------------------------------------------- */
    grunt.initConfig({
        compiledPage: '*', // страница которая будет компилироваться. По-умолчанию *, т.е. все страницы
        pkg: grunt.file.readJSON("package.json"),
        // Autoreload
        browser_sync: {
            dev: {
                bsFiles: {
                    src: ['dest/css/*.css', 'dest/*.html', 'dest/js/*.js']
                },
                options: {
                    server: {
                        baseDir: "dest/" // Корневая папка для статичнго сервера.
                    },
                    open: false, // Не открывать страницу с сайтом при создании сервера.
                    notify: false, // Не показывать уведомлений в окне браузера.
                    watchTask: true // Отключить watch, так как для этого используется отдельный таск.
                }
            }
        },
        // Конкатенация файлов
        concat: {
            jade: {
                src: 'src/blocks/**/*.jade',
                dest: 'src/jade/_mixins.jade'
            },
            js: {
                options: {
                    separator: ' ',
                    stripBanners: true
                },
                src: [
                    // "src/js/jquery-1.11.0.js",
                    // "src/js/jquery.html5Loader.js",
                    // "src/js/jquery-ui.min.js",
                    "src/js/jquery-ui-1.10.4.custom.js",
                    "src/js/core.js",
                    "src/js/plugins/*.js",
                    "src/blocks/**/*.js",
                    "src/js/initial.js"
                ],
                dest: 'dest/js/main.js'
            }
        },
        lessConfig: {
            dev: {
                options: {
                    'imgPath': '"../images/"',
                    'fontPath': '"../fonts/"'
                },
                src: [
                    "src/less/libs/normalize.less",
                    "src/less/variables.less",
                    "src/less/mixins.less",
                    "src/less/base.less",
                    "src/less/plugins/*.less",
                    "src/blocks/**/*.less",
                    "src/less/utils.less"
                ],
                dest: "src/less/_main.less"
            },
            prod: {
                options: {
                    'imgPath': '"../FS/images/"',
                    'fontPath': '"../FS/fonts/"'
                },
                src: [
                    "src/less/libs/normalize.less",
                    "src/less/variables.less",
                    "src/less/mixins.less",
                    "src/less/base.less",
                    "src/less/plugins/*.less",
                    "src/blocks/**/*.less",
                    "src/less/utils.less"
                ],
                dest: "src/less/_main.less"
            }
        },
        less: {
            compile: {
                src: "src/less/_main.less",
                dest: "dest/css/main.css"
            }
        },
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                expand: true,
                flatten: true,
                src: "src/<%= compiledPage %>.jade",
                dest: "dest/",
                ext: ".html"
            }
        },
        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        cwd: "src/images",
                        src: ['**/*.png', '**/*.jpg', '**/*.gif', '**/*.svg'],
                        dest: 'dest/images'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'src/blocks',
                        src: ['**/*.png', '**/*.jpg', '**/*.gif', '**/*.svg'],
                        dest: "dest/images/"
                    }
                ]
            },
            fonts: {
                expand: true,
                flatten: true,
                src: 'src/fonts/*',
                dest: 'dest/fonts/'
            },

            js: {
                expand: true,
                flatten: true,
                src: 'src/js/*',
                dest: 'dest/js/'
            }

        },
        watch: {
            options: {
                spawn: false
            },
            less: {
                files: ['src/blocks/**/*.less', 'src/less/**/*.less'],
                tasks: ['lessConfig:dev', 'less', 'autoprefixer:dev']
            },
            jade: {
                files: ['src/<%= compiledPage %>.jade', 'src/blocks/**/*.jade', 'src/jade/**/*.jade'],
                tasks: ['concat:jade', 'jade']
            },
            js: {
                files: ['src/blocks/**/*.js', 'src/js/**/*.js'],
                tasks: ['concat:js', 'browser_sync:inject']
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'files/backup/<%= pkg.name %> верстка (<%= grunt.template.today("dd.mm.yyyy") %>).zip',
                    mode: 'zip'
                },
                src: 'dest/**'
            }
        },
        uglify: {
            compile: {
                src: "dest/js/main.js",
                dest: "dest/js/main.js"
            }
        },
        autoprefixer: {
            // в режиме разработки добавляем префиксы только для последних версий браузеров
            dev: {
                options: {
                    browsers: ['last 1 version']
                },
                src: 'dest/css/main.css'
            },
            // добавляем префиксы всем необходимым браузерам
            prod: {
                options: {
                    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
                },
                src: 'dest/css/main.css'
            }
        },
        cmq: {
            simple: {
                src: 'dest/css/main.css',
                dest: 'dest/css/main.css'
            }
        }
    });
    /*------------------------------------------------------------------------------------------------------- */


    /*  LOAD TASKS
     --------------------------------------------------------------------------------------------------------- */
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-less-config');           // сборка LESS с разными значениями переменных
    grunt.loadNpmTasks('grunt-autoprefixer');          // автоподстановка вендорных префиксов
    grunt.loadNpmTasks('grunt-combine-media-queries'); // группировка несколько одинаковых медиа запросов в один
    grunt.loadNpmTasks('grunt-browser-sync');
    /*------------------------------------------------------------------------------------------------------- */


    /*  TASKS
     /*------------------------------------------------------------------------------------------------------- */
    /* ДЕФОЛТНЫЙ ТАСК ДЛЯ РАЗРАБОТКИ. */
    grunt.registerTask('default', function () {
        // Что бы при изменении одной страницы не компилировались все имеющиеся страницы
        // мы может передать имя страницы для компиляции используя ключ --page
        grunt.config.set('compiledPage', grunt.option('page') || '*');

        // Выполняем дефолтные таски
        grunt.task.run(['concat', 'jade', 'lessConfig:dev', 'less', 'copy', 'autoprefixer:dev', 'browser_sync', 'watch']);
    });

    /* ТАСК ДЛЯ ПРОДАКШЕНА */
    grunt.registerTask('prod', ['concat', 'uglify', 'jade', 'lessConfig:prod', 'less', 'copy', 'autoprefixer:prod', 'cmq']);

    /* ТАСК ДЛЯ СОЗДАНИЯ ФАЙЛОВ БЛОКА */
    grunt.registerTask('create', function () {
        var name = grunt.option('name') ? grunt.option('name').split(',') : [],
            tech = grunt.option('tech') ? grunt.option('tech').split(',') : ['js', 'jade', 'less'],
            blockFolder, // папка для конкретного блока
            i;

        // создаваемый блок обязан иметь имя
        if (!name.length) {
            grunt.log.error("Введите имя блока");
            return;
        }

        for (i = 0; i < name.length; i++) {
            blockFolder = path.normalize(path.join(blocksFolder, name[i]));

            // Не создаем блок если он уже существует
            if (grunt.file.exists(blockFolder)) {
                grunt.log.error("Блок с именем «" + name[i] + "» уже существует");
                continue;
            }

            // Всегда создаем папку для картинок. Автоматически создатся и папка блока
            grunt.file.mkdir(path.normalize(path.join(blockFolder, "images")));
            // создаем файлы для каждой технологии
            createTechFile(name[i], blockFolder, tech);
            grunt.log.success("Блок «" + name[i] + "» успешно создан");
        }
    });

    grunt.registerTask('update', function () {
        var name = grunt.option('name'),
            tech = grunt.option('tech') ? grunt.option('tech').split(',') : undefined,
            blockFolder;

        if (name === undefined) {
            grunt.log.error('Введите имя блока');
            return;
        }
        if (tech === undefined) {
            grunt.log.error('Введите название технологии');
            return;
        }

        blockFolder = path.normalize(path.join(blocksFolder, name));

        if (!grunt.file.exists(blockFolder)) {
            grunt.log.error('Блока с именем «' + name + '» не существует');
            return;
        }

        // создаем файлы для каждой технологии
        createTechFile(name, blockFolder, tech);
        grunt.log.success("Блок «" + name + "» успешно обновлен");
    });

    grunt.registerTask('rename', function () {
        var fs = require('fs'),
            path = require('path'),
            name = grunt.option('name'),
            newName = grunt.option('new'),
            blocksFolder = 'src/blocks',
            blockFolder = path.normalize(path.join(blocksFolder, name)),
            newBlockFolder = path.normalize(path.join(blocksFolder, newName)),
            techs = ['js', 'jade', 'less'];

        // errors handlers
        if (!name) {
            grunt.log.error("Введите имя блока, который вы хотите переименовать");
            return;
        }
        if (!newName) {
            grunt.log.error("Введите новое имя блока");
            return;
        }
        if (!grunt.file.exists(blockFolder)) {
            grunt.log.error("Блока «" + name + "» не существует");
            return;
        }
        if (grunt.file.exists(newBlockFolder)) {
            grunt.log.error("Блок c именем «" + newName + "» уже существует");
            return;
        }

        //rename files
        techs.forEach(function (item, index) {
            var filePath = path.normalize(path.join(blockFolder, name + '.' + item)),
                newFilePath = path.normalize(path.join(blockFolder, newName + '.' + item));

            if (grunt.file.isFile(filePath)) {
                fs.renameSync(filePath, newFilePath);
            }
        });

        // rename folder
        fs.renameSync(blockFolder, newBlockFolder);
    });

    function getTemplate(tech) {
        return grunt.file.read(path.join(tplFolder, tech + '.txt'));
    }

    function toCamelCase(str) {
        return str.split('-').reduce(function (result, item, index) {
            if (index === 0) return item; // первое слово оставляем как есть

            var str = item[0].toUpperCase() + item.slice(1, item.length);

            return result + str;
        }, '');
    }

    function createTechFile(blockName, folderPath, tech) {
        var tpl;
        for (var j = 0; j < tech.length; j++) {
            switch (tech[j]) {
                case 'jade':
                    tpl = getTemplate('jade');
                    tpl = tpl.replace(/{{blockname}}/g, blockName);
                    break;
                case 'less':
                    tpl = getTemplate('less');
                    tpl = tpl.replace(/{{blockname}}/g, blockName);
                    break;
                case 'js':
                    tpl = getTemplate('js', blockName);
                    tpl = tpl.replace(/{{blockname}}/g, toCamelCase(blockName));
                    tpl = tpl.replace(/{{projectname}}/g, grunt.config('pkg').name);
                    break;
                default:
                    tpl = '';
            }

            grunt.file.write(folderPath + "/" + blockName + "." + tech[j], tpl);
        }
    }
};
