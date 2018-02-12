var codes = {};//global object to be used in function below; global var's should be declared outside functions in javascript
var conts = '';//string variable to display codes for each character

function master()  {
    var txt = document.getElementById("msg").value;
    var q = sort_freq(freq_meter(txt));
    //console.log(q);
    var tree = build_trim_tree(q);
    //console.log(tree);
    assignCodes(tree);//codes get populated with codes for each character
    //console.log(codes);
    var encoded = encode(txt);
    //console.log(encoded);
    var decoded = decode(tree,encoded);
    //console.log(decoded);
    for (i of Object.keys(codes)){
      conts += i + " :" + codes[i] + '<br>';
    }
    document.getElementById("cdtree").innerHTML = conts;
    var enc = document.getElementById("encoded");
    enc.innerHTML = "The encoded bit stream is " + encoded;
    var res = document.getElementById("result");
    res.innerHTML = "The decoded text is " + decoded;
}

function assignCodes(tree_array, patt = '') {
    if (typeof(tree_array) === 'string'){
        codes[tree_array] = patt;
    }else{
        assignCodes(tree_array[0],patt + '0');
        assignCodes(tree_array[1],patt + '1');
    }
}

function encode(str){
    var char_list = str.split("");
    output_bit_stream = '';
    char_list.forEach(function(i){
        output_bit_stream += codes[i];
        //output_bit_stream += ','; just for seeing individual codes for each char
    });
    return output_bit_stream;
}

function decode(tree_cpy, stream) {
    var decoded_msg = '';
    var p = tree_cpy;

    for (bit of stream) {// traversing the stream
        if (bit === '0') {
            // console.log(p[0]);
            p = p[0];
            //console.log(p);
        }else {
            p = p[1];
            //console.log(p);
        }
        if (typeof(p) === 'string') {
            decoded_msg += p;
            //console.log(p)
            p = tree_cpy;//the tree must be retained to detect next bit combination present stream
        }
    };
    return decoded_msg;
}

function combine(ip_arr){
    freq_summ = ip_arr[0][0] + ip_arr[1][0];
    new_arr = [freq_summ, [ip_arr[0][1],ip_arr[1][1]]];
    return new_arr;
}

function build_trim_tree(order_2_arr){
  var x = order_2_arr;
  while(x.length > 1){
      first_two = x.slice(0,2);
      //console.log(first_two);
      x = x.slice(2);
      //console.log(x);
      comb_arr = combine(first_two);
      x.push(comb_arr);
      x.sort();
  }
  x = x.pop().pop();
  return x;
}

function freq_meter(string_ip){
    var freq = {};
    var s = string_ip.split("");
    // .split() method of string, "" inside specifies where to split the string object,"" indicate
    // split at evry character .These form the set of symbols to be compressed as an array in Huffman encoding;
    s.forEach(function(i) {
              if (i in freq) {//instead of "i in freq"  "freq.hasOwnProperty(i)" can be used
                freq[i] += 1;
              }else{
                freq[i] = 1;
              }
    });
    return freq;// returns a javascript object..
}

function sort_freq(freq_dict){
    var x = [];
    (Object.keys(freq_dict)).forEach(function(i){
        var tup = [freq_dict[i], i];
        x.push(tup);
        x.sort();
    });
    return x;//returns a array of arrays. Each of the array contain
    //symbols and its frequency of occurence in increasing order of occurences..
}
