import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Contract } from '../model/contract.model';

@Component({
  selector: 'app-contract-page',
  templateUrl: './contract-page.component.html',
  styleUrls: ['./contract-page.component.css']
})
export class ContractPageComponent implements OnInit {

  constructor(private companyService: CompanyService) { }

  contracts: Contract[] = [];
  canCancel: boolean = true;

  ngOnInit(): void {
    this.getContracts();
  }

  getContracts() {
    this.companyService.getAllContracts().subscribe(
      (result: any) => {
        this.contracts = result;
        this.contracts.sort((a, b) => new Date(a.deliveryTime).getTime() - new Date(b.deliveryTime).getTime());

        const currentDateTime = new Date();
        const hasContractWithin24Hours = this.contracts.some(
          (contract) =>
            new Date(contract.deliveryTime).getTime() - currentDateTime.getTime() < 24 * 60 * 60 * 1000
        );
        this.canCancel = !hasContractWithin24Hours;
      }
    );
  }

  cancelDeliveryButtonClicked(): void {
    this.canCancel = false;

    this.companyService.cancelContract('Delivery is cancelled.').subscribe(
      (result: any) => {
      }
    );

    const closestDeliveryTime = this.findClosestDeliveryTime();
    const timeDifference = closestDeliveryTime - new Date().getTime();

    if (timeDifference > 0) {
      setTimeout(() => {
        this.canCancel = true;
      }, timeDifference);
    } else {
      this.canCancel = false;
    }
  }

  private findClosestDeliveryTime(): number {
    const deliveryTimes = this.contracts.map((contract) => new Date(contract.deliveryTime).getTime());
    return Math.min(...deliveryTimes);
  }
}
