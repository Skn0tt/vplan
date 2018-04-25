open: Paper.pdf
	open Paper.pdf

Paper.epub: Paper.md Paper.bib eisvogel.latex
	pandoc Paper.md -o Paper.epub \
		--listings \
		--filter pandoc-citeproc	

Paper.pdf: Paper.md Paper.bib eisvogel.latex
	pandoc Paper.md -o Paper.pdf \
		--template eisvogel \
		--listings \
		--filter pandoc-citeproc
