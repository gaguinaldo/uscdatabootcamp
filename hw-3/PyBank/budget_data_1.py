#PyBank
import os, csv, sys
csvpath = os.path.join('budget_data_1.csv')

with open(csvpath) as f:
    readcsv = csv.reader(f, delimiter=',')

    next(readcsv)
    revenue_list = [int(row[1]) for row in readcsv]
    revtotal = sum(revenue_list)

    f.seek(0)
    next(readcsv)
    transaction_list = [row[0] for row in readcsv]

    #From reveiewing the data in Excel, the max value was on Sep-15 and min value was on 08-14
    print(" ")
    print("Financial Summary")
    print("----------------------------------------")
    print("Total Revenue: ", revtotal)
    print("Minimum Revenue: ", min(revenue_list))
    print("Maximum Revneue: ", max(revenue_list))
    print("Total Number of Transactions: ", len(transaction_list))
    print("Average: ", float(int(revtotal)/int(len(transaction_list))))
    print("Month and year of the maximum revenue: ", transaction_list[revenue_list.index(max(revenue_list))])
    print("Month and year of the minimim revenue: ", transaction_list[revenue_list.index(min(revenue_list))])

    orig_stdout = sys.stdout
    fileoutput = open("budget_data_1_summary.txt", "w")
    sys.stdout = fileoutput

    print(" ")
    print("Financial Summary")
    print("----------------------------------------")
    print("Total Revenue: ", revtotal)
    print("Minimum Revenue: ", min(revenue_list))
    print("Maximum Revneue: ", max(revenue_list))
    print("Total Number of Transactions: ", len(transaction_list))
    print("Average: ", float(int(revtotal)/int(len(transaction_list))))
    print("Month and year of the maximum revenue: ", transaction_list[revenue_list.index(max(revenue_list))])
    print("Month and year of the minimim revenue: ", transaction_list[revenue_list.index(min(revenue_list))])

    sys.stdout = orig_stdout
    fileoutput.close()
