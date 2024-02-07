import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ReportType } from './data';
import { CreateReportDto, UpdateReportDto } from './dtos/report.dto';
// Controller are classes to create different endpoints
@Controller('report/:type') // we can also add pre-path to api url
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string, // Pipe convert to actual Pipe type if we pass something else it throw an error
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReport({ amount, source }, reportType);
  }

  @Put(':id')
  updateReportById(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() body: UpdateReportDto,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.updateReportById(id, reportType, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReportById(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.deleteReportById(id, reportType);
  }
}
