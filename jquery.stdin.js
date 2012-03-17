/*
 * jQuery STDIN Plugin
 * Copyright 2011, Jeremy Peterson
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
*/
(function($) {
    $.fn.stdin = function (callback, passed_options) {
        var options = $.extend({
                                timeout: 300,// milliseconds
                                callback: callback,
                                stopChar: ["\t", "\n"]
                            }, passed_options),
            specialKeys = {9: "\t", 13: "\n"} ;

        $(this).each(function () {
            var t, stdin_cache = "";

            $(this).keypress(function (event) {
                var e = (!event) ? window.event : event,
                    code = (e.keyCode) ? e.keyCode : e.which,
                    character = String.fromCharCode(code),
                    special = specialKeys[ code ] || character;

                if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
                     event.target.type === "text") ) {
                    return;
                }
                
                clearTimeout(t);
                if (options.stopChar.indexOf(special) >= 0) {
                    options.callback(stdin_cache);
                    stdin_cache = "";
                } else {
                    stdin_cache += character;
                    t = setTimeout(function () {
                            options.callback(stdin_cache);
                            stdin_cache = "";
                        }, options.timeout);
                }
            });
        });
        return this;
    }

})(jQuery);
