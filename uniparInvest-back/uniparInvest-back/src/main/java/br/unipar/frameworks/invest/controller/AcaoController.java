package br.unipar.frameworks.invest.controller;

import br.unipar.frameworks.invest.model.Acao;
import br.unipar.frameworks.invest.service.AcaoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/acoes")
@CrossOrigin(origins = "*")
public class AcaoController {

    private final AcaoService service;

    public AcaoController(AcaoService service) {
        this.service = service;
    }

    @PostMapping
    public Acao cadastrar(@RequestBody Acao acao) {
        return service.salvar(acao);
    }

    @GetMapping
    public List<Acao> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Acao buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Acao atualizar(@PathVariable Long id, @RequestBody Acao acao) {
        return service.atualizar(id, acao);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}