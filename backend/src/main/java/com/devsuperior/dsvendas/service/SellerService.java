package com.devsuperior.dsvendas.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devsuperior.dsvendas.dto.SellerDTO;
import com.devsuperior.dsvendas.entities.Seller;
import com.devsuperior.dsvendas.repositories.SellerRepository;

@Service
public class SellerService {

	// Injeta a instancia automaticamente pelo framework, nova, new, 
	@Autowired
	private SellerRepository repository;
	
	public List<SellerDTO> findAll() {
		List<Seller> result =  repository.findAll();
		
		// A função map vai converter uma coleção original em uma nova coleção de outro tipo que no caso seria lista de SellerDTO
		// collect é para converter de novo para lista
		return result.stream().map(x -> new SellerDTO(x)).collect(Collectors.toList());
	}
}
