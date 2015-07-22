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
                footer: 'footer.html.twig'
            }
        },

        TMPdata = false,

        Templates = {
          header: false,
          main: false,
          about: false,
          contacts: false,
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

        Routing = {

            init: function () {
                routie({

                    '': function() {
                        Render.header( Get.twigContent('header') );
                        Render.content( Get.twigContent('main') );
                    },

                    'about': function() {
                        Render.header( Get.twigContent('header', TmpData.about));
                        Render.content( Get.twigContent('about') );
                        Render.footer( Get.twigContent('footer') );

                        Helper.initOwlCarousel('#equipment, #room, #people');
                    },

                    'contacts': function() {
                        Render.content( Get.twigContent('contacts') );
                        Render.footer( Get.twigContent('footer') );
                    }

                });
            },

            content: function() {

            }

        };


    return {
        init: init
    }

}());