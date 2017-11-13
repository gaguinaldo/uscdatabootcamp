Sub max_min_date2():

  'Define an array
  Dim values As Variant
  Dim LastRow As Long
  
  With Worksheets("B") 'Change to your sheet
      LastRow = .Cells(.Rows.Count, 1).End(xlUp).Row

      'Define the size of the array
      ReDim values(1 To LastRow - 1, 1 To 1) As Variant

      'Set up for loop'
      For i = 2 To 100

         'Populate values in the array.
         values(i - 1, 1) = .Evaluate("=MAX(IF(A:A=" & .Cells(i, 11).Address & ",B:B))")

       Next i

      'Populate Excel sheet with values in the array.
      .Range("L2").Resize(LastRow - 1).Value = values

    End With
    
End Sub
