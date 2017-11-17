Sub unique_tickers()

Dim ws As Worksheet

    For Each ws In Worksheets

        ws.Range("I1").Value = "Ticker"
        ws.Range("J1").Value = "Total Stock Volume"
    
        Dim last_row As Long
        last_row = Cells(Rows.Count, "A").End(xlUp).Row
    
        Dim unique As String
    
        Dim Tick_Total As Double
        Tick_Total = 0
        
        Dim Summary_Table_Row As Integer
        Summary = 2

        For i = 2 To last_row
            If ws.Cells(i + 1, 1).Value <> ws.Cells(i, 1).Value Then
        
                unique = Cells(i, 1).Value
                Tick_Total = Tick_Total + ws.Cells(i, 7).Value
                ws.Range("I" & Summary).Value = unique
                ws.Range("J" & Summary).Value = Tick_Total
                Summary = Summary + 1
                Tick_Total = 0
        
            Else:
              Tick_Total = Tick_Total + ws.Cells(i, 3).Value
        
            End If
        
        Next i

    Next ws

End Sub
