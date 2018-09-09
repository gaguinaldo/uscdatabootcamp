class Employee(): #Name of the class
    
    def __init__(self, first_name, last_name, position, salary):

        self.first_name = first_name
        self.last_name = last_name
        self.position = position
        self.salary = salary

    def method_1(self): #These are called methods
        pass

    def method_2(self): #These are called methods
        pass

grant = Employee('Grant', 'Aguinaldo', 'Engineer', 5000) #This is called an instance.

print(grant.first_name) #This prints out the attributes
#Other attributes of this class include, last_name, position and salary
