import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post('create-random')
  async createRandomVendors() {
    return this.vendorService.createRandomVendors();
  }
}
