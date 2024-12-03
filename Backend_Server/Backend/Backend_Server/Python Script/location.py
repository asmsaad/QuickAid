import pandas as pd
import json

def excel_to_list_of_dicts(file_path):
    # Load the Excel sheet (assuming the first sheet)
    data = pd.read_excel(file_path, header=None, engine='openpyxl')

    # Extract relevant rows (from 2 to 363) and columns (4th, 7th, and 8th)
    selected_data = data.iloc[1:363, [4, 8, 9]]  # 0-based index: 3 for 4th col, 6 for 7th, 7 for 8th

    # Rename columns for clarity
    selected_data.columns = ['designation', 'email', 'location']

    # Convert to a list of dictionaries
    data_list = selected_data.apply(lambda row: {
        'email': row['email'],
        'department': row['designation'].strip(),
        'location': row['location'].split(' Dhaka 1208,')[1].strip()
    }, axis=1).tolist()

    return data_list

# Example usage
file_path = r"D:\GitHub\Quick Aid\QuickAid\Backend_Server\Python Script\location.xlsx"  # Replace with your actual file path
data_result = excel_to_list_of_dicts(file_path)
print(json.dumps(data_result, indent=4))

# Optional: Save to JSON file
with open("output.json", "w") as json_file:
    json.dump(data_result, json_file, indent=4)
