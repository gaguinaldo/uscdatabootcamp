b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
a = [i ** 2 for i in b if 1 % 2 == 0]
a


c = []
d = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for i in d:
    if i % 2 == 0:
        c.append(i **2)


import pandas as pd
import matplotlib as plt
import bokeh
import sklearn

#import csv file
df = pd.read_csv("data.csv")
df.head()
