# usage merge_pdf.py file.pdf

import os
import sys
from PyPDF2 import PdfFileReader, PdfFileWriter

filname, ext = os.path.splitext(sys.argv[1])

reader = PdfFileReader(sys.argv[1])

for i in range(reader.numPages):
    writer = PdfFileWriter()
    writer.addPage(reader.getPage(i))

    with open(f'{filname}_{i}{ext}', 'wb') as outfile:
        writer.write(outfile)

    print(f'writing {filname}_{i}{ext}')

