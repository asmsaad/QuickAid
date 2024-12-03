import pandas as pd
import json
from datetime import datetime

def clean_value(value):
    """Clean individual cell values."""
    if pd.isna(value):  # Check for NaN and replace with an empty string
        return ""
    
    if isinstance(value, str):
        value = value.replace("\u00a0", "").strip()
        if "\n" in value or "," in value:
            value = value.split()[0].strip()  # Split on whitespace first, then use the first entry
    
    # Convert datetime values to a string in 'YYYY-MM-DD' format
    if isinstance(value, datetime):
        return value.strftime('%Y-%m-%d')
    
    return value

def handle_date(value):
    """Handle date conversion or return the default date."""
    if pd.isna(value):
        return "1980-10-10"
    if isinstance(value, datetime):
        return value.strftime('%Y-%m-%d')
    return "1980-10-10"  # Default date for invalid or missing values

def excel_to_plain_json(file_path, first_row, last_row, first_col, last_col, skip_col, row_name):
    # Load all sheets in the Excel file
    xls = pd.ExcelFile(file_path)
    combined_data = []

    for sheet_name in xls.sheet_names:  # Loop through each sheet
        data = pd.read_excel(file_path, sheet_name=sheet_name, header=None, engine='openpyxl')
        
        # Adjust to 0-based indexing for pandas
        first_row_idx = first_row - 1
        last_row_idx = last_row
        first_col_idx = first_col - 1
        last_col_idx = last_col

        # Extract the required data range
        data = data.iloc[first_row_idx:last_row_idx, first_col_idx:last_col_idx]
        
        # Drop the skipped columns
        skip_col_indices = [col - 1 for col in skip_col]
        data = data.drop(data.columns[skip_col_indices], axis=1)
        
        # Ensure row_name matches the number of columns after skipping
        if len(row_name) != len(data.columns):
            raise ValueError(f"Length of 'row_name' must match the number of columns after skipping in sheet {sheet_name}.")

        # Create JSON objects for each row
        for _, row in data.iterrows():
            row_dict = {key: clean_value(value) for key, value in zip(row_name, row)}
            
            # Handle date column logic
            for key, value in row_dict.items():
                if "doj" in key.lower() and value == "":
                    row_dict[key] = handle_date(value)
            
            combined_data.append(row_dict)  # Add row to the combined list

    # Serialize JSON, handling datetime properly
    return json.dumps(combined_data, indent=4)

# Example usage
file_path = r"D:\GitHub\Quick Aid\QuickAid\Backend_Server\Python Script\file.xlsx"
first_row = 2
last_row = 83
first_col = 1
last_col = 14
skip_col = [3, 4, 8, 11, 13]
row_name = ['empid', 'name', 'gender', 'email', 'department', 'designation', 'phone', 'sup_id', 'doj']

json_result = excel_to_plain_json(file_path, first_row, last_row, first_col, last_col, skip_col, row_name)
print(json_result)

# Optional: Save to file
with open("output.json", "w") as json_file:
    json_file.write(json_result)
