'use strict';

var App = (function () {

    var config = {
            path: {
                templates: '/templates/',
                templatesData: '/data/templates.json'
            },
            views: {
                header: 'header.html.twig',
                main: 'main.html.twig',
                about: 'about.html.twig',
                contacts: 'contacts.html.twig',
                audioClips: 'audio_clips.html.twig',
                production: 'production.html.twig',
                instrumental: 'instrumental.html.twig',
                speaker: 'speaker.html.twig',
                voiceVideo: 'voice_video.html.twig',
                answerPhone: 'answer_phone.html.twig',
                footer: 'footer.html.twig'
            }
        },

        TMPdata = false,

        Templates = {
          header: false,
          main: false,
          about: false,
          contacts: false,
          audioClips: false,
          production: false,
          instrumental: false,
          speaker: false,
          voiceVideo: false,
          answerPhone: false,
          footer: false
        },

        init = function () {

            Get.TMPdata(function() {
                console.log(TMPdata);
                initRouting();
            });

        },

        Create = {

            twigTMP: function (tmpName, data, callback) {

                Templates[tmpName] = twig({
                    id: tmpName,
                    href: config.path.templates + config.views[tmpName],
                    async: false,

                    load: function(template) {
                        var content = template.render(data);

                        callback(content);
                    }
                });
            }
        },

        Get = {

            TMPdata: function (callback) {
                $.get(config.path.templatesData, function(data){
                    TMPdata = data;

                    callback();
                });
            },

            twigContent: function (tmpName, data) {
                var twigTemplate = twig({ ref: tmpName }), content = '';
                data = data || TMPdata[tmpName];

                if( twigTemplate ) {
                    content = twigTemplate.render(data);
                } else {
                    Create.twigTMP(tmpName, data, function(tmpContent){
                        content = tmpContent;
                    });
                }

                return content;
            }

        },

        Render = {

            header: function(data) {
                var content = Get.twigContent('header', data);

                $('#header').empty().html(content);
            },

            content: function(tmpName, data) {
                var content = Get.twigContent(tmpName, data);

                Render.header(TMPdata[tmpName]);

                $('#content').empty().html(content);

                if(tmpName != 'main') {
                    Render.footer();
                    Helper.initMainMenu();
                    Helper.setActiveClass('.nav-' + tmpName);
                    Helper.initMobileBtnMenu()
                } else {
                    Render.footer('clear');
                }
            },

            footer: function(data) {
                var $footer = $('#footer');
                if(data == 'clear') {
                    $footer.empty();
                    return;
                }

                var content = Get.twigContent('footer', data);

                $footer.empty().html(content);

                Helper.initCreatedData();
                Helper.initAuthorSign();
            }

        },

        initRouting = function () {
            routie({

                '': function() {
                    console.log('');
                    Render.header();
                    Render.content('main');
                },

                'about': function() {
                    Render.content('about');

                    Helper.initOwlCarousel('#equipment, #room, #people');
                },

                'contacts': function() {
                    Render.content('contacts');
                },

                'audioClips': function() {
                    Render.content('audioClips');

                    Helper.initUbaPlayer();
                },

                'production': function() {
                    Render.content('production');

                    Helper.initUbaPlayer();
                },

                'instrumental': function() {
                    Render.content('instrumental');

                    Helper.initUbaPlayer();
                },

                'speaker': function() {
                    Render.content('speaker');

                    Helper.initUbaPlayer();
                },

                'voiceVideo': function() {
                    Render.content('voiceVideo');

                    Helper.initUbaPlayer();
                },

                'answerPhone': function() {
                    Render.content('answerPhone');

                    Helper.initUbaPlayer();
                }

            });
        };


    return {
        init: init
    }

}());