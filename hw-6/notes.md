### List of city ID
+ http://openweathermap.org/help/city_list.txt
+ https://stackoverflow.com/questions/27883777/how-to-find-weather-forecast-city-id
+ http://bulk.openweathermap.org/sample/
+ https://openweathermap.desk.com/customer/portal/questions/16355770-list-of-city-ids-by-name

*** 

# Approach

## Step 1:

Create function to generate 500 numbers and use the numbers to extract out the city ID. Either the number is used as the position in the dictionary, or the number is used as the actual city ID.  Regardless, we're going to need a way to randomlly select the cities.

## Step 2:

Use the list of city ID and the general call structure to generate the urls needed to make each individual API call. We're going to need to make one call and study the the structure of the `json` so that we know how to extract out the information we need for the project.  As present, the following is needed:

+ Randomly select at least 500 unique (non-repeat) cities based on latitude and longitude.
+ Perform a weather check on each of the cities using a series of successive API calls.
+ Include a print log of each city as it's being processed with the city number, city name, and requested URL.
+ Save both a CSV of all data retrieved and png images for each scatter plot.

We're going to need to extract the following information from each city:

+ Temperature (F)
+ Latitude
+ Humidity (%)
+ Cloudiness (%)
+ Wind Speed (mph)
+ City ID
+ City Name

It would be best to store these data in a Pandas dataframe where each of the fields noted above are the columns and the city name is provided as the index. It is possible to use the index of pandas in the dataframe for this analysis.  It may be best to store each value in a Python `dict` so that we can use `pd.DataFrame(<DICT NAME)`.

### Step 3:

Once the values are loaded in a Pandas DataFrame, we'll need use `matplotlib` and `Pandas` to create the relationships that are needed. 

* Temperature (F) vs. Latitude
* Humidity (%) vs. Latitude
* Cloudiness (%) vs. Latitude
* Wind Speed (mph) vs. Latitude
