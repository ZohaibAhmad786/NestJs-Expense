import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';
interface Report {
  amount: number;
  source: string;
}
interface UpdateReport extends Partial<Report> {}
@Injectable() // this is necessary to this class somewhere else n controller
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }
  getReportById(type: ReportType, id: string) {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
  }

  createReport({ amount, source }: Report, type: ReportType) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return newReport;
  }
  updateReportById(id: string, type: ReportType, body: UpdateReport) {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };

    return data.report[reportIndex];
  }

  deleteReportById(id: string, type: ReportType) {
    const reportIndex = data.report
      .filter((report) => report.type === type)
      .findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
    return;
  }
}
