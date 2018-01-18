(function($) {

    let defaults = {
        def: {
            display: "inline-block",
            "margin-left": "5px",
            width: "17px",
            height: "17px",
        },
        off: {
            "background-image": "url('http://www.uidownload.com/files/927/874/424/button-turn-off-icon.png')",
            "background-size": "cover"
        },
        on: {
            "background-image": "url('http://www.uidownload.com/files/508/723/822/button-turn-on-icon.png')",
            "background-size": "cover"
        }
    };
    let variant1 = {
        off: {
            "background-image": "url('https://i.stack.imgur.com/S43Qy.png')",
            "background-size": "cover"
        },
        on: {
            "background-image": "url('http://icons.iconarchive.com/icons/hopstarter/sleek-xp-basic/128/Ok-icon.png')",
            "background-size": "cover"
        }
    };
    let variant2 = {
        off: {
            "background-image": "url('http://download.seaicons.com/download/i7957/hopstarter/soft-scraps/hopstarter-soft-scraps-button-close.ico')",
            "background-size": "cover"
        },
        on: {
            "background-image": "url('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/120px-Approve_icon.svg.png')",
            "background-size": "cover"
        }
    };
    function reset(self) {
        $(self).each(function() {
            $(this).css("display", "inline-block");
            $(this).next("[data-span]").remove();
        });
    }
    let options = {};

    $.fn.checkPlugin = function(params) {

        if (params === 1) {
            options.off = variant1.off;
            options.on = variant1.on;
        } else if (params === 2) {
            options.off = variant2.off;
            options.on = variant2.on;
        } else if ( (typeof params === "object") && (params.width || params.height) ) {
            options.def = $.extend({}, defaults.def, params);
        } else if (params === "reset") {
            reset(this);
            return;
        } else if (params !== undefined) {
            console.error("This value does not match allowed values of the 'checkPlugin'!", params);
        }
        options = $.extend({}, defaults, options);

        $(this).each(function() {
            let mark = 0;
            let elem = $(this);
            elem.css("display", "none").after("<span data-span></span>");
            let targetSpan = $(this).next("[data-span]");
            targetSpan.css(options.def);
            targetSpan.css(options.off);
            if (this.checked === true) {
                targetSpan.css(options.on);
                mark = 1;
            }
            if (elem.closest("label").length) {
                elem.closest("label").on("mouseup", function() {

                    if (!mark) {
                        $(this).find("[data-span]").css(options.on);
                        mark = 1;
                    } else {
                        $(this).find("[data-span]").css(options.off);
                        mark = 0;
                    }
                    let targetElem = elem.find("input[type = 'checkbox']");
                    targetElem.checked = !targetElem.checked;
                });
            } else {
                elem.next("[data-span]").on("mouseup", function() {
                    if (!mark) {
                        $(this).css(options.on);
                        mark = 1;
                    } else {
                        $(this).css(options.off);
                        mark = 0;
                    }
                    elem.checked = !elem.checked;
                });
            }
        });
    }
})(jQuery);