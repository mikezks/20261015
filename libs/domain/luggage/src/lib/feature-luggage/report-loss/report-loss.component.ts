import { ReportService } from '../../logic-luggage/data-access/report.service';
import { ReportFilterComponent } from '../../ui-luggage/report-filter/report-filter.component';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-report-loss',
  imports: [ReportFilterComponent],
  template: `<div class="card">
  <div class="card-header">
    <h2 class="card-title">Report Luggage Loss</h2>
  </div>

  <div class="card-body">
    <p>Report your lost luggage here.</p><app-report-filter />
  </div>
</div>`,
  styles: ``,
})
export class ReportLossComponent { protected readonly reportService = inject(ReportService); }
