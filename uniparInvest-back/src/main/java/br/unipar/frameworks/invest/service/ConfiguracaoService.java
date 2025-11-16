package br.unipar.frameworks.invest.service;

import br.unipar.frameworks.invest.model.Configuracao;
import br.unipar.frameworks.invest.repository.ConfiguracaoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

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
        
        if (configuracao.getUsuario() == null || configuracao.getUsuario().getId() == null) {
            throw new RuntimeException("Usuário não pode ser nulo ao salvar configuração.");
        }

        Optional<Configuracao> configExistente = configuracaoRepository.findByUsuarioId(configuracao.getUsuario().getId());
        
        if (configExistente.isPresent()) {
            Configuracao dbConfig = configExistente.get();
            dbConfig.setAcoesSelecionadas(configuracao.getAcoesSelecionadas());
            dbConfig.setIntervaloAtualizacaoMs(configuracao.getIntervaloAtualizacaoMs());
            dbConfig.setUsuario(configuracao.getUsuario()); 
            return configuracaoRepository.save(dbConfig);
        }
        
        return configuracaoRepository.save(configuracao);
    }

    public Optional<Configuracao> findById(Long id) {
        return configuracaoRepository.findById(id);
    }
    
    public Configuracao findByUsuarioId(Long usuarioId) {
        return configuracaoRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Configuracao nao encontrada para o usuarioId: " + usuarioId));
    }

    public void deletar(Long id) {
        configuracaoRepository.deleteById(id);
    }
}