# Stage 1: build the JAR (gateway requires Java 23)
FROM maven:3.9-eclipse-temurin-23 AS build
WORKDIR /app
COPY gateway/pom.xml gateway/
COPY gateway/src gateway/src

RUN mvn -f gateway/pom.xml -DskipTests package

# Stage 2: run the JAR
FROM eclipse-temurin:23-jdk
WORKDIR /app
COPY --from=build /app/gateway/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
