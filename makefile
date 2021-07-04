default:
		@echo "--> RUNNING DEFAULT ============================================"
		docker-compose up -d --build

demo_shutdown:
		@echo "--> SHUTTING DOWN DEMO ENV ====================================="
		docker-compose down

clean:
		@echo "--> CLEANING UP ARTIFACTS ======================================"
		rm -Rf pdd_api/build/*
		rm -Rf nginx/content
		rm -Rf pdd_webapp/build

flush_containers:
		@echo "--> CLEANING UP CONTAINERS ====================================="
		docker system prune --force
		docker network prune --force
		docker volume prune --force

test:
		pdd_api/builer.sh
