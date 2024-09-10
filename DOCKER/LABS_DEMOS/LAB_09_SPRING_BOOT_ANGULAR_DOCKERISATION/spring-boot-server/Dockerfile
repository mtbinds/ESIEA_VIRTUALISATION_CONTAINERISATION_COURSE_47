# Utilisation d'une image de base contenant Java
FROM openjdk:17

WORKDIR ./spring-boot-server

COPY target/spring-boot-data-jpa-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

CMD ["java", "-jar", "spring-boot-data-jpa-0.0.1-SNAPSHOT.jar"]
