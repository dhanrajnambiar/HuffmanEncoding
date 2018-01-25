def frequency(str_ip):
    freq = {}
    for i in str_ip:
        freq[i] = freq.get(i, 0) + 1
    return freq


x = "ijnicdnio d noubc vuadwikcmdsjoniunefc"
print(frequency(x))
