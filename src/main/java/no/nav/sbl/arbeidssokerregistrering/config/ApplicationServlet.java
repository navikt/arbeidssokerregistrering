package no.nav.sbl.arbeidssokerregistrering.config;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ApplicationServlet extends HttpServlet {

    @Override
    protected final void doGet(final HttpServletRequest request, final HttpServletResponse response) throws IOException, ServletException {
        RequestDispatcher dispatcher = getServletContext().getNamedDispatcher("default");
        String fileRequestPattern = "^(.+\\..{1,4})$";

        if (!request.getRequestURI().matches(fileRequestPattern)) {
            RequestDispatcher index = getServletContext().getRequestDispatcher("/index.html");
            index.forward(request, response);
        } else {
            dispatcher.forward(request, response);
        }
    }
}