import urllib.request
import argparse
from pprint import pprint
from bs4 import BeautifulSoup
from html_table_extractor.extractor import Extractor

# Parse arguments
parser = argparse.ArgumentParser()
parser.add_argument('-u', nargs=1, default=None, help='URL')
parser.add_argument('--html', nargs=1, default=None, help='HTML Content File')

args = parser.parse_args()

def url_get_contents(url):
    """ Opens a website and read its binary contents (HTTP Response Body) """
    req = urllib.request.Request(url=url)
    f = urllib.request.urlopen(req)
    return f.read()

def readFile(filename):
    with open(filename, 'r') as fin:
        return fin.read()

def main():
    url = args.u[0]
    xhtml = url_get_contents(url).decode('utf-8')
    # xhtml = readFile('sample.html')
    soup = BeautifulSoup(xhtml, 'lxml')

    # print(xhtml)
    tables = soup.find_all('table', attrs={"class":'chart'})
    print("Tables found: {}".format(len(tables)))
    print(tables[0])
    
    extractor = Extractor(tables[0])
    extractor.parse()
    cleanedTable = extractor.return_list()

    pprint(cleanedTable)
    # # pprint(tables[0])
    # pprint(p.tables)


if __name__ == '__main__':
    main()