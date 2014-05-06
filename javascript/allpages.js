        if (typeof jiml == "undefined" || !jiml) var jiml = {};
        jiml.namespace = function() {var a,o;a=arguments[0].split(".");o=jiml;o[a[1]]=o[a[1]]||{};o=o[a[1]];return o;};
/*
        !!! DO NOT CHANGE THIS FUNCTION FOR ANY REASON !!!
*/
        jiml.namespace("jiml.document");
        jiml.document.ready = function(){
         jiml.allpages.docready();
         jiml.currpage.docready();
        }
/*
        !!! DO NOT CHANGE THIS FUNCTION FOR ANY REASON !!!
*/

        jiml.namespace("jiml.allpages");
        jiml.allpages.docready = function(){
                
        }