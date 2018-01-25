function freq_meter(string_ip){
    var freq = {};
    var s = string_ip.split("");
    // .split() method of string, "" inside specifies where to split the string object,"" indicate
    // split at evry character .These form the set of symbols to be compressed as an array in Huffman encoding;
    s.forEach(function(i) {
              if (i in freq) {//instead of "i in freq"  "freq.hasOwnProperty" can be used
                freq[i] += 1;
              }else{
                freq[i] = 1;
              }
    });
    return freq;// returns a javascript object..
}
