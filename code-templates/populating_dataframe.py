"""
The code below populates a dataframe from a web-scrapping script. 

"""

#Create empty Pandas DataFrame.
prez_df = pd.DataFrame()

#For all entries in the table, loop through and store the data into the new Pandas DataFrame.
for prez in range(1, 45 + 1):
    table_data = page_data.find_all('tr')[prez]
    prez_name = table_data.find_all('td')[0].text
    prez_party = table_data.find_all('td')[1].text
    prez_years = table_data.find_all('td')[2].text
    vice_prez = table_data.find_all('td')[3].text
    prez_df = prez_df.append(pd.DataFrame({'name': prez_name, 'party': prez_party, 'term': prez_years, 'vice_president': vice_prez},index=[0]),ignore_index = True)
