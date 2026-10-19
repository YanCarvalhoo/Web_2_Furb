package com.exemplo.salas.config;

import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.ws.config.annotation.EnableWs;
import org.springframework.ws.transport.http.MessageDispatcherServlet;
import org.springframework.ws.wsdl.wsdl11.DefaultWsdl11Definition;
import org.springframework.xml.xsd.SimpleXsdSchema;
import org.springframework.xml.xsd.XsdSchema;

/**
 * Substitui o web.xml tradicional: registra o MessageDispatcherServlet
 * (que recebe as mensagens SOAP) e expõe o WSDL dinamicamente a partir
 * do XSD, sem a necessidade de um arquivo .wsdl físico.
 *
 * Como o bean do WSDL se chama "salas", o contrato fica disponível em:
 * http://localhost:8080/ws/salas.wsdl
 */
@EnableWs
@Configuration
public class WebServiceConfig {

    @Bean
    public ServletRegistrationBean<MessageDispatcherServlet> messageDispatcherServlet(ApplicationContext applicationContext) {
        MessageDispatcherServlet servlet = new MessageDispatcherServlet();
        servlet.setApplicationContext(applicationContext);
        servlet.setTransformWsdlLocations(true);
        return new ServletRegistrationBean<>(servlet, "/ws/*");
    }

    @Bean(name = "salas")
    public DefaultWsdl11Definition defaultWsdl11Definition(XsdSchema salasSchema) {
        DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
        wsdl11Definition.setPortTypeName("SalasPort");
        wsdl11Definition.setLocationUri("/ws");
        wsdl11Definition.setTargetNamespace("http://exemplo.com/sala-soap-ws/salas");
        wsdl11Definition.setSchema(salasSchema);
        return wsdl11Definition;
    }

    @Bean
    public XsdSchema salasSchema() {
        return new SimpleXsdSchema(new ClassPathResource("xsd/sala.xsd"));
    }

}
