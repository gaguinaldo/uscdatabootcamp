#Rendering a string, list and dictionary in Flask

Depending on what you're doing, you may need to render a string, list or dict in the HTML page within a flask app.

When doing this, what is important to know is that you'll need to pass the variables from the Python script to the HTML, often using the `render_template` function within Flask.

### Sample code for rendering within the HTML of the Flask application. 

In all of the examples, the following sample Flask app will be used.

```
#Python

from flask import Flask, render_template

app = Flask(__name__)

def foo():
	#Do something
	return bar

@app.route('/')
def index():
	return render_template('index.html', foobar=bar)
	
if __name__ == '__main__':
	app.run(debug=True)
```

#### Rendering a String

Within the HTML, you can use `{{ foobar }}` when you want to pass `foobar` from the Python script to the Flask HTML. In this case `foobar` is a string.

```
<!DOCTYPE html>
<html>
<head>
    <title>Test App</title>
</head>
<body>

    {{ foobar }}

</body>
</html>
```

#### Rendering a list

Within the HTML, you will need to iterate through the list and render each element on it's own within the HTML.  In this case, `foobar` is a list. 

```
<!DOCTYPE html>
<html>
<head>
    <title>Test App</title>
</head>
<body>
	
	{% for each in foobar %}
    	{{ each }}
    {% end for %}

</body>
</html>
```

#### Rendering a dictionary

Within the HTML, you will need to iterate through the dictionary and render each element on it's own within the HTML.  In this case, `foobar` is a dictionary. 

```
<!DOCTYPE html>
<html>
<head>
    <title>Test App</title>
</head>
<body>
	
	{% for key, value in foobar.items() %}
    	{{ key }} : {{ value }}
    {% end for %}

</body>
</html>
```
***

