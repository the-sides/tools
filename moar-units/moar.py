import csv

# The product to be extended
productName = 'MotionFoot MX'

# Keyed on kg, value is lbs
leftSide = {14: 30, 21: 46, 23: 50, 28: 61, 34: 75, 35: 76, 44: 97, 45: 100, 51: 111, 54: 120, 57: 125, 59: 130, 60: 131, 61: 133, 64: 140, 69: 150, 71: 155, 73: 160, 75: 164, 81: 177, 82: 180, 86: 190, 87: 192, 91: 200, 96: 210, 100: 220, 101: 221, 102: 225, 107: 236, 108: 236, 110: 240, 113: 250, 114: 250, 125: 276, 126: 276, 132: 290, 137: 301, 150: 330}  
rightSide = {20: 45, 27: 60, 33: 74, 34: 75, 44: 99, 54: 119, 56: 124, 57: 125, 58: 129, 59: 130, 63: 139, 68: 149, 70: 154, 72: 159, 73: 162, 74: 163, 80: 176, 81: 179, 85: 189, 87: 192, 90: 198, 95: 209, 99: 219, 100: 220, 102: 224, 107: 235, 109: 239, 112: 246, 113: 249, 124: 275, 125: 275, 131: 289, 136: 300, 150: 330, 166: 365, 200: 440}


with open('sheet.csv', 'r') as fin:
  reader = csv.DictReader(fin)
  # print(reader)
  for entry in reader: 
    if entry['Minimum Patient Weight (kg)'] and entry['Maximum Patient Weight (kg)'] and entry['Name'] == productName:
      min = int(entry['Minimum Patient Weight (kg)'])
      max = int(entry['Maximum Patient Weight (kg)'])
      try: 
        print(f"{leftSide[min]}\t{rightSide[max]}")
      except:
        print('Not all units have been converted', min, max)
        exit()
      # print(f'\t{min}\t{max}')
      # Check to see if combination has been logged


