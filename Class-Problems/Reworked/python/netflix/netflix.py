import os, csv

filepath = os.path.join("netflix_ratings.csv")

with open(filepath) as f:
    readcsv = csv.reader(f, delimiter=',')

    movie = input("What movie are you looking for?")

    found = False

    for row in readcsv:
        if movie == row[0]:
            print("I've found " + row[0]+ "." + " It has a rating of " + row[1]+ "," + " and a user rating of " + row[3] + ".")
            found = True

    if found == False:
        print("I'm sorry, I can't find " + movie + ".")
