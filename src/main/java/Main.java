
import no.nav.apiapp.ApiApp;
import no.nav.sbl.arbeidssokerregistrering.config.ApplicationConfig;

public class Main {

    public static void main(String... args) throws Exception {
        ApiApp.startApp(ApplicationConfig.class, args);
    }
}
