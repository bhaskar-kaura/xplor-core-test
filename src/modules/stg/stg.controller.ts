import { StgService } from './services/stg.service';
import { SearchRequestDto } from './dto/search-request.dto';
import { Body, Controller, Get, Injectable, Post, Req, Res } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorators';
import { SseConnectedMessage } from '../../common/constants/response-message';
import { SelectRequestDto } from './dto/select-request.dto';
import { InitRequestDto } from './dto/init-request.dto';
import { ConfirmRequestDto } from './dto/confirm-request.dto';
import { StatusRequestDto } from './dto/status-request.dto';

@Controller('stg')
@Injectable()
export class StgController {
  private connectedClients: Map<string, any> = new Map();

  constructor(private readonly stgService: StgService) {
    if (!this.connectedClients) {
      this.connectedClients = new Map();
    }
  }

  @Public()
  @Post('search')
  search(@Body() searchRequestDto: SearchRequestDto) {
    return this.stgService.search(searchRequestDto);
  }

  @Public()
  @Post('select')
  select(@Body() selectRequestDto: SelectRequestDto) {
    console.log('select', selectRequestDto);
    return this.stgService.select(selectRequestDto);
  }

  @Public()
  @Post('init')
  init(@Body() initRequestDto: InitRequestDto) {
    return this.stgService.init(initRequestDto);
  }

  @Public()
  @Post('confirm')
  confirm(@Body() confirmRequestDto: ConfirmRequestDto) {
    return this.stgService.confirm(confirmRequestDto);
  }

  @Public()
  @Post('status')
  status(@Body() statusRequestDto: StatusRequestDto) {
    console.log('status', statusRequestDto)
    return this.stgService.status(statusRequestDto);
  }

  @Public()
  @Post('on_search')
  onSearch(@Body() searchResponse: any) {
    // Bind the context of sendDataToClients to this instance
    console.log('OnSearch00', searchResponse);
    return this.stgService.onSearch(searchResponse, this.connectedClients, this.sendDataToClients);
  }

  @Public()
  @Post('on_select')
  onSelect(@Body() searchResponse: any) {
    // Bind the context of sendDataToClients to this instance
    return this.stgService.onSelect(searchResponse);
  }

  @Public()
  @Post('on_init')
  onInit(@Body() searchResponse: any) {
    // Bind the context of sendDataToClients to this instance
    return this.stgService.onInit(searchResponse);
  }

  @Public()
  @Post('on_confirm')
  onConfirm(@Body() searchResponse: any) {
    // Bind the context of sendDataToClients to this instance
    return this.stgService.onConfirm(searchResponse);
  }

  @Public()
  @Get('sse')
  async sse(@Req() req: any, @Res() res: any): Promise<void> {
    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    req.setTimeout(0);
    // Extract transaction ID from query parameters
    const transaction_id: string = req.query.transaction_id;
    // Add the client to the clientsMap
    this.connectedClients.set(transaction_id, res);
    this.sendDataToClients(
      transaction_id,
      {
        success: true,
        message: SseConnectedMessage,
      },
      this.connectedClients,
    );
    // Handle client disconnect
    req.on('close', () => {
      this.connectedClients.delete(transaction_id); // Remove the disconnected client
    });
  }

  async sendDataToClients(transaction_id: string, data: any, connectedClients: Map<string, any>): Promise<void> {
    try {
      console.log('SSEDatareceived', transaction_id);
      console.log('connectedClients', connectedClients);
      if (connectedClients.has(transaction_id)) {
        // eslint-disable-next-line no-console
        console.log('sseData', `data: ${JSON.stringify(data)}`);
        connectedClients.get(transaction_id).write(`data: ${JSON.stringify(data)}\n\n`);
      }

      return data;
    } catch (error) {
      // console.log('error', error);
      return error;
    }
  }
}
