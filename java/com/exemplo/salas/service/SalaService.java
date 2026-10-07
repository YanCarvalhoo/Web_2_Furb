package com.exemplo.salas.service;

import com.exemplo.salas.model.EntrarSalaResponse;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Mantém em memória a contagem de ocupantes por sala e aplica a regra
 * de capacidade máxima (4 jogadores por sala).
 *
 * Observação: por ser um projeto didático, o estado é guardado em memória
 * (ConcurrentHashMap). Em um cenário real isso viria de um banco de dados
 * ou de um serviço de estado compartilhado.
 */
@Service
public class SalaService {

    private static final int CAPACIDADE_MAXIMA = 4;

    private final Map<String, Integer> ocupantesPorSala = new ConcurrentHashMap<>();

    public synchronized EntrarSalaResponse tentarEntrar(String idSala, String nomeJogador) {
        int ocupantesAtuais = ocupantesPorSala.getOrDefault(idSala, 0);

        EntrarSalaResponse response = new EntrarSalaResponse();
        response.setCapacidadeMaxima(CAPACIDADE_MAXIMA);

        if (ocupantesAtuais >= CAPACIDADE_MAXIMA) {
            response.setSucesso(false);
            response.setMensagem("Sala " + idSala + " está cheia.");
            response.setVagasDisponiveis(0);
            return response;
        }

        ocupantesPorSala.put(idSala, ocupantesAtuais + 1);
        int vagasRestantes = CAPACIDADE_MAXIMA - (ocupantesAtuais + 1);

        response.setSucesso(true);
        response.setMensagem("Jogador " + nomeJogador + " entrou na sala " + idSala + " com sucesso.");
        response.setVagasDisponiveis(vagasRestantes);
        return response;
    }

}
