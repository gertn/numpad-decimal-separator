(function(e){var h={separator:",",useRegionalSettings:false,predefinedVariables:{SPACE:" ",COMMA:","}};
var a={init:function(i){return this.each(function(){var j="",l=e(this),k=l.data("numpadDecSeparator");
if(!l.attr("readonly")&&!k){e(this).data("numpadDecSeparator",{target:l});
l.bind("keydown.numpadDecSeparator",function(m){j=m.keyCode
}).bind("keypress.numpadDecSeparator",function(m){if(b(j)&&!m.shiftKey&&!m.ctrlKey&&!m.altKey){f(this,d(i));
m.preventDefault()
}})
}})
},unbind:function(){return this.each(function(){var j=e(this),i=j.data("numpadDecSeparator");
j.unbind(".numpadDecSeparator");
j.removeData("numpadDecSeparator")
})
},version:function(){return"1.1.1"
}};
e.fn.numpadDecSeparator=function(i){var j;
if(a[i]){return a[i].apply(this,Array.prototype.slice.call(arguments,1))
}else{if(typeof i==="object"||!i){if(i){j=e.extend({},h,i)
}return a.init.call(this,j?j:h)
}else{e.error("Method "+i+" does not exist on jQuery.numpadDecSeparator")
}}};
function c(){var i=1.1;
i=i.toLocaleString().substring(1,2);
return i
}function b(i){return e.browser.opera?78==i:110==i
}function d(i){return i.useRegionalSettings?c():g(i)
}function g(i){return i.predefinedVariables[i.separator]?i.predefinedVariables[i.separator]:i.separator
}function f(i,k){if("selectionStart" in i){var l=i.selectionStart+1;
i.value=i.value.substr(0,i.selectionStart)+k+i.value.substr(i.selectionEnd,i.value.length);
i.selectionStart=l;
i.selectionEnd=l;
i.focus()
}else{if(document.selection){i.focus();
var j=document.selection.createRange();
j.text=k;
j.moveStart("character",-i.value.length);
j.moveStart("character",j.text.length);
j.moveEnd("character",0);
j.select()
}else{i.value+=k
}}}})(jQuery);