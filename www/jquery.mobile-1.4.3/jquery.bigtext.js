﻿/*global jQuery */
/**
 *  InflateText.js -- 98% derived from FitText.js (http://fittextjs.com)
 *
 *  Options
 *  - scale       {Number}  Scaling factor for the final font-size (defaults to 1)
 *  - minFontSize {Number}
 *  - maxFontSize {Number}
 *
 *  @author RJ Zaworski <rj@rjzaworski.com
 *  Released under the WTFPL license
 *  http://sam.zoy.org/wtfpl/
 */

(function($) {

    var testSize = 96;

    var defaults = {
        'scale'  : 1,
        'minFontSize' : Number.NEGATIVE_INFINITY,
        'maxFontSize' : Number.POSITIVE_INFINITY
    };

    function _debounce (callback) {

        var handle;

        return function() {

            var args = Array.prototype.slice.call(arguments, 1),
                interval = 100,
                _test = function() {
                    callback.apply(this, args);
                    handle = null;
                };

            if (handle) {
                clearTimeout(handle);
            }

            handle = setTimeout(_test, interval);
        }
    }

    $.fn.inflateText = function (options) {

        var settings = $.extend({}, defaults, options);

        var minSize = parseFloat(settings.minFontSize),
            maxSize = parseFloat(settings.maxFontSize);

        return this.each(function(){

            var $this = $(this);

            // Remix: resize items based on object width divided by the scaling factor
            var resizer = function () {

                var mask = $('<div style="height:1px;overflow:hidden;"></div>')
                    .appendTo('body');

                var test = $this.clone().css({
                    display  : 'inline',
                    fontSize : testSize + 'px'
                }).appendTo(mask);

                var scaledSize = settings.scale * testSize * $this.width() / test.width();

                // scale font down to fix IE bug
                $this.css('font-size','12pt');

                // update width
                $this.css('font-size', Math.max(Math.min((scaledSize), maxSize), minSize));

                // remove test element from DOM
                mask.remove();
            };

            // Call once to set.
            resizer();

            // Call on resize. Opera debounces their resize by default.
            $(window).resize(_debounce(resizer));
        });
    };
})(jQuery);
