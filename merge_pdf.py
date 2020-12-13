# usage merge_pdf.py file1 file2 file3 output_file

import PyPDF2, sys, os

print(sys.argv)

if len(sys.argv) < 2:
	exit('invalid number of args')

pdf_merger = PyPDF2.PdfFileMerger()
page_num = 1

for pdf in sys.argv[1:-1]:
	pdf_reader = PyPDF2.PdfFileReader(pdf)
	pdf_merger.merge(page_num, pdf)
	page_num += pdf_reader.getNumPages()


pdf_merger.write(sys.argv[-1])
