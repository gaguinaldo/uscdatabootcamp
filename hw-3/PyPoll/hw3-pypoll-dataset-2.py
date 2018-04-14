#Standard Imports
import os, csv, sys

#Directory of the CSV file.
filepath = os.path.join("data", "election_data_2.csv")

#Open the CSV file and read the data while skipping the first row (that contains the headers)
with open(filepath) as f:
    readcsv = csv.reader(f,delimiter=",")

    next(readcsv)
    #Count the number of voters that cast votes.
    total_votes_cast = sum(tuple([1 for row in readcsv]))
    #print("Number of votes casted: ", total_votes_cast)

    f.seek(0)
    next(readcsv)
    #Return a list of unique canidates.
    canidate_list_all = tuple([row[2] for row in readcsv])
    canidate_list_unique = []
    for i in canidate_list_all:
        if i not in canidate_list_unique:
            canidate_list_unique.append(i)
    #print(canidate_list_unique) #['Khan', 'Correy', 'Li', "O'Tooley"]

    f.seek(0)
    next(readcsv)
    #Determine the number of votes for each canidate by summing.
    votes_khan = 0
    votes_correy = 0
    votes_li = 0
    votes_otooley = 0

    for row in readcsv:
        if row[2] == "Khan":
            votes_khan += 1

        elif row[2] == "Correy":
            votes_correy += 1

        elif row[2] == "Li":
            votes_li += 1
        else:
            votes_otooley += 1

    #Determine the percentages for each canidate.
    pct_votes_khan = (float(votes_khan/total_votes_cast)) * 100
    pct_votes_correy = (float(votes_correy/total_votes_cast)) * 100
    pct_votes_li = (float(votes_li/total_votes_cast)) * 100
    pct_votes_otooley = (float(votes_otooley/total_votes_cast)) * 100

    results_dict = {'khan': votes_khan, 'correy': votes_correy, 'li': votes_li, 'otooley': votes_otooley}
    canidate_w_most_votes = max(results_dict, key=results_dict.get)

    orig_stdout = sys.stdout
    fileoutput = open("election_data_2_summary.txt", "w")
    sys.stdout = fileoutput

    #Print summary results to text file.
    print("Election Results")
    print("------------------")
    print("Total Votes: ", total_votes_cast)
    print("------------------")
    print("Khan: ", votes_khan, pct_votes_khan, "%")
    print("Correy: ", votes_correy, pct_votes_correy, "%")
    print("Li: ", votes_li, pct_votes_li, "%")
    print("O'Tooley: ", votes_otooley, pct_votes_otooley, "%")
    print("------------------")
    print("Winner: ", canidate_w_most_votes)

    sys.stdout = orig_stdout
    fileoutput.close()

    #Print summary results to terminal.
    print("Election Results")
    print("------------------")
    print("Total Votes: ", total_votes_cast)
    print("------------------")
    print("Khan: ", votes_khan, pct_votes_khan, "%")
    print("Correy: ", votes_correy, pct_votes_correy, "%")
    print("Li: ", votes_li, pct_votes_li, "%")
    print("O'Tooley: ", votes_otooley, pct_votes_otooley, "%")
    print("------------------")
    print("Winner: ", canidate_w_most_votes)
