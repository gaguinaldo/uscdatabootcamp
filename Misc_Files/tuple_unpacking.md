Consider the following tuples:
	
	tuple_1 = ('1900', '01', '02)
  	tuple_2 = ('1950', '01', '02)

You can assign the elements of each tuple to its own variable:
  
	x1, x2, x3 = tuple_1
  	x4, x5, x6 = tuple_2

Now what is most interesting is that you can do comparisons between both tuples like this:

	tuple_1 < tuple_2

And what python will do is compare elements, pairwise between the element of each tuple sequentially.  For example, in `tuple_1 < tuple_2`, python first looks at `x1 and x4` and reports  `True` or `False` depending on the comparison being made. 

If a `True` or `False` is made python stops.  

On the other hand,  if they are equal, then it moves on to `x2 and x5` and makes the same comparison -- `True` or `False`.    If they are equal it moves on to `x3 and x6`.
