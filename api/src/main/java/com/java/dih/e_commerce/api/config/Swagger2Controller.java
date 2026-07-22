package com.java.dih.e_commerce.api.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.models.*;
import io.swagger.models.auth.OAuth2Definition;
import io.swagger.models.properties.*;
import io.swagger.util.Json;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.responses.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springdoc.webmvc.api.OpenApiWebMvcResource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Hidden
@RestController
public class Swagger2Controller {

    private final OpenApiWebMvcResource openApiWebMvcResource;
    private final ObjectMapper objectMapper;

    /** When set, overrides the `host` field in the Swagger 2.0 output (e.g. your API Gateway hostname). */
    @Value("${gcp.api-gateway.host:}")
    private String gatewayHost;

    /** When set, injects `x-google-backend.address` at the top level — required by GCP API Gateway. */
    @Value("${gcp.api-gateway.backend-url:}")
    private String backendUrl;

    /** Firebase project ID for authentication configuration. */
    @Value("${gcp.api-gateway.firebase-project-id:}")
    private String firebaseProjectId;

    /** Service account email for IAM credentials on each operation. */
    @Value("${gcp.api-gateway.gateway-sa:}")
    private String gatewaySa;

    public Swagger2Controller(OpenApiWebMvcResource openApiWebMvcResource, ObjectMapper objectMapper) {
        this.openApiWebMvcResource = openApiWebMvcResource;
        this.objectMapper = objectMapper;
    }

    @GetMapping(value = "/openapi.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getSwagger2Spec(HttpServletRequest request, Locale locale) throws Exception {
        // Ask SpringDoc to compute the full OpenAPI 3 spec (with paths from all controllers)
        byte[] openApiBytes = openApiWebMvcResource.openapiJson(request, "/v3/api-docs", locale);
        OpenAPI openAPI = objectMapper.readValue(openApiBytes, OpenAPI.class);
        Swagger swagger = convert(openAPI);
        return ResponseEntity.ok(Json.pretty(swagger));
    }

    // ── Conversion ────────────────────────────────────────────────────────────

    private Swagger convert(OpenAPI api) {
        Swagger swagger = new Swagger();
        swagger.setSwagger("2.0");
        swagger.setSchemes(List.of(Scheme.HTTP, Scheme.HTTPS));
        swagger.setConsumes(List.of(MediaType.APPLICATION_JSON_VALUE));
        swagger.setProduces(List.of(MediaType.APPLICATION_JSON_VALUE));

        // Info
        if (api.getInfo() != null) {
            io.swagger.v3.oas.models.info.Info src = api.getInfo();
            Info info = new Info()
                    .title(src.getTitle())
                    .version(src.getVersion())
                    .description(src.getDescription());
            if (src.getContact() != null) {
                info.setContact(new Contact()
                        .name(src.getContact().getName())
                        .email(src.getContact().getEmail())
                        .url(src.getContact().getUrl()));
            }
            swagger.setInfo(info);
        }

        // Host + basePath: prefer GCP gateway host property, fall back to servers[0]
        String basePath = "/";
        if (gatewayHost != null && !gatewayHost.isBlank()) {
            swagger.setHost(gatewayHost);
            swagger.setBasePath("/");
        } else if (api.getServers() != null && !api.getServers().isEmpty()) {
            try {
                java.net.URI uri = new java.net.URI(api.getServers().get(0).getUrl());
                swagger.setHost(uri.getHost() + (uri.getPort() != -1 ? ":" + uri.getPort() : ""));
                String path = uri.getPath();
                basePath = path == null || path.isBlank() ? "/" : path;
                // Normalize basePath: remove trailing slash unless it's just "/"
                if (!basePath.equals("/") && basePath.endsWith("/")) {
                    basePath = basePath.substring(0, basePath.length() - 1);
                }
                swagger.setBasePath(basePath);
            } catch (Exception ignored) {
                swagger.setHost("localhost");
                swagger.setBasePath("/");
            }
        }

        // x-google-backend — required by GCP API Gateway to route to your backend service
        if (backendUrl != null && !backendUrl.isBlank()) {
            Map<String, String> googleBackend = new LinkedHashMap<>();
            googleBackend.put("address", backendUrl);
            swagger.vendorExtension("x-google-backend", googleBackend);
        }

        // Paths - strip basePath prefix if present to avoid duplication
        final String basePathToStrip = basePath.equals("/") ? "" : basePath;
        if (api.getPaths() != null) {
            api.getPaths().forEach((pathStr, pathItem) -> {
                // Remove basePath prefix from path if present
                String cleanPath = pathStr;
                if (!basePathToStrip.isEmpty() && pathStr.startsWith(basePathToStrip)) {
                    cleanPath = pathStr.substring(basePathToStrip.length());
                    if (cleanPath.isEmpty() || !cleanPath.startsWith("/")) {
                        cleanPath = "/" + cleanPath;
                    }
                }
                
                Path sw2Path = new Path();
                if (pathItem.getGet() != null)    sw2Path.setGet(convertOp(pathItem.getGet()));
                if (pathItem.getPost() != null)   sw2Path.setPost(convertOp(pathItem.getPost()));
                if (pathItem.getPut() != null)    sw2Path.setPut(convertOp(pathItem.getPut()));
                if (pathItem.getDelete() != null) sw2Path.setDelete(convertOp(pathItem.getDelete()));
                if (pathItem.getPatch() != null)  sw2Path.setPatch(convertOp(pathItem.getPatch()));
                swagger.path(cleanPath, sw2Path);
            });
        }

        // Definitions (components/schemas → definitions)
        if (api.getComponents() != null && api.getComponents().getSchemas() != null) {
            api.getComponents().getSchemas().forEach((name, schema) ->
                    swagger.addDefinition(name, convertModel(schema)));
        }

        // Firebase Authentication Security Definition
        if (firebaseProjectId != null && !firebaseProjectId.isBlank()) {
            OAuth2Definition firebaseAuth = new OAuth2Definition();
            firebaseAuth.setFlow("implicit");
            // Required by Swagger 2.0 schema, but GCP API Gateway uses x-google-* extensions
            firebaseAuth.setAuthorizationUrl("https://securetoken.google.com/" + firebaseProjectId);
            firebaseAuth.setVendorExtension("x-google-issuer", 
                "https://securetoken.google.com/" + firebaseProjectId);
            firebaseAuth.setVendorExtension("x-google-jwks_uri", 
                "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com");
            firebaseAuth.setVendorExtension("x-google-audiences", firebaseProjectId);
            swagger.securityDefinition("firebase_id_token", firebaseAuth);
            
            // Note: Not adding global security requirement to avoid GCP API Gateway errors
            // Add security per operation using @SecurityRequirement annotation if needed
        }

        return swagger;
    }

    private Operation convertOp(io.swagger.v3.oas.models.Operation src) {
        Operation op = new Operation();
        op.setOperationId(src.getOperationId());
        op.setTags(src.getTags());
        op.setSummary(src.getSummary());
        op.setDescription(src.getDescription());

        if (src.getParameters() != null) {
            src.getParameters().forEach(p -> {
                io.swagger.models.parameters.Parameter sw2p;
                if ("path".equals(p.getIn())) {
                    sw2p = new io.swagger.models.parameters.PathParameter();
                } else if ("query".equals(p.getIn())) {
                    sw2p = new io.swagger.models.parameters.QueryParameter();
                } else if ("header".equals(p.getIn())) {
                    sw2p = new io.swagger.models.parameters.HeaderParameter();
                } else {
                    sw2p = new io.swagger.models.parameters.QueryParameter();
                }
                sw2p.setName(p.getName());
                sw2p.setDescription(p.getDescription());
                sw2p.setRequired(Boolean.TRUE.equals(p.getRequired()));
                op.addParameter(sw2p);
            });
        }

        if (src.getResponses() != null) {
            src.getResponses().forEach((code, apiResponse) ->
                    op.addResponse(code, convertResponse(apiResponse)));
        }

        // Add x-google-iam-credentials for Cloud Run invocation via service account
        if (gatewaySa != null && !gatewaySa.isBlank()) {
            Map<String, String> iamCreds = new LinkedHashMap<>();
            iamCreds.put("serviceAccountEmail", gatewaySa);
            op.setVendorExtension("x-google-iam-credentials", iamCreds);
        }

        return op;
    }

    private Response convertResponse(ApiResponse src) {
        Response resp = new Response();
        resp.setDescription(src.getDescription() != null ? src.getDescription() : "");
        if (src.getContent() != null) {
            src.getContent().values().stream().findFirst().ifPresent(media -> {
                if (media.getSchema() != null) {
                    resp.setResponseSchema(convertModel(media.getSchema()));
                }
            });
        }
        return resp;
    }

    private Model convertModel(Schema<?> schema) {
        if (schema.get$ref() != null) {
            String ref = schema.get$ref().replace("#/components/schemas/", "#/definitions/");
            return new RefModel(ref);
        }
        if ("array".equals(schema.getType())) {
            ArrayModel arr = new ArrayModel();
            if (schema.getItems() != null) arr.setItems(convertProperty(schema.getItems()));
            return arr;
        }
        ModelImpl model = new ModelImpl();
        model.setType(schema.getType());
        model.setDescription(schema.getDescription());
        if (schema.getProperties() != null) {
            schema.getProperties().forEach((name, prop) ->
                    model.addProperty((String) name, convertProperty((Schema<?>) prop)));
        }
        return model;
    }

    private Property convertProperty(Schema<?> schema) {
        if (schema.get$ref() != null) {
            String ref = schema.get$ref().replace("#/components/schemas/", "");
            return new RefProperty("#/definitions/" + ref);
        }
        String type   = schema.getType();
        String format = schema.getFormat();
        if ("array".equals(type)) {
            ArrayProperty ap = new ArrayProperty();
            if (schema.getItems() != null) ap.setItems(convertProperty(schema.getItems()));
            return ap;
        }
        if ("integer".equals(type)) {
            return "int64".equals(format) ? new LongProperty() : new IntegerProperty();
        }
        if ("number".equals(type)) {
            return "double".equals(format) ? new DoubleProperty() : new FloatProperty();
        }
        if ("boolean".equals(type)) return new BooleanProperty();
        return new StringProperty();
    }
}
