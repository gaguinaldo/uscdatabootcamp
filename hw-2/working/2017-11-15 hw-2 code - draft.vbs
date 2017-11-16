Sub WorksheetLoop()

    Dim WS_Count As Integer
    Dim I As Integer

    WS_Count = ActiveWorkbook.Worksheets.Count

    For I = 1 To WS_Count
        Call unique_tickers()

    Next I

End Sub

'---------------------------------------

Sub unique_tickers()

With ActiveSheet

    Range("I1").Value = "Unique Ticker"
    Range("J1").Value = "Total Volume"

    Dim last_row As Long
    last_row = Cells(Rows.Count, "A").End(xlUp).Row

    Dim unique As String

    Dim Tick_Total As Double
    Tick_Total = 0
    
    Dim Summary_Table_Row As Integer
    Summary = 2
    
    For I = 2 To last_row
        If Cells(I + 1, 1).Value <> Cells(I, 1).Value Then
    
            unique = Cells(I, 1).Value
            Tick_Total = Tick_Total + Cells(I, 7).Value
            Range("I" & Summary).Value = unique
            Range("J" & Summary).Value = Tick_Total
            Summary = Summary + 1
            Tick_Total = 0
    
        Else:
            Tick_Total = Tick_Total + Cells(I, 3).Value
    
        End If
    
    Next I

End With
End Sub
