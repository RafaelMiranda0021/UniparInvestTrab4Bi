package br.unipar.frameworks.invest.service;

import br.unipar.frameworks.invest.model.Acao;
import br.unipar.frameworks.invest.repository.AcaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AcaoService {
    private final AcaoRepository repository;

    public AcaoService(AcaoRepository repository) {
        this.repository = repository;
    }

    public Acao salvar(Acao acao) {
        return repository.save(acao);
    }

    public List<Acao> listar() {
        return repository.findAll();
    }

    public Acao atualizar(Long id, Acao acaoAtualizada) {
        return repository.findById(id).map(acao -> {
            acao.setEmpresa(acaoAtualizada.getEmpresa());
            acao.setTicker(acaoAtualizada.getTicker());
            acao.setDescricao(acaoAtualizada.getDescricao());
            return repository.save(acao);
        }).orElseThrow(() -> new RuntimeException("Ação não encontrada"));
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public Acao buscarPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Ação não encontrada"));
    }
}