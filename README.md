# Build
mvn clean package && docker build -t com.polsl.take/travel .

# RUN

docker rm -f travel || true && docker run -d -p 8080:8080 -p 4848:4848 --name travel com.polsl.take/travel 