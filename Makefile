USER=node

up:
	docker-compose up --build

down:
	docker-compose down

stop:
	docker-compose stop

sh:
	docker-compose exec adonis sh

sh\:db:
	docker-compose exec db bash

setup:
	cp .env.example .env

migrate:
	docker-compose exec --user=${USER} adonis adonis migration:run
