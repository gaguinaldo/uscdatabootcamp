import os, csv

filepath = os.path.join("Udemy.csv")

with open(filepath) as f:
    readcsv = csv.reader(f, delimiter=',')

    title = []
    price = []
    sub_count = []
    num_reviews = []
    course_len = []

    for row in readcsv:
        title.append(row[1])
        price.append(row[4])
        sub_count.append(row[5])
        num_reviews.append(row[6])
        course_len.append(row[9])

    #zip individual lists to create a list of tuples.
    combined_data = zip(title, price, sub_count, num_reviews, course_len)

    #Need to print out the list of tuples for inspection. 
