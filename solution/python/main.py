import pandas as pd

# Replace 'your_file.csv' with the actual file path
file_path = 'your_file.csv'

# Read the CSV file into a pandas DataFrame
df = pd.read_csv(file_path)

# Now, 'df' contains your data, and you can perform various operations on it
# For example, you can display the first few rows of the DataFrame
print(df.head())
