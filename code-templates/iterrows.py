
for index, row in df.iterrows():
    if len(re.split(r'[,-/]+', row['tank'])[0]) == 1:
        df.set_value(index, 'clean_header', re.split(r'[,-/]+', row['tank'])[1])
    else:
        df.set_value(index, 'clean_header', re.split(r'[,-/]+', row['tank'])[0])
        
"""
To access a specific value in the column when using itterows, you use row['tank'].  In this case, row['tank'] 
allows you to get access to the row that the the loop is in and the column, in this case (['tank']).

This script iterates through the dataframe df and set_values in a new column (in this case, clean_header), 
based on the logic defined in the if-then statement. 

https://stackoverflow.com/questions/23145928/python-and-pandas-how-to-access-a-column-using-iterrows

"""
