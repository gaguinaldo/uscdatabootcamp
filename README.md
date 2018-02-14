# Resources and Helpful Links
This repository contains all of the homework assignments for the October 2017 cohort of the USC Data Bootcamp and a few resources that I found helpful. 

I will be continuously adding to this file.

***
# Github Fetch and Push to sync your repo with a forked repo

Source: [Dataschool](https://www.youtube.com/watch?v=-zvHQXnBO6c&index=9&list=PL5-da3qGB5IBLMp7LtN8Nc3Efd4hJq0kD)

How to Fetch a repo and push to your repo.  Use this in order to update your repo with the changes made to the original (forked) repo. 

The sequence of steps will be as follows:

1. Original Forked Repo:  github.com/joe/coolgame
2. Fetch changes in forked repo to your local computer
3. Push to the changes in the original forked report to your github account: github.com/you/coolgame	

Check remotes.
	
	git remote -v

Points to the original repo on github.

	git remote add upstream [ADDRESS OF REPO]

Check that the upstream branch has added.
	
	git remote -v

Fetch updated (original) repo on github and clone to local computer

	git fetch upstream

Merge upstream/master branch to your working branch.

	git merge upstream/master

Commit all changes to your working branch.
	
	git commit -a -m '[ADD MESSAGE]'

Push all changes to your github account.

	git push origin master

***
# Github Pull and Merge Workflow for Teams (in progress) 

Source:  [LearnCode Academy](https://www.youtube.com/watch?v=oFYyTZwMyAg&t=187s)

## Clone Repo and Adding A Branch

These commands will create a working branch off of the master so that you can make changes.  All commits will be made to the branch and not the master. Once changes have been made and committed to the branch, a pull request will need to be made to start the process of merging the changes into the master branch. 

Finally, always merge to master, don't edit on the master branch.

Clones the repo onto your desktop.

	git clone [INSERT URL]

Change directory into the repo on your desktop

	cd [NAME OF DIRECTORY]
	
Create and name new branch to work on.

	git branch [NAME BRANCH]

Change to the new branch so that you are able to work on your code.

	git checkout [NAME BRANCH]

Work on the files made in the directory and save them. 

Adds all of the changes to be committed.

	git add .
	
Check the status of the changes to see that all necessary files have been added 

	git status

Commit changes. 

	git commit -a -m '[INSERT COMMENT]

Push the change to the branch. 

	git push origin [NAME BRANCH]

Check that the branch has been updated. 

	git branch 

## Create a Pull Request and Merge Into Master

Now that your branch has been updated, you will not need to prepare to merge your branch into the master branch.

Switch to the master branch. 

	git checkout master

Pull the latest copy of the master branch down.

	git pull
	
Change to your branch.

	git checkout [NAME BRANCH]

Merge the master branch into your branch.

	git merge master

#### Make changes to the code if conflicts are found. 

Check status.

	git status

Add all of the files to be committed. 
	git add .

Commit changes. 

	git commit -a -m '[INSERT COMMENT]
	
Push the change to the branch. 

	git push origin [NAME BRANCH]

On the `github.com` UI, click button for Pull Request. 

Work through all of the changes to gain acceptance.  Once all changes are accepted, click button to merge pull request into Master Brach. 

Typically, the request to merge into the master branch is done by a peer. 


## Miscellaneous Commands

Delete old branch.

	git branch -D [BRANCH NAME]


Shows all of the branches
 	
 	git branch
 
To be sure that master has not changed while you have been working on the code. 
	
	git pull 

***
# Frameworks
* [SQL Alchemy](https://www.sqlalchemy.org/)
* [Flask](http://flask.pocoo.org/) 
* [Django](https://www.djangoproject.com/)

# Natural Language Processing Libraries
* [NLTK](http://www.nltk.org/)
* [TextBlob](http://textblob.readthedocs.io/en/dev/)
* [Spacy](https://spacy.io/)

# Wrappers
* [Open Weather Mappy](http://openweathermapy.readthedocs.io/en/latest/)
* [Tweepy](http://www.tweepy.org/)

# Tools
* [atom](https://atom.io/)
* [iTerm2](https://www.iterm2.com/)
* [macdown](https://macdown.uranusjr.com/)
* [Sublime Text](https://www.sublimetext.com/3)
* [atom multi cursor](https://atom.io/packages/multi-cursor)

***

# Misc Resources  
These are some of the resources that I found useful for the bootcamp.

* [GitHub and Git Bash: Create Folders in a Repository](https://youtu.be/rVNFPj9jtb0)
* [Adding multiple files to github.](https://stackoverflow.com/questions/19576116/how-to-add-multiple-files-to-git-at-the-same-time)
		
		git add . 
		git status
		git commit -a -m "MY MESSAGE HERE"
		git push origin master
		
* [How do I add files and folders into GitHub repos?](https://stackoverflow.com/questions/8775850/how-do-i-add-files-and-folders-into-github-repos)
* [Markdown cheatsheet](http://assemble.io/docs/Cheatsheet-Markdown.html)
* [Gitignore generator](https://www.gitignore.io/)
* [Deleting a repository](https://help.github.com/articles/deleting-a-repository/) 
* [Github for noobs video series by DEVTIPS (youtube)](https://youtu.be/1h9_cB9mPT8)
* [Virtual environments](https://conda.io/docs/user-guide/tasks/manage-environments.html) 
* [How to Calculate a Correlation (and P-Value) in Microsoft Excel](https://youtu.be/vFcxExzLfZI)
* [Hypothesis testing and p-values | Inferential statistics | Probability and Statistics | Khan Academy](https://www.youtube.com/watch?v=-FtlH4svqx4)
* [P Value Explained / What is a P-Value?](https://youtu.be/128yz0OCG-I)
* [The Google Software Engineer Interview](https://www.anthonydmays.com/2017/01/04/interviewing-at-google-heres-6-things-you-absolutely-need-to-do/)
* [Quick Pandas Cheet Sheet](https://jeffdelaney.me/blog/useful-snippets-in-pandas/)
* [Pandas Video Series (Data School)](http://www.dataschool.io/easier-data-analysis-with-pandas/)
* [How to export an iPython Notebook into an .md file](https://github.com/jupyter/nbconvert)
* [Check if MongoDB is running on your Mac](https://stackoverflow.com/questions/31561098/how-to-check-if-mongo-db-is-running-on-mac)
	
	`jupyter nbconvert --to markdown <input notebook include file 	extension>`
	
* [Jupyter Notebook Shortcuts](https://www.dataquest.io/blog/jupyter-notebook-tips-tricks-shortcuts/)
* [Jupyter Notebook Keyboard Shortcuts](http://maxmelnick.com/2016/04/19/python-beginner-tips-and-tricks.html)
* [Terminal Keyboard Shortcuts](https://gist.github.com/poopsplat/7195274)
* [Atom Multi Cursor](https://www.youtube.com/watch?v=d3fg2z1FL7A)
* [Python Graph Gallery](https://github.com/grantaguinaldo/uscdatabootcamp.git)
* [Python List Comprehensions](http://treyhunner.com/2015/12/python-list-comprehensions-now-in-color/)
* [iTerm Cheat Sheet](https://gist.github.com/squarism/ae3613daf5c01a98ba3a)
* [API Response Codes](http://www.restapitutorial.com/httpstatuscodes.html)
* [Twitter API Download and analysis](https://www.youtube.com/watch?v=o_OZdbCzHUA)
* [How to Except When You're Excepting](https://www.youtube.com/watch?v=I_d_qV3leZw)
* [Jupyter Notebook Keyboard Shortcuts](https://www.cheatography.com/weidadeyue/cheat-sheets/jupyter-notebook/pdf_bw/)
* [Convert date strings to datetime objects](https://chrisalbon.com/python/strings_to_datetime.html)
* [Python 3 Documentation RE Datetime objects](https://docs.python.org/3/library/datetime.html)
* [Formatting Python Date/Time objects](https://howchoo.com/g/ywi5m2vkodk/working-with-datetime-objects-and-timezones-in-python)
* [Flask Web Tutorial](https://pythonspot.com/flask-web-app-with-python/)
* [Flask Web App Deployment Using Heroku](https://progblog.io/How-to-deploy-a-Flask-App-to-Heroku/)
* [Public API List 1](https://github.com/abhishekbanthia/Public-APIs)
* [Public API List 2](https://github.com/toddmotto/public-apis/)
* [Public API List 3](https://apilist.fun/)
* [Public API List 4](https://any-api.com/)
* [Git Command Line Tutorial](http://dont-be-afraid-to-commit.readthedocs.io/en/latest/git/commandlinegit.html)
* [List of named laws (random...)](https://www.wikiwand.com/en/List_of_eponymous_laws#)
* [Using Loops to Create Subplots](http://jonathansoma.com/lede/data-studio/classes/small-multiples/long-explanation-of-using-plt-subplots-to-create-small-multiples/)
* [MS - Asking questions that can be answered with data](https://docs.microsoft.com/en-us/azure/machine-learning/studio/data-science-for-beginners-the-5-questions-data-science-answers)
* [HBR - Questions to ask a data scientist](https://hbr.org/2016/11/better-questions-to-ask-your-data-scientists)
* [Quora - Asking good data science questions](https://www.quora.com/How-do-you-ask-good-Data-Science-questions)
* [Data School Web Scraping](http://www.dataschool.io/python-web-scraping-of-president-trumps-lies/)
* [Data Camp Web Scraping](https://www.datacamp.com/community/tutorials/web-scraping-python-nlp)
* [Data Quest Web Scraping](https://www.dataquest.io/blog/web-scraping-tutorial-python/)
* [Stanford NLP Lectures](https://www.youtube.com/watch?v=nfoudtpBV68&list=PL6397E4B26D00A269)
* [DataSchool Machine Learning With Text PyCon 2016](https://youtu.be/ZiKMIuYidY0)
* [Explanation of TF-IDF](https://planspace.org/20150524-tfidf_is_about_what_matters/)
* [Using Flask Blueprints](https://stackoverflow.com/questions/11994325/how-to-divide-flask-app-into-multiple-py-files)
* [UC Irvine Machine Learning Datasets](https://archive.ics.uci.edu/ml/datasets.html)
* [Git workflow for teams](https://youtu.be/oFYyTZwMyAg)
* [Principal Component Analysis via Analytics University](https://www.youtube.com/watch?v=W7b4NkkyROE&list=PLUgZaFoyJafhbfL3-kOREkql5aZzkmbUw&index=3)
* [GTA Notebook about working with Files from Slack within the Bootcamp](https://github.com/grantaguinaldo/uscdatabootcamp/blob/master/Misc_Files/2017-11-29%20Notes%20RE%20File%20Downloads.ipynb)
* [Overview of SQL Joins](http://www.sql-join.com/sql-join-types/)
* [Merging into master branch on Github](https://www.sap.com/developer/tutorials/webide-github-merge-pull-request.html)
* [Sean Lahman Baseball Dataset](http://www.seanlahman.com/baseball-archive/statistics/)
* [SQL Unions vs Joins](https://www.essentialsql.com/what-is-the-difference-between-a-join-and-a-union/)
* [SQL Subqueries](https://community.modeanalytics.com/sql/tutorial/sql-subqueries/)
* [Using Flask and SQL Alchemy](https://youtu.be/Tu4vRU4lt6k)
* [SQL Alchemy Documentation](http://docs.sqlalchemy.org/en/latest/core/engines.html)
* [Python Classes tutorial](https://www.youtube.com/watch?v=ZDa-Z5JzLYM&list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc)
* How to show all tables in a SQL database `SHOW tables`
* [Object Relational Mapping](https://stackoverflow.com/questions/1279613/what-is-an-orm-and-where-can-i-learn-more-about-it)
* [ACID Database properties](https://www.wikiwand.com/en/ACID)
* [Creating and Using SQL Views](https://stackoverflow.com/questions/1278521/why-do-you-create-a-view-in-a-database)
* [Python Classes -- Good Article!](https://jeffknupp.com/blog/2014/06/18/improve-your-python-python-classes-and-object-oriented-programming/)
* ['Beefs' about using Python classes](https://youtu.be/o9pEzgHorH0)
* [Hacker Rank Developer Survey 2018](https://research.hackerrank.com/developer-skills/2018/)
* [Asking Good Questions](https://stackoverflow.com/help/how-to-ask)
* [Project Euler](https://projecteuler.net/)
* [Python Class Internals](https://rushter.com/blog/python-class-internals/)
* [Cannot Start Jupyter Notebook Solutions](https://github.com/jupyter/help/issues/136)
* [Python Sheets](https://www.pythonsheets.com/)
* [djangogirls tutorial](https://tutorial.djangogirls.org/en/)
* [Tuple Unpacking](https://www.pythonlearn.com/html-008/cfbook011.html)
* [Everything about Machine Learning](https://youtu.be/ZKrO71KQ9NY)
* [HMTL Code Validator](https://validator.w3.org/#validate_by_uri)
* [Clases vs Ids in CSS](https://stackoverflow.com/questions/12889362/difference-between-id-and-class-in-css-and-when-to-use-it)
* [Socratic Selling](http://www.brefigroup.co.uk/acrobat/socratic_selling.pdf)
* __Notes RE MongoDB:__ When starting Mongodb, you need to have two screens open in terminal.  The first, will run the server and the second will run the client.  To start the server use the command, `mongod` followed by enter.  To start the client, use the command `mongo`.  It is very important that you shut down the mongodb server when you are done by pressing `contol + c`.  Do not use `control + z` since that will not completly shut down the server. When using Mongo Compass, you can start the compass once the server is running on the local host.  If the connection is there, then Mongo compass will automatically connect to the server. 
* [Creating a new database using PyMongo](https://stackoverflow.com/questions/8566618/how-do-i-create-a-new-database-in-mongodb-using-pymongo)
* [Notes about installing Mongodb on a Mac](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
* [Adding Sublime Shortcut to Command Line](https://medium.com/@talialongname/shortcut-to-opening-a-file-in-sublime-from-the-command-line-68c015a29627)

***

###

Need to find more resources on:
* Bash and using command line
* Matplotlib and plotting
* Asking questions
* Reading documentation
* Installing themes for iTerm2 and Terminal
* Using git in a team setting
* When to use Python classes

### Online Resources for learning python (from Learn Code Teach LA)
+ The Hitchhiker's Guide to Python - one of the best guides out there. It covers everything from installation to common modules and writing great code. It is highly recommended for novices as well as advanced Pythonistas.

+ Official Python documentation - this is the official documentation from Python.org. The Python3 docs are here. It is recommended that you keep a copy under your pillow.

+ Learn Python the Hard Way - a free online guide for people who want step by step tutorials for learning Python. There are over 50 exercises here.

+ The Python guide has a whole section on learning Python as well.

**Online classes**

+ **Learn Python the Hard Way.** This is the course (videos and PDF) that goes along with the online guide. Take a look at the guide and if you feel you would like a bit more then the course may be for you. The course is $29.
+ **Codeacademy.**  Codeacademy has a number of online courses available for learning Python.
+ **Coursera.** Coursera also has a number of courses.

**Online Videos**

There are great videos for both Python novices as well as experts.

+ **PyVideos.** The big Python conferences such as PyCon and Djangocon are recorded and the videos are made freely available.

+ **Getting started with Django.** This kickstarter funded video series is for people with some Python background who are looking to learn Django.

**Books**
Other than Learn Python the Hard Way (which is arguably a book) probably the most well known Python books are:

+ Python in a Nutshell by Alex Martelli

+ Learning Python or Programming Python by Mark Lutz
