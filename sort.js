function sort_freq(freq_dict):
    var x = [];
    (Object.keys(freq_dict)).forEach(function(i){
        var tup = [freq_dict[i], i];
        x.push(tup);
        x.sort();
    });
    return x;//returns a array of arrays. Each of the array contain
    //symbols and its frequency of occurence in increasing order of occurences..
