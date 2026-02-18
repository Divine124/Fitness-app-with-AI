# Stage 1: build the JAR
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY gateway/pom.xml gateway/
COPY gateway/src gateway/src

RUN mvn -f gateway/pom.xml -DskipTests package

# Stage 2: run the JAR
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/gateway/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
