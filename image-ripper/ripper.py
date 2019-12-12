import requests
import os

try:
    os.mkdir('pics')
except OSError:
    print ("'pics' directory already exists")
else:
    print ("Successfully created the directory %s " % 'pics')

urls = []

with open('urls.txt', 'r') as fin:
  line = fin.readline().replace('\n', '') # Ignore newline character
  while line:
    urls.append(line)
    line = fin.readline().replace('\n', '') # Ignore newline character

for i, url in enumerate(urls):
  filename = url.split('/')[-1]
  print(f'Downloading: {filename}')
  r = requests.get(url, allow_redirects=True)
  open(f'pics/{filename}', 'wb').write(r.content)
