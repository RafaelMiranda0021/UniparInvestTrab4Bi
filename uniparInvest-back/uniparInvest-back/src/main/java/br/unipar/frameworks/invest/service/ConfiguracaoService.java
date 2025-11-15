package br.unipar.frameworks.invest.service;

import br.unipar.frameworks.invest.model.Configuracao;
import br.unipar.frameworks.invest.repository.ConfiguracaoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ConfiguracaoService {

    private final ConfiguracaoRepository configuracaoRepository;

    public ConfiguracaoService(ConfiguracaoRepository configuracaoRepository) {
        this.configuracaoRepository = configuracaoRepository;
    }

    public List<Configuracao> listarTodos() {
        return configuracaoRepository.findAll();
    }

    public Configuracao buscarPorId(Long id) {
        return configuracaoRepository.findById(id).orElse(null);
    }

    public Configuracao salvar(Configuracao configuracao) {
        return configuracaoRepository.save(configuracao);
    }

    public void deletar(Long id) {
        configuracaoRepository.deleteById(id);
    }
}
