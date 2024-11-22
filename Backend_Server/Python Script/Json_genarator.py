import pandas as pd
import json
from datetime import datetime

def clean_value(value):
    """Clean individual cell values."""
    if pd.isna(value):  # Check for NaN and replace with empty string
        return ""
    
    if isinstance(value, str):
        # Replace non-breaking spaces with regular spaces or remove them
        value = value.replace("\u00a0", "").strip()
        # If it's a phone number with multiple entries, take the first one
        if "\n" in value or "," in value:
            value = value.split()[0].strip()  # Split on whitespace first, then use first entry
        elif "," in value:
            value = value.split(",")[0].strip()  # If separated by comma, take the first value
        elif "\n" in value:
            value = value.split("\n")[0].strip()  # If separated by newline, take the first value
    return value

def handle_date(value):
    """Handle date conversion or return default date."""
    if pd.isna(value):  # If the value is NaN, return the default date
        return "1980-10-10"
    
    if isinstance(value, datetime):
        # Format datetime to 'YYYY-MM-DD'
        return value.strftime('%Y-%m-%d')
    
    return "1980-10-10"  # If the value is not a valid date, return the default date

def excel_to_json(file_path, sheet_name, first_row, last_row, first_col, last_col, skip_col, row_name):
    # Load the Excel sheet using openpyxl explicitly
    data = pd.read_excel(file_path, sheet_name=sheet_name, header=None, engine='openpyxl')

    # Adjust to 0-based indexing for pandas
    first_row_idx = first_row - 1
    last_row_idx = last_row
    first_col_idx = first_col - 1
    last_col_idx = last_col

    # Extract the required data range
    data = data.iloc[first_row_idx:last_row_idx, first_col_idx:last_col_idx]
    
    # Drop the skipped columns
    skip_col_indices = [col - 1 for col in skip_col]  # Convert to 0-based index
    data = data.drop(data.columns[skip_col_indices], axis=1)
    
    # Ensure row_name matches the number of columns after skipping
    if len(row_name) != len(data.columns):
        raise ValueError("Length of 'row_name' must match the number of columns after skipping.")

    # Create JSON objects for each row
    json_list = []
    for _, row in data.iterrows():
        # Clean values in the row
        row_dict = {key: clean_value(value) for key, value in zip(row_name, row)}
        
        # Handle datetime serialization with custom format (YYYY-MM-DD)
        for key, value in row_dict.items():
            if isinstance(value, str) and value == "":
                # Check if the value is a date column and handle missing date
                if "doj" in key.lower():  # Assuming 'doj' is the column name for the date
                    row_dict[key] = handle_date(value)
        
        json_list.append(row_dict)

    # Serialize JSON, ensuring that datetime is properly handled
    def date_handler(obj):
        if isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%d')  # Convert datetime to string
        raise TypeError(f"Type {obj.__class__.__name__} not serializable")

    return json.dumps(json_list, default=date_handler, indent=4)

# Example usage
file_path = r"D:\GitHub\Quick Aid\QuickAid\Backend_Server\Python Script\file.xlsx"
sheet_name = "ICMD"
first_row = 2
last_row = 83
first_col = 1
last_col = 14
skip_col = [3, 4, 8, 11, 13]
row_name = ['empid', 'name', 'gender', 'email', 'department', 'designation', 'phone', 'sup_id', 'doj']  # Replace with the correct names

json_result = excel_to_json(file_path, sheet_name, first_row, last_row, first_col, last_col, skip_col, row_name)
print(json_result)

# Optional: Save to file
with open("output.json", "w") as json_file:
    json_file.write(json_result)
