package br.unipar.frameworks.invest.controller;

import br.unipar.frameworks.invest.dto.AcaoDashboardDTO;
import br.unipar.frameworks.invest.model.Acao;
import br.unipar.frameworks.invest.model.Configuracao;
import br.unipar.frameworks.invest.service.ConfiguracaoService;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:4200")
public class DashboardController {

    private final ConfiguracaoService configuracaoService;
    private final Random random = new Random();

    private final Map<String, Double> precosAtuais = new HashMap<>();

    public DashboardController(ConfiguracaoService configuracaoService) {
        this.configuracaoService = configuracaoService;
    }

    @GetMapping("/{configId}")
    public List<AcaoDashboardDTO> gerarDashboard(@PathVariable Long configId) {
        
        Configuracao config = configuracaoService.buscarPorId(configId);

        if (config == null || config.getAcoesSelecionadas().isEmpty()) {
            return Collections.emptyList();
        }

        List<AcaoDashboardDTO> resposta = new ArrayList<>();

        for (Acao acao : config.getAcoesSelecionadas()) {
            double novoPreco = gerarPrecoVariando(acao.getTicker());
            resposta.add(new AcaoDashboardDTO(
                    acao.getTicker(),
                    acao.getEmpresa(),
                    novoPreco
            ));
        }

        return resposta;
    }

    private double gerarPrecoVariando(String ticker) {
        double precoAtual = precosAtuais.getOrDefault(ticker, 10 + (100 - 10) * random.nextDouble());
        boolean caiu = random.nextBoolean();

        if(caiu) {
            precoAtual *= 0.95 + (0.05 * random.nextDouble());
        } else {
            precoAtual *= 1.00 + (0.10 * random.nextDouble());
        }
        double variacaoPercentual = -0.10 + (0.25 * random.nextDouble());
        double novoPreco = precoAtual * (1 + variacaoPercentual);

        if (novoPreco < 1.0) {
            novoPreco = 1.0;
        }

        precosAtuais.put(ticker, novoPreco);
        return Math.round(novoPreco * 100.0) / 100.0;
    }
}