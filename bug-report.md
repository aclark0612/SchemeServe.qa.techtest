# Bug report for purchasing app

## Able to purchase items with 0 quantity
Steps to reproduce:
- Navigate to catalogue page
- Select an item to purchase and click purchase button
- Enter quantity as 0 and submit

Expected behaviour:
- Validation error message should be displayed

Actual behaviour:
- Purchase successful modal displayed
- Purchase modal closed
- Item is no longer displayed on Inventory page

## Unable to click purchase Cancel button correctly
Steps to reproduce:
- Navigate to catalogue page
- Select an item to purchase and click purchase button
- Hover over Cancel button in purchase modal

Expected behaviour:
- Button should remain in position and be clickable

Actual behaviour:
- The button jumps up in position and is only clickable in the new position
- Hover away from button and the button displays in original position
