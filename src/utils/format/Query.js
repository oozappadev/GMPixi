
// Convert an oject of data into a URL query string

var Query = Object.create(null);

function parseToQuery(key, obj) {
  switch(typeof obj) {
    case 'undefined':
      return encodeURIComponent(key);
    case 'object':
      if(obj === null) {
        return encodeURIComponent(key) + "=null";
      }
      else if(Array.isArray(obj)) {
        var str = "";
        for(var i=0; i<obj.length; ++i) {
          var v = obj[i];
          switch(typeof v) {
            case 'undefined':
              str += encodeURIComponent(key) + "[]";
              break;
            case 'object':
              if(v === null) {
                str += encodeURIComponent(key) + "[]=null";
              }
              else {
                str += encodeURIComponent(key) + "[]=" + encodeURIComponent(JSON.stringify(v));
              }
              break;
            default:
              str += encodeURIComponent(key) + "[]=" + encodeURIComponent(v.toString());
              break;
          }
          if(i < obj.length - 1) {
            str += "&";
          }
        }
        return str || key + "[]";
      }
      return encodeURIComponent(key) + "=" + encodeURIComponent(JSON.stringify(obj));
    default: 
      return encodeURIComponent(key) + "=" + encodeURIComponent(obj.toString());
  }
  
}

Object.defineProperty(Query, 'stringify', {
  enumerable: true,
  value: function stringify(q) {
    

    if(!q || typeof q !== 'object') {
      return "";
    }

    var queryString = "";


    for(var k in q) {
      queryString += parseToQuery(k, q[k]) + "&";
    }

    queryString = queryString.substring(0, queryString.length - 1);

    return queryString ? "?" + queryString : "";
  }
});

Object.defineProperty(Query, 'parse', {
  enumerable: true,
  value: function parse(str) {
    if(typeof str !== 'string') {
      return "";
    }

    if(str.indexOf("?") > -1) {
      str = str.substring(str.indexOf("?") + 1, str.length);
    }

    var obj = {};
    while(str !== "") {
      var o;
      if(str.indexOf("&") < 0) {
        o = str;
        str = "";
      }
      else {
        o = str.substring(0, str.indexOf("&"));
      }

      str = str.substring(str.indexOf("&") + 1, str.length);

      var key;
      var val;
      if(o.indexOf("=") > 0) {
        key = decodeURIComponent(o.substring(0, o.indexOf("=")));
        val = decodeURIComponent(o.substring(o.indexOf("=") + 1, o.length));
      }
      else {
        key = o;
        val = "";
      }

      if(val.toLowerCase() === 'false' || val.toLowerCase() === 'true') {
        val = Boolean(val);
      }
      else if(val !== "" && !Number.isNaN(Number(val))) {
        val = Number(val);
      }
      else {
        try {
          var tmp = JSON.parse(val);
          val = tmp;
        }
        catch(e) {}
      }

      if(key.indexOf("[]") > 0) {
        key = key.substring(0, key.indexOf("[]"));
        obj[key] = obj[key] || [];
        obj[key].push(val);
      }
      else {
        obj[key] = val;
      }

    }

    return obj;
  }
})

module.exports = Query;
