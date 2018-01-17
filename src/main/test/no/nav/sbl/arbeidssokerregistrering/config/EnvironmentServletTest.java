package no.nav.sbl.arbeidssokerregistrering.config;

import org.junit.Test;

import java.util.HashMap;

import static no.nav.sbl.arbeidssokerregistrering.config.EnvironmentServlet.replaceOeraWithNav;
import static no.nav.sbl.arbeidssokerregistrering.config.EnvironmentServlet.requiredProperties;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class EnvironmentServletTest {

    @Test
    public void skalHenteEnvironmentJS() {
        System.setProperty("app.url", "http://localhost:8080");
        System.setProperty("app1.url", "http://localhost:8081");
        requiredProperties = new HashMap<>();

        requiredProperties.put("app.url", "app_url");
        requiredProperties.put("app1.url", "app1_url");

        assertThat(EnvironmentServlet.getEnvironmentString(), is("environment={}\nenvironment.app1_url=http://localhost:8081\nenvironment.app_url=http://localhost:8080"));

    }

    @Test
    public void skalErstatteMedNav() {
        String oera_t = "https://itjenester-t6.oera.no/veilarboppfolgingproxy";
        String oera_p = "https://itjenester.oera.no/veilarboppfolgingproxy";

        assertThat(replaceOeraWithNav(oera_t), is("https://tjenester-t6.nav.no/veilarboppfolgingproxy"));
        assertThat(replaceOeraWithNav(oera_p), is("https://tjenester.nav.no/veilarboppfolgingproxy"));
    }
}