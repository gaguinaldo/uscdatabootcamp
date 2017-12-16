
## Unit 6 | Assignment - What's the Weather Like?

## Background

Whether financial, political, or social -- data's true power lies in its ability to answer questions definitively. So let's take what you've learned about Python requests, APIs, and JSON traversals to answer a fundamental question: "What's the weather like as we approach the equator?"

Now, we know what you may be thinking: _"Duh. It gets hotter..."_ 

But, if pressed, how would you **prove** it? 

## WeatherPy

In this example, you'll be creating a Python script to visualize the weather of 500+ cities across the world of varying distance from the equator. To accomplish this, you'll be utilizing a [simple Python library](https://pypi.python.org/pypi/citipy), the [OpenWeatherMap API](https://openweathermap.org/api), and a little common sense to create a representative model of weather across world cities.

Your objective is to build a series of scatter plots to showcase the following relationships:

* Temperature (F) vs. Latitude
* Humidity (%) vs. Latitude
* Cloudiness (%) vs. Latitude
* Wind Speed (mph) vs. Latitude

Your final notebook must:

* Randomly select **at least** 500 unique (non-repeat) cities based on latitude and longitude.
* Perform a weather check on each of the cities using a series of successive API calls. 
* Include a print log of each city as it's being processed with the city number, city name, and requested URL.
* Save both a CSV of all data retrieved and png images for each scatter plot.

As final considerations:

* You must use the Matplotlib and Seaborn libraries.
* You must include a written description of three observable trends based on the data. 
* You must use proper labeling of your plots, including aspects like: Plot Titles (with date of analysis) and Axes Labels.
* You must include an exported markdown version of your Notebook called  `README.md` in your GitHub repository.  
* See [Example Solution](WeatherPy_Example.pdf) for a reference on expected format. 

## Hints and Considerations

* You may want to start this assignment by refreshing yourself on 4th grade geography, in particular, the [geographic coordinate system](http://desktop.arcgis.com/en/arcmap/10.3/guide-books/map-projections/about-geographic-coordinate-systems.htm). 

* Next, spend the requisite time necessary to study the OpenWeatherMap API. Based on your initial study, you should be able to answer  basic questions about the API: Where do you request the API key? Which Weather API in particular will you need? What URL endpoints does it expect? What JSON structure does it respond with? Before you write a line of code, you should be aiming to have a crystal clear understanding of your intended outcome.

* Though we've never worked with the [citipy Python library](https://pypi.python.org/pypi/citipy), push yourself to decipher how it works, and why it might be relevant. Before you try to incorporate the library into your analysis, start by creating simple test cases outside your main script to confirm that you are using it correctly. Too often, when introduced to a new library, students get bogged down by the most minor of errors -- spending hours investigating their entire code -- when, in fact, a simple and focused test would have shown their basic utilization of the library was wrong from the start. Don't let this be you!

* Part of our expectation in this challenge is that you will use critical thinking skills to understand how and why we're recommending the tools we are. What is Citipy for? Why would you use it in conjunction with the OpenWeatherMap API? How would you do so?

* In building your script, pay attention to the cities you are using in your query pool. Are you getting coverage of the full gamut of latitudes and longitudes? Or are you simply choosing 500 cities concentrated in one region of the world? Even if you were a geographic genius, simply rattling 500 cities based on your human selection would create a biased dataset. Be thinking of how you should counter this. (Hint: Consider the full range of latitudes).

* Lastly, remember -- this is a challenging activity. Push yourself! If you complete this task, then you can safely say that you've gained a strong mastery of the core foundations of data analytics and it will only go better from here. Good luck!


```python
#Standard imports

import pandas as pd
import requests as r
import json
import matplotlib.pyplot as plt
import datetime
%matplotlib inline
```


```python
# Point to csv file containing city ID

file = 'cityid.csv'
```


```python
#Load in CSV file into Pandas

df = pd.read_csv(file, encoding='utf-8', low_memory=False)
```


```python
#Select a random sample of 500 cities into pandas and store values in a list. 
city_list = df.sample(500).reset_index()['id'].tolist()

#Set up API url using end point and key.
url = 'http://api.openweathermap.org/data/2.5/weather?id='
api_key = '&APPID=0c715aff73757bce5f32aba6da14fd45'
units = '&units=imperial'

#Generate list of all end points based on city id.
url_list = [(url + str(city) + units + api_key) for city in city_list]

#Genearte a dictionary of city ID and end point.
url_dict = {'city_id': city_list, 'url': url_list}

#Load resulting dictionary into Pandas
city_df = pd.DataFrame(url_dict)
```


```python
#Add columns to dataframe

city_df['city'] = ''
city_df['country'] = ''
city_df['lat'] = ''
city_df['lon'] = ''
city_df['temp'] = ''
city_df['wind'] = ''
city_df['clouds'] = ''
city_df['humidity'] = ''
```


```python
#Display head of dataframe

city_df.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>city_id</th>
      <th>url</th>
      <th>city</th>
      <th>country</th>
      <th>lat</th>
      <th>lon</th>
      <th>temp</th>
      <th>wind</th>
      <th>clouds</th>
      <th>humidity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5112038</td>
      <td>http://api.openweathermap.org/data/2.5/weather...</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>1</th>
      <td>1485020</td>
      <td>http://api.openweathermap.org/data/2.5/weather...</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2</th>
      <td>3775262</td>
      <td>http://api.openweathermap.org/data/2.5/weather...</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3</th>
      <td>2989918</td>
      <td>http://api.openweathermap.org/data/2.5/weather...</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4</th>
      <td>2265686</td>
      <td>http://api.openweathermap.org/data/2.5/weather...</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
</div>




```python
#Confirm that city id in url matches the city id from dataframe

city_df['url'][4]
```




    'http://api.openweathermap.org/data/2.5/weather?id=2265686&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45'




```python
#Confirm that city id in url matches the city id from dataframe

city_df.iloc[4]
```




    city_id                                               2265686
    url         http://api.openweathermap.org/data/2.5/weather...
    city                                                         
    country                                                      
    lat                                                          
    lon                                                          
    temp                                                         
    wind                                                         
    clouds                                                       
    humidity                                                     
    Name: 4, dtype: object




```python
#Set up loop to ping end point and return values from json

#Set up for loop to loop through dataframe
i = 0
print('------Start Collecting Data------')
for index, row in city_df.iterrows():
    response = r.get(row['url']).json()    
#     print(response)
    date_time_now = datetime.datetime.now()
    #now.strftime("%Y-%m-%d %H:%M")
    print('Record ' + str(i+1) + ' ' + 'Collected at: ' + date_time_now.strftime("%Y-%m-%d %H:%M"))
    print('City Name: ' + response['name'] + ', ' + 'Country Name: ' + response['sys']['country'])
    print(row['url'])
    print('--------------')

#Set up try/except blocks to populate dataframe based on structure of json    
    try:
        city_df.set_value(index, "city", response['name'])
        city_df.set_value(index, 'country', response['sys']['country'])
        city_df.set_value(index, 'lat', response['coord']['lat'])
        city_df.set_value(index, 'lon', response['coord']['lon'])
        city_df.set_value(index, 'temp', response['main']['temp_max'])
        city_df.set_value(index, 'wind', response['wind']['speed'])
        city_df.set_value(index, 'clouds', response['clouds']['all'])
        city_df.set_value(index, 'humidity', response['main']['humidity'])
    except:
        print("Missing field... skipping.")
    i += 1
print('------End Collecting Data------')
```

    ------Start Collecting Data------
    Record 1 Collected at: 2017-12-16 06:28
    City Name: Centerport, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5112038&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 2 Collected at: 2017-12-16 06:28
    City Name: Znamenskoye, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=1485020&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 3 Collected at: 2017-12-16 06:28
    City Name: Quipama, Country Name: CO
    http://api.openweathermap.org/data/2.5/weather?id=3775262&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 4 Collected at: 2017-12-16 06:28
    City Name: Noyal-Pontivy, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=2989918&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 5 Collected at: 2017-12-16 06:28
    City Name: Moura, Country Name: PT
    http://api.openweathermap.org/data/2.5/weather?id=2265686&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 6 Collected at: 2017-12-16 06:28
    City Name: Zarechnyy, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=831165&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 7 Collected at: 2017-12-16 06:28
    City Name: Gayduk, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=561722&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 8 Collected at: 2017-12-16 06:28
    City Name: Grappenhall, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=6693989&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 9 Collected at: 2017-12-16 06:28
    City Name: Anqing, Country Name: CN
    http://api.openweathermap.org/data/2.5/weather?id=1817993&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 10 Collected at: 2017-12-16 06:28
    City Name: Megion, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=1499053&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 11 Collected at: 2017-12-16 06:28
    City Name: Kholmsk, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=2124615&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 12 Collected at: 2017-12-16 06:28
    City Name: Omaruru, Country Name: NA
    http://api.openweathermap.org/data/2.5/weather?id=3354540&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 13 Collected at: 2017-12-16 06:28
    City Name: Taltal, Country Name: CL
    http://api.openweathermap.org/data/2.5/weather?id=3870243&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 14 Collected at: 2017-12-16 06:28
    City Name: Chester Heights, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4557148&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 15 Collected at: 2017-12-16 06:28
    City Name: Silver Lake, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5273224&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 16 Collected at: 2017-12-16 06:28
    City Name: Wangon, Country Name: ID
    http://api.openweathermap.org/data/2.5/weather?id=1622090&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 17 Collected at: 2017-12-16 06:28
    City Name: Stammbach, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2829595&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 18 Collected at: 2017-12-16 06:28
    City Name: Gizycko, Country Name: PL
    http://api.openweathermap.org/data/2.5/weather?id=772195&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 19 Collected at: 2017-12-16 06:28
    City Name: Meybod, Country Name: IR
    http://api.openweathermap.org/data/2.5/weather?id=124193&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 20 Collected at: 2017-12-16 06:28
    City Name: Saint James, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4406909&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 21 Collected at: 2017-12-16 06:28
    City Name: Eldersburg, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4354163&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 22 Collected at: 2017-12-16 06:28
    City Name: Kosti, Country Name: SD
    http://api.openweathermap.org/data/2.5/weather?id=371760&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 23 Collected at: 2017-12-16 06:28
    City Name: Tuyom, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1680531&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 24 Collected at: 2017-12-16 06:28
    City Name: Tibagi, Country Name: BR
    http://api.openweathermap.org/data/2.5/weather?id=3446550&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 25 Collected at: 2017-12-16 06:28
    City Name: Zdolbitsa, Country Name: UA
    http://api.openweathermap.org/data/2.5/weather?id=687433&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 26 Collected at: 2017-12-16 06:28
    City Name: Nivillac, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=2990331&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 27 Collected at: 2017-12-16 06:28
    City Name: Springfield, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4659557&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 28 Collected at: 2017-12-16 06:28
    City Name: Vrchlabi, Country Name: CZ
    http://api.openweathermap.org/data/2.5/weather?id=3062439&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 29 Collected at: 2017-12-16 06:28
    City Name: Sorocaba, Country Name: BR
    http://api.openweathermap.org/data/2.5/weather?id=3447399&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 30 Collected at: 2017-12-16 06:28
    City Name: El Caney, Country Name: CU
    http://api.openweathermap.org/data/2.5/weather?id=3561667&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 31 Collected at: 2017-12-16 06:28
    City Name: Msowero, Country Name: TZ
    http://api.openweathermap.org/data/2.5/weather?id=152933&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 32 Collected at: 2017-12-16 06:28
    City Name: Ulmen, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2820249&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 33 Collected at: 2017-12-16 06:28
    City Name: Morigny-Champigny, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=2991792&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 34 Collected at: 2017-12-16 06:28
    City Name: Lipin Bor, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=535113&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 35 Collected at: 2017-12-16 06:28
    City Name: Lagarto, Country Name: BR
    http://api.openweathermap.org/data/2.5/weather?id=3459342&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 36 Collected at: 2017-12-16 06:28
    City Name: Malindi, Country Name: KE
    http://api.openweathermap.org/data/2.5/weather?id=187968&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 37 Collected at: 2017-12-16 06:28
    City Name: Jarville-la-Malgrange, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=3012449&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 38 Collected at: 2017-12-16 06:28
    City Name: Verenchanka, Country Name: UA
    http://api.openweathermap.org/data/2.5/weather?id=689945&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 39 Collected at: 2017-12-16 06:28
    City Name: Maasin, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1704770&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 40 Collected at: 2017-12-16 06:28
    City Name: Minanga, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1699638&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 41 Collected at: 2017-12-16 06:28
    City Name: Salvacion, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1690741&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 42 Collected at: 2017-12-16 06:28
    City Name: Tambong, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1683541&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 43 Collected at: 2017-12-16 06:28
    City Name: Cave, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3179288&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 44 Collected at: 2017-12-16 06:28
    City Name: Kalajoki, Country Name: FI
    http://api.openweathermap.org/data/2.5/weather?id=654837&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 45 Collected at: 2017-12-16 06:28
    City Name: Vetroz, Country Name: CH
    http://api.openweathermap.org/data/2.5/weather?id=2658146&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 46 Collected at: 2017-12-16 06:28
    City Name: Salard, Country Name: RO
    http://api.openweathermap.org/data/2.5/weather?id=668243&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 47 Collected at: 2017-12-16 06:28
    City Name: Ubud, Country Name: ID
    http://api.openweathermap.org/data/2.5/weather?id=1622846&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 48 Collected at: 2017-12-16 06:28
    City Name: West Thurrock, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=2634251&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 49 Collected at: 2017-12-16 06:28
    City Name: Schoeffengrund, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=3208118&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 50 Collected at: 2017-12-16 06:28
    City Name: Bokel, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2946801&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 51 Collected at: 2017-12-16 06:28
    City Name: Amethi, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1278805&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 52 Collected at: 2017-12-16 06:28
    City Name: Discovery Bay, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5343202&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 53 Collected at: 2017-12-16 06:28
    City Name: Idfu, Country Name: EG
    http://api.openweathermap.org/data/2.5/weather?id=411165&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 54 Collected at: 2017-12-16 06:28
    City Name: Varzi, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3164685&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 55 Collected at: 2017-12-16 06:28
    City Name: San Miguel Balderas, Country Name: MX
    http://api.openweathermap.org/data/2.5/weather?id=3518286&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 56 Collected at: 2017-12-16 06:28
    City Name: Novoye Medvezhino, Country Name: BY
    http://api.openweathermap.org/data/2.5/weather?id=624400&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 57 Collected at: 2017-12-16 06:28
    City Name: Rodewisch, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2845953&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 58 Collected at: 2017-12-16 06:28
    City Name: Whitefish Bay, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5278897&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 59 Collected at: 2017-12-16 06:28
    City Name: Fiano, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3177047&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 60 Collected at: 2017-12-16 06:28
    City Name: New Hyde Park, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5128514&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 61 Collected at: 2017-12-16 06:28
    City Name: Puerto Ayacucho, Country Name: VE
    http://api.openweathermap.org/data/2.5/weather?id=3629710&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 62 Collected at: 2017-12-16 06:28
    City Name: Yazihan, Country Name: TR
    http://api.openweathermap.org/data/2.5/weather?id=297371&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 63 Collected at: 2017-12-16 06:28
    City Name: Teteven, Country Name: BG
    http://api.openweathermap.org/data/2.5/weather?id=726464&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 64 Collected at: 2017-12-16 06:28
    City Name: Baneasa, Country Name: RO
    http://api.openweathermap.org/data/2.5/weather?id=685475&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 65 Collected at: 2017-12-16 06:28
    City Name: Lebanon, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4636045&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 66 Collected at: 2017-12-16 06:28
    City Name: Ostrozska Nova Ves, Country Name: CZ
    http://api.openweathermap.org/data/2.5/weather?id=3068750&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 67 Collected at: 2017-12-16 06:28
    City Name: Noda, Country Name: JP
    http://api.openweathermap.org/data/2.5/weather?id=1855078&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 68 Collected at: 2017-12-16 06:28
    City Name: Bucy-le-Long, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=3029670&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 69 Collected at: 2017-12-16 06:28
    City Name: Mambog, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1702298&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 70 Collected at: 2017-12-16 06:28
    City Name: Causip, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1717667&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 71 Collected at: 2017-12-16 06:28
    City Name: Apagy, Country Name: HU
    http://api.openweathermap.org/data/2.5/weather?id=722852&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 72 Collected at: 2017-12-16 06:28
    City Name: Givat Shemuel, Country Name: IL
    http://api.openweathermap.org/data/2.5/weather?id=294981&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 73 Collected at: 2017-12-16 06:28
    City Name: Loubert, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=2997493&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 74 Collected at: 2017-12-16 06:28
    City Name: Progreso de Obregon, Country Name: MX
    http://api.openweathermap.org/data/2.5/weather?id=3521103&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 75 Collected at: 2017-12-16 06:28
    City Name: Chateauneuf-de-Galaure, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=3026241&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 76 Collected at: 2017-12-16 06:29
    City Name: Scharnstein, Country Name: AT
    http://api.openweathermap.org/data/2.5/weather?id=2766136&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 77 Collected at: 2017-12-16 06:29
    City Name: Hennaya, Country Name: DZ
    http://api.openweathermap.org/data/2.5/weather?id=2493918&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 78 Collected at: 2017-12-16 06:29
    City Name: Teglas, Country Name: HU
    http://api.openweathermap.org/data/2.5/weather?id=714914&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 79 Collected at: 2017-12-16 06:29
    City Name: Okha, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1261066&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 80 Collected at: 2017-12-16 06:29
    City Name: Sayula, Country Name: MX
    http://api.openweathermap.org/data/2.5/weather?id=3983216&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 81 Collected at: 2017-12-16 06:29
    City Name: Okha, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=2122614&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 82 Collected at: 2017-12-16 06:29
    City Name: Zabok, Country Name: HR
    http://api.openweathermap.org/data/2.5/weather?id=3186984&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 83 Collected at: 2017-12-16 06:29
    City Name: Andong, Country Name: KR
    http://api.openweathermap.org/data/2.5/weather?id=1846986&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 84 Collected at: 2017-12-16 06:29
    City Name: Los Mochis, Country Name: MX
    http://api.openweathermap.org/data/2.5/weather?id=3997479&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 85 Collected at: 2017-12-16 06:29
    City Name: Cloverdale, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4255948&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 86 Collected at: 2017-12-16 06:29
    City Name: Burdeos, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1722467&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 87 Collected at: 2017-12-16 06:29
    City Name: Nobsa, Country Name: CO
    http://api.openweathermap.org/data/2.5/weather?id=3673829&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 88 Collected at: 2017-12-16 06:29
    City Name: Teglio Veneto, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3165847&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 89 Collected at: 2017-12-16 06:29
    City Name: Big Bear City, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5328152&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 90 Collected at: 2017-12-16 06:29
    City Name: Unterwellenborn, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2818418&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 91 Collected at: 2017-12-16 06:29
    City Name: Al Khankah, Country Name: EG
    http://api.openweathermap.org/data/2.5/weather?id=360928&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 92 Collected at: 2017-12-16 06:29
    City Name: Allanridge, Country Name: ZA
    http://api.openweathermap.org/data/2.5/weather?id=1023287&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 93 Collected at: 2017-12-16 06:29
    City Name: Great Missenden, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=2648057&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 94 Collected at: 2017-12-16 06:29
    City Name: Jozefoslaw, Country Name: PL
    http://api.openweathermap.org/data/2.5/weather?id=770008&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 95 Collected at: 2017-12-16 06:29
    City Name: Mallasamudram, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1264047&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 96 Collected at: 2017-12-16 06:29
    City Name: Polinya de Xuquer, Country Name: ES
    http://api.openweathermap.org/data/2.5/weather?id=2512433&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 97 Collected at: 2017-12-16 06:29
    City Name: Aparri, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1730398&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 98 Collected at: 2017-12-16 06:29
    City Name: Masoyila, Country Name: SL
    http://api.openweathermap.org/data/2.5/weather?id=2405701&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 99 Collected at: 2017-12-16 06:29
    City Name: Carobbio degli Angeli, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=6534493&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 100 Collected at: 2017-12-16 06:29
    City Name: Cerro al Lambro, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=6535769&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 101 Collected at: 2017-12-16 06:29
    City Name: Urago dOglio, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=6534561&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 102 Collected at: 2017-12-16 06:29
    City Name: Pazmand, Country Name: HU
    http://api.openweathermap.org/data/2.5/weather?id=3046537&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 103 Collected at: 2017-12-16 06:29
    City Name: Balaka, Country Name: MW
    http://api.openweathermap.org/data/2.5/weather?id=931865&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 104 Collected at: 2017-12-16 06:29
    City Name: Gedo, Country Name: ET
    http://api.openweathermap.org/data/2.5/weather?id=337083&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 105 Collected at: 2017-12-16 06:29
    City Name: Montenero di Bisaccia, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3172821&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 106 Collected at: 2017-12-16 06:29
    City Name: Nagold, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2867164&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 107 Collected at: 2017-12-16 06:29
    City Name: Wabern, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2815784&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 108 Collected at: 2017-12-16 06:29
    City Name: Dawangtai, Country Name: CN
    http://api.openweathermap.org/data/2.5/weather?id=1813383&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 109 Collected at: 2017-12-16 06:29
    City Name: Chandla, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1274735&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 110 Collected at: 2017-12-16 06:29
    City Name: Oberrieden / Berg, Country Name: CH
    http://api.openweathermap.org/data/2.5/weather?id=6292918&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 111 Collected at: 2017-12-16 06:29
    City Name: Opatija, Country Name: HR
    http://api.openweathermap.org/data/2.5/weather?id=3194099&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 112 Collected at: 2017-12-16 06:29
    City Name: Maldegem, Country Name: BE
    http://api.openweathermap.org/data/2.5/weather?id=2791857&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 113 Collected at: 2017-12-16 06:29
    City Name: Nancha, Country Name: CN
    http://api.openweathermap.org/data/2.5/weather?id=2035669&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 114 Collected at: 2017-12-16 06:29
    City Name: Kolasin, Country Name: ME
    http://api.openweathermap.org/data/2.5/weather?id=3197896&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 115 Collected at: 2017-12-16 06:29
    City Name: Jefferson, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4328973&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 116 Collected at: 2017-12-16 06:29
    City Name: Mutzschen, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2867286&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 117 Collected at: 2017-12-16 06:29
    City Name: Patterson, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4336646&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 118 Collected at: 2017-12-16 06:29
    City Name: Mosnang, Country Name: CH
    http://api.openweathermap.org/data/2.5/weather?id=2659574&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 119 Collected at: 2017-12-16 06:29
    City Name: San Miguel, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1688949&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 120 Collected at: 2017-12-16 06:29
    City Name: Zheleznogorsk-Ilimskiy, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=2012557&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 121 Collected at: 2017-12-16 06:29
    City Name: Dioknisi, Country Name: GE
    http://api.openweathermap.org/data/2.5/weather?id=614897&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 122 Collected at: 2017-12-16 06:29
    City Name: Carlentini, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=2525349&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 123 Collected at: 2017-12-16 06:29
    City Name: Muladbucad, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1699138&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 124 Collected at: 2017-12-16 06:29
    City Name: La Junta, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5427705&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 125 Collected at: 2017-12-16 06:29
    City Name: Ledyard Center, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4837648&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 126 Collected at: 2017-12-16 06:29
    City Name: Turners Falls, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4953473&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 127 Collected at: 2017-12-16 06:29
    City Name: Gimigliano, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=2524610&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 128 Collected at: 2017-12-16 06:29
    City Name: Frick, Country Name: CH
    http://api.openweathermap.org/data/2.5/weather?id=2660716&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 129 Collected at: 2017-12-16 06:29
    City Name: Pysznica, Country Name: PL
    http://api.openweathermap.org/data/2.5/weather?id=760871&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 130 Collected at: 2017-12-16 06:29
    City Name: Nathdwara, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1261711&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 131 Collected at: 2017-12-16 06:29
    City Name: Indian Head, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4358916&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 132 Collected at: 2017-12-16 06:29
    City Name: Zhoushan, Country Name: CN
    http://api.openweathermap.org/data/2.5/weather?id=1886762&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 133 Collected at: 2017-12-16 06:29
    City Name: Laguna Hills, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5364306&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 134 Collected at: 2017-12-16 06:29
    City Name: Terrell, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4736028&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 135 Collected at: 2017-12-16 06:29
    City Name: Lapolapo, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1707281&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 136 Collected at: 2017-12-16 06:29
    City Name: Fort Bliss, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=7261282&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 137 Collected at: 2017-12-16 06:29
    City Name: Morhange, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=2991806&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 138 Collected at: 2017-12-16 06:29
    City Name: San Vicente Tancuayalab, Country Name: MX
    http://api.openweathermap.org/data/2.5/weather?id=3516764&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 139 Collected at: 2017-12-16 06:29
    City Name: Comanesti, Country Name: RO
    http://api.openweathermap.org/data/2.5/weather?id=681017&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 140 Collected at: 2017-12-16 06:29
    City Name: Bannur, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1277255&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 141 Collected at: 2017-12-16 06:29
    City Name: Dozza, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3177489&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 142 Collected at: 2017-12-16 06:29
    City Name: Lansargues, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=3007541&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 143 Collected at: 2017-12-16 06:29
    City Name: Engelsbrand, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2930248&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 144 Collected at: 2017-12-16 06:29
    City Name: Orange, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5102213&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 145 Collected at: 2017-12-16 06:29
    City Name: Tuka, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1979115&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 146 Collected at: 2017-12-16 06:29
    City Name: Folcroft, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4558004&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 147 Collected at: 2017-12-16 06:29
    City Name: Henfenfeld, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2906489&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 148 Collected at: 2017-12-16 06:29
    City Name: Eraan, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1713839&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 149 Collected at: 2017-12-16 06:29
    City Name: Alba Iulia, Country Name: RO
    http://api.openweathermap.org/data/2.5/weather?id=686578&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 150 Collected at: 2017-12-16 06:29
    City Name: Sobeslav, Country Name: CZ
    http://api.openweathermap.org/data/2.5/weather?id=3065644&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 151 Collected at: 2017-12-16 06:29
    City Name: Claremore, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4533580&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 152 Collected at: 2017-12-16 06:29
    City Name: Fontenay-le-Comte, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=3017921&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 153 Collected at: 2017-12-16 06:29
    City Name: Cobeja, Country Name: ES
    http://api.openweathermap.org/data/2.5/weather?id=3124914&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 154 Collected at: 2017-12-16 06:29
    City Name: Donville-les-Bains, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=3021067&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 155 Collected at: 2017-12-16 06:29
    City Name: Laytown, Country Name: IE
    http://api.openweathermap.org/data/2.5/weather?id=2963007&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 156 Collected at: 2017-12-16 06:29
    City Name: Bristol, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5234183&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 157 Collected at: 2017-12-16 06:29
    City Name: Egremont, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=2650174&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 158 Collected at: 2017-12-16 06:29
    City Name: Bielsko-Biala, Country Name: PL
    http://api.openweathermap.org/data/2.5/weather?id=3103402&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 159 Collected at: 2017-12-16 06:29
    City Name: San Pietro a Maida, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=2523389&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 160 Collected at: 2017-12-16 06:29
    City Name: Morag, Country Name: PL
    http://api.openweathermap.org/data/2.5/weather?id=3091462&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 161 Collected at: 2017-12-16 06:29
    City Name: Reyhanli, Country Name: TR
    http://api.openweathermap.org/data/2.5/weather?id=302355&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 162 Collected at: 2017-12-16 06:29
    City Name: Rodeo, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5388467&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 163 Collected at: 2017-12-16 06:29
    City Name: Saint-Julien-du-Sault, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=2979080&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 164 Collected at: 2017-12-16 06:29
    City Name: Nideggen, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2863711&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 165 Collected at: 2017-12-16 06:29
    City Name: Saint Bonifacius, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5044347&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 166 Collected at: 2017-12-16 06:29
    City Name: Ferkessedougou, Country Name: CI
    http://api.openweathermap.org/data/2.5/weather?id=2289049&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 167 Collected at: 2017-12-16 06:29
    City Name: Mission, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4275600&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 168 Collected at: 2017-12-16 06:29
    City Name: Sur, Country Name: OM
    http://api.openweathermap.org/data/2.5/weather?id=286245&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 169 Collected at: 2017-12-16 06:29
    City Name: Swansea, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=2636432&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 170 Collected at: 2017-12-16 06:29
    City Name: Askern, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=2656907&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 171 Collected at: 2017-12-16 06:29
    City Name: Vanatori, Country Name: RO
    http://api.openweathermap.org/data/2.5/weather?id=662837&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 172 Collected at: 2017-12-16 06:29
    City Name: Samthar, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1257498&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 173 Collected at: 2017-12-16 06:29
    City Name: Vereshchagino, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=475777&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 174 Collected at: 2017-12-16 06:29
    City Name: Qutqashen, Country Name: AZ
    http://api.openweathermap.org/data/2.5/weather?id=585231&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 175 Collected at: 2017-12-16 06:29
    City Name: Rheineck, Country Name: CH
    http://api.openweathermap.org/data/2.5/weather?id=2659062&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 176 Collected at: 2017-12-16 06:29
    City Name: Bandar-e Anzali, Country Name: IR
    http://api.openweathermap.org/data/2.5/weather?id=141679&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 177 Collected at: 2017-12-16 06:29
    City Name: Easton, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4935623&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 178 Collected at: 2017-12-16 06:29
    City Name: Kitovo, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=548040&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 179 Collected at: 2017-12-16 06:29
    City Name: Qasr Hallal, Country Name: TN
    http://api.openweathermap.org/data/2.5/weather?id=2468106&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 180 Collected at: 2017-12-16 06:29
    City Name: Fagundes, Country Name: BR
    http://api.openweathermap.org/data/2.5/weather?id=3400515&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 181 Collected at: 2017-12-16 06:29
    City Name: Zell im Wiesental, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2804810&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 182 Collected at: 2017-12-16 06:29
    City Name: Yanai, Country Name: JP
    http://api.openweathermap.org/data/2.5/weather?id=1848550&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 183 Collected at: 2017-12-16 06:29
    City Name: Lipovat, Country Name: RO
    http://api.openweathermap.org/data/2.5/weather?id=674730&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 184 Collected at: 2017-12-16 06:30
    City Name: Limanancong, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1706332&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 185 Collected at: 2017-12-16 06:30
    City Name: Hungen, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2897431&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 186 Collected at: 2017-12-16 06:30
    City Name: Lakes, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=7262905&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 187 Collected at: 2017-12-16 06:30
    City Name: Emneth, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=2650007&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 188 Collected at: 2017-12-16 06:30
    City Name: Horicon, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5256908&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 189 Collected at: 2017-12-16 06:30
    City Name: Peace River, Country Name: CA
    http://api.openweathermap.org/data/2.5/weather?id=6100069&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 190 Collected at: 2017-12-16 06:30
    City Name: Moscow, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5601538&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 191 Collected at: 2017-12-16 06:30
    City Name: Sehwan, Country Name: PK
    http://api.openweathermap.org/data/2.5/weather?id=1165789&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 192 Collected at: 2017-12-16 06:30
    City Name: Abbadia San Salvatore, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3183581&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 193 Collected at: 2017-12-16 06:30
    City Name: Chandpur, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1274714&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 194 Collected at: 2017-12-16 06:30
    City Name: Tracy, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5403191&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 195 Collected at: 2017-12-16 06:30
    City Name: Bethany, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5713759&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 196 Collected at: 2017-12-16 06:30
    City Name: Levittown, Country Name: PR
    http://api.openweathermap.org/data/2.5/weather?id=4566002&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 197 Collected at: 2017-12-16 06:30
    City Name: Fayetteville, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5116968&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 198 Collected at: 2017-12-16 06:30
    City Name: San Jose de Ocoa, Country Name: DO
    http://api.openweathermap.org/data/2.5/weather?id=3493100&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 199 Collected at: 2017-12-16 06:30
    City Name: San Aparicio, Country Name: MX
    http://api.openweathermap.org/data/2.5/weather?id=3519675&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 200 Collected at: 2017-12-16 06:30
    City Name: Taberg, Country Name: SE
    http://api.openweathermap.org/data/2.5/weather?id=2669788&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 201 Collected at: 2017-12-16 06:30
    City Name: Santiago del Estero, Country Name: AR
    http://api.openweathermap.org/data/2.5/weather?id=3835869&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 202 Collected at: 2017-12-16 06:30
    City Name: Cateel, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1717896&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 203 Collected at: 2017-12-16 06:30
    City Name: Jaszkarajeno, Country Name: HU
    http://api.openweathermap.org/data/2.5/weather?id=719644&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 204 Collected at: 2017-12-16 06:30
    City Name: New Orleans, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4335045&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 205 Collected at: 2017-12-16 06:30
    City Name: Summerlin South, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=7262622&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 206 Collected at: 2017-12-16 06:30
    City Name: Baliwagan, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1727982&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 207 Collected at: 2017-12-16 06:30
    City Name: Fauldhouse, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=2649624&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 208 Collected at: 2017-12-16 06:30
    City Name: Princeton, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4305266&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 209 Collected at: 2017-12-16 06:30
    City Name: Tidaholm, Country Name: SE
    http://api.openweathermap.org/data/2.5/weather?id=2669113&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 210 Collected at: 2017-12-16 06:30
    City Name: Kielczow, Country Name: PL
    http://api.openweathermap.org/data/2.5/weather?id=3096292&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 211 Collected at: 2017-12-16 06:30
    City Name: Appingedam, Country Name: NL
    http://api.openweathermap.org/data/2.5/weather?id=2759687&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 212 Collected at: 2017-12-16 06:30
    City Name: Balud, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1727783&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 213 Collected at: 2017-12-16 06:30
    City Name: Wool, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=2633609&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 214 Collected at: 2017-12-16 06:30
    City Name: Kumo, Country Name: NG
    http://api.openweathermap.org/data/2.5/weather?id=2333451&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 215 Collected at: 2017-12-16 06:30
    City Name: Kuroishi, Country Name: JP
    http://api.openweathermap.org/data/2.5/weather?id=2129395&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 216 Collected at: 2017-12-16 06:30
    City Name: Basingstoke, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=2656192&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 217 Collected at: 2017-12-16 06:30
    City Name: Kcynia, Country Name: PL
    http://api.openweathermap.org/data/2.5/weather?id=3096385&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 218 Collected at: 2017-12-16 06:30
    City Name: Gavoi, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3176260&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 219 Collected at: 2017-12-16 06:30
    City Name: San Ignacio, Country Name: PE
    http://api.openweathermap.org/data/2.5/weather?id=3692529&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 220 Collected at: 2017-12-16 06:30
    City Name: Compostela, Country Name: MX
    http://api.openweathermap.org/data/2.5/weather?id=4013085&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 221 Collected at: 2017-12-16 06:30
    City Name: Landover, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4360287&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 222 Collected at: 2017-12-16 06:30
    City Name: Alexandria, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4744091&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 223 Collected at: 2017-12-16 06:30
    City Name: Lunetten, Country Name: NL
    http://api.openweathermap.org/data/2.5/weather?id=6698635&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 224 Collected at: 2017-12-16 06:30
    City Name: Catterick Garrison, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=8260059&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 225 Collected at: 2017-12-16 06:30
    City Name: Parsons, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4277011&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 226 Collected at: 2017-12-16 06:30
    City Name: Tignes, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=2972607&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 227 Collected at: 2017-12-16 06:30
    City Name: Kingskerswell, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=2645464&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 228 Collected at: 2017-12-16 06:30
    City Name: Acahay, Country Name: PY
    http://api.openweathermap.org/data/2.5/weather?id=3439482&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 229 Collected at: 2017-12-16 06:30
    City Name: Tambalan, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1683511&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 230 Collected at: 2017-12-16 06:30
    City Name: Gazzuolo, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3176243&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 231 Collected at: 2017-12-16 06:30
    City Name: Surhuisterveen, Country Name: NL
    http://api.openweathermap.org/data/2.5/weather?id=2746558&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 232 Collected at: 2017-12-16 06:30
    City Name: Vistino, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=473349&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 233 Collected at: 2017-12-16 06:30
    City Name: Casekow, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2940246&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 234 Collected at: 2017-12-16 06:30
    City Name: North Olmsted, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5164862&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 235 Collected at: 2017-12-16 06:30
    City Name: San Pedro La Laguna, Country Name: GT
    http://api.openweathermap.org/data/2.5/weather?id=3589637&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 236 Collected at: 2017-12-16 06:30
    City Name: Vapnyarka, Country Name: UA
    http://api.openweathermap.org/data/2.5/weather?id=690485&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 237 Collected at: 2017-12-16 06:30
    City Name: Al Mazzunah, Country Name: TN
    http://api.openweathermap.org/data/2.5/weather?id=2473525&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 238 Collected at: 2017-12-16 06:30
    City Name: Soller, Country Name: ES
    http://api.openweathermap.org/data/2.5/weather?id=2510821&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 239 Collected at: 2017-12-16 06:30
    City Name: Pudur, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1259292&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 240 Collected at: 2017-12-16 06:30
    City Name: Patancheru, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1260168&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 241 Collected at: 2017-12-16 06:30
    City Name: Koratagere, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1266126&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 242 Collected at: 2017-12-16 06:30
    City Name: Paty do Alferes, Country Name: BR
    http://api.openweathermap.org/data/2.5/weather?id=3454827&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 243 Collected at: 2017-12-16 06:30
    City Name: Rasun Anterselva - Rasen-Antholz, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=6534785&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 244 Collected at: 2017-12-16 06:30
    City Name: Porciuncula, Country Name: BR
    http://api.openweathermap.org/data/2.5/weather?id=3453010&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 245 Collected at: 2017-12-16 06:30
    City Name: Phra Phutthabat, Country Name: TH
    http://api.openweathermap.org/data/2.5/weather?id=1607512&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 246 Collected at: 2017-12-16 06:30
    City Name: Nea Artaki, Country Name: GR
    http://api.openweathermap.org/data/2.5/weather?id=256626&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 247 Collected at: 2017-12-16 06:30
    City Name: Moosburg, Country Name: AT
    http://api.openweathermap.org/data/2.5/weather?id=2771244&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 248 Collected at: 2017-12-16 06:30
    City Name: Koszecin, Country Name: PL
    http://api.openweathermap.org/data/2.5/weather?id=3095110&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 249 Collected at: 2017-12-16 06:30
    City Name: Brendola, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3181572&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 250 Collected at: 2017-12-16 06:30
    City Name: Arenzano, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3182887&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 251 Collected at: 2017-12-16 06:30
    City Name: Van, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4738883&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 252 Collected at: 2017-12-16 06:30
    City Name: Ashland, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5711789&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 253 Collected at: 2017-12-16 06:30
    City Name: Guelmim, Country Name: MA
    http://api.openweathermap.org/data/2.5/weather?id=2548526&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 254 Collected at: 2017-12-16 06:30
    City Name: Gottingen, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2918632&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 255 Collected at: 2017-12-16 06:30
    City Name: Kawit, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1709005&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 256 Collected at: 2017-12-16 06:30
    City Name: Suwanee, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4225309&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 257 Collected at: 2017-12-16 06:30
    City Name: Orlovka, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=514906&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 258 Collected at: 2017-12-16 06:30
    City Name: Brighton, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4986994&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 259 Collected at: 2017-12-16 06:30
    City Name: Arnold, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5324698&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 260 Collected at: 2017-12-16 06:30
    City Name: Stora Hoga, Country Name: SE
    http://api.openweathermap.org/data/2.5/weather?id=2673076&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 261 Collected at: 2017-12-16 06:30
    City Name: Cumberland Center, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4961898&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 262 Collected at: 2017-12-16 06:30
    City Name: Ndofane, Country Name: SN
    http://api.openweathermap.org/data/2.5/weather?id=2247660&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 263 Collected at: 2017-12-16 06:30
    City Name: Monastir, Country Name: TN
    http://api.openweathermap.org/data/2.5/weather?id=2473493&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 264 Collected at: 2017-12-16 06:30
    City Name: Buchach, Country Name: UA
    http://api.openweathermap.org/data/2.5/weather?id=711348&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 265 Collected at: 2017-12-16 06:30
    City Name: Hadley Wood, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=6693771&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 266 Collected at: 2017-12-16 06:30
    City Name: Tomado, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1681563&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 267 Collected at: 2017-12-16 06:30
    City Name: Pozorice, Country Name: CZ
    http://api.openweathermap.org/data/2.5/weather?id=3067723&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 268 Collected at: 2017-12-16 06:30
    City Name: Jacmel, Country Name: HT
    http://api.openweathermap.org/data/2.5/weather?id=3723779&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 269 Collected at: 2017-12-16 06:30
    City Name: Padong, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1696751&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 270 Collected at: 2017-12-16 06:30
    City Name: Penonome, Country Name: PA
    http://api.openweathermap.org/data/2.5/weather?id=3703068&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 271 Collected at: 2017-12-16 06:30
    City Name: Saint-Vrain, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=2976565&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 272 Collected at: 2017-12-16 06:30
    City Name: Voitsberg, Country Name: AT
    http://api.openweathermap.org/data/2.5/weather?id=2762327&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 273 Collected at: 2017-12-16 06:30
    City Name: Puerto Gaitan, Country Name: CO
    http://api.openweathermap.org/data/2.5/weather?id=3769976&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 274 Collected at: 2017-12-16 06:30
    City Name: Fayence, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=3018835&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 275 Collected at: 2017-12-16 06:30
    City Name: Gizel, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=561437&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 276 Collected at: 2017-12-16 06:30
    City Name: La Curva, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1708191&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 277 Collected at: 2017-12-16 06:30
    City Name: Arroyo Seco, Country Name: AR
    http://api.openweathermap.org/data/2.5/weather?id=3865385&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 278 Collected at: 2017-12-16 06:30
    City Name: Argoncilhe, Country Name: PT
    http://api.openweathermap.org/data/2.5/weather?id=2742750&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 279 Collected at: 2017-12-16 06:30
    City Name: Kulai, Country Name: MY
    http://api.openweathermap.org/data/2.5/weather?id=1732742&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 280 Collected at: 2017-12-16 06:30
    City Name: Schiltigheim, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=2975446&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 281 Collected at: 2017-12-16 06:30
    City Name: Naujan, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1697911&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 282 Collected at: 2017-12-16 06:30
    City Name: Marolambo, Country Name: MG
    http://api.openweathermap.org/data/2.5/weather?id=1060007&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 283 Collected at: 2017-12-16 06:30
    City Name: Cartagena, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1718247&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 284 Collected at: 2017-12-16 06:30
    City Name: Waterford, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5014130&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 285 Collected at: 2017-12-16 06:30
    City Name: Yli-Ii, Country Name: FI
    http://api.openweathermap.org/data/2.5/weather?id=630952&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 286 Collected at: 2017-12-16 06:30
    City Name: Villa Huidobro, Country Name: AR
    http://api.openweathermap.org/data/2.5/weather?id=3832719&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 287 Collected at: 2017-12-16 06:30
    City Name: Coeburn, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4753409&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 288 Collected at: 2017-12-16 06:30
    City Name: Huyton, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=2646329&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 289 Collected at: 2017-12-16 06:30
    City Name: Northwest Harwinton, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=7257391&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 290 Collected at: 2017-12-16 06:30
    City Name: Mayabon, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1700092&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 291 Collected at: 2017-12-16 06:30
    City Name: Clifden, Country Name: IE
    http://api.openweathermap.org/data/2.5/weather?id=2965449&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 292 Collected at: 2017-12-16 06:31
    City Name: Erumaippatti, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1272001&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 293 Collected at: 2017-12-16 06:31
    City Name: Benshausen, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2950979&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 294 Collected at: 2017-12-16 06:31
    City Name: Andahuaylas, Country Name: PE
    http://api.openweathermap.org/data/2.5/weather?id=3947740&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 295 Collected at: 2017-12-16 06:31
    City Name: Freeland, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5795025&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 296 Collected at: 2017-12-16 06:31
    City Name: Rignano sullArno, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3169392&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 297 Collected at: 2017-12-16 06:31
    City Name: Ciudad Valles, Country Name: MX
    http://api.openweathermap.org/data/2.5/weather?id=3530582&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 298 Collected at: 2017-12-16 06:31
    City Name: Tay Ninh, Country Name: VN
    http://api.openweathermap.org/data/2.5/weather?id=1566559&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 299 Collected at: 2017-12-16 06:31
    City Name: Sambhar, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1257539&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 300 Collected at: 2017-12-16 06:31
    City Name: Skawica, Country Name: PL
    http://api.openweathermap.org/data/2.5/weather?id=3085809&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 301 Collected at: 2017-12-16 06:31
    City Name: Rogatin, Country Name: UA
    http://api.openweathermap.org/data/2.5/weather?id=695559&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 302 Collected at: 2017-12-16 06:31
    City Name: Pleasant View, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5779833&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 303 Collected at: 2017-12-16 06:31
    City Name: Solonka, Country Name: UA
    http://api.openweathermap.org/data/2.5/weather?id=693193&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 304 Collected at: 2017-12-16 06:31
    City Name: Rheinbreitbach, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2847655&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 305 Collected at: 2017-12-16 06:31
    City Name: Bedford, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5146831&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 306 Collected at: 2017-12-16 06:31
    City Name: Prairieville, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4338012&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 307 Collected at: 2017-12-16 06:31
    City Name: Faicchio, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3177276&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 308 Collected at: 2017-12-16 06:31
    City Name: Malajog, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1703221&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 309 Collected at: 2017-12-16 06:31
    City Name: Qingdao, Country Name: CN
    http://api.openweathermap.org/data/2.5/weather?id=1797929&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 310 Collected at: 2017-12-16 06:31
    City Name: Bridel, Country Name: LU
    http://api.openweathermap.org/data/2.5/weather?id=2960720&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 311 Collected at: 2017-12-16 06:31
    City Name: Ellenville, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5116408&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 312 Collected at: 2017-12-16 06:31
    City Name: Sodra Sunderbyn, Country Name: SE
    http://api.openweathermap.org/data/2.5/weather?id=602804&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 313 Collected at: 2017-12-16 06:31
    City Name: Lubawka, Country Name: PL
    http://api.openweathermap.org/data/2.5/weather?id=3093027&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 314 Collected at: 2017-12-16 06:31
    City Name: Rivas, Country Name: NI
    http://api.openweathermap.org/data/2.5/weather?id=3617052&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 315 Collected at: 2017-12-16 06:31
    City Name: Pucol, Country Name: ES
    http://api.openweathermap.org/data/2.5/weather?id=2512127&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 316 Collected at: 2017-12-16 06:31
    City Name: Maywood, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5371261&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 317 Collected at: 2017-12-16 06:31
    City Name: Badagara, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1278023&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 318 Collected at: 2017-12-16 06:31
    City Name: Bad Reichenhall, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2953371&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 319 Collected at: 2017-12-16 06:31
    City Name: Yuncler, Country Name: ES
    http://api.openweathermap.org/data/2.5/weather?id=3104397&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 320 Collected at: 2017-12-16 06:31
    City Name: Creve Coeur, Country Name: MU
    http://api.openweathermap.org/data/2.5/weather?id=934573&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 321 Collected at: 2017-12-16 06:31
    City Name: Arsenal, Country Name: MU
    http://api.openweathermap.org/data/2.5/weather?id=1106813&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 322 Collected at: 2017-12-16 06:31
    City Name: Charleston, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4801859&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 323 Collected at: 2017-12-16 06:31
    City Name: Massanzago, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=6534622&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 324 Collected at: 2017-12-16 06:31
    City Name: Hollins, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4764534&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 325 Collected at: 2017-12-16 06:31
    City Name: Lee, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5088619&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 326 Collected at: 2017-12-16 06:31
    City Name: Seica Mare, Country Name: RO
    http://api.openweathermap.org/data/2.5/weather?id=667445&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 327 Collected at: 2017-12-16 06:31
    City Name: Chateau-Renault, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=3026208&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 328 Collected at: 2017-12-16 06:31
    City Name: Leopoldsburg, Country Name: BE
    http://api.openweathermap.org/data/2.5/weather?id=2792856&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 329 Collected at: 2017-12-16 06:31
    City Name: Murphy, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4399914&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 330 Collected at: 2017-12-16 06:31
    City Name: Umka, Country Name: RS
    http://api.openweathermap.org/data/2.5/weather?id=784764&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 331 Collected at: 2017-12-16 06:31
    City Name: Przyszowice, Country Name: PL
    http://api.openweathermap.org/data/2.5/weather?id=3087773&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 332 Collected at: 2017-12-16 06:31
    City Name: Eldorado, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4237767&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 333 Collected at: 2017-12-16 06:31
    City Name: Atlantic City, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4500546&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 334 Collected at: 2017-12-16 06:31
    City Name: Middleport, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4518257&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 335 Collected at: 2017-12-16 06:31
    City Name: Sessa Aurunca, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3166614&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 336 Collected at: 2017-12-16 06:31
    City Name: Wittenbach, Country Name: CH
    http://api.openweathermap.org/data/2.5/weather?id=2657968&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 337 Collected at: 2017-12-16 06:31
    City Name: Bacabal, Country Name: BR
    http://api.openweathermap.org/data/2.5/weather?id=3406910&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 338 Collected at: 2017-12-16 06:31
    City Name: Drummoyne, Country Name: AU
    http://api.openweathermap.org/data/2.5/weather?id=2207783&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 339 Collected at: 2017-12-16 06:31
    City Name: Lankow, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2880503&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 340 Collected at: 2017-12-16 06:31
    City Name: Frontera Comalapa, Country Name: MX
    http://api.openweathermap.org/data/2.5/weather?id=3527543&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 341 Collected at: 2017-12-16 06:31
    City Name: Bilshivtsi, Country Name: UA
    http://api.openweathermap.org/data/2.5/weather?id=711752&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 342 Collected at: 2017-12-16 06:31
    City Name: Danao, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1715804&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 343 Collected at: 2017-12-16 06:31
    City Name: Palos Heights, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4905259&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 344 Collected at: 2017-12-16 06:31
    City Name: Compuertas, Country Name: MX
    http://api.openweathermap.org/data/2.5/weather?id=4013076&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 345 Collected at: 2017-12-16 06:31
    City Name: Maracena, Country Name: ES
    http://api.openweathermap.org/data/2.5/weather?id=2514176&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 346 Collected at: 2017-12-16 06:31
    City Name: Waveland, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4450411&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 347 Collected at: 2017-12-16 06:31
    City Name: Carsamba, Country Name: TR
    http://api.openweathermap.org/data/2.5/weather?id=749704&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 348 Collected at: 2017-12-16 06:31
    City Name: Bretzfeld, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2944178&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 349 Collected at: 2017-12-16 06:31
    City Name: Longlisuo, Country Name: CN
    http://api.openweathermap.org/data/2.5/weather?id=1802545&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 350 Collected at: 2017-12-16 06:31
    City Name: Saint-Maurice-de-Gourdans, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=2978161&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 351 Collected at: 2017-12-16 06:31
    City Name: Saint Pauls, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4489790&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 352 Collected at: 2017-12-16 06:31
    City Name: Giawang, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1712252&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 353 Collected at: 2017-12-16 06:31
    City Name: Jeffersonville, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4259671&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 354 Collected at: 2017-12-16 06:31
    City Name: Stolberg, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2826595&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 355 Collected at: 2017-12-16 06:31
    City Name: Zsambek, Country Name: HU
    http://api.openweathermap.org/data/2.5/weather?id=3042507&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 356 Collected at: 2017-12-16 06:31
    City Name: Rockford, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5043556&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 357 Collected at: 2017-12-16 06:31
    City Name: Andard, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=3037747&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 358 Collected at: 2017-12-16 06:31
    City Name: Castro-Urdiales, Country Name: ES
    http://api.openweathermap.org/data/2.5/weather?id=3125621&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 359 Collected at: 2017-12-16 06:31
    City Name: Otisheim, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2856159&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 360 Collected at: 2017-12-16 06:31
    City Name: Verucchio, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3164502&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 361 Collected at: 2017-12-16 06:31
    City Name: Yarmouth, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4983572&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 362 Collected at: 2017-12-16 06:31
    City Name: Cona, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3178217&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 363 Collected at: 2017-12-16 06:31
    City Name: La Union, Country Name: SV
    http://api.openweathermap.org/data/2.5/weather?id=3584772&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 364 Collected at: 2017-12-16 06:31
    City Name: Rameswaram, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1258698&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 365 Collected at: 2017-12-16 06:31
    City Name: Sterling, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5582392&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 366 Collected at: 2017-12-16 06:31
    City Name: Monticello, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5543377&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 367 Collected at: 2017-12-16 06:31
    City Name: Macclenny, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4163083&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 368 Collected at: 2017-12-16 06:31
    City Name: Ogden, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4483174&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 369 Collected at: 2017-12-16 06:31
    City Name: Samus, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=1493110&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 370 Collected at: 2017-12-16 06:31
    City Name: Monte di Procida, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3172946&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 371 Collected at: 2017-12-16 06:31
    City Name: Seron, Country Name: ES
    http://api.openweathermap.org/data/2.5/weather?id=2510944&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 372 Collected at: 2017-12-16 06:31
    City Name: Imsida, Country Name: MT
    http://api.openweathermap.org/data/2.5/weather?id=2562698&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 373 Collected at: 2017-12-16 06:31
    City Name: Kadinhani, Country Name: TR
    http://api.openweathermap.org/data/2.5/weather?id=310907&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 374 Collected at: 2017-12-16 06:31
    City Name: Camacupa, Country Name: AO
    http://api.openweathermap.org/data/2.5/weather?id=3351014&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 375 Collected at: 2017-12-16 06:31
    City Name: San Ricardo, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1688590&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 376 Collected at: 2017-12-16 06:31
    City Name: Audenge, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=3036256&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 377 Collected at: 2017-12-16 06:31
    City Name: Lazeshchyna, Country Name: UA
    http://api.openweathermap.org/data/2.5/weather?id=703328&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 378 Collected at: 2017-12-16 06:31
    City Name: Easingwold, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=2650517&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 379 Collected at: 2017-12-16 06:31
    City Name: Pantanal, Country Name: BR
    http://api.openweathermap.org/data/2.5/weather?id=7874482&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 380 Collected at: 2017-12-16 06:31
    City Name: Basud, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1726363&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 381 Collected at: 2017-12-16 06:31
    City Name: Horseshoe Bend, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4115334&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 382 Collected at: 2017-12-16 06:31
    City Name: Revel, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=2983833&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 383 Collected at: 2017-12-16 06:31
    City Name: Aleksandrow, Country Name: PL
    http://api.openweathermap.org/data/2.5/weather?id=776755&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 384 Collected at: 2017-12-16 06:31
    City Name: Bolanikhodan, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1275354&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 385 Collected at: 2017-12-16 06:31
    City Name: Jablah, Country Name: SY
    http://api.openweathermap.org/data/2.5/weather?id=169304&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 386 Collected at: 2017-12-16 06:31
    City Name: Orebro, Country Name: SE
    http://api.openweathermap.org/data/2.5/weather?id=2686657&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 387 Collected at: 2017-12-16 06:31
    City Name: Mina, Country Name: MX
    http://api.openweathermap.org/data/2.5/weather?id=3995847&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 388 Collected at: 2017-12-16 06:31
    City Name: Dera Nanak, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1273173&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 389 Collected at: 2017-12-16 06:31
    City Name: Karari, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1267827&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 390 Collected at: 2017-12-16 06:31
    City Name: Sainte-Anne, Country Name: GP
    http://api.openweathermap.org/data/2.5/weather?id=3578466&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 391 Collected at: 2017-12-16 06:31
    City Name: Eastland, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4688071&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 392 Collected at: 2017-12-16 06:31
    City Name: Send, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=2638207&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 393 Collected at: 2017-12-16 06:31
    City Name: Barton Creek, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4672494&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 394 Collected at: 2017-12-16 06:31
    City Name: Martensville, Country Name: CA
    http://api.openweathermap.org/data/2.5/weather?id=6067033&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 395 Collected at: 2017-12-16 06:31
    City Name: Barybino, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=578940&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 396 Collected at: 2017-12-16 06:32
    City Name: Atibaia, Country Name: BR
    http://api.openweathermap.org/data/2.5/weather?id=3471335&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 397 Collected at: 2017-12-16 06:32
    City Name: Gragnano Trebbiense, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3175950&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 398 Collected at: 2017-12-16 06:32
    City Name: Storrs, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4843786&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 399 Collected at: 2017-12-16 06:32
    City Name: Gazojak, Country Name: TM
    http://api.openweathermap.org/data/2.5/weather?id=1514792&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 400 Collected at: 2017-12-16 06:32
    City Name: Kuhdasht, Country Name: IR
    http://api.openweathermap.org/data/2.5/weather?id=126409&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 401 Collected at: 2017-12-16 06:32
    City Name: Port Moresby, Country Name: PG
    http://api.openweathermap.org/data/2.5/weather?id=2088122&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 402 Collected at: 2017-12-16 06:32
    City Name: Pabianice, Country Name: PL
    http://api.openweathermap.org/data/2.5/weather?id=3089578&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 403 Collected at: 2017-12-16 06:32
    City Name: Katiola, Country Name: CI
    http://api.openweathermap.org/data/2.5/weather?id=2287298&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 404 Collected at: 2017-12-16 06:32
    City Name: Clarin, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1717364&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 405 Collected at: 2017-12-16 06:32
    City Name: Moreira de Conegos, Country Name: PT
    http://api.openweathermap.org/data/2.5/weather?id=2737393&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 406 Collected at: 2017-12-16 06:32
    City Name: Tal I Mun Doc, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1683931&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 407 Collected at: 2017-12-16 06:32
    City Name: San Francisco, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5391959&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 408 Collected at: 2017-12-16 06:32
    City Name: Baldwin, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4315342&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 409 Collected at: 2017-12-16 06:32
    City Name: Pierre, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5767918&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 410 Collected at: 2017-12-16 06:32
    City Name: Emmingen-Liptingen, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=3205653&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 411 Collected at: 2017-12-16 06:32
    City Name: Pietroasele, Country Name: RO
    http://api.openweathermap.org/data/2.5/weather?id=670826&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 412 Collected at: 2017-12-16 06:32
    City Name: Chuhuyiv, Country Name: UA
    http://api.openweathermap.org/data/2.5/weather?id=710374&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 413 Collected at: 2017-12-16 06:32
    City Name: Chartres-de-Bretagne, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=3026465&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 414 Collected at: 2017-12-16 06:32
    City Name: SantAmbrogio di Valpolicella, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3167513&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 415 Collected at: 2017-12-16 06:32
    City Name: Chapel Saint Leonards, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=2653357&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 416 Collected at: 2017-12-16 06:32
    City Name: Frutillar, Country Name: CL
    http://api.openweathermap.org/data/2.5/weather?id=3889263&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 417 Collected at: 2017-12-16 06:32
    City Name: Vemars, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=2970163&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 418 Collected at: 2017-12-16 06:32
    City Name: Xilitla, Country Name: MX
    http://api.openweathermap.org/data/2.5/weather?id=3514502&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 419 Collected at: 2017-12-16 06:32
    City Name: Uige, Country Name: AO
    http://api.openweathermap.org/data/2.5/weather?id=2236568&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 420 Collected at: 2017-12-16 06:32
    City Name: Mainhardt, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2874246&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 421 Collected at: 2017-12-16 06:32
    City Name: Fountain Inn, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4579043&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 422 Collected at: 2017-12-16 06:32
    City Name: Noyen-sur-Sarthe, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=2989890&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 423 Collected at: 2017-12-16 06:32
    City Name: Bangad, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1727369&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 424 Collected at: 2017-12-16 06:32
    City Name: Guinsadan, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1712307&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 425 Collected at: 2017-12-16 06:32
    City Name: Kokrajhar, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1266330&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 426 Collected at: 2017-12-16 06:32
    City Name: Boumahra Ahmed, Country Name: DZ
    http://api.openweathermap.org/data/2.5/weather?id=2502686&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 427 Collected at: 2017-12-16 06:32
    City Name: Siegsdorf, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2832423&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 428 Collected at: 2017-12-16 06:32
    City Name: Tayud, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1682576&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 429 Collected at: 2017-12-16 06:32
    City Name: Mendoza, Country Name: AR
    http://api.openweathermap.org/data/2.5/weather?id=3844421&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 430 Collected at: 2017-12-16 06:32
    City Name: Mul, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1262574&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 431 Collected at: 2017-12-16 06:32
    City Name: Rzyki, Country Name: PL
    http://api.openweathermap.org/data/2.5/weather?id=3086391&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 432 Collected at: 2017-12-16 06:32
    City Name: Dundee, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4991330&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 433 Collected at: 2017-12-16 06:32
    City Name: Wallhausen, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2814570&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 434 Collected at: 2017-12-16 06:32
    City Name: Jose de Freitas, Country Name: BR
    http://api.openweathermap.org/data/2.5/weather?id=3397230&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 435 Collected at: 2017-12-16 06:32
    City Name: Los Angeles, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5368361&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 436 Collected at: 2017-12-16 06:32
    City Name: Saint-Nicolas-de-Port, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=2977880&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 437 Collected at: 2017-12-16 06:32
    City Name: Tughyl, Country Name: KZ
    http://api.openweathermap.org/data/2.5/weather?id=1520025&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 438 Collected at: 2017-12-16 06:32
    City Name: Heusden, Country Name: BE
    http://api.openweathermap.org/data/2.5/weather?id=2795800&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 439 Collected at: 2017-12-16 06:32
    City Name: Kottenheim, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2885165&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 440 Collected at: 2017-12-16 06:32
    City Name: Ayvalik, Country Name: TR
    http://api.openweathermap.org/data/2.5/weather?id=322673&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 441 Collected at: 2017-12-16 06:32
    City Name: Vohrenbach, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2816762&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 442 Collected at: 2017-12-16 06:32
    City Name: Minden, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5508379&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 443 Collected at: 2017-12-16 06:32
    City Name: Guayanilla, Country Name: PR
    http://api.openweathermap.org/data/2.5/weather?id=4565111&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 444 Collected at: 2017-12-16 06:32
    City Name: Bandeirantes, Country Name: BR
    http://api.openweathermap.org/data/2.5/weather?id=3470912&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 445 Collected at: 2017-12-16 06:32
    City Name: Byron, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4185553&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 446 Collected at: 2017-12-16 06:32
    City Name: Benito Soliven, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1725572&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 447 Collected at: 2017-12-16 06:32
    City Name: Hecelchakan, Country Name: MX
    http://api.openweathermap.org/data/2.5/weather?id=3527149&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 448 Collected at: 2017-12-16 06:32
    City Name: Heythuysen, Country Name: NL
    http://api.openweathermap.org/data/2.5/weather?id=2754111&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 449 Collected at: 2017-12-16 06:32
    City Name: Bangolo, Country Name: CI
    http://api.openweathermap.org/data/2.5/weather?id=2292179&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 450 Collected at: 2017-12-16 06:32
    City Name: Lazuri, Country Name: RO
    http://api.openweathermap.org/data/2.5/weather?id=674947&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 451 Collected at: 2017-12-16 06:32
    City Name: Hanford, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=5355180&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 452 Collected at: 2017-12-16 06:32
    City Name: Badiyah, Country Name: OM
    http://api.openweathermap.org/data/2.5/weather?id=288902&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 453 Collected at: 2017-12-16 06:32
    City Name: Gutad, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1712072&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 454 Collected at: 2017-12-16 06:32
    City Name: Adolfo Lopez Mateos, Country Name: MX
    http://api.openweathermap.org/data/2.5/weather?id=3976161&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 455 Collected at: 2017-12-16 06:32
    City Name: Batsfjord, Country Name: NO
    http://api.openweathermap.org/data/2.5/weather?id=780717&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 456 Collected at: 2017-12-16 06:32
    City Name: Seaside, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4172366&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 457 Collected at: 2017-12-16 06:32
    City Name: Jatani, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1269154&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 458 Collected at: 2017-12-16 06:32
    City Name: Lightning Ridge, Country Name: AU
    http://api.openweathermap.org/data/2.5/weather?id=2160232&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 459 Collected at: 2017-12-16 06:32
    City Name: Savinka, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=498295&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 460 Collected at: 2017-12-16 06:32
    City Name: Vacha, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2817970&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 461 Collected at: 2017-12-16 06:32
    City Name: Kacuni, Country Name: BA
    http://api.openweathermap.org/data/2.5/weather?id=3289093&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 462 Collected at: 2017-12-16 06:32
    City Name: Trenton, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4526469&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 463 Collected at: 2017-12-16 06:32
    City Name: Marebbe - Enneberg, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=6534782&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 464 Collected at: 2017-12-16 06:32
    City Name: Dublyany, Country Name: UA
    http://api.openweathermap.org/data/2.5/weather?id=709547&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 465 Collected at: 2017-12-16 06:32
    City Name: Cesis, Country Name: LV
    http://api.openweathermap.org/data/2.5/weather?id=460570&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 466 Collected at: 2017-12-16 06:32
    City Name: Herkenbosch, Country Name: NL
    http://api.openweathermap.org/data/2.5/weather?id=2754352&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 467 Collected at: 2017-12-16 06:32
    City Name: Verdal, Country Name: NO
    http://api.openweathermap.org/data/2.5/weather?id=3132176&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 468 Collected at: 2017-12-16 06:32
    City Name: Nordholz, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2861939&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 469 Collected at: 2017-12-16 06:32
    City Name: Venus, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4739052&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 470 Collected at: 2017-12-16 06:32
    City Name: Simanggang, Country Name: MY
    http://api.openweathermap.org/data/2.5/weather?id=1735799&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 471 Collected at: 2017-12-16 06:32
    City Name: Arangelovac, Country Name: RS
    http://api.openweathermap.org/data/2.5/weather?id=793111&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 472 Collected at: 2017-12-16 06:32
    City Name: Thakurganj, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1254694&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 473 Collected at: 2017-12-16 06:32
    City Name: Merelbeke, Country Name: BE
    http://api.openweathermap.org/data/2.5/weather?id=2791315&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 474 Collected at: 2017-12-16 06:32
    City Name: Llandybie, Country Name: GB
    http://api.openweathermap.org/data/2.5/weather?id=2644115&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 475 Collected at: 2017-12-16 06:32
    City Name: Costa di Mezzate, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3177906&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 476 Collected at: 2017-12-16 06:32
    City Name: Matinha, Country Name: BR
    http://api.openweathermap.org/data/2.5/weather?id=3395122&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 477 Collected at: 2017-12-16 06:32
    City Name: Nieuw-Helvoet, Country Name: NL
    http://api.openweathermap.org/data/2.5/weather?id=2750194&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 478 Collected at: 2017-12-16 06:32
    City Name: Hagondange, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=3014080&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 479 Collected at: 2017-12-16 06:32
    City Name: Tairan Camp, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1707434&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 480 Collected at: 2017-12-16 06:32
    City Name: Limot, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1706319&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 481 Collected at: 2017-12-16 06:32
    City Name: Pottsboro, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4720314&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 482 Collected at: 2017-12-16 06:32
    City Name: Tarauaca, Country Name: BR
    http://api.openweathermap.org/data/2.5/weather?id=3661980&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 483 Collected at: 2017-12-16 06:32
    City Name: La Montanita, Country Name: CO
    http://api.openweathermap.org/data/2.5/weather?id=3678363&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 484 Collected at: 2017-12-16 06:32
    City Name: Mabini, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1704598&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 485 Collected at: 2017-12-16 06:32
    City Name: Kopidlno, Country Name: CZ
    http://api.openweathermap.org/data/2.5/weather?id=3073261&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 486 Collected at: 2017-12-16 06:32
    City Name: Kirovsk, Country Name: RU
    http://api.openweathermap.org/data/2.5/weather?id=548391&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 487 Collected at: 2017-12-16 06:32
    City Name: Batala, Country Name: IN
    http://api.openweathermap.org/data/2.5/weather?id=1276720&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 488 Collected at: 2017-12-16 06:32
    City Name: Jonesboro, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4203316&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 489 Collected at: 2017-12-16 06:32
    City Name: Borgo dAle, Country Name: IT
    http://api.openweathermap.org/data/2.5/weather?id=3181809&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 490 Collected at: 2017-12-16 06:32
    City Name: Nettersheim, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2866336&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 491 Collected at: 2017-12-16 06:32
    City Name: Pornic, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=2986060&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 492 Collected at: 2017-12-16 06:32
    City Name: Baixo Guandu, Country Name: BR
    http://api.openweathermap.org/data/2.5/weather?id=3471061&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 493 Collected at: 2017-12-16 06:32
    City Name: Jucuapa, Country Name: SV
    http://api.openweathermap.org/data/2.5/weather?id=3585398&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 494 Collected at: 2017-12-16 06:32
    City Name: Hobe Sound, Country Name: US
    http://api.openweathermap.org/data/2.5/weather?id=4158758&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 495 Collected at: 2017-12-16 06:32
    City Name: Lampitak, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1707724&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 496 Collected at: 2017-12-16 06:32
    City Name: Usingen, Country Name: DE
    http://api.openweathermap.org/data/2.5/weather?id=2818097&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 497 Collected at: 2017-12-16 06:32
    City Name: Santo Amaro, Country Name: BR
    http://api.openweathermap.org/data/2.5/weather?id=3449720&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 498 Collected at: 2017-12-16 06:32
    City Name: Dagda, Country Name: LV
    http://api.openweathermap.org/data/2.5/weather?id=460474&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 499 Collected at: 2017-12-16 06:32
    City Name: Calabaca, Country Name: PH
    http://api.openweathermap.org/data/2.5/weather?id=1720806&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    Record 500 Collected at: 2017-12-16 06:33
    City Name: Bournezeau, Country Name: FR
    http://api.openweathermap.org/data/2.5/weather?id=3030902&units=imperial&APPID=0c715aff73757bce5f32aba6da14fd45
    --------------
    ------End Collecting Data------



```python
#Check that dataframe has been populated with data from the query

city_df.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>city_id</th>
      <th>url</th>
      <th>city</th>
      <th>country</th>
      <th>lat</th>
      <th>lon</th>
      <th>temp</th>
      <th>wind</th>
      <th>clouds</th>
      <th>humidity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5112038</td>
      <td>http://api.openweathermap.org/data/2.5/weather...</td>
      <td>Centerport</td>
      <td>US</td>
      <td>40.89</td>
      <td>-73.38</td>
      <td>30.2</td>
      <td>13.87</td>
      <td>1</td>
      <td>63</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1485020</td>
      <td>http://api.openweathermap.org/data/2.5/weather...</td>
      <td>Znamenskoye</td>
      <td>RU</td>
      <td>57.13</td>
      <td>73.83</td>
      <td>3.61</td>
      <td>7.52</td>
      <td>36</td>
      <td>65</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3775262</td>
      <td>http://api.openweathermap.org/data/2.5/weather...</td>
      <td>Quipama</td>
      <td>CO</td>
      <td>5.52</td>
      <td>-74.18</td>
      <td>79.34</td>
      <td>2.59</td>
      <td>0</td>
      <td>60</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2989918</td>
      <td>http://api.openweathermap.org/data/2.5/weather...</td>
      <td>Noyal-Pontivy</td>
      <td>FR</td>
      <td>48.07</td>
      <td>-2.88</td>
      <td>46.4</td>
      <td>8.05</td>
      <td>0</td>
      <td>65</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2265686</td>
      <td>http://api.openweathermap.org/data/2.5/weather...</td>
      <td>Moura</td>
      <td>PT</td>
      <td>38.14</td>
      <td>-7.45</td>
      <td>55.4</td>
      <td>9.17</td>
      <td>0</td>
      <td>47</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Export complete dataframe to a csv file.

city_df.to_csv('hw6_export.csv')
```


```python
#Check shape of dataframe to confirm that all values have been collected.

city_df.shape
```




    (500, 10)




```python
#Develop function to generate lists needed to plot data

def plot_data(c):
    city_lat_list = c['lat'].tolist()
    city_temp_list = c['temp'].tolist()
    city_humidity_list = c['humidity'].tolist()
    city_windspeed_list = c['wind'].tolist()
    city_cloud_list = c['clouds'].tolist()
    return city_lat_list, city_temp_list, city_humidity_list, city_windspeed_list, city_cloud_list
```


```python
#Generate first plot of temp vs position.

plt.figure(figsize=(10,10))
plt.scatter(plot_data(city_df)[0], plot_data(city_df)[1], color='b', alpha = 1, edgecolors='black', linewidths=1)
plt.xlabel("Latitude (deg)" ,fontsize = 14)
plt.ylabel("Max. Temperature (F)", fontsize = 14)
plt.title("Max. Temperature vs Latitude (12/16/2017)", fontsize = 14)
plt.xlim(-80, 100, 10)
plt.ylim(-20, 120, 10)
plt.grid(True)
plt.show()
```


![png](output_14_0.png)



```python
#Generate second plot of wind speed vs position.

plt.figure(figsize=(10,10))
plt.scatter(plot_data(city_df)[0], plot_data(city_df)[3], color='b', alpha = 0.5)
plt.xlabel("Latitude (deg)" ,fontsize = 14)
plt.ylabel("Windspeed (mph)", fontsize = 14)
plt.title("Windspeed vs Latitude (12/16/2017)", fontsize = 14)
plt.xlim(-80, 100, 10)
plt.ylim(-20, 75, 10)
plt.grid(True)
plt.show()
```


![png](output_15_0.png)



```python
#Generate third plot of humidity vs position.

plt.figure(figsize=(10,10))
plt.scatter(plot_data(city_df)[0], plot_data(city_df)[2], color='b', alpha = 0.5)
plt.xlabel("Latitude (deg)" ,fontsize = 14)
plt.ylabel("Humidity (%)", fontsize = 14)
plt.title("Humidity vs Latitude (12/16/2017)", fontsize = 14)
plt.xlim(-80, 100, 10)
plt.ylim(0, 120, 10)
plt.grid(True)
plt.show()
```


![png](output_16_0.png)



```python
#Generate first plot of cloudiness vs position.

plt.figure(figsize=(10,10))
plt.scatter(plot_data(city_df)[0], plot_data(city_df)[4], color='b', alpha = 0.5)
plt.xlabel("Latitude (deg)" ,fontsize = 14)
plt.ylabel("Cloudiness (%)", fontsize = 14)
plt.title("Cloudiness vs Latitude (12/16/2017)", fontsize = 14)
plt.xlim(-80, 100, 10)
plt.ylim(-20, 120, 10)
plt.grid(True)
plt.show()
```


![png](output_17_0.png)

