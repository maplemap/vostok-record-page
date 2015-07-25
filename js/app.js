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
                Routing.init();
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

            twigContent: function (template, data) {
                var data = data || TmpData[tmpName],
                    twigTemplate = twig({ ref: template }),
                    view = '';

                if( twigTemplate ) {
                    view = twigTemplate.render(data);
                } else {
                    Create.twigTMP(template, data, function(content){
                        view = content;
                    });
                }

                return view;
            }

        },

        Render = {

            header: function(content) {
                $('#header').empty().html(content);
            },

            content: function(content) {
                $('#content').empty().html(content);
            },

            footer: function(content) {
                $('#footer').empty().html(content);

                Helper.initCreatedData();
                Helper.initAuthorSign();
            }

        },

        initRouting = function () {
            routie({

                '': function() {
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