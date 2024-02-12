import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportServive: ReportService) {}
  calculateSummary() {
    const totalExpense = this.reportServive
      .getAllReports(ReportType.EXPENSE)
      .reduce((sum, report) => sum + report.amount, 0);
    const totalIncome = this.reportServive
      .getAllReports(ReportType.INCOME)
      .reduce((sum, report) => sum + report.amount, 0);
    return {
      totalIncome: totalIncome,
      totalExpense: totalExpense,
      netIncome: totalIncome - totalExpense,
    };
  }
}
