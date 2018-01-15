package no.nav.sbl.arbeidssokerregistrering.config;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static no.nav.sbl.util.EnvironmentUtils.getRequiredProperty;

public class EnvironmentServlet extends HttpServlet {

    public static final String ENVIRONMENT = "environment";
    static Map<String, String> requiredProperties = new HashMap<>();

    static {
        requiredProperties.put("veilarboppfolgingproxy.url", "veilarboppfolgingproxy_url");
    }


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/javascript");
        resp.getWriter().write(getEnvironmentString());
    }

    static String getEnvironmentString() {
        return ENVIRONMENT + "={}" + "\n" + requiredProperties.
                    entrySet()
                    .stream()
                    .map(entry -> ENVIRONMENT + "." + entry.getValue() + "=" + getRequiredProperty(entry.getKey()))
                    .collect(Collectors.joining("\n"));
    }
}
