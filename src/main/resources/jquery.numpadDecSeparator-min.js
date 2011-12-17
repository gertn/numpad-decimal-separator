(function(e){var a={init:function(h){return this.each(function(){var i="",k=e(this),j=k.data("numpadDecSeparator");
if(!k.attr("readonly")&&!j){e(this).data("numpadDecSeparator",{target:k});
k.bind("keydown.numpadDecSeparator",function(l){i=l.keyCode
}).bind("keypress.numpadDecSeparator",function(l){if(b(i)&&!l.shiftKey&&!l.ctrlKey&&!l.altKey){f(this,d(h));
l.preventDefault()
}})
}})
},unbind:function(){return this.each(function(){var i=e(this),h=i.data("numpadDecSeparator");
i.unbind(".numpadDecSeparator");
i.removeData("numpadDecSeparator")
})
},version:function(){return"1.1.3"
},mergeDefaults:function(h){e.extend(e.fn.numpadDecSeparator.defaults,h)
}};
e.fn.numpadDecSeparator=function(h){var i;
if(a[h]){return a[h].apply(this,Array.prototype.slice.call(arguments,1))
}else{if(typeof h==="object"||!h){if(h){i=e.extend({},e.fn.numpadDecSeparator.defaults,h)
}return a.init.call(this,i?i:e.fn.numpadDecSeparator.defaults)
}else{e.error("Method "+h+" does not exist on jQuery.numpadDecSeparator")
}}};
e.fn.numpadDecSeparator.defaults={separator:",",useRegionalSettings:false,predefinedVariables:{SPACE:" ",COMMA:","}};
function c(){var h=1.1;
h=h.toLocaleString().substring(1,2);
return h
}function b(h){return e.browser.opera?78==h:110==h
}function d(h){return h.useRegionalSettings?c():g(h)
}function g(h){return h.predefinedVariables[h.separator]?h.predefinedVariables[h.separator]:h.separator
}function f(h,j){if("selectionStart" in h){var k=h.selectionStart+1;
h.value=h.value.substr(0,h.selectionStart)+j+h.value.substr(h.selectionEnd,h.value.length);
h.selectionStart=k;
h.selectionEnd=k;
h.focus()
}else{if(document.selection){h.focus();
var i=document.selection.createRange();
i.text=j;
i.moveStart("character",-h.value.length);
i.moveStart("character",i.text.length);
i.moveEnd("character",0);
i.select()
}else{h.value+=j
}}}})(jQuery);