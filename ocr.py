from PIL import Image
import pytesseract
import numpy as np
import re
import pandas as pd
import platform
import os

filename = "example_images/test_receipt_dollars.png".replace(os.sep, '/')

if platform.system() == "Windows":
    pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'.replace(os.sep, '/')

img1 = np.array(Image.open(filename))

text = pytesseract.image_to_string(img1)

output_file = "example_ocr_txt/test_receipt_dollars.txt".replace(os.sep, '/')

with open(output_file, 'w', encoding='utf-8') as file:
    file.write(text)


date_pattern = re.compile(r'(\d{2})[/.,-](\d{2})[/.,-](\d{4})')
# Check for $/£ 
cost_pattern = re.compile(r'[\£\$\€]\d+(?:\.\d{2})?')
currency_abrvs = ["GBP", "USD"]
currency = ""
date = ""
amounts = []
date_found = False
cost_found = False
with open(output_file, "r", encoding='utf-8') as file:
    for line in file:
        if date_pattern.search(line):
            date = date_pattern.search(line).group()
            date_found = True
        if cost_pattern.search(line):
            amounts.append(cost_pattern.search(line).group())
            cost_found = True

        for symbol in currency_abrvs:
            if symbol in line:
                currency = symbol
        if "£" in line:
            currency = "GBP"
        elif "$" in line:
            currency = "USD"

# placeholder error handling
if not cost_found:
    print("No costs found in the file")

if not date_found:
    print("No date found in the file")
    
def find_highest(arr):
    float_arr = list(map(lambda x: float(x[1:]), arr))
    return max(float_arr)

total_cost = find_highest(amounts)

def reformat_date(string, character):
    return "/".join(string.split(character))

formatted_date = reformat_date(date, date[2])

print(currency)
print(formatted_date)
print(total_cost)

incomplete_df = pd.read_csv("example_expenses/ExpenseReport-RawCardDataOnly.csv".replace(os.sep, '/'), usecols=["Date", "Amount"])

print(incomplete_df)

for index, row in incomplete_df.iterrows():
    df_date = row["Date"]
    df_price = row["Amount"]
    print(df_date)
    if df_date == formatted_date and df_price == total_cost:
        print("Matched", index) 

