package com.exemplo.salas.endpoint;

import com.exemplo.salas.model.EntrarSalaRequest;
import com.exemplo.salas.model.EntrarSalaResponse;
import com.exemplo.salas.service.SalaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

/**
 * @PayloadRoot mapeia este método para a mensagem SOAP cujo elemento raiz
 * é <EntrarSalaRequest> no namespace definido no XSD — é o equivalente,
 * no Spring-WS, ao "roteamento" que no JAX-WS seria feito por anotações
 * na interface @WebService.
 */
@Endpoint
public class SalaEndpoint {

    private static final String NAMESPACE_URI = "http://exemplo.com/sala-soap-ws/salas";

    private final SalaService salaService;

    @Autowired
    public SalaEndpoint(SalaService salaService) {
        this.salaService = salaService;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "EntrarSalaRequest")
    @ResponsePayload
    public EntrarSalaResponse entrar(@RequestPayload EntrarSalaRequest request) {
        return salaService.tentarEntrar(request.getIdSala(), request.getNomeJogador());
    }

}
