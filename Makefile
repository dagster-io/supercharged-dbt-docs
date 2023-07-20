.venv:
	rm -fr .venv.real
	python3 -m venv .venv.real
	.venv.real/bin/pip install --upgrade pip
	.venv.real/bin/pip install httpcompressionserver
	ln -s .venv.real .venv

dist/original: manifest.json catalog.json
	rm -fr original-dbt-docs-out.tmp
	mkdir original-dbt-docs-out.tmp
	cp original-dbt-docs-sources/index.html original-dbt-docs-out.tmp/index.html
	cp catalog.json original-dbt-docs-out.tmp/catalog.json
	cp manifest.json original-dbt-docs-out.tmp/manifest.json
	mkdir -p dist
	mv original-dbt-docs-out.tmp dist/original

dist/supercharged: src manifest.json catalog.json
	yarn build

all: .venv dist/original dist/supercharged

clean:
	rm -fr .venv
	rm -fr .venv.real
	rm -fr dist