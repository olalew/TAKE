FROM airhacks/glassfish
COPY ./target/travel.war ${DEPLOYMENT_DIR}
