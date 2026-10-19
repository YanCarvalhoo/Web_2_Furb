//
// Este arquivo foi gerado pela Eclipse Implementation of JAXB, v4.0.5 
// Consulte https://eclipse-ee4j.github.io/jaxb-ri 
// Todas as modificações neste arquivo serão perdidas após a recompilação do esquema de origem. 
//


package com.exemplo.salas.model;

import jakarta.xml.bind.annotation.XmlRegistry;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.exemplo.salas.model package. 
 * <p>An ObjectFactory allows you to programmatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {


    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.exemplo.salas.model
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link EntrarSalaRequest }
     * 
     * @return
     *     the new instance of {@link EntrarSalaRequest }
     */
    public EntrarSalaRequest createEntrarSalaRequest() {
        return new EntrarSalaRequest();
    }

    /**
     * Create an instance of {@link EntrarSalaResponse }
     * 
     * @return
     *     the new instance of {@link EntrarSalaResponse }
     */
    public EntrarSalaResponse createEntrarSalaResponse() {
        return new EntrarSalaResponse();
    }

}
