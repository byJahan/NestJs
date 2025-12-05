import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateItemDto, UpdateItemDto } from './items.dto';
import { ItemsService } from './items.service';
import { Item } from './items.service';   // <-- add this

@Controller('items')
export class ItemsController {
  constructor(private readonly service: ItemsService) {}

  //@Get()
  //getAll(): Promise<any> {                // or : Item[]  if you exported Item
    //return this.service.findAll();
  //}
    @Get()
  getAll(): Item[] {              // ← was “Promise<any>”
    return this.service.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): any {  // or : Item | undefined
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateItemDto): any {  // or : Item
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateItemDto,
  ): any {                                  // or : Item | null
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): boolean {
    return this.service.remove(+id);
  }
}