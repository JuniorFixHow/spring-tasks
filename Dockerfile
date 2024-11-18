FROM maven:3.9.4-eclipse-temurin-21-alpine AS build
COPY . .
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:21-slim

WORKDIR /app
COPY --from=build /app/target/todoApp-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/todoApp-0.0.1-SNAPSHOT.jar"]
