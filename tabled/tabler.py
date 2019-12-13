import urllib.request, argparse, re
from pprint import pprint
from bs4 import BeautifulSoup
from html_table_extractor.extractor import Extractor

debug = True

def url_get_contents(url):
    """ Opens a website and read its binary contents (HTTP Response Body) """
    req = urllib.request.Request(url=url)
    f = urllib.request.urlopen(req)
    return f.read()

def readFile(filename):
    with open(filename, 'r') as fin:
        return fin.read()

def cleanRange(val):
    if 'kg' in val:
        val = val.split('-')
        return re.sub('[^0-9]','',val[0]),re.sub('[^0-9]','',val[1])
    else:
        return '',''

class product:
    sku = ''
    size = ''
    minWeight = ''
    maxWeight = ''
    duplicate = False
    def __init__(self, skuIn, sizeIn, minWeightIn, maxWeightIn):
        self.sku = skuIn  
        self.size = sizeIn  
        self.minWeight = minWeightIn  
        self.maxWeight = maxWeightIn  

    def printProduct(self):
        if not self.duplicate:
            print("{}\t{}\t{}\t{}".format(self.sku, self.size, self.minWeight, self.maxWeight))


def combineWeightRanges(gimmeThatDict):
    for i, sizeCol in gimmeThatDict.items():
        prevProd = sizeCol[0]
        for j, crntProd in enumerate(sizeCol[1:]):
            if crntProd.sku == prevProd.sku:
                # We're continuing a single product, objects need to be combined
                prevProd.maxWeight = crntProd.maxWeight
                crntProd.duplicate = True
            else:
                # Restart search criteria
                prevProd = crntProd
    return gimmeThatDict





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
        yValMin, yValMax = cleanRange(yVal)
        for j, cell in enumerate(row[yaxisN:]):
            if cell == 'NA': 
                continue
            xVal = xaxisVals[j]
            obj = product(sku+cell, xVal, yValMin, yValMax)
            xdict[xVal].append(obj)
            # print("{}:{} = {}".format(xVal, yVal, cell))


    return xdict
    

def outputProductSkus(table):
    for key, vals in table.items():
        
        # print("Size: {}".format(key))
        for val in vals:
            val.printProduct()

def main():
    # Parse arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('-u', nargs=1, default=None, help='URL')
    parser.add_argument('-f', nargs=1, default=None, help='HTML Content Input File')
    parser.add_argument('-o', nargs=1, default=None, help='Output File')
    parser.add_argument('-s', nargs=1, default=None, help='SKU Outline')
    parser.add_argument('-t', nargs=1, default=None, help='Which table in order of appearance to pull')

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

    try:
        tableIndex = int(args.t[0])
    except:
        tableIndex = int(input("Which table do you want to process with SKU: {}\n".format(sku)))

     
    products = processTable(cleanTables[tableIndex], sku)
    outputProductSkus(products)
    print('='*64) 
    print('{}Now without those pesky duplicates'.format(' '*16))
    print('='*64)

    products = combineWeightRanges(products)
    outputProductSkus(products)



if __name__ == '__main__':
    main()