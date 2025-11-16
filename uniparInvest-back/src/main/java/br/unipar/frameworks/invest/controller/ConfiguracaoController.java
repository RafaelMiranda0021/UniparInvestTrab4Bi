package br.unipar.frameworks.invest.controller;

import br.unipar.frameworks.invest.model.Configuracao;
import br.unipar.frameworks.invest.service.ConfiguracaoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/configuracoes")
@CrossOrigin(origins = "http://localhost:4200")
public class ConfiguracaoController {

    private final ConfiguracaoService configuracaoService;

    public ConfiguracaoController(ConfiguracaoService configuracaoService) {
        this.configuracaoService = configuracaoService;
    }

    @GetMapping
    public List<Configuracao> listar() {
        return configuracaoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Configuracao buscar(@PathVariable Long id) {
        return configuracaoService.buscarPorId(id);
    }

    @GetMapping("/usuario/{usuarioId}")
    public Configuracao getByUsuarioId(@PathVariable Long usuarioId) {
        return configuracaoService.findByUsuarioId(usuarioId);
    }

    @PostMapping
    public Configuracao criar(@RequestBody Configuracao configuracao) {
        return configuracaoService.salvar(configuracao);
    }

    @PutMapping("/{id}")
    public Configuracao atualizar(@PathVariable Long id, @RequestBody Configuracao configuracao) {

        configuracao.setId(id);
        return configuracaoService.salvar(configuracao);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        configuracaoService.deletar(id);
    }
}