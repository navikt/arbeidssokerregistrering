package no.nav.sbl.arbeidssokerregistrering.config;

import no.nav.apiapp.ApiApplication;
import org.springframework.context.annotation.Configuration;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletRegistration;
import java.util.EnumSet;

import static no.nav.apiapp.ApiApplication.Sone.FSS;
import static no.nav.sbl.arbeidssokerregistrering.util.DecoratorUtils.getDecoratorFilter;

@Configuration
public class ApplicationConfig implements ApiApplication {

    @Override
    public Sone getSone() {
        return FSS;
    }

    @Override
    public String getApplicationName() {
        return APPLICATION_NAME;
    }

    @Override
    public void startup(ServletContext servletContext) {
        FilterRegistration.Dynamic docratorfilter = servletContext.addFilter("docratorfilter", getDecoratorFilter());
        docratorfilter.addMappingForUrlPatterns(EnumSet.of(DispatcherType.FORWARD),false, "/index.html");

        ServletRegistration.Dynamic environment = servletContext.addServlet("environment", new EnvironmentServlet(FSS.name(), APPLICATION_NAME));
        environment.addMapping("/environment.js");


        ServletRegistration.Dynamic reactapp = servletContext.addServlet("reactapp", new ApplicationServlet());
        reactapp.addMapping("/*");
    }

    public static final String APPLICATION_NAME = "arbeidssokerregistrering";

}