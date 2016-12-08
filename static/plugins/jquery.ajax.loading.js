/**
 * Created by toplan on 15/7/11.
 */

(function($){
    var loadingImgBase64 = 'data:image/gif;base64,R0lGODlhLgAuAPMPAAAAABERESIiIjMzM0RERFVVVWZmZnd3d4iIiJmZmaqqqru7u8zMzN3d3e7u7v///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAwAPACwAAAAALgAuAAAE//DJSesDOGttu/dbKGJfWY2oaJZpu62WK7/wNd/kiu+A6RYHBYPhYOw+LYOi4Wg6eaBRIdFgOpsLaGxkWFS/VwevR0EZGF+wMzsui87pajGBOBzGZFuo4I0vDHghEiMJaGkIgSp6GmdDVQx3iYKEQ5WIkjMFlUMKmDcHmwyAnjKFlWykLkKWqTILrwuQrS6wr6OzKLV/uCm6kbwiCrWXwCEIsAoJxSIHC8IKCrfLGAXQ1sTTGAjWyb+tixnV1gkJ0p6DzNDkdOaS6HsJyeQIdQQjAQE4E1Lr9PQHBgoQGDBAgEF8N9y8mfcPYECBBA/mk3FCir86DgMOLCgA38QUHThQFDDQ0KHAjRI/Ktoi0oCdjBAjdmyBpAWBkQZynixIkUUxGMBqgDsn9J27ogoDIQ3ZZqlPF0UjAAAh+QQJAwAPACwAAAAALgAuAAAE//DJSesDOGttu/dbKGJfWY2oaJZpu62WK7/wNd/kiu+A6RYHBYPhcAwVCNmnZVA0nsVosTEDjQqJp1YbfRyqsZFhsS13C7eTmFE2T3eU9bC8SCAOB0RiAZdcF0OBDQsGPCN+IgiBgUmGhzYbBotDX46HIwmTjZY3BZMKnDsHC6SAhaE3e6WgqDcKpQubrS6wC5WzLq+lp7gtCroKvL0ovwu/t8OYv8fJKQjLSM0oTb8JCcLSGQXL1rLZGc/WdtizkBpY4ggIaL2IIQfd6gfs5ebn6vJ4BgT19tr4eA4YMFBgwAABAgIE4BHnSj6BBAkYRKiwzwQUQAIOLCDxYMKFaTXCiCBgQF/Ejh9BurCCguRGjhNTKmGZgoDNjh5VpvCRDYa0Gv5QAb3YaqgaTkY7OErKcyXQCAAh+QQJAwAPACwAAAAALgAuAAAE//DJSesDOGttu/dbKGJfWY2oaJZpu62WK7/wNd/kiu+A6RYHBYPRaAwVh4Lr0zIIi9CGY+poKAwt0KiQGEa/1Gki1UEZFkPiFxp+YMkUMzqtjlapD4UsLjrT0wsJCAcHCF1TNksSW0J/C28hBw0HN4siCAwLcwwIPHB9mqELlJ4oiRsIogudpTsFqmOtOweqkLIzqaGxtzcJCgoLCqy8M7/GtsQtxr/IySjLV84yywnN0iG+Cdqk1yiG2oLdKQbgCAhK4iJc5ubc6RuF7EnipxkF8oQE15aR7QcGBvQ547cBCKF/BgoQGJBswpaDABUOGCAgQIBWfNQBjLiQYsWLnjpOjCCwUaJHiyFjjCzAsqOAjzy0oBhAwCXMHUxcTHxpEeQMH+9gpKtRjxhRh0aPZsSoVGXMpiz2EI0AACH5BAkDAA8ALAAAAAAuAC4AAAT/8MlJ6wM4a22791soYl9Zjaholmm7rZYrv/A13+SK74DpFofEYtFoDBOHguvTMiQYUEZxOlUYWqBRARGNUqkOR0I56qAKiq73Www7GNcyBWVYMOxqKdvtaBxQcyIFQ4RRCwgIBwcIT21uDwyAEloKhIRWIwcLfAlYNiEIlkMILggOkEufGmiifzIICjKqGqGVQ648PGgKvAqdubkGvbxxwDuwvb/GOwnJuMs3CdLSxdAz09Jk1tfTCNrbpYiI1eAp4uPlMouIiukuBuKKBO4pW4kHBuT0GwaK+Abz6M3CAOSfgQID3E0S0S9fgQIEEpZbGIJAvoMEIgoIAG7CCIsPRSMOELCR47JAIgiEHDCyJLQTIwZkZEkygElgZmKybGnTWBYUAnje5MHEhc2hOHzsy6FUYA2nNSi+jArzJNWcRK829VQjAgAh+QQJAwAPACwAAAAALgAuAAAE//DJSesDOGttu/dbKGJfWY2oaJZpu62WK7/wNd/kiu+A6RaHxGLBYAwTh4Lr0yoIi1BGY9pgKAwt0KiAGEah1HBCOeqgCoqh+isNTxnYMgVlSKu9X3fD4WjEVRNbdncLCggIBgYICW1UfH5yNiFOhXdXIwYLjnwMZCESIwcKaaQHLgh7fHwJciJoo7B/LQepDhKeHCMIsKOmNwh8Dws7r6MJCDxSPAAGCc7OsjO4OEHPyMvYi86I2NmHh9HdM9+H0+Iy3wdJ5zuH6uvsN+/q5vF06on19q74BgUD+1wQSOSvAIGAP/IRIAAQYQ8RAwsYHDBAAEJQEA0yrBggIMYQA0UWUuTY0V4gESEpChAQoCS7OSNGrmxpEqaIlSxdnjODYqZObFpQtPy5jIlDGkaP9tBxtIakfU5PvoxqsxtVnjyu+pARNQIAIfkEBQMADwAsAAAAAC4ALgAABP/wyUnrAzhrbbv3WyhiX1mNqGiWabutliu/8DXf5IrvgOkWB8RiwWAME4eC69MqCIfEorSoMLRAI6cCCp0WGw1GQjnqoAqJxZYbnYLBC2uZgjIo7uuul/EGM+QqE1kJeHkKCAcGBghCfH1hgDQ2IWiFdwmRGgYLjw4LZCESIweWCgcuCH0ODglzImgJsYSZKAeqDrQ9o7Kxpzepq6sKN04JCLEIPAvBq6Ati4yMzjMGzA7JMkHRvjwMDhOt2dEIuTIKDWM4jAfs0zw77PEE7/QA8Yrz9Tzsigb5+jj6GSjwD+CMAooKEDSIg4BCggQEMJwxQCEBAgMGTJxxEeMAARJON2aYpGGAR5ACAojsQbJkRpABVIoUJULAx5QyZ9IMgTLmSjojcK5kKWiET50nhgaKoTQUlqY5mECF0bRGS4ZWixrMmlQfVzPvvvqQkTUCACH5BAkDAA8ALAcABwAgAB0AAAS7EMhJgUFKrZWf/2AoetpmLkzKJGP7HFl2bmrqjnE51+rtJTnZiWfzPRLAHOtz+BRvCKRUgfAxGljsCBGVGj3XbCPELVe/Iu3HjDCgQWIPgd18f7KO8evAr9vveg8GfQdufyAOiQqDBo0FFZCREgmJiQyNmASSmxMIlXmYBQUDnJwHnw6iqqSlkqefogSyrK2tsgQDubW1ub0Cu62+AgIBwJwCA8PExcabygHQzZsBy9Kl0dbZ2tvc3d4AEQAh+QQJAwAPACwHAAcAIAAdAAAE1RDISYFBSa2lFDpFJY4F0p3apibGSB4Zqs4LwyChK5VJj6Y0G2PRcpUQmF6sExQOi5UjMpn4HAyGg6nmtEElBO10+qUYFN3GIifJWpHlEULYqCcm4YNez9ZJDjZ1dUVZeyB+IgiCdQoABFiQcYgAC4sNBY+RBJMiBpY4BaGhnCOVggqiBAQDpCIJiwuqqwOsrRQIDnW5s7QCthQHuQ0ODrS9vr9/xMsDAs4CAckSuMsNzwHY0gAJyw4MztjR2goODw8OCuHaUa8IAOLr8fLz9PX29/j2EQAh+QQJAwAPACwHAAcAIAAdAAAE1RDISYFBKSmVkSlVKBZHtp3boiagGJJYZp5qvSCtC8BIL6M2FUNh0PF6MQ0tuGAsiiHCYYpEHgzYA0JhY3ifIcOUijjkKgaud704F7JjqA6AaK4ZickAyzfPKQd3XlAEBYZYZ390gnkDhYaGiiEKDA2WDQWOBJsEA5Jol5YIA6SlnyELoQqlpqcUCaELArO0roChDLQBAgG2EwehDQHDxL4SwKG9AMXGCA6Wz8YiCQ7VDgzSIQzWDgrZgNwOCN8TDeGJ0s4P1d7kFAjrcu4T4/P29/jkEQAh+QQJAwAPACwHAAcAIAAdAAAE2hDISYE5CCWVEjJVKAIFlnWdoqpIMYbElc3oqiys+wLx4c+a1Aq3wOlEPZ+JthkWnyCYYXr5HajTg+rJPU4KYOrVSzEkuEWFlwAOG8iiA5fBQEwGhDy7QNhR5HSBUQOEeAQDfhUIgXQJAAKFhYkhCowMBQKZmQMCkxUGlgcBo5qeIQuMCaOrAaYVCQwNsgsSrK5/srIMFa23Ege5sr4jwMHDccG7x6/BtMsUsbkKzxMHDsF21AAM1w3XcL4IDuPj09Ti5ONRzwkP6Y7aAAfuDpfxEu0N6/c+9zsRACH5BAkDAA8ALAcABwAgAB8AAATbEMhJQTEHaX1M/SBAGNiRbUmaIEX4DRdpnpqq3KwrDUQRlzTbTZFohXg9H6m0QaSGQ89HMKgSkiSf0uAcLhRfI6VKvhIGIe5twQ5TBHAqWSc5rNuISSAQj9MnBm1tUnuFe38UB4ILCRIBjoeIFAltDAtikmlsDJwHmXQKnJyNny4IopalLgeoDKppra8grJwNrrIVrA27t7gTCbu7C74UC8ENCsQSBscNecrGx5iyCM3JxAfNDVK4CA4Ox6SyBQ3f5g4M06oM5+Dcvg/mDZ7KAAvxDO/KyOrE/QARACH5BAUDAA8ALAcABwAgACAAAATXEMhJASnm6G2q/8BwGeSGnOdRgJ4gXlh5oEhiq6zkDm8RmydbQpFYgQQ7HgGW0aCECmLHEwggk8vsaAaNKoyUahXJG4AKtaG3SBUjc5KDN7pAgMTwiYGuWHzzgHILg3WAgAmEg2CGIAaJCweMcH2ECZI5CIkKlywHDAsMn5yNoaWjHwaloacenqqsFQiqC7AUoKWWtQAGDQ0MvpG6C729DIunCMS9ubAHyr1TrMnPzKMHCw7PxqcKDA7fz9Gc2N/Z3wzinAkP5efpp+1/ugDZCu+sBgjHFREAIfkECQMADwAsCgAHAB0AIAAABLPwySkHKcVoXaj/jzCMV2YcKKgCgUheGno8SK1KbOtaWDzXiAQCBMjpSL3Tr5ZIfIrFgHQ38gCbTQo0qrsdhtgnVHqbGMIPxUwLKKsUabd8oqjD52WEvY4v8+99Kk4TQ4GGhw8LiYqIHguPj40UkJGSE5SWH4CNm5kPDAyfngqgoJ6lppahn6meoogGDw2OfShBEg2zE6t4DA6/srnBh7/FuceMgQvFDrgNg4bMzZnLoGpuEQAh+QQJAwAPACwKAAcAHQAgAAAE1RDIKYUYg5DCC/2gFAQWlnGGcRheGI7lWaRHzboffGUbXSOHFk5EwmhmqgNiiRDiRqRd78dsDocEVTVhveIM28TBOwQjEuiEk/wxpBMKBBt3hisU67nEcO+P9SB2d3KAHwd9CgmFhncLd4sUfAuOC5ATBpOZlhIHmZObAAieCqAKnoqWBgyef5AKDKureXMIsLaoiwe2tgaQtbsMhICYDcW2C7MUiUBKCQzF0LxeDA7V1dDYDQy9Xg/W2dgL3FcG3tfgDWpsDdbt0ArjZAWv1A6wCkFDEQAh+QQJAwAPACwKAAcAHQAgAAAE1BDISUEIQoxdu6dXthFFQXyoFGoDWRhm6q1jadynDGIjeR/Agk5FI/gMwODQM3ghgYiDcNkpJBHYA9VjxXqnW4rBi0how5UDNsEGowGFMjtheFPkbIR9cpgrEnsSBgqEf4EAg4UKh4mFhweFC4uBCJILC4CBCZeXensGnJdndgqhC25hlaGebwcLDKF1bwgMtbAMrBUFDKMVoLa2px8PDg4MCVFqmw3AtQuyHQfF0w3V1tXAzyjE1NfXwdAdBtPd3szHqOIK5A7mDArhMlYKtdjvUikRACH5BAkDAA8ALAoABwAdACAAAATYEMhJaQhC1M35zUPYjdUnhAQxkKSJFgXBdh9KFIYhz1Y9pLjcjlc53YIHHZEzCBoOySWHkINCC9JNwYpAHLKbZ7eLBU+244TBTDmMveyJoZvoxiXzhD5xBxj2en1/egp8dwYKiYV9B4qLdwmOCIeOCl9xCQsKmgplZgcLoaGTbaQzoKKangAIDg6mIwipoxQGD64ODGsciAyznRMID7e4Dgt1SV0LDMy+orsSBQ3FDdXW1c3ZodByDLjX4NnMCtwUBQrf4NjZCKu8CurWzWpLWwrM2McH7hURACH5BAkDAA8ALAkABwAeACAAAATVEMhJq70408C1t5wgfCQQDmiZhQKaqhUXiChBDHBMD3ZR5JYWz2f4ASk8AtFAOCKXB4OTUjAYDtjmFEC4Yg/Grfe7lVwR6EMZUEC71203Ai6flw2IhN6+Pej3a3l/fGxABgqICQpSEgwMQAiIkj8MDw4OhB8HkohzDZegaiQGC5wKPwqglw2ZFwcLsKULdgUMoA24C4wWh7GxpxMGnw64xQsJCFZoCwy+sIsVB8PF1I7Wzb7QvAzU3dfYz2EWBQnduN/Ws+IYh97fx+seBZuwjrAJYBoRACH5BAUDAA8ALAcABwAgACAAAATZEMhJq7046827/0AQgJ44kpopCGgmrmxrvcJgy1UA28SAUyvbgED4UXiEQsFnBAyTymITADUYClNqwWrNErgHg9dwKB+85nK2UEa4J4gFQmZwu8sNx8PBkB3sCH8Og4NnJAWACFeEgwsoCAmRCQhYCowOcx8HkpGGBoQNoYYcBgqcCVgSCYOhoZkaBwqys6MABQwOraELYhcGCbOzqBUGDLqhDHKKZAgKC88LwqnExscM19jQz8G9vgvW2Mna0QvDGgUJreHZ2gqUHqXr7M/vh5vP19EJB9MXEQAh+QQJAwAPACwHAAoAIAAdAAAEuBDISau9OOvNu/9UAHpBOW6loJ5XGagra73qMDx4ru/8/tpAmQU4IBCEFZvRiKQUCYXogsFYLISDaNTg6HYNsoFhPG54HQgZgTxmnBOywmF+MCi8vXzPQK/nGmYGeoNzCHM4ZoANg3oHCI8IOoqAjDwGkI+SlJU8CQmYO5MNDJwPnp6ZPKKkgwgKCqeflVQMCoY6Ca+6npy0vlbAuruzvlTAx8KlD8VVxwvCB8qmv87P0j0KwbaCgxEAIfkECQMADwAsBwAKACAAHQAABNAQyEmrvTjrzbv/YCiOZGkCAYAsxykFcKA4j8O0YwwLjOM7CVJMQGz8HDhRgCgYDI5IUtPp/BmToamTYGwYEaQBYTzueRvB0aBAKLgV58aC5K4XEPGGQUQw+P1teXMhf38EAHBxYB8FB46OewAGeTced4+OhxIJcQwMixoGCKOkkRIFCw2eqwqmFXekpAeaEwartwwKCAd+jgm/v7EFF7a4C8fHCsrKwAmjwxgGC7fIyMvMwdAZd6vV1tcJB9obBgneC9fKCOOWBwjKyc4G7BURACH5BAkDAA8ALAcACgAgAB0AAATVEMhJq7046827/1oCeobjIOOmmI9zpFdhzgpsIbP52tQ6M7wKw9FoOETBibF4SkoCxeguFahao8XpyBoQCLANFKzr9S6wyJRgwGYrsAtbu43AMgypAUFP2BfsNSMEBX19AwAJDA0MjGIeBAYFkoQSBoyXDFoaBQadnQWHEomYC44ZBQcHnpEUBQukCwp4MQcIqbcGBBUGr4wLv7GpnrUIxba3uha8DMDACs8KCdLGxgcFGQYKzM2x0NIJ1NYbBQjc0M/f1dcd5M7n0eDiI5wI0ujgrBkRACH5BAUDAA8ALAcACgAgAB0AAATYEMhJq734NMy7NI2zeeRUMI7zjKWXpOnadgacNsfMKWLoIDpMIdQILYIYRLHoyCEtimXj+LQspImqRYrTVrgGL4XrFAMYSwbQDLiiGdlnYE5PMO4MKlJAnx/wd2FBAoSFAieACkgDjIYAdngLay2MlYwfkQsLZR4DBQSgBJcSCHmampwYBAWsn6IUBQqmpwmCFgUGuQatBQMVBqfBCgkHurkHyMW6vRfAwQsK0QnTCNXJygYEHLGa0d7D1NUIydkeBQjf3tMJ4tblJefp6+27SLgI08PuBR0RACH5BAkDAA8ALAcACAAgAB8AAAS/8MkpDb0456Kc/uBjME4ZnpNVlgXqrqZ7Nusif83T0A5ya7vgD5TTFYeZ4hGJszCf0KiEMaFKp4ys9arNXqvew/dBpfqQgLT6omCq15KFHP1OP2xy2zAQqE/yD2IyfIR8f3MVLgKLAoUUehJtJwOUA4wBGJAKCmcZAwQElZQCABhtp5sJCBYFrQUGBq2glQIam7cKCboIvAcHsLEFoKEgCZsSuqq9vsCyAzfJvMvABsQ/u9K+v8JMB9IIzMJ1dREAIfkEBQMADwAsBwAHACAAIAAABNMQyEnLQTTrnY1yzsONXJGAKKlOBoOCT7KSLdi8y8y1TX+DDIVOU1j4eo6FYbhJHHsYpsbwbBykzWcUW2Ecc9zMwetbhikKhpoBPk8Wa8bWDYgzrnSJ3Zy34/NwbHd5EgoLhwtzbgmIC0KEB41KhEWNMoQIiAoKf24FhpubfCoBJJmhCgmdHAGtIyaoCQkIBRwCt62lO7GyCAcGBQTCAwQDA7i5OwmbsrMIvgbAwcbHyK/Lzc8H29EF08a4Kha9z76/3cPgOhbl5tHoxlgFBtv16CoRADs=';
    var config = {};

    $.loading = function (options) {

        var opts = $.extend(
            $.loading.default,
            options
        );

        config = opts;
        init(opts);

        var selector = '#' + opts.id;

        $(document).on('ajaxStart', function(){
            if (config.ajax) {
                $(selector).show();
            }
        });

        $(document).on('ajaxComplete', function(){
            setTimeout(function(){
                $(selector).hide();
            }, opts.minTime);
        });

        return $.loading;
    };

    $.loading.open = function (time) {
        var selector = '#' + config.id;
        $(selector).show();
        if (time) {
            setTimeout(function(){
                $(selector).hide();
            }, parseInt(time));
        }
    };

    $.loading.close = function () {
        var selector = '#' + config.id;
        $(selector).hide();
    };

    $.loading.ajax = function (isListen) {
        config.ajax = isListen;
    };

    $.loading.default = {
        ajax       : true,
        //wrap div
        id         : 'ajaxLoading',
        zIndex     : '1000',
        background : 'rgba(0, 0, 0, 0.7)',
        minTime    : 200,
        radius     : '4px',
        width      : '85px',
        height     : '85px',

        //loading img/gif
        // imgPath    : '/static/images/ajax-loading.gif',
        imgWidth   : '45px',
        imgHeight  : '45px',

        //loading text
        tip        : 'loading...',
        fontSize   : '14px',
        fontColor  : '#fff'
    };

    function init (opts) {
        //wrap div style
        var wrapCss = 'display: none;position: fixed;top: 0;bottom: 0;left: 0;right: 0;margin: auto;padding: 8px;text-align: center;vertical-align: middle;';
        var cssArray = [
            'width:' + opts.width,
            'height:' + opts.height,
            'z-index:' + opts.zIndex,
            'background:' + opts.background,
            'border-radius:' + opts.radius
        ];
        wrapCss += cssArray.join(';');

        //img style
        var imgCss = 'margin-bottom:8px;';
        cssArray = [
            'width:' + opts.imgWidth,
            'height:' + opts.imgWidth
        ];
        imgCss += cssArray.join(';');

        //text style
        var textCss = 'margin:0;';
        cssArray = [
            'font-size:' + opts.fontSize,
            'color:'     + opts.fontColor
        ];
        textCss += cssArray.join(';');

        var html = '<div id="' + opts.id + '" style="' + wrapCss + '">'
                  +'<img src="' + loadingImgBase64 + '" style="' + imgCss + '">'
                  // +'<img src="' + opts.imgPath + '" style="' + imgCss + '">'
                  +'<p style="' + textCss + '">' + opts.tip + '</p></div>';

        $(document).find('body').append(html);
    }

})(window.jQuery||window.Zepto);
