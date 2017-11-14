Sub main_analysis()

    
    Call remove_duplicates
    Call create_headers
    Call share_tot
    Call max_date
    Call min_date
    Call concat
    Call close_lookup
    Call open_lookup
    Call change
    Call summary

End Sub

'--------------------------------------------------------------------------------
'Creates all headers for new columns that are created from the script.

Sub create_headers()
    With ActiveSheet

        .Range("K1").Value = "Unique Tickers"
        .Range("I1").Value = "Helper Column"
        .Range("L1").Value = "Close Date"
        .Range("M1").Value = "Helper Close"
        .Range("N1").Value = "Open Date"
        .Range("O1").Value = "Helper Open"
        .Range("P1").Value = "Open Price"
        .Range("Q1").Value = "Close Price"
        .Range("R1").Value = "Change"
        .Range("S1").Value = "Percent Change"
        .Range("U1").Value = "Summary Category"
        .Range("U2").Value = "Largest Percent Change:"
        .Range("U3").Value = "Smallest Percent Change:"
        .Range("U4").Value = "Largest Volume Movemnet:"
        .Range("W1").Value = "Value"
        .Range("T1").Value = "Total Volume"
        .Range("X1").Value = "Ticker"

    End With

End Sub

'--------------------------------------------------------------------------------
'Scans all of the tickers in the data set and creates a list of unique values in
Sub remove_duplicates():
       
    Range("A1", Range("A1").End(xlDown)).AdvancedFilter Action:=xlFilterCopy, CopyToRange:=Range("K1"), Unique:=True

End Sub

'--------------------------------------------------------------------------------
'Concatenates the ticker and the date to create a unique ID for each entry in the data set and the summary table.

Sub concat()

    Dim last_row As Long
    last_row = Cells(Rows.Count, "A").End(xlUp).Row
    
    Dim s_last_row As Long
    s_last_row = Cells(Rows.Count, "K").End(xlUp).Row

    For i = 2 To last_row
    
        Cells(i, 9) = Cells(i, 1).Value & Cells(i, 2).Value
        
    Next i

    For j = 2 To s_last_row
        Cells(j, 13) = Cells(j, 11).Value & Cells(j, 12).Value
        Cells(j, 15) = Cells(j, 11).Value & Cells(j, 14).Value

    Next j
        
End Sub


'--------------------------------------------------------------------------------
'********************************************************************************
'********************************************************************************
'********************************************************************************
'************************MORE WORK NEEDS TO BE DONE HERE.************************
'********************************************************************************
'********************************************************************************
'********************************************************************************
'Look up closing values from the data set and return the respective values.

Sub close_lookup()

    Dim last_row As Long
    last_row = Cells(Rows.Count, "I").End(xlUp).Row
    
    Dim s_last_row As Long
    s_last_row = Cells(Rows.Count, "K").End(xlUp).Row
    
    For i = 2 To s_last_row
    
        For j = 2 To last_row
            
            If Cells(i, 13).Value = Cells(j, 9).Value Then
                Cells(i, 17).Value = Cells(j, 6).Value
                   
            Else: Cells(i, 17).Value = "*X*"
            End If
        
        Next j
    
    Next i

End Sub

'--------------------------------------------------------------------------------
'********************************************************************************
'********************************************************************************
'********************************************************************************
'************************MORE WORK NEEDS TO BE DONE HERE.************************
'********************************************************************************
'********************************************************************************
'********************************************************************************
'Look up opening values from the data set and return the respective values.

Sub open_lookup()

    Dim last_row As Long
    last_row = Cells(Rows.Count, "I").End(xlUp).Row
    
    Dim s_last_row As Long
    s_last_row = Cells(Rows.Count, "K").End(xlUp).Row
    
    For i = 2 To s_last_row
    
        For j = 2 To last_row
            
            If Cells(i, 15).Value = Cells(j, 9).Value Then
                Cells(i, 16).Value = Cells(j, 3).Value
                   
            Else: Cells(i, 16).Value = "*X*"
            End If
        
        Next j
    
    Next i

End Sub

'--------------------------------------------------------------------------------
'Determines the change and percent change for each ticker based on the opening and close price.
'Also changes the color of the cell based on the values (red for < 0 and green for > 0)

Sub change()

    Dim last_row As Long
    last_row = Cells(Rows.Count, "K").End(xlUp).Row
    
    For i = 2 To last_row
    
        Cells(i, 18).Value = Cells(i, 16).Value - Cells(i, 17).Value

        'Adding one to prevent any divide by zero cases.
        Cells(i, 19).Value = ((Cells(i, 18).Value + 1) / (Cells(i, 16).Value + 1)) * 100
        
        If Cells(i, 19) < 0 Then
            Cells(i, 19).Interior.ColorIndex = 3
        
        ElseIf Cells(i, 19) > 0 Then
            Cells(i, 19).Interior.ColorIndex = 4
        
        End If
        
    Next i

End Sub

'--------------------------------------------------------------------------------
'Performs a look up to find the max/min of the values and returns the respective ticker symbol.

Sub summary()

    Dim last_row As Long
    last_row = Cells(Rows.Count, "K").End(xlUp).Row

    'Find largest percent change from summary table'
    Range("W2").Value = Application.WorksheetFunction.Max(Columns("S"))

    'Fina smallest percent change from summary table'
    Range("W3").Value = Application.WorksheetFunction.Min(Columns("S"))
    
    'Find largest volume movement from summary table.'
    Range("W4").Value = Application.WorksheetFunction.Max(Columns("T"))
    
    'Need to scan the summary table and find the max and min values for each.
    'Then need to do a look up based on these values and return the ticker for each.
    
    'Finds ticker for largest volume movement of shares. '
    For i = 2 To last_row
        If Range("W4").Value = Cells(i, 20).Value Then
            Range("X4").Value = Cells(i, 11).Value
        End If
        
    Next i
    
    'Finds ticker for smallest percent change.'
    For i = 2 To last_row
        If Range("W3").Value = Cells(i, 19).Value Then
            Range("X3").Value = Cells(i, 11).Value
        End If
        
    Next i
    
    'Finds ticker for largest percent change.'
    For i = 2 To last_row
        If Range("W2").Value = Cells(i, 19).Value Then
            Range("X2").Value = Cells(i, 11).Value
        End If
        
    Next i

End Sub

'--------------------------------------------------------------------------------
'Calculuates total volume of shares moved per year for each unique ticker.

Sub share_tot():

    Dim last_row As Long
    last_row = Cells(Rows.Count, "A").End(xlUp).Row

    For i = 2 To 25

        Cells(i, 20) = Application.WorksheetFunction.SumIf(Range("A:A"), Cells(i, 11), Range("G:G"))

    Next i

End Sub

'--------------------------------------------------------------------------------
'Determines the closing date of the year for each unique ticker.

Sub max_date()

'Define an array
Dim values As Variant
Dim LastRow As Long
Dim LastRow2 As Long

'set the worksheet
With ActiveSheet 'Change to your sheet

    'get last row to avoid unnecessary loops
    LastRow = .Cells(.Rows.Count, 11).End(xlUp).Row

    'get last row of ref data to avoid unnecessary calculations
    LastRow2 = .Cells(.Rows.Count, 1).End(xlUp).Row

    'Define the size of the array make it a two dimensional for ease of assigning back to array.
    ReDim values(1 To LastRow - 1, 1 To 1) As Variant

    'Set up for loop'
    For i = 2 To LastRow

        'Populate values in the array.
        values(i - 1, 1) = .Evaluate("=MAX(IF(A2:A" & LastRow2 & "=" & .Cells(i, 11).Address & ",B2:B" & LastRow2 & "))")

    Next i

    'Populate Excel sheet with values in the array.
    .Range("L2").Resize(LastRow - 1).Value = values

End With

End Sub

'--------------------------------------------------------------------------------
'Determines the opening date of the year for each unique ticker.

Sub min_date()

'Define an array
Dim values As Variant
Dim LastRow As Long
Dim LastRow2 As Long

'set the worksheet
With ActiveSheet 'Change to your sheet

    'get last row to avoid unnecessary loops
    LastRow = .Cells(.Rows.Count, 11).End(xlUp).Row
    
    'get last row of ref data to avoid unnecessary calculations
    LastRow2 = .Cells(.Rows.Count, 1).End(xlUp).Row
    
    'Define the size of the array make it a two dimensional for ease of assigning back to array.
    ReDim values(1 To LastRow - 1, 1 To 1) As Variant

    'Set up for loop'
    For i = 2 To LastRow

        'Populate values in the array.
        values(i - 1, 1) = .Evaluate("=MIN(IF(A2:A" & LastRow2 & "=" & .Cells(i, 11).Address & ",B2:B" & LastRow2 & "))")

    Next i

    'Populate Excel sheet with values in the array.
    .Range("N2").Resize(LastRow - 1).Value = values

End With

End Sub
