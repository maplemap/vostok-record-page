'use strict';

var App = (function () {

    var config = {
            path: {
                templates: '/templates/'
            },
            views: {
                header: 'header.html.twig',
                main: 'main.html.twig'
            }
        },

        template = {
          header: true,
          main: true
        },

        init = function () {

            CreateTemplate('header', function(content){
                Render.header(content);
            });

            CreateTemplate('main', function(content){
                Render.main(content);
            });

        },

        CreateTemplate = function (tpl, callback) {

            template[tpl] = twig({
                id: tpl,
                href: config.path.templates + config.views[tpl],
                async: false,

                load: function(template) {
                    var content = template.render();

                    callback(content);
                }
            });

        },

        Render = {

            header: function (content) {
                $('#header').empty().html(content);
            },

            main: function (content) {
                $('#content').empty().html(content);
            }

        };


    return {
        init: init
    }

}());