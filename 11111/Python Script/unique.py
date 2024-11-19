import pandas as pd

def extract_unique_entries_safe(file_path, column_number):
    unique_entries = set()

    try:
        excel_data = pd.ExcelFile(file_path)
    except Exception as e:
        print(f"Error loading Excel file: {e}")
        return []

    for sheet_name in excel_data.sheet_names:
        try:
            sheet_df = excel_data.parse(sheet_name, engine="openpyxl")
            if column_number < len(sheet_df.columns):
                unique_entries.update(sheet_df.iloc[:, column_number].dropna().astype(str))
            else:
                print(f"Column {column_number} not found in sheet '{sheet_name}'. Skipping...")
        except Exception as e:
            print(f"Error processing sheet {sheet_name}: {e}")

    return sorted(unique_entries)

# Example usage
if __name__ == "__main__":
    file_path = r"D:\GitHub\Quick Aid\QuickAid\Python Script\file.xlsx"
    column_number = 8
    unique_list = extract_unique_entries_safe(file_path, column_number)
    print("Unique Entries:", unique_list)
    # for id, u in enumerate(unique_list):
    #     print(f'{id+1}. {u}')
