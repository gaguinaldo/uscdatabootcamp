# The list of candies to print to the screen
candyList = ["Snickers", "Kit Kat", "Sour Patch Kids", "Juicy Fruit", "Sweedish Fish", "Skittles", "Hershey Bar", "Skittles", "Starbursts", "M&Ms"]

# The amount of candy the user will be allowed to choose
allowance = 5

print("Welcome to the candy store.  These are our selections: (1) Snickers, (2) Kit Kat, (3) Sour Patch Kids, (4) Juicy Fruit, (5)Sweedish Fish, (6) Skittles, (7) Hershey Bar, (8) Skittles, (9) Starbursts, (10) M&Ms")

# The list used to store all of the candies selected inside of
selectionList = []
for i in range(allowance):
    selection = int(input("What kind of candy do you want?"))
    selectionList.append(candyList[int(selection - 1)])

print("You have selected:")
for i in selectionList:
    print(i)
