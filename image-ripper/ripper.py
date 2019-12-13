import requests
import os
import csv

try:
    os.mkdir('pics')
except OSError:
    print ("'pics' directory already exists")
else:
    print ("Successfully created the directory %s " % 'pics')

urls = {}

with open('urls.csv', 'r') as fin:
  reader = csv.DictReader(fin)
  # print(reader)
  for entry in reader: 
    if entry['PIC'] and entry['Images'] and entry['Images'][0] != '':
      print(entry['PIC'], entry['Images'].replace('\n', '').replace(' ', '').split(','))
      urls[entry['PIC']] = entry['Images'].replace('\n', '').replace(' ', '').split(',')


for PIC in dict.keys(urls):
  for url in urls[PIC]:
    filename = f"{PIC}-{url.split('/')[-1]}"
    print(f'Downloading: {PIC}:{filename} from {url}')
    r = requests.get(url, allow_redirects=True)
    open(f'pics/{filename}', 'wb').write(r.content)
