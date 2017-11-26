
var object = {};

function define(obj, key, val) {
    if(typeof obj === 'undefined') {
        throw TypeError("Object where to define is undefined.");
    }
    
    if(typeof key === 'undefined')  {
       throw TypeError("Object key is undefined.");
    }
    
    if(typeof val === 'undefined')  {
       throw TypeError("Object value is undefined.");
    }
    
    if(typeof obj[key] === 'undefined') {
        obj[key] = val;
    }
    
    
}

Object.defineProperty(object, 'create', {
    value: function() {
        var baseClass = arguments[0];
        var props = arguments[1];
        var args = [];
        
        for(var i=2; i<arguments.length; ++i) {
            args.push(arguments[i]);
        }
        
        function Class() {
            baseClass.apply(this, args);
            if(typeof props !== 'undefined' 
                    && typeof props.setup === 'function') {
                props.setup.call(this);
            }
        }
        
        
        Object.defineProperty(Class, 'prototype', {
            value: Object.create(baseClass.prototype || baseClass || null)
        });
        
        for(var key in props) {
            
            (function(k, v) {
                switch(k) {
                    case "update":
                        
                        if(typeof v === 'object') {
                            
                        }
                        else if(typeof v === 'function') {
                            
                        }
                        break;
                };
                
            })(key, props[key]);
        }
        
    }
});

