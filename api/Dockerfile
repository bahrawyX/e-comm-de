# syntax=docker/dockerfile:1.6
# Backend Dockerfile optimized for Cloud Run + Artifact Registry
# Multi-arch aware for Apple Silicon (arm64) and amd64

# 1) Build stage with Maven (cache dependencies)
FROM --platform=$BUILDPLATFORM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /workspace

# Allow cross-platform metadata
ARG TARGETPLATFORM
ARG BUILDPLATFORM

# Copy only pom first to leverage Docker layer cache for dependencies
COPY pom.xml ./
RUN mvn -B -ntp -Dhttps.protocols=TLSv1.2 dependency:go-offline

# Now copy sources and build the fat jar (skip tests for faster CI; override with --build-arg RUN_TESTS=true)
ARG RUN_TESTS=false
COPY src ./src
RUN if [ "$RUN_TESTS" = "true" ]; then \
      mvn -B -ntp -Dhttps.protocols=TLSv1.2 clean package; \
    else \
      mvn -B -ntp -DskipTests -Dhttps.protocols=TLSv1.2 clean package; \
    fi

# 2) Runtime stage with Distroless Java 17 (nonroot, smaller, more secure)
# Use TARGETPLATFORM so buildx can emit correct architecture images
FROM --platform=$TARGETPLATFORM gcr.io/distroless/java17-debian12:nonroot
WORKDIR /app

# Copy the built jar (whatever the name is) and rename to app.jar
COPY --from=build /workspace/target/*.jar /app/app.jar

# Cloud Run uses $PORT; most Spring Boot apps default to 8080 if not set.
# Expose for local clarity (not required by Cloud Run)
EXPOSE 8080

# Useful JVM defaults for containers; adjustable via JAVA_TOOL_OPTIONS at deploy time
ENV JAVA_TOOL_OPTIONS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -Djava.security.egd=file:/dev/./urandom"

ENTRYPOINT ["java","-jar","/app/app.jar"]