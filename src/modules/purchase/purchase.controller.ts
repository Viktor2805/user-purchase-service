import { Controller, Post, Body } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.createPurchase(createPurchaseDto);
  }
}
