package com.devsuperior.dsvendas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsvendas.dto.SaleDTO;
import com.devsuperior.dsvendas.dto.SaleSuccessDTO;
import com.devsuperior.dsvendas.dto.SaleSumDTO;
import com.devsuperior.dsvendas.entities.Sale;
import com.devsuperior.dsvendas.repositories.SaleRepository;
import com.devsuperior.dsvendas.repositories.SellerRepository;

@Service
public class SaleService {

	// Injeta a instancia automaticamente pelo framework, nova, new,
	@Autowired
	private SaleRepository repository;

	// Para o JPA não ficar buscando um por dos vendedores no BD, uma solução
	// simples
	// Criar a instância do SellerRepository
	@Autowired
	private SellerRepository sellerRepository;

	// Sem paginação
	// public List<SaleDTO> findAll() {
	// List<Sale> result = repository.findAll();

	// A função map vai converter uma coleção original em uma nova coleção de outro
	// tipo que no caso seria lista de SellerDTO
	// collect é para converter de novo para lista
	// return result.stream().map(x -> new SaleDTO(x)).collect(Collectors.toList());
	// }

	// Busca todos por paginação muito simples
	// Transactional vai garantir que toda operação com o BD seja resolvida neste
	// momento do service
	// ReadyOnly é pra não fazer loc no BD somente leitura
	@Transactional(readOnly = true)
	public Page<SaleDTO> findAll(Pageable pageable) {
		sellerRepository.findAll();
		Page<Sale> result = repository.findAll(pageable);

		// A função map vai converter uma coleção original em uma nova coleção de outro
		// tipo que no caso seria lista de SellerDTO
		// collect é para converter de novo para lista
		
		return result.map(x -> new SaleDTO(x));
	}
	
	@Transactional(readOnly = true)
	public List<SaleSumDTO> amountGroupedBySeller() {
		return repository.amountGroupedBySeller();
	}
	
	@Transactional(readOnly = true)
	public List<SaleSuccessDTO> successGroupedBySeller() {
		return repository.successGroupedBySeller();
	}
}
