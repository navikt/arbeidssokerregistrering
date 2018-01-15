package no.nav.sbl.arbeidssokerregistrering.config;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

import static no.nav.sbl.util.EnvironmentUtils.getOptionalProperty;

public class EnvironmentServlet extends HttpServlet {

    public static final String ENVIRONMENT_CLASS = "environmentClass";
    public static final String ENVIRONMENT_NAME = "environmentName";
    private final String SCOPE;
    private final String SONE;
    private static final String PUBLIC_PREFIX_PATTERN = "^public\\..*";

    public EnvironmentServlet(String sone, String scope) {
        SCOPE = scope;
        SONE = sone;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Optional<String> enviromentClass = getOptionalProperty(ENVIRONMENT_CLASS);
        Optional<String> environmentName = getOptionalProperty(ENVIRONMENT_NAME);

        String env = System.getProperties()
                .stringPropertyNames()
                .stream()
                .filter(name -> name.matches(PUBLIC_PREFIX_PATTERN))
                .reduce("", (accumulator, nextString) ->
                        accumulator + String.format("%s.%s='%s';\n",
                                SCOPE,
                                removePublicPrefix(nextString).replaceAll("\\.", "_"),
                                System.getProperty(nextString)));


        String envWrapper =
                SCOPE + "=" + "{}\n" +
                env +
                SCOPE + "." + ENVIRONMENT_CLASS + "='" + enviromentClass.orElse("") + "'\n" +
                SCOPE + "." + ENVIRONMENT_NAME + "='" + environmentName.orElse("") + "'\n" +
                SCOPE + "." + "sone" + "='" + SONE + "'\n";

        resp.setContentType("application/javascript");
        resp.getWriter().write(envWrapper);
    }

    private static String removePublicPrefix(String string) {
        return string.replaceFirst("public\\.","");
    }
}
