import urllib.request
import argparse
from pprint import pprint
from bs4 import BeautifulSoup
from html_table_extractor.extractor import Extractor


def url_get_contents(url):
    """ Opens a website and read its binary contents (HTTP Response Body) """
    req = urllib.request.Request(url=url)
    f = urllib.request.urlopen(req)
    return f.read()

def readFile(filename):
    with open(filename, 'r') as fin:
        return fin.read()

def processTable(table, sku):
    # Read first row, which will be X-axis labels
    yaxisN = 0
    xaxisVals = table[0]
    xdict = {}
    for i, label in enumerate(xaxisVals):
        if label == '\xa0':
            yaxisN += 1
        else:
            xdict[label] = []
    xaxisVals = xaxisVals[yaxisN:]

    #                              V : skip header row
    for i, row in enumerate(table[1:]):
        yVal = row[1]
        for j, cell in enumerate(row[yaxisN:]):
            xVal = xaxisVals[j]
            xdict[xVal].append(sku+cell)
            print("{}:{} = {}".format(xVal, yVal, cell))


    return xdict
    

def outputProductSkus(table):
    for size, vals in table.items():
        
        print("Size: {}".format(size))
        for val in vals:
            print("{}".format(val))

def main():
    # Parse arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('-u', nargs=1, default=None, help='URL')
    parser.add_argument('-f', nargs=1, default=None, help='HTML Content Input File')
    parser.add_argument('-o', nargs=1, default=None, help='Output File')
    parser.add_argument('-s', nargs=1, default=None, help='SKU Outline')

    args = parser.parse_args()

    url = args.u[0]
    sku = args.s[0]
    if url:
        xhtml = url_get_contents(url).decode('utf-8')
    else: 
        xhtml = readFile('sample.html')

    soup = BeautifulSoup(xhtml, 'lxml')
    tables = soup.find_all('table', attrs={"class":'chart'})
    cleanTables = []

    print("{} tables found".format(len(tables)))
    print("==== Table Information =====")
    for i, table in enumerate(tables):
        extractor = Extractor(table).parse()
        table = extractor.return_list()
        print("Table: {}    Rows: {}   Cols: {}".format(i, len(table), len(table[0])))
        cleanTables.append(table)

    tableIndex = input("Which table do you want to process with SKU: {}\n".format(sku))
    tableIndex = int(tableIndex)

    # pprint(cleanTables[tableIndex])
     
    skus = processTable(cleanTables[tableIndex], sku)

    outputProductSkus(skus)
    # pprint(cleanedTable)
    # # pprint(tables[0])
    # pprint(p.tables)


if __name__ == '__main__':
    main()